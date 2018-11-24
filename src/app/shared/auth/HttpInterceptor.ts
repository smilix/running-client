import {ConnectionBackend, Headers, Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend} from '@angular/http';
import {Router} from '@angular/router';
import {SessionHolder} from "./SessionHolder";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

export function HttpFactory(backend: XHRBackend, requestOptions: RequestOptions, router: Router, sessionHolder: SessionHolder) {
  return new HttpInterceptor(backend, requestOptions, router, sessionHolder);
}

export class HttpInterceptor extends Http {

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private _router: Router, private sessionHolder: SessionHolder) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.request(url, this.getRequestOptionArgs(options)));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.get(url, this.getRequestOptionArgs(options)));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.delete(url, options));
  }

  getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    options.headers.append('Content-Type', 'application/json');
    if (this.sessionHolder.isValid()) {
      options.headers.append('Session-Id', this.sessionHolder.get());
    }
    return options;
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    return observable.pipe(catchError(err => {
      if (err.status == 401 && err.url.indexOf('/login') !== 0) {
        this.sessionHolder.clear();
        this._router.navigate(['/login', {route: this._router.url}]);
      }
      return throwError(err);
    }));
  }
}
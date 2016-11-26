import {Http, Request, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {SessionHolder} from "./SessionHolder";

export class HttpInterceptor extends Http {

  constructor(backend:ConnectionBackend, defaultOptions:RequestOptions, private _router:Router, private sessionHolder:SessionHolder) {
    super(backend, defaultOptions);
  }
  
  request(url:string | Request, options?:RequestOptionsArgs):Observable<Response> {
    return this.intercept(super.request(url, this.getRequestOptionArgs(options)));
  }

  get(url:string, options?:RequestOptionsArgs):Observable<Response> {
    return this.intercept(super.get(url, this.getRequestOptionArgs(options)));
  }

  post(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
    return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
  }

  put(url:string, body:string, options?:RequestOptionsArgs):Observable<Response> {
    return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
  }

  delete(url:string, options?:RequestOptionsArgs):Observable<Response> {
    return this.intercept(super.delete(url, options));
  }

  getRequestOptionArgs(options?:RequestOptionsArgs):RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    options.headers.append('Content-Type', 'application/json');
    if (this.sessionHolder.get() != null) {
      options.headers.append('Session-Id', this.sessionHolder.get());
    }
    return options;
  }

  intercept(observable:Observable<Response>):Observable<Response> {
    return observable.catch((err, source) => {
      if (err.status == 401 && err.url.indexOf('/login') !== 0) {
        this.sessionHolder.clear();
        this._router.navigate(['/login']);
        // return Observable.empty();
        return Observable.throw('"redirecting to login"');
      } else {
        return Observable.throw(err);
      }
    });
  }
}
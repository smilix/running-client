import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

interface Entry {
  isObs: boolean;
  value: Observable<Response> | Response;
}

@Injectable()
export class HttpCache {

  cached = new Map<string, Entry>();

  constructor(private http: Http) {
  }

  public clear() {
    this.cached.clear();
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    let key = url;
    if (options) {
      key += JSON.stringify(options);
    }

    if (this.cached.has(key)) {
      const fromCache = this.cached.get(key);
      if (fromCache.isObs) {
        return fromCache.value as Observable<Response>;
      } else {
        return Observable.of(fromCache.value);
      }
    } else {
      const obs = this.http.get(url, options).share();
      this.cached.set(key, {
        isObs: true,
        value: obs
      });
      return obs.map(resp => {
        this.cached.set(key, {
          isObs: false,
          value: resp
        });
        return resp;
      });
    }
  }
}

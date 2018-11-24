import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs, Response} from "@angular/http";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";

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
        return of(fromCache.value as Response);
      }
    } else {
      const obs = this.http.get(url, options);
      this.cached.set(key, {
        isObs: true,
        value: obs
      });
      return obs.pipe(map(resp => {
        this.cached.set(key, {
          isObs: false,
          value: resp
        });
        return resp;
      }));
    }
  }
}

import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {SessionHolder} from "./SessionHolder";
import {LocalStorage} from "ngx-webstorage";
import {environment} from "../../../environments/environment";
import {Observable, of, Subject, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";

export class Credentials {

  constructor(public user: string, public password: string, public remember: boolean) {
  }
}

class SavedCredentials {
  constructor(public user: string, public password: string) {
  }
}


@Injectable()
export class AuthService {

  @LocalStorage()
  private _savedCredentials: SavedCredentials;

  private _isLoggedIn = new Subject<boolean>();


  constructor(private http: Http, private sessionHolder: SessionHolder) {
    this._isLoggedIn.next(this.isLoggedIn());
  }

  private loginInternal(user: string, password: string) {
    return this.http.post(environment.backendPath + '/auth', {
      user: user,
      password: password
    }).pipe(
      map((resp: Response) => {
        var json = resp.json();
        this.sessionHolder.set(json.session);
        this._isLoggedIn.next(true);
        return true;
      }),
      catchError(error => {
        console.error('An error occurred', error);
        return throwError(error.json().reason);
      }));
  }

  login(data: Credentials): Observable<boolean> {
    if (data.remember) {
      this._savedCredentials = new SavedCredentials(data.user, data.password);
    }

    return this.loginInternal(data.user, data.password);
  }

  tryAutoLogin(): Observable<boolean> {
    if (this._savedCredentials == null) {
      return of(false);
    }
    return this.loginInternal(this._savedCredentials.user, this._savedCredentials.password);
  }

  isLoggedIn() {
    return this.sessionHolder.isValid();
  }

  getSession() {
    return this.sessionHolder.get();
  }

  logout() {
    this.sessionHolder.clear();
    this._savedCredentials = null;
    this._isLoggedIn.next(false);
  }

  /**
   * Observes the current login state.
   * @returns {Observable<boolean>} true/false depending on the login state
   */
  loggedInObserver(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }


}

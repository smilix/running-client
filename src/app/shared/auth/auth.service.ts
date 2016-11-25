import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {SessionHolder} from "./SessionHolder";
import {Observable, Subject} from "rxjs/Rx";

export class Credentials {

  constructor(public user:string,
              public password:string) {
  }
}

@Injectable()
export class AuthService {

  static BACKEND = 'http://localhost:8080';

  private _isLoggedIn = new Subject<boolean>();

  constructor(private http:Http, private sessionHolder:SessionHolder) {
    this._isLoggedIn.next(this.isLoggedIn());
  }

  login(data:Credentials) {
    return this.http.post(AuthService.BACKEND + '/auth', {
      user: data.user,
      password: data.password
    })
      .toPromise()
      .then(resp => {
        var json = resp.json();
        this.sessionHolder.set(json.session);
        this._isLoggedIn.next(true);
      })
      .catch(resp => {
        console.error('An error occurred', resp);
        return Promise.reject(resp.json().reason);
      });
  }

  isLoggedIn() {
    return this.sessionHolder.get() != null;
  }

  getSession() {
    return this.sessionHolder.get();
  }

  logout() {
    this.sessionHolder.clear();
    this._isLoggedIn.next(false);
  }

  /**
   * Observes the current login state.
   * @returns {Observable<boolean>} true/false depending on the login state
   */
  loggedInObserver():Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }


}

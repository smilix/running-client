import {Injectable} from '@angular/core';
import {LocalStorage} from 'ng2-webstorage';
import {JwtHelper} from "angular2-jwt";

@Injectable()
export class SessionHolder {

  @LocalStorage()
  private session: string;

  private jwtHelper = new JwtHelper();

  constructor() {
  }

  set(newSession: string) {
    this.session = newSession;
  }

  get() {
    return this.session;
  }

  isValid() {
    return this.session != null && !this.jwtHelper.isTokenExpired(this.session);
  }

  clear() {
    this.session = null;
  }

}
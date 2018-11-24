import {Injectable} from '@angular/core';
import {LocalStorage} from 'ngx-webstorage';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class SessionHolder {

  @LocalStorage()
  private session: string;

  private jwtHelper = new JwtHelperService();

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
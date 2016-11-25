import {Injectable} from '@angular/core';
import {LocalStorage} from 'ng2-webstorage';

@Injectable()
export class SessionHolder {

  @LocalStorage()
  private session:string;

  constructor() {}

  set(newSession:string) {
    this.session = newSession;
  }

  get() {
    return this.session;
  }
  
  clear() {
    this.session = null;
  }

}
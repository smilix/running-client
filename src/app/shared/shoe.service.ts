import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Shoe} from "./shoe";
import {environment} from "../../environments/environment";
import {UtilsService} from "./utils.service";

@Injectable()
export class ShoeService {

  constructor(private http:Http, private utils:UtilsService) { }

  getShoes(): Promise<Shoe[]> {
    return this.http.get(environment.backendPath + '/shoes')
      .toPromise()
      .then(resp => {
        return resp.json().shoes.map(entry => new Shoe(entry));
      })
      .catch(this.utils.handleHttpError);
  }

}

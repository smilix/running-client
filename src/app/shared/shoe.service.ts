import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Shoe} from "./shoe";
import {environment} from "../../environments/environment";
import {UtilsService} from "./utils.service";
import {Run} from "./run";

export interface ShoeDetail {
  shoe: Shoe;
  lastRuns: Run[];
}


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

  getShoeDetails(shoeId:number): Promise<ShoeDetail> {
    return this.http.get(environment.backendPath + '/shoes/' + shoeId)
      .toPromise()
      .then(resp => {
        const json = resp.json();
        return {
          shoe: new Shoe(json.shoe),
          lastRuns: json.lastRuns.map(entry => new Run(entry))
        }
      })
      .catch(this.utils.handleHttpError);
  }

}

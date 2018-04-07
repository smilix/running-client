import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Shoe, ShoeDetail} from "./shoe";
import {environment} from "../../environments/environment";
import {UtilsService} from "./utils.service";
import {Run} from "./run";
import {HttpCache} from "./http-cache";

export interface ShoeComb {
  shoe: ShoeDetail;
  lastRuns: Run[];
}


@Injectable()
export class ShoeService {

  constructor(private http: Http, private utils: UtilsService, private httpCache: HttpCache) {
  }

  getShoes(): Promise<ShoeDetail[]> {
    return this.httpCache.get(environment.backendPath + '/shoes')
      .toPromise()
      .then(resp => {
        return resp.json().shoes.map(entry => new ShoeDetail(entry));
      })
      .catch(this.utils.handleHttpError);
  }

  getLatestShoe(): Promise<ShoeDetail> {
    return this.getShoes().then(shoes => {
      return shoes.reduce((latestShoe, shoe) => shoe.bought > latestShoe.bought ? shoe : latestShoe, shoes[0]);
    })
  }

  getShoeDetails(shoeId: number): Promise<ShoeComb> {
    return this.httpCache.get(environment.backendPath + '/shoes/' + shoeId)
      .toPromise()
      .then(resp => {
        const json = resp.json();
        return {
          shoe: new ShoeDetail(json.shoe),
          lastRuns: json.lastRuns.map(entry => new Run(entry))
        }
      })
      .catch(this.utils.handleHttpError);
  }

  addShoe(shoe: Shoe): Promise<Shoe> {
    this.httpCache.clear();
    return this.http.post(environment.backendPath + '/shoes', shoe)
      .toPromise()
      .then(resp => {
        shoe.id = resp.json().id;
        return shoe;
      })
      .catch(this.utils.handleHttpError);
  }

  updateShoe(shoe: Shoe): Promise<Shoe> {
    if (shoe.id == undefined || shoe.id == null) {
      throw new Error('The shoe must have an id.');
    }
    this.httpCache.clear();
    return this.http.put(environment.backendPath + '/shoes/' + shoe.id, shoe)
      .toPromise()
      .then(resp => {
        return new Shoe(resp.json());
      })
      .catch(this.utils.handleHttpError);
  }

}

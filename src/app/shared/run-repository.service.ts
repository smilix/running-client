import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import {Run} from "./run";
import {environment} from "../../environments/environment";
import {UtilsService} from "./utils.service";

export class RunPage {
  constructor(public runs:Run[],
              public count:number) {
  }
}


@Injectable()
export class RunRepositoryService {

  constructor(private http:Http, private utils:UtilsService) {
  }

  getRuns(start:number=0, max?:number):Promise<RunPage> {
    let urlParams = new URLSearchParams();
    urlParams.set('start', start.toString());
    if (max) {
      urlParams.set('max', max.toString());
    }

    let options = {
      search: urlParams
    };
    return this.http.get(environment.backendPath + '/runs', options)
      .toPromise()
      .then(resp => {
        var json = resp.json();
        return new RunPage(
          json.runs.map(entry => new Run(entry)),
          json.count
        )
      })
      .catch(this.utils.handleHttpError);
  }
  
  getRunById(id:number):Promise<Run> {
    return this.http.get(environment.backendPath + '/runs/' + id)
      .toPromise()
      .then(resp => {
        return new Run(resp.json());
      })
      .catch(this.utils.handleHttpError);
  }

  addRun(run:Run):Promise<Run> {
    return this.http.post(environment.backendPath + '/runs', run)
      .toPromise()
      .then(resp => {
        run.id = resp.json().id;
        return run;
      })
      .catch(this.utils.handleHttpError);
  }
  
  updateRun(run:Run):Promise<Run> {
    if (run.id == undefined || run.id == null || !run.id) {
      throw new Error('The run must have an id.');
    }
    
    return this.http.put(environment.backendPath + '/runs/' + run.id, run)
      .toPromise()
      .then(resp => {
        return new Run(resp.json());
      })
      .catch(this.utils.handleHttpError);
  }
  
  deleteRun(id:number):Promise<any> {
    return this.http.delete(environment.backendPath + '/runs/' + id)
      .toPromise()
      .catch(this.utils.handleHttpError);
  }

}

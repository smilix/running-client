import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import {Run} from "./run";

export class RunPage {
  constructor(public runs:Run[],
              public count:number) {
  }
}


@Injectable()
export class RunRepositoryService {

  static BACKEND = 'http://localhost:8080';

  private http;

  constructor(http:Http) {
    this.http = http;
  }

  private handleError(resp:any) {
    var errData = resp && resp.json ? resp.json() : resp;
    console.error('An error occurred', errData);
    return Promise.reject(errData);
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
    return this.http.get(RunRepositoryService.BACKEND + '/runs', options)
      .toPromise()
      .then(resp => {
        var json = resp.json();
        return new RunPage(
          json.runs.map(entry => new Run(entry)),
          json.count
        )
      })
      .catch(this.handleError);
  }
  
  getRunById(id:number):Promise<Run> {
    return this.http.get(RunRepositoryService.BACKEND + '/runs/' + id)
      .toPromise()
      .then(resp => {
        return new Run(resp.json());
      })
      .catch(this.handleError);
  }

  addRun(run:Run):Promise<Run> {
    return this.http.post(RunRepositoryService.BACKEND + '/runs', run)
      .toPromise()
      .then(resp => {
        run.id = resp.json().id;
        return run;
      })
      .catch(this.handleError);
  }
  
  updateRun(run:Run):Promise<Run> {
    if (run.id == undefined || run.id == null || !run.id) {
      throw new Error('The run must have an id.');
    }
    
    return this.http.put(RunRepositoryService.BACKEND + '/runs/' + run.id, run)
      .toPromise()
      .then(resp => {
        return new Run(resp.json());
      })
      .catch(this.handleError);
  }
  
  deleteRun(id:number):Promise<void> {
    return this.http.delete(RunRepositoryService.BACKEND + '/runs/' + id)
      .toPromise()
      .catch(this.handleError);
  }

}

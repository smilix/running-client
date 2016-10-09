export class Run {

  id:number;
  length:number;
  date:number;
  // in seconds
  timeUsed:number;
  comment:string;

  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
  
  get paceKm() {
    return this.timeUsed / (this.length / 1000); 
  }
}

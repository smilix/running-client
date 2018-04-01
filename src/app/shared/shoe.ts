export class Shoe {

  id: number;
  bought: number;
  comment: string;
  used: number;
  totalLength: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public getBoughtDate() {
    return new Date(this.bought * 1000);
  }
}


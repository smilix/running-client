export class Shoe {
  id: number;
  bought: number;
  comment: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

export class ShoeDetail extends Shoe {

  used: number;
  totalLength: number;

  constructor(values: Object = {}) {
    super(values);
    Object.assign(this, values);
  }

  public getBoughtDate() {
    return new Date(this.bought * 1000);
  }
}


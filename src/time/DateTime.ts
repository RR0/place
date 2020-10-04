import {RR0Time, TimeRenderer} from "./Time";

export class DateTime extends RR0Time {

  constructor(readonly date: Date) {
    super();
  }

  render<R>(renderer: TimeRenderer<R>): R {
    return renderer.renderDate(this);
  }
}

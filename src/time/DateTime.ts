import {RR0Time, TimeRenderer} from "./Time";

/**
 * Time as a date.
 */
export class DateTime extends RR0Time {

  constructor(readonly date: Date) {
    super();
  }

  render<R>(renderer: TimeRenderer<R>): R {
    return renderer.renderDate(this);
  }
}

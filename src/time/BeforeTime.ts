import {RR0Time, TimeRenderer} from "./Time";

/**
 * Time before a date.
 */
export class BeforeTime extends RR0Time {

  constructor(readonly date: Date) {
    super();
  }

  render<R>(renderer: TimeRenderer<R>): R {
    return renderer.renderBefore(this);
  }
}

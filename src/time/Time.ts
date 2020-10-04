import {DateTime} from "./DateTime";
import {BeforeTime} from "./BeforeTime";

export interface TimeRenderer<R> {

  render(time: RR0Time): R

  renderDate(time: DateTime): R;

  renderBefore(time: BeforeTime): R;
}


export class RR0Time {

  render<R>(renderer: TimeRenderer<R>): R {
    return renderer.render(this)
  }
}

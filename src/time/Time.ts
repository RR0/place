import {DateTime} from "./DateTime";

export interface TimeRenderer<R> {

  render(time: RR0Time): R

  renderDate(time: DateTime): R;
}


export class RR0Time {

  render<R>(renderer: TimeRenderer<R>): R {
    return renderer.render(this)
  }
}

import {Place} from "./Place";
import {Country} from "./Country";


export interface StateRenderer<R> {
  renderState(State: State): R
}


export class State extends Place {

  constructor(name: string, readonly country: Country) {
    super(name)
  }

  render<R>(renderer: StateRenderer<R>): R {
    return renderer.renderState(this)
  }
}

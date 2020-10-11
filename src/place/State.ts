import {Place} from "./Place";
import {Country} from "./country/Country";


export interface StateRenderer<R> {
  renderState(State: State): R
}


export class State extends Place {

  constructor(name: string, readonly _country: Country) {
    super(name)
  }

  get country() {
    return this._country
  }

  render<R>(renderer: StateRenderer<R>): R {
    return renderer.renderState(this)
  }
}

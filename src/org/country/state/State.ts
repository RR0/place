import {Org} from "../../Org.js"
import {Country} from "../Country.js"

/**
 * @deprecated Use @rr0/org instead
 */
export interface StateRenderer<R> {
  renderState(State: State): R
}

/**
 * @deprecated Use @rr0/org instead
 */
export class State extends Org {

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

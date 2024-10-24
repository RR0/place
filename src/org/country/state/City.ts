import { Org } from "../../Org.js"
import { State } from "./State.js"

/**
 * @deprecated
 */
export interface CityRenderer<R> {
  renderCity(city: City): R
}

/**
 * @deprecated
 */
export class City extends Org {

  constructor(name: string, readonly state: State) {
    super(name)
  }

  render<R>(renderer: CityRenderer<R>): R {
    return renderer.renderCity(this)
  }
}

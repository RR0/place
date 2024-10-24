import {CityRenderer} from "./country/state/City.js"
import {Country, CountryRenderer} from "./country"
import {StateRenderer} from "./country/state"


/**
 * @deprecated Use @rr0/org instead
 */
export interface OrgRenderer<R> extends CityRenderer<R>, StateRenderer<R>, CountryRenderer<R> {
  render(org: Org): R
}

/**
 * @deprecated Use @rr0/org instead
 */
export class Org {

  constructor(readonly name: string) {
  }

  get country(): Country | undefined {
    return undefined
  }

  render<R>(renderer: OrgRenderer<R>): R {
    return renderer.render(this)
  }

}

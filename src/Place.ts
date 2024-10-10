import {CityRenderer} from "./City.js"
import {Country, CountryRenderer} from "./country/index.js"
import {StateRenderer} from "./state/index.js"


export interface PlaceRenderer<R> extends CityRenderer<R>, StateRenderer<R>, CountryRenderer<R> {
  render(place: Place): R
}


export class Place {

  constructor(readonly name: string) {
  }

  get country(): Country | undefined {
    return undefined
  }

  render<R>(renderer: PlaceRenderer<R>): R {
    return renderer.render(this)
  }
}

import {CityRenderer} from "./City";
import {CountryRenderer} from "./Country";
import {StateRenderer} from "./State";


export interface PlaceRenderer<R> extends CityRenderer<R>, StateRenderer<R>, CountryRenderer<R> {
  render(place: Place): R
}


export class Place {

  constructor(readonly name: string) {
  }

  render<R>(renderer: PlaceRenderer<R>): R {
    return renderer.render(this)
  }
}


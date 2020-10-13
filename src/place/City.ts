import {Place} from "./Place";
import {State} from "./state/State";


export interface CityRenderer<R> {
  renderCity(city: City): R
}


export class City extends Place {

  constructor(name: string, readonly state: State) {
    super(name)
  }

  render<R>(renderer: CityRenderer<R>): R {
    return renderer.renderCity(this)
  }
}

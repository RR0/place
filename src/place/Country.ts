import {Place} from "./Place";


export interface CountryRenderer<R> {
  renderCountry(country: Country): R
}


export class Country extends Place {

  constructor(name: string) {
    super(name)
  }

  render<R>(renderer: CountryRenderer<R>): R {
    return renderer.renderCountry(this)
  }
}

import {Gender} from "@rr0/common"
import {Place} from "../Place.js"
import {CountryCode} from "./CountryCode.js"


export interface CountryRenderer<R> {
  /**
   * Render a country.
   */
  renderCountry(country: Country): R

  /**
   * Render the nationality of a country.
   */
  renderNationality(country: Country, gender: Gender): R;
}


export class Country extends Place {

  constructor(name: CountryCode) {
    super(name)
  }

  get country() {
    return this
  }

  render<R>(renderer: CountryRenderer<R>): R {
    return renderer.renderCountry(this)
  }

  renderNationality<R>(renderer: CountryRenderer<R>, gender: Gender): R {
    return renderer.renderNationality(this, gender)
  }
}
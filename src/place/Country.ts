import {Place} from "./Place";


export interface CountryRenderer<R> {
  renderCountry(country: Country): R
}

export enum CountryCode {
  /**
   * France
   */
  fr = 'fr',

  /**
   * United States of america
   */
  us = 'us',

  /**
   * Czechoslovakia.
   *
   * @deprecated Was divided into Czechia (#cz) and Slovakia (#sk)
   */
  cs = 'cs',

  /**
   * Czechia
   */
  cz = 'cz',

  /**
   * Slovakia
   */
  sk = 'sk',
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
}

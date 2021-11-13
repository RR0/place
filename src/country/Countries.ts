import {CountryCode} from "country/CountryCode"
import {Country} from "country/Country"

export class Countries {
  /**
   * United States of America (USA).
   */
  static readonly us = new Country(CountryCode.us)

  /**
   * Czechoslovakia.
   *
   * @deprecated Was divided into Czechia (#cz) and Slovakia (#sk)
   */
  static readonly cs = new Country(CountryCode.cs)
}

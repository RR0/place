import {CountryCode} from "./CountryCode";
import {Country} from "./Country";

export class Countries {
  static readonly us = new Country(CountryCode.us)
  static readonly cs = new Country(CountryCode.cs)
}

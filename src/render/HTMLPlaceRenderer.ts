import {Gender} from "@rr0/common"
import {Translation} from "@rr0/lang"

import {City, CityRenderer} from "../org/country/state/City.js"
import {Org, OrgRenderer} from "../org/Org.js"
import {Country} from "../org/country/Country.js"
import {State} from "../org/country/state/State.js"
import {HTML, HTMLRenderer} from "./HTMLRenderer.js"
import { WithOrgMessages } from "../org/OrgMessages"


export class HTMLPlaceRenderer extends HTMLRenderer implements OrgRenderer<HTML>, CityRenderer<HTML> {

  constructor(translation: Translation<WithOrgMessages>) {
    super(translation)
  }

  render(place: Org): HTML {
    return place.name
  }

  renderCity(city: City): HTML {
    return `${city.name} (${this.renderState(city.state)})`
  }

  renderCountry(country: Country): HTML {
    return this.translation.translate(this.translation.messages.place.country[country.name].name)
  }

  renderNationality(country: Country, gender: Gender): HTML {
    return this.translation.translate(this.translation.messages.place.country[country.name].nationality[gender])
  }

  renderState(state: State): HTML {
    return `${state.name}, ${this.renderCountry(state.country)}`
  }
}

import {Gender} from "@rr0/common"
import {Translation} from "@rr0/lang"

import {City, CityRenderer} from "../City.js"
import {Place, PlaceRenderer} from "../Place.js"
import {Country} from "../country/Country.js"
import {State} from "../state/State.js"
import {WithPlaceMessages} from "../PlaceMessages.js"
import {HTML, HTMLRenderer} from "./HTMLRenderer.js"


export class HTMLPlaceRenderer extends HTMLRenderer implements PlaceRenderer<HTML>, CityRenderer<HTML> {

  constructor(translation: Translation<WithPlaceMessages>) {
    super(translation)
  }

  render(place: Place): HTML {
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

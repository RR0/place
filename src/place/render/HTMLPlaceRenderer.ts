import {City, CityRenderer} from "../City";
import {Place, PlaceRenderer} from "../Place";
import {Country} from "../country/Country";
import {State} from "../state/State";
import {HTML, HTMLRenderer} from "../../HTMLRenderer";
import {Gender} from "../../people/People";
import {WithPlaceMessages} from "../PlaceMessages";
import {Translation} from "@rr0/lang";


export class HTMLPlaceRenderer extends HTMLRenderer implements PlaceRenderer<HTML>, CityRenderer<HTML> {

  constructor(translation: Translation<WithPlaceMessages>) {
    super(translation);
  }

  render(place: Place): HTML {
    return place.name;
  }

  renderCity(city: City): HTML {
    return `${city.name} (${this.renderState(city.state)})`;
  }

  renderCountry(country: Country): HTML {
    return this.translation.translate(this.translation.messages.place.country[country.name].name);
  }

  renderNationality(country: Country, gender: Gender): HTML {
    return this.translation.translate(this.translation.messages.place.country[country.name].nationality[gender]);
  }

  renderState(state: State): HTML {
    return `${state.name}, ${this.renderCountry(state.country)}`;
  }
}

import {City, CityRenderer} from "../City";
import {Place, PlaceRenderer} from "../Place";
import {Country} from "../country/Country";
import {State} from "../state/State";
import {Translator} from "../../lang/Translator";
import {HTML, HTMLRenderer} from "../../HTMLRenderer";
import {Gender} from "../../people/People";
import {WithPlaceMessages} from "../PlaceMessages";


export class HTMLPlaceRenderer extends HTMLRenderer implements PlaceRenderer<HTML>, CityRenderer<HTML> {

  constructor(translator: Translator<WithPlaceMessages>) {
    super(translator);
  }

  render(place: Place): HTML {
    return place.name;
  }

  renderCity(city: City): HTML {
    return `${city.name} (${this.renderState(city.state)})`;
  }

  renderCountry(country: Country): HTML {
    return this.translator.translate(this.translator.messages.place.country[country.name].name);
  }

  renderNationality(country: Country, gender: Gender): HTML {
    return this.translator.translate(this.translator.messages.place.country[country.name].nationality[gender]);
  }

  renderState(state: State): HTML {
    return `${state.name}, ${this.renderCountry(state.country)}`;
  }
}

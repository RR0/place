import {City, CityRenderer} from "../City";
import {Place, PlaceRenderer} from "../Place";
import {Country} from "../Country";
import {State} from "../State";
import {Translator} from "../../lang/Translator";
import {HTML, HTMLRenderer} from "../../HTMLRenderer";
import {WithPlaceMessages} from "../../lang/Messages";
import {Gender} from "../../Entity";


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

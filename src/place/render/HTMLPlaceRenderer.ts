import {City, CityRenderer} from "../City";
import {Place, PlaceRenderer} from "../Place";
import {Country} from "../Country";
import {State} from "../State";
import {Renderer} from "../../Renderer";
import {Translator} from "../../lang/Translator";


export type HTML = string


export class HTMLPlaceRenderer extends Renderer implements PlaceRenderer<HTML>, CityRenderer<HTML> {

  constructor(translator: Translator) {
    super(translator);
  }

  render(place: Place): HTML {
    return place.name;
  }

  renderCity(city: City): HTML {
    return `${city.name} (${this.renderState(city.state)})`;
  }

  renderCountry(country: Country): HTML {
    return this.translator.translate(`place.country.${country.name}.name`);
  }

  renderNationality(country: Country): HTML {
    return this.translator.translate(`place.country.${country.name}.nationality`);
  }

  renderState(state: State): HTML {
    return `${state.name}, ${this.renderCountry(state.country)}`;
  }
}

import {HTMLPlaceRenderer} from "./HTMLPlaceRenderer";
import {City} from "../City";
import {State} from "../State";
import {Country} from "../Country";
import {Translator} from "../../lang/Translator";
import {CountryCode} from "../CountryCode";
import {frenchPlural, messages_fr} from "../../lang/Messages_fr";
// jest.mock('../../lang/Translator');

test('render city', () => {
  const translator = new Translator('fr', messages_fr, frenchPlural);
  const renderer = new HTMLPlaceRenderer(translator);
  const usa = new Country(CountryCode.us);
  const illinois = new State('Illinois', usa);
  const city = new City('Chicago', illinois)
  const html = renderer.renderCity(city);
  expect(html).toBe('Chicago (Illinois, États-Unis)')
})



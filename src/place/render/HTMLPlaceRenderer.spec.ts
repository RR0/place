import {HTMLPlaceRenderer} from "./HTMLPlaceRenderer";
import {City} from "../City";
import {State} from "../State";
import {Country, CountryCode} from "../Country";
import {Translator} from "../../lang/Translator";
// jest.mock('../../lang/Translator');

test('render city', () => {
  const translator = new Translator('fr');
  const renderer = new HTMLPlaceRenderer(translator);
  const usa = new Country(CountryCode.us);
  const illinois = new State('Illinois', usa);
  const city = new City('Chicago', illinois)
  const html = renderer.renderCity(city);
  expect(html).toBe('Chicago (Illinois, États-Unis)')
})



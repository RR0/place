import {HTMLPlaceRenderer} from "./HTMLPlaceRenderer";
import {City} from "../City";
import {Translator} from "../../lang/Translator";
import {frenchPlural, messages_fr} from "../../lang/Messages_fr";
import {States} from "../state/States";
// jest.mock('../../lang/Translator');

test('render city', () => {
  const translator = new Translator('fr', messages_fr, frenchPlural);
  const renderer = new HTMLPlaceRenderer(translator);
  const city = new City('Chicago', States.illinois)
  const html = renderer.renderCity(city);
  expect(html).toBe('Chicago (Illinois, États-Unis)')
})



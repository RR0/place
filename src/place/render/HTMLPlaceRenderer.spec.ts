import {HTMLPlaceRenderer} from "./HTMLPlaceRenderer";
import {City} from "../City";
import {State} from "../State";
import {Country} from "../Country";

test('render city', () => {
  const renderer = new HTMLPlaceRenderer();
  const usa = new Country('USA');
  const illinois = new State('Illinois', usa);
  const city = new City('Chicago', illinois)
  const html = renderer.renderCity(city);
  expect(html).toBe('Chicago (Illinois, USA)')
})



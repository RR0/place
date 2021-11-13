import {HTMLPlaceRenderer} from "./HTMLPlaceRenderer"
import {City} from "../City"
import {States} from "../state/States"
import {grammar_fr, Translation} from "@rr0/lang"
import {messages_fr} from "lang/Messages_fr"
// jest.mock('../../lang/Translator');

test('render city', () => {
  const translation = new Translation('fr', grammar_fr, messages_fr)
  const renderer = new HTMLPlaceRenderer(translation)
  const city = new City('Chicago', States.illinois)
  const html = renderer.renderCity(city)
  expect(html).toBe('Chicago (Illinois, États-Unis)')
})



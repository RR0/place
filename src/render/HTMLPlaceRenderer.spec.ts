import {City} from "City"
import {States} from "state/States"
import {grammar_en, grammar_fr, Translation} from "@rr0/lang"
import {messages_fr} from "lang/Messages_fr"
import {HTMLPlaceRenderer} from "render/HTMLPlaceRenderer"
import {messages_en} from "lang/Messages_en"
// jest.mock('../../lang/Translator');

describe('render city', () => {

  test('in french', () => {
    const translation = new Translation('fr', grammar_fr, messages_fr)
    const renderer = new HTMLPlaceRenderer(translation)
    const city = new City('Chicago', States.illinois)
    const html = renderer.renderCity(city)
    expect(html).toBe('Chicago (Illinois, États-Unis)')
  })

  test('in english', () => {
    const translation = new Translation('fr', grammar_en, messages_en)
    const renderer = new HTMLPlaceRenderer(translation)
    const city = new City('Chicago', States.illinois)
    const html = renderer.renderCity(city)
    expect(html).toBe('Chicago (Illinois, USA)')
  })
})



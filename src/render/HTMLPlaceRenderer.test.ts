import {grammar_en, grammar_fr, Translation} from "@rr0/lang"
import { describe, expect, test } from "@javarome/testscript"

import {City} from "../org/country/state/City.js"
import {States} from "../org/country/state/States.js"
import {messages_fr} from "../org/Messages_fr.js"
import {HTMLPlaceRenderer} from "./HTMLPlaceRenderer.js"
import {messages_en} from "../org/Messages_en.js"

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

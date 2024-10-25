import {grammar_en, grammar_fr, Translation} from "@rr0/lang"
import { describe, expect, test } from "@javarome/testscript"

import {City} from "../org/country/state/City.js"
import {States} from "../org/country/state/States.js"
import {orgMessages_fr} from "../org/OrgMessages_fr.js"
import {HTMLPlaceRenderer} from "./HTMLPlaceRenderer.js"
import {orgMessages_en} from "../org/OrgMessages_en.js"

describe('render city', () => {

  test('in french', () => {
      const translation = new Translation('fr', grammar_fr, orgMessages_fr)
        const renderer = new HTMLPlaceRenderer(translation)
       const city = new City('Chicago', States.illinois)
       const html = renderer.renderCity(city)
       expect(html).toBe('Chicago (Illinois, États-Unis)')
  })

  test('in english', () => {
    const translation = new Translation('fr', grammar_en, orgMessages_en)
    const renderer = new HTMLPlaceRenderer(translation)
    const city = new City('Chicago', States.illinois)
    const html = renderer.renderCity(city)
    expect(html).toBe('Chicago (Illinois, USA)')
  })
})

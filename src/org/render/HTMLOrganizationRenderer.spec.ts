import {HTMLOrganizationRenderer, OrganizationDescriptionOptions} from "./HTMLOrganizationRenderer";
import {Company} from "../Company";
import {Army} from "../Army";
import {messages_fr} from "../../lang/Messages_fr";
import {HTMLPlaceRenderer} from "../../place/render/HTMLPlaceRenderer";
import {FoundationEvent} from "../../time/org/foundation/FoundationEvent";
import {BeforeTime} from "../../time/BeforeTime";
import {DateTime} from "../../time/DateTime";
import {School, SchoolType} from "../School";
import {Countries} from "../../place/country/Countries";
import {grammar_fr, Translation} from "@rr0/lang";


const translation = new Translation('fr', grammar_fr, messages_fr);
const placeRenderer = new HTMLPlaceRenderer(translation);


test('render an anonymous company', () => {
  const renderer = new HTMLOrganizationRenderer(translation, placeRenderer);
  {
    const cigarFactory = new Company(undefined, undefined, ['cigar']);
    const beforeNow = new BeforeTime(new DateTime(new Date()));
    cigarFactory.events.add(new FoundationEvent(cigarFactory, beforeNow, Countries.cs))
    {
      const html = cigarFactory.render(renderer, {
        name: {long: true, short: true},
        description: OrganizationDescriptionOptions.inline,
        origin: true,
        types: {company: {products: true}, army: {}}
      });
      expect(html).toBe('une société tchécoslovaque produisant des cigares')
    }
  }
})


test('render an army with short + long name', () => {
  const renderer = new HTMLOrganizationRenderer(translation, placeRenderer);
  {
    translation.add('usaf_short', 'USAF')
    translation.add('usaf_long', 'United States Air Force')
    const usaf = new Army('usaf_long', 'usaf_short');
    {
      const html = usaf.render(renderer, {
        name: {long: true, short: true},
        origin: false,
        description: OrganizationDescriptionOptions.none,
        types: {company: {products: true}, army: {}}
      });
      expect(html).toBe('<abbr title="United States Air Force">USAF</abbr>')
    }
  }
})


test('render a school with long name', () => {
  const key = 'craneTech'
  translation.add(key, 'Lycée technique Crane')
  const renderer = new HTMLOrganizationRenderer(translation, placeRenderer);
  {
    const craneTech = new School(SchoolType.highSchool, key);
    {
      const html = craneTech.render(renderer, {
        name: {long: true, short: true},
        origin: false,
        description: OrganizationDescriptionOptions.none,
        types: {company: {products: true}, army: {}}
      });
      expect(html).toBe('Lycée technique Crane')
    }
  }
})

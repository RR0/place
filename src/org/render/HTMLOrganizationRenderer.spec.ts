import {Translator} from "../../lang/Translator";
import {HTMLOrganizationRenderer, OrganizationDescriptionOptions} from "./HTMLOrganizationRenderer";
import {Company} from "../Company";
import {Army} from "../Army";
import {frenchPlural, messages_fr} from "../../lang/Messages_fr";
import {HTMLPlaceRenderer} from "../../place/render/HTMLPlaceRenderer";
import {FoundationEvent} from "../../time/org/foundation/FoundationEvent";
import {BeforeTime} from "../../time/BeforeTime";
import {DateTime} from "../../time/DateTime";
import {School} from "../School";
import {Countries} from "../../place/country/Countries";


const translator = new Translator('fr', messages_fr, frenchPlural);
const placeRenderer = new HTMLPlaceRenderer(translator);


test('render an anonymous company', () => {
  const renderer = new HTMLOrganizationRenderer(translator, placeRenderer);
  {
    const cigarFactory = new Company(undefined, undefined, [translator.messages.dict.cigar]);
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
  const renderer = new HTMLOrganizationRenderer(translator, placeRenderer);
  {
    translator.add(translator.messages.dict, 'usaf_short', 'USAF')
    translator.add(translator.messages.dict, 'usaf_long', 'United States Air Force')
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
  translator.add(translator.messages.dict, key, 'Lycée technique Crane')
  const renderer = new HTMLOrganizationRenderer(translator, placeRenderer);
  {
    const craneTech = new School(key);
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

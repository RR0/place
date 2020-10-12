import {Translator} from "../../lang/Translator";
import {HTMLOrganizationRenderer, OrganizationDescriptionOptions} from "./HTMLOrganizationRenderer";
import {Company} from "../Company";
import {Army} from "../Army";
import {frenchPlural, messages_fr} from "../../lang/Messages_fr";
import {HTMLPlaceRenderer} from "../../place/render/HTMLPlaceRenderer";
import {FoundationEvent} from "../../time/org/foundation/FoundationEvent";
import {BeforeTime} from "../../time/BeforeTime";
import {DateTime} from "../../time/DateTime";
import {Country} from "../../place/country/Country";
import {CountryCode} from "../../place/country/CountryCode";


const translator = new Translator('fr', messages_fr, frenchPlural);
const placeRenderer = new HTMLPlaceRenderer(translator);


test('render organization as an anonymous company', () => {

  const renderer = new HTMLOrganizationRenderer(translator, placeRenderer);
  {
    const cigarFactory = new Company(undefined, undefined, [translator.messages.dict.cigar]);
    const beforeNow = new BeforeTime(new DateTime(new Date()));
    const czechoslovakia = new Country(CountryCode.cs);
    cigarFactory.events.add(new FoundationEvent(cigarFactory, beforeNow, czechoslovakia))
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


test('render organization as a short + long name', () => {

  const renderer = new HTMLOrganizationRenderer(translator, placeRenderer);
  {
    const usaf = new Army('United States Air Force', `USAF`);
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

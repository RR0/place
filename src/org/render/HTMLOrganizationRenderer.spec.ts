import {Translator} from "../../lang/Translator";
import {HTMLOrganizationRenderer, OrganizationDescriptionOptions} from "./HTMLOrganizationRenderer";
import {Company} from "../Company";
import {Army} from "../Army";
import {frenchPlural, messages_fr} from "../../lang/Messages_fr";
import {HTMLPlaceRenderer} from "../../place/render/HTMLPlaceRenderer";


const translator = new Translator('fr', messages_fr, frenchPlural);
const placeRenderer = new HTMLPlaceRenderer(translator);


test('render organization as an anonymous company', () => {

  const renderer = new HTMLOrganizationRenderer(translator, placeRenderer);
  {
    const cigarFactory = new Company(undefined, undefined, [translator.messages.dict.cigar]);
    {
      const html = cigarFactory.render(renderer, {
        name: {long: true, short: true},
        description: OrganizationDescriptionOptions.inline,
        origin: true,
        types: {company: {products: true}, army: {}}
      });
      expect(html).toBe('une société produisant des cigares')
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

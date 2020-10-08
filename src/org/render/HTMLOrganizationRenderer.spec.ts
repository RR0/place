import {Translator} from "../../lang/Translator";
import {HTMLOrganizationRenderer, OrganizationDescriptionOptions} from "./HTMLOrganizationRenderer";
import {Company} from "../Company";
import {Army} from "../Army";
import {frenchPlural, messages_fr} from "../../lang/Messages_fr";

const translator = new Translator('fr', messages_fr, frenchPlural);

test('render organization as an anonymous company', () => {

  const renderer = new HTMLOrganizationRenderer(translator);
  {
    const cigarFactory = new Company(undefined, undefined, [translator.messages.dict.cigar]);
    {
      const html = cigarFactory.render(renderer, {
        name: {
          long: true, short: true
        },
        description: OrganizationDescriptionOptions.inline,
        types: {
          company: {products: true},
          army: {}
        }
      });
      expect(html).toBe('une société produisant des cigares')
    }
  }
})

test('render organization as a short + long name', () => {

  const renderer = new HTMLOrganizationRenderer(translator);
  {
    const usaf = new Army('United States Air Force', `USAF`);
    {
      const html = usaf.render(renderer, {
        name: {
          long: true, short: true
        },
        description: OrganizationDescriptionOptions.none,
        types: {
          company: {products: true},
          army: {}
        }
      });
      expect(html).toBe('<abbr title="United States Air Force">USAF</abbr>')
    }
  }
})



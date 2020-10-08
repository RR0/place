import {Gender, People} from "../../people/People";
import {Country} from "../../place/Country";
import {CountryCode} from "../../place/CountryCode";
import {Translator} from "../../lang/Translator";
import {HTMLOccupationRenderer} from "./HTMLOccupationRenderer";
import {HTMLOrganizationRenderer, OrganizationDescriptionOptions} from "../../org/render/HTMLOrganizationRenderer";
import {frenchPlural, messages_fr} from "../../lang/Messages_fr";
import {OccupationEvent, OccupationRenderOptions, OccupationRole} from "../OccupationEvent";
import {BeforeTime} from "../BeforeTime";
import {Company} from "../../org/Company";

const translator = new Translator('fr', messages_fr, frenchPlural);
const organizationRenderer = new HTMLOrganizationRenderer(translator);

const father = new People(Gender.male);
const birthdate = new Date(1910, 4, 1);
const czechoslovakia = new Country(CountryCode.cs);

test('renders an occupation for an anonymous company', () => {
  const cigarFactory = new Company(undefined, undefined, [translator.messages.dict.cigar]);
  const renderOptions: OccupationRenderOptions = {
      verb: true,
      type: true,
      org: {
        name: {short: true, long: true},
        description: OrganizationDescriptionOptions.inline,
        types: {army: {}, company: {products: true}}
      },
      role: false
    }
  ;
  const occupationEvent = new OccupationEvent(father, OccupationRole.worker, cigarFactory, new BeforeTime(birthdate), czechoslovakia);

  const renderer = new HTMLOccupationRenderer(translator, organizationRenderer);
  const found = occupationEvent.render(renderer, renderOptions)

  expect(found).toBe('travaille pour une société produisant des cigares')
})

test('renders an occupation role for an anonymous company', () => {
  const cigarFactory = new Company(undefined, undefined, [translator.messages.dict.cigar]);
  const renderOptions: OccupationRenderOptions = {
      verb: false,
      type: true,
      org: {
        name: {short: true, long: true},
        description: OrganizationDescriptionOptions.inline,
        types: {army: {}, company: {products: true}}
      },
      role: true
    }
  ;
  const occupationEvent = new OccupationEvent(father, OccupationRole.worker, cigarFactory, new BeforeTime(birthdate), czechoslovakia);

  const renderer = new HTMLOccupationRenderer(translator, organizationRenderer);
  const found = occupationEvent.render(renderer, renderOptions)

  expect(found).toBe('ouvrier pour une société produisant des cigares')
})

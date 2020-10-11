import {Translator} from "../../../lang/Translator";
import {HTMLOrganizationRenderer, OrganizationDescriptionOptions} from "../../../org/render/HTMLOrganizationRenderer";
import {Company} from "../../../org/Company";
import {OccupationEvent, OccupationRenderOptions, OccupationRole} from "./OccupationEvent";
import {Gender, People} from "../../../people/People";
import {DateTime} from "../../DateTime";
import {TimeRenderFormat} from "../../Time";
import {HTMLOccupationRenderer} from "./HTMLOccupationRenderer";
import {BeforeTime} from "../../BeforeTime";
import {frenchPlural, messages_fr} from "../../../lang/Messages_fr";
import {HTMLPlaceRenderer} from "../../../place/render/HTMLPlaceRenderer";
import {Country} from "../../../place/country/Country";
import {CountryCode} from "../../../place/country/CountryCode";

const translator = new Translator('fr', messages_fr, frenchPlural);
const organizationRenderer = new HTMLOrganizationRenderer(translator, new HTMLPlaceRenderer(translator));

const father = new People(Gender.male);
const birthdate = new Date(1910, 4, 1);
const czechoslovakia = new Country(CountryCode.cs);

test('renders an occupation for an anonymous company', () => {
  const cigarFactory = new Company(undefined, undefined, [translator.messages.dict.cigar]);
  const renderOptions: OccupationRenderOptions = {
    time: TimeRenderFormat.fullDate,
    verb: true,
    type: true,
    org: {
      name: {short: true, long: true},
      origin: true,
      description: OrganizationDescriptionOptions.inline,
      types: {army: {}, company: {products: true}}
    },
    role: false
  }

  const occupationEvent = new OccupationEvent(father, OccupationRole.worker, cigarFactory, new BeforeTime(new DateTime(birthdate)), czechoslovakia);

  const renderer = new HTMLOccupationRenderer(translator, organizationRenderer);
  const found = occupationEvent.render(renderer, renderOptions)

  expect(found).toBe('travaille pour une société produisant des cigares')
})

test('renders an occupation role for an anonymous company', () => {
  const cigarFactory = new Company(undefined, undefined, [translator.messages.dict.cigar]);
  const renderOptions: OccupationRenderOptions = {
    time: TimeRenderFormat.fullDate,
    verb: false,
    type: true,
    org: {
      name: {short: true, long: true},
      origin: true,
      description: OrganizationDescriptionOptions.inline,
      types: {army: {}, company: {products: true}}
    },
    role: true
  }

  const occupationEvent = new OccupationEvent(father, OccupationRole.worker, cigarFactory, new BeforeTime(new DateTime(birthdate)), czechoslovakia);

  const renderer = new HTMLOccupationRenderer(translator, organizationRenderer);
  const found = occupationEvent.render(renderer, renderOptions)

  expect(found).toBe('ouvrier pour une société produisant des cigares')
})


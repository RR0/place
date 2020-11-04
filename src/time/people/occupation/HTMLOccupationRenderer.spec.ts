import {HTMLOrganizationRenderer, OrganizationDescriptionOptions} from "../../../org/render/HTMLOrganizationRenderer";
import {Company} from "../../../org/Company";
import {OccupationEvent, OccupationRenderOptions, OccupationRole} from "./OccupationEvent";
import {Gender, People} from "../../../people/People";
import {DateTime} from "../../DateTime";
import {TimeRenderFormat} from "../../Time";
import {HTMLOccupationRenderer} from "./HTMLOccupationRenderer";
import {BeforeTime} from "../../BeforeTime";
import {messages_fr} from "../../../lang/Messages_fr";
import {HTMLPlaceRenderer} from "../../../place/render/HTMLPlaceRenderer";
import {Countries} from "../../../place/country/Countries";
import {HTMLPeopleRenderer, PeopleNameFormat} from "../../../people/render/HTMLPeopleRenderer";
import {grammar_fr, Translation} from "@rr0/lang";


const translation = new Translation('fr', grammar_fr, messages_fr);
const peopleRenderer = new HTMLPeopleRenderer(translation);
const organizationRenderer = new HTMLOrganizationRenderer(translation, new HTMLPlaceRenderer(translation));

const father = new People(Gender.male);
const birthdate = new Date(1910, 4, 1);


test('renders an occupation for an anonymous company', () => {
  const cigarFactory = new Company(undefined, undefined, ['cigar']);
  const renderOptions: OccupationRenderOptions = {
    who: PeopleNameFormat.pronoun,
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

  const occupationEvent = new OccupationEvent(father, OccupationRole.worker, cigarFactory, new BeforeTime(new DateTime(birthdate)), Countries.cs);

  const renderer = new HTMLOccupationRenderer(translation, organizationRenderer, peopleRenderer);
  const found = occupationEvent.render(renderer, renderOptions)

  expect(found).toBe('il travaille pour une société produisant des cigares')
})


test('renders an occupation role for an anonymous company', () => {
  const cigarFactory = new Company(undefined, undefined, ['cigar']);
  const renderOptions: OccupationRenderOptions = {
    who: PeopleNameFormat.pronoun,
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

  const occupationEvent = new OccupationEvent(father, OccupationRole.worker, cigarFactory, new BeforeTime(new DateTime(birthdate)), Countries.cs);

  const renderer = new HTMLOccupationRenderer(translation, organizationRenderer, peopleRenderer);
  const found = occupationEvent.render(renderer, renderOptions)

  expect(found).toBe('il est ouvrier chez une société produisant des cigares')
})


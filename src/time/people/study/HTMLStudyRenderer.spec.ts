import {Translator} from "../../../lang/Translator"
import {HTMLOrganizationRenderer, OrganizationDescriptionOptions} from "../../../org/render/HTMLOrganizationRenderer"
import {StudyEvent, StudyRenderOptions} from "./StudyEvent"
import {Gender, People} from "../../../people/People"
import {DateTime} from "../../DateTime"
import {TimeRenderFormat} from "../../Time"
import {HTMLStudyRenderer} from "./HTMLStudyRenderer"
import {BeforeTime} from "../../BeforeTime"
import {frenchPlural, messages_fr} from "../../../lang/Messages_fr"
import {HTMLPlaceRenderer} from "../../../place/render/HTMLPlaceRenderer"
import {School} from "../../../org/School"
import {Countries} from "../../../place/country/Countries";


const translator = new Translator('fr', messages_fr, frenchPlural)
const organizationRenderer = new HTMLOrganizationRenderer(translator, new HTMLPlaceRenderer(translator))

const hynek = new People(Gender.male)
const birthdate = new Date(1910, 4, 1)


test('renders a study for an anonymous school', () => {
  const school = new School(undefined, undefined)
  const renderOptions: StudyRenderOptions = {
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

  const studyEvent = new StudyEvent(hynek, school, new BeforeTime(new DateTime(birthdate)), Countries.cs)

  const renderer = new HTMLStudyRenderer(translator, organizationRenderer)
  const found = studyEvent.render(renderer, renderOptions)

  expect(found).toBe('étudie à une école')
})


test('renders a study for a named high school', () => {
  const school = new School('Lycée technique Crane', undefined)
  const renderOptions: StudyRenderOptions = {
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

  const studyEvent = new StudyEvent(hynek, school, new BeforeTime(new DateTime(birthdate)), Countries.cs)

  const renderer = new HTMLStudyRenderer(translator, organizationRenderer)
  const found = studyEvent.render(renderer, renderOptions)

  expect(found).toBe('étudie à Lycée technique Crane')
})


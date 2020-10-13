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
import {Country} from "../../../place/country/Country"
import {CountryCode} from "../../../place/country/CountryCode"
import {School} from "../../../org/School"
import {City} from "../../../place/City"
import {State} from "../../../place/state/State"

const translator = new Translator('fr', messages_fr, frenchPlural)
const organizationRenderer = new HTMLOrganizationRenderer(translator, new HTMLPlaceRenderer(translator))

const hynek = new People(Gender.male)
const birthdate = new Date(1910, 4, 1)
const czechoslovakia = new City('Chicago', new State('Illinois', new Country(CountryCode.us)))

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

  const studyEvent = new StudyEvent(hynek, school, new BeforeTime(new DateTime(birthdate)), czechoslovakia)

  const renderer = new HTMLStudyRenderer(translator, organizationRenderer)
  const found = studyEvent.render(renderer, renderOptions)

  expect(found).toBe('étudie à une école')
})


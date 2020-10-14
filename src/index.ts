import {Gender, People} from "./people/People"
import {BirthEvent} from "./time/people/birth/BirthEvent"
import {City} from "./place/City"
import {User} from "./user/User"
import {Translator} from "./lang/Translator"
import {DateTime} from "./time/DateTime"
import {HTMLDocRenderer, HTMLDocRenderOptions} from "./HTMLDocRenderer"
import {OccupationEvent, OccupationRole} from "./time/people/occupation/OccupationEvent"
import {BeforeTime} from "./time/BeforeTime"
import {Company} from "./org/Company"
import {PeopleNameFormat} from "./people/render/HTMLPeopleRenderer"
import {Messages} from "./lang/Messages"
import {grammar_fr, messages_fr} from "./lang/Messages_fr"
import {messages_en} from "./lang/Messages_en"
import {OrganizationDescriptionOptions} from "./org/render/HTMLOrganizationRenderer"
import {TimeRenderFormat} from "./time/Time"
import {States} from "./place/state/States"
import {Countries} from "./place/country/Countries"
import {KeyValue} from "./util/ObjectUtils"

const messagesByLang: KeyValue<Messages> = {fr: messages_fr, en: messages_en}

const user = new User('fr')
const messages = messagesByLang[user.locale]
const translator = new Translator(user.locale, messages, grammar_fr)

const hynek = new People(Gender.male, `Josef`, 'Hynek', `Allen`)
const chicago = new City('Chicago', States.illinois)
const birthdate = new Date(1910, 4, 1)
const father = new People(Gender.male, 'Joseph')
const fatherEvents = father.events
fatherEvents.add(new BirthEvent(father, undefined, Countries.cs))
const cigarFactory = new Company(undefined, undefined, [translator.messages.dict.cigar])
fatherEvents.add(new OccupationEvent(father, OccupationRole.worker, cigarFactory, new BeforeTime(new DateTime(birthdate)), Countries.cs))
const mother = new People(Gender.female, 'Bertha')
const motherEvents = mother.events
motherEvents.add(new BirthEvent(mother, undefined, Countries.cs))
const bornEvent: BirthEvent = new BirthEvent(hynek, new DateTime(birthdate), chicago, father, mother)
hynek.events.add(bornEvent)

const docRenderer = new HTMLDocRenderer(translator)
const orgOptions = {
  origin: true,
  name: {short: true, long: true},
  description: OrganizationDescriptionOptions.inline,
  types: {army: {}, company: {products: true}}
};
const timeOptions = TimeRenderFormat.fullDate;
const peopleOptions = PeopleNameFormat.full;
const options: HTMLDocRenderOptions = {
  title: {
    name: peopleOptions.name
  },
  events: {
    birth: {
      time: timeOptions,
      people: PeopleNameFormat.lastName,
      parent: {
        people: peopleOptions,
        occupation: {
          time: timeOptions,
          verb: false,
          type: true,
          org: orgOptions,
          role: true
        }
      }
    },
    occupation: {
      time: timeOptions,
      verb: true,
      type: true,
      org: orgOptions,
      role: true
    },
    foundation: {
      founders: {
        occupation: {
          org: orgOptions,
          role: false,
          time: timeOptions,
          type: false,
          verb: false
        },
        organization: orgOptions,
        people: PeopleNameFormat.lastName
      },
      organization: orgOptions,
      time: timeOptions
    },
    study: {
      org: orgOptions,
      role: false,
      time: timeOptions,
      type: false,
      verb: false
    }
  }
}
const eventHTML = docRenderer.render(hynek, options)
const docHtml = `
${eventHTML} 
Il fait ses études dans les écoles publiques de la ville, et sort du lycée technique Crane en 1927. 
Il entre alors à l'Université de Chicago, dont il obtient un B.S. en 1931, puis un doctorat en astrophysique en 1935</p>.
`
const app = document.getElementById("app")
app!.innerHTML = docHtml

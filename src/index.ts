import {User} from "./user/User"
import {Translator} from "./lang/Translator"
import {HTMLDocRenderer, HTMLDocRenderOptions} from "./HTMLDocRenderer"
import {PeopleNameFormat} from "./people/render/HTMLPeopleRenderer"
import {Messages} from "./lang/Messages"
import {grammar_fr, messages_fr} from "./lang/Messages_fr"
import {messages_en} from "./lang/Messages_en"
import {OrganizationDescriptionOptions} from "./org/render/HTMLOrganizationRenderer"
import {TimeRenderFormat} from "./time/Time"
import {KeyValue} from "./util/ObjectUtils"
import content from "./people/h/HynekJAllen"

const messagesByLang: KeyValue<Messages> = {fr: messages_fr, en: messages_en}

const user = new User('fr')
const messages = messagesByLang[user.locale]
const fr = new Translator(user.locale, messages, grammar_fr)
fr.add('craneTech', 'Lycée technique Crane')

const docRenderer = new HTMLDocRenderer(fr)
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
      verb: true
    }
  }
}

const app = document.getElementById("app")
app!.innerHTML = docRenderer.render(content, options)

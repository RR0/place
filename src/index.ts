import {User} from "./user/User"
import {Translator} from "./lang/Translator"
import {HTMLDocRenderer, HTMLDocRenderOptions} from "./HTMLDocRenderer"
import {PeopleNameFormat} from "./people/render/HTMLPeopleRenderer"
import {grammar_fr, messages_fr} from "./lang/Messages_fr"
import {grammar_en, messages_en} from "./lang/Messages_en"
import {OrganizationDescriptionOptions} from "./org/render/HTMLOrganizationRenderer"
import {TimeRenderFormat} from "./time/Time"
import {KeyValue} from "./util/ObjectUtils"
import {Language} from "./lang/Language"

// import content from "./people/h/HynekJAllen"

const languages: KeyValue<Language> = {
  fr: {messages: messages_fr, grammar: grammar_fr},
  en: {messages: messages_en, grammar: grammar_en}
}

const user = new User('fr')
const language = languages[user.locale]
const lang = new Translator(user.locale, language.messages, language.grammar)
lang.add('craneTech', 'Lycée technique Crane')

const docRenderer = new HTMLDocRenderer(lang)
const orgOptions = {
  origin: true,
  name: {short: true, long: true},
  description: OrganizationDescriptionOptions.inline,
  types: {army: {}, company: {products: true}}
}
const timeOptions = TimeRenderFormat.fullDate
const peopleOptions = PeopleNameFormat.full
const options: HTMLDocRenderOptions = {
  title: {
    name: peopleOptions.name
  },
  events: {
    birth: {
      verb: true,
      who: peopleOptions,
      time: timeOptions,
      people: PeopleNameFormat.lastName,
      parent: {
        people: peopleOptions,
        occupation: {
          who: peopleOptions,
          time: timeOptions,
          verb: false,
          type: true,
          org: orgOptions,
          role: true
        }
      }
    },
    occupation: {
      who: peopleOptions,
      time: timeOptions,
      verb: true,
      type: true,
      org: orgOptions,
      role: true
    },
    foundation: {
      verb: true,
      who: peopleOptions,
      founders: {
        occupation: {
          who: peopleOptions,
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
      who: peopleOptions,
      org: orgOptions,
      role: false,
      time: timeOptions,
      type: false,
      verb: true
    }
  }
}

const app = document.getElementById("app")
if (app) {
  import("./people/h/HynekJAllen").then(content => {
    app.innerHTML = docRenderer.render(content.default, options)
  })
}

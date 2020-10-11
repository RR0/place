import {Gender, People} from "./people/People";
import {BirthEvent} from "./time/people/birth/BirthEvent";
import {City} from "./place/City";
import {User} from "./user/User";
import {Translator} from "./lang/Translator";
import {State} from "./place/State";
import {Country} from "./place/Country";
import {DateTime} from "./time/DateTime";
import {CountryCode} from "./place/CountryCode";
import {HTMLDocRenderer, HTMLDocRenderOptions} from "./HTMLDocRenderer";
import {OccupationEvent, OccupationRole} from "./time/people/occupation/OccupationEvent";
import {BeforeTime} from "./time/BeforeTime";
import {Company} from "./org/Company";
import {PeopleNameFormat} from "./people/render/HTMLPeopleRenderer";
import {Messages} from "./lang/Messages";
import {frenchPlural, messages_fr} from "./lang/Messages_fr";
import {messages_en} from "./lang/Messages_en";
import {OrganizationDescriptionOptions} from "./org/render/HTMLOrganizationRenderer";
import {TimeRenderFormat} from "./time/Time";

const messagesByLang: { [lang: string]: Messages } = {fr: messages_fr, en: messages_en}

const user = new User('fr');
const translator = new Translator(user.locale, messagesByLang[user.locale], frenchPlural);

const hynek = new People(Gender.male, `Josef`, 'Hynek', `Allen`)
const usa = new Country(CountryCode.us);
const illinois = new State('Illinois', usa);
const chicago = new City('Chicago', illinois);
const birthdate = new Date(1910, 4, 1);
const father = new People(Gender.male, 'Joseph');
const czechoslovakia = new Country(CountryCode.cs);
const fatherEvents = father.events;
fatherEvents.add(new BirthEvent(father, undefined, czechoslovakia))
const cigarFactory = new Company(undefined, undefined, [translator.messages.dict.cigar]);
fatherEvents.add(new OccupationEvent(father, OccupationRole.worker, cigarFactory, new BeforeTime(new DateTime(birthdate)), czechoslovakia))
const mother = new People(Gender.female, 'Bertha');
const motherEvents = mother.events;
motherEvents.add(new BirthEvent(mother, undefined, czechoslovakia))
const bornEvent: BirthEvent = new BirthEvent(
  hynek,
  new DateTime(birthdate),
  chicago, father, mother)
hynek.events.add(bornEvent);

const docRenderer = new HTMLDocRenderer(translator)
let options: HTMLDocRenderOptions = {
  title: {
    name: PeopleNameFormat.full.name
  },
  events: {
    birth: {
      time: TimeRenderFormat.fullDate,
      people: PeopleNameFormat.lastName,
      parent: {
        people: PeopleNameFormat.full,
        occupation: {
          time: TimeRenderFormat.fullDate,
          verb: false,
          type: true,
          org: {
            origin: true,
            name: {short: true, long: true},
            description: OrganizationDescriptionOptions.inline,
            types: {army: {}, company: {products: true}}
          },
          role: true
        }
      }
    },
    occupation: {
      time: TimeRenderFormat.fullDate,
      verb: true,
      type: true,
      org: {
        origin: true,
        name: {short: true, long: true},
        description: OrganizationDescriptionOptions.inline,
        types: {army: {}, company: {products: true}}
      },
      role: true
    }
  }
}
const eventHTML = docRenderer.render(hynek, options)
const docHtml = `
${eventHTML}. 
Il fait ses études dans les écoles publiques de la ville, et sort du lycée technique Crane en 1927. 
Il entre alors à l'Université de Chicago, dont il obtient un B.S. en 1931, puis un doctorat en astrophysique en 1935</p>.
`;
const app = document.getElementById("app");
app!.innerHTML = docHtml;

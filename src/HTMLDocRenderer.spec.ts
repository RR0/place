import {PeopleNameFormat} from "./people/render/HTMLPeopleRenderer";
import {Gender, People} from "./people/People";
import {OrganizationDescriptionOptions} from "./org/render/HTMLOrganizationRenderer";
import {HTMLDocRenderer, HTMLDocRenderOptions} from "./HTMLDocRenderer";
import {User} from "./user/User";
import {TimeRenderFormat} from "./time/Time";
import {States} from "./place/state/States";
import {Company} from "./org/Company";
import {School, SchoolType} from "./org/School";
import {Countries} from "./place/country/Countries";
import {BeforeTime} from "./time/BeforeTime";
import {StudyEvent} from "./time/people/study/StudyEvent";
import {City} from "./place/City";
import {OccupationEvent, OccupationRole} from "./time/people/occupation/OccupationEvent";
import {DateTime} from "./time/DateTime";
import {BirthEvent} from "./time/people/birth/BirthEvent";
import {KeyValue} from "@rr0/common";
import {grammar_en, grammar_fr, Language, Translation} from "@rr0/lang";
import {messages_fr} from "./lang/Messages_fr";
import {messages_en} from "./lang/Messages_en";


const languages: KeyValue<Language> = {
  fr: {messages: messages_fr, grammar: grammar_fr},
  en: {messages: messages_en, grammar: grammar_en}
};


// Timeline
const hynek = new People(Gender.male, 'Josef', 'Hynek', 'Allen')
const chicago = new City('Chicago', States.illinois)
const birthDate = new DateTime(new Date(1910, 4, 1));
const father = new People(Gender.male, 'Joseph')
const cigarFactory = new Company(undefined, undefined, ['cigar'])
father.events.add(new BirthEvent(father, undefined, Countries.cs))
father.events.add(new OccupationEvent(father, OccupationRole.worker, cigarFactory, new BeforeTime(birthDate), Countries.cs))
const mother = new People(Gender.female, 'Bertha')
mother.events.add(new BirthEvent(mother, undefined, Countries.cs))
hynek.events.add(new BirthEvent(hynek, birthDate, chicago, father, mother))
const craneTech = new School(SchoolType.highSchool, 'craneTech')
hynek.events.add(new StudyEvent(hynek, craneTech, new BeforeTime(new DateTime(new Date(1927, 1, 1)))))


// Rendering options
const orgOptions = {
  origin: true,
  name: {short: true, long: true},
  description: OrganizationDescriptionOptions.inline,
  types: {army: {}, company: {products: true}}
};
const timeOptions = TimeRenderFormat.fullDate;
const peopleOptions = {...PeopleNameFormat.full};
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
};


test('Renders a people bio in english', () => {

  const preferences = {locale: 'en'};
  const user = new User(preferences, Gender.neutral, 'Jérôme', 'Beau');
  const userLocale = user.preferences.locale;
  const language = languages[userLocale];
  const lang = new Translation(userLocale, language.grammar, language.messages);

  lang.add('craneTech', 'Lycée technique Crane');

  // Rendering
  const docRenderer = new HTMLDocRenderer(lang);
  const renderedHTML = docRenderer.render(hynek, options);
  expect(renderedHTML).toBe('<h1>Josef Allen Hynek</h1>' +
    '<p>Hynek was born on Sunday, May 1, 1910 at Chicago (Illinois, USA), son of Joseph (czechoslovak)Joseph is worker for a company that sells cigars and Bertha (czechoslovak).</p>' +
    '<p>He studies at the Lycée technique Crane.</p>')
})

test('Renders a people bio in french', () => {

  const preferences = {locale: 'fr'};
  const user = new User(preferences, Gender.neutral, 'Jérôme', 'Beau');
  const userLocale = user.preferences.locale;
  const language = languages[userLocale];
  const lang = new Translation(userLocale, language.grammar, language.messages);

  lang.add('craneTech', 'Lycée technique Crane');

  // Rendering
  const docRenderer = new HTMLDocRenderer(lang);
  const renderedHTML = docRenderer.render(hynek, options);
  expect(renderedHTML).toBe('<h1>Josef Allen Hynek</h1><p>Hynek naît le dimanche 1 mai 1910 à Chicago (Illinois, États-Unis), fils de il (tchécoslovaque)il est ouvrier chez une société produisant des cigares et elle (tchécoslovaque).</p><p>Il étudie au Lycée technique Crane.</p>')
})

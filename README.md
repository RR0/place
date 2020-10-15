# facts

[![RR0](https://circleci.com/gh/RR0/facts.svg?style=svg)](https://app.circleci.com/pipelines/github/RR0/facts)

Facts representation and rendering API

## Installation

```
npm install @rr0/facts --save
```

## Design
Once facts are represented using assembled business objects 
(`Time`, `Place`, `People`, `Organization`, and several `Event` subtypes),
they can be provided as parameters to some `Renderer`, which will use a `Translator` to convert them to text (or HTML
 markup, etc.). 

## Example
Say we want to render the timeline of some people:
```js
import {
  Translator, grammar_fr,
  HTML, HTMLDocRenderer, HTMLDocRenderOptions,
  Language, messages_en, messages_fr,
  OrganizationDescriptionOptions,
  PeopleNameFormat,
  TimeRenderFormat,
  User,
} from '@rr0/facts';

// The timeline
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

// The options
const user = new User('fr');
const language = languages[user.locale];
const lang = new Translator(user.locale, messages_fr, grammar_fr);
lang.add('craneTech', 'Lycée technique Crane');

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

// The rendering
const docRenderer = new HTMLDocRenderer(lang);
const contentHTML = docRenderer.render(hynek, options);
```
will return in `contentHTML` the HTML code:

```html
<h1>Josef Allen Hynek</h1>
<p>Hynek naît le dimanche 1 mai 1910 à Chicago (Illinois, États-Unis), fils de Joseph (tchécoslovaque)Joseph est ouvrier chez une société produisant des cigares et Bertha (tchécoslovaque).</p>
<p>Il étudie au Lycée technique Crane.</p></div>
```

Change the parameters of the `Translator` to a `en` locale and to use 
`messages_en`, and `grammar_en` and change the custom translation to:
```
lang.add('craneTech', 'Crane Tech high school');
```
then you will get instead:

```html
<h1>Josef Allen Hynek</h1>
<p>Hynek was born on Sunday, May 1, 1910 at Chicago (Illinois, USA), son of Joseph (czechoslovak)Joseph is worker for a company that sells cigars and Bertha (czechoslovak).</p>
<p>He studies at the Crane Tech high school.</p>
```

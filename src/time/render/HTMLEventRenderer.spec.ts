import {State} from "../../place/State";
import {Gender, People} from "../../people/People";
import {Country} from "../../place/Country";
import {City} from "../../place/City";
import {CountryCode} from "../../place/CountryCode";
import {BirthEvent} from "../BirthEvent";
import {DateTime} from "../DateTime";
import {HTMLEventRenderer} from "./HTMLEventRenderer";
import {Translator} from "../../lang/Translator";
import {HTMLPeopleRenderer, NameCase} from "../../people/render/HTMLPeopleRenderer";
import {HTMLTimeRenderer} from "./HTMLTimeRenderer";
import {HTMLPlaceRenderer} from "../../place/render/HTMLPlaceRenderer";
import {HTMLOccupationRenderer} from "./HTMLOccupationRenderer";
import {HTMLOrganizationRenderer} from "../../org/render/HTMLOrganizationRenderer";
import {EventRenderOptions, RR0EventType} from "../Event";

const hynek = new People(Gender.male, `Josef`, 'Hynek', `Allen`)
const usa = new Country(CountryCode.us)
const illinois = new State('Illinois', usa)
const chicago = new City('Chicago', illinois)

const translator = new Translator('fr');
const renderer = new HTMLEventRenderer(
  translator,
  new HTMLPeopleRenderer(translator),
  new HTMLPlaceRenderer(translator),
  new HTMLTimeRenderer(translator),
  new HTMLOccupationRenderer(translator, new HTMLOrganizationRenderer(translator))
);

test('renders anonymous parents of same nationality', () => {
  const father = new People(Gender.male);
  const czechoslovakia = new Country(CountryCode.cs);
  father.events.add(new BirthEvent(father, undefined, czechoslovakia))
  const mother = new People(Gender.female);
  mother.events.add(new BirthEvent(mother, undefined, czechoslovakia))
  const bornEvent: BirthEvent = new BirthEvent(hynek, new DateTime(new Date(1910, 4, 1)), chicago, father, mother)
  const renderOptions: EventRenderOptions = {
    [RR0EventType.birth]: {
      people: {
        name: {
          first: NameCase.camelCase,
          middle: NameCase.initials,
          last: NameCase.camelCase
        }
      }
    }
  };
  const found = bornEvent.render(renderer, renderOptions)
  expect(found).toBe('Josef A. Hynek naît le dimanche 1 mai 1910 à Chicago (Illinois, États-Unis) de parents tchécoslovaques')
})

test('renders anonymous parents of different nationality', () => {
  const father = new People(Gender.male);
  const czechoslovakia = new Country(CountryCode.cs);
  const usa = new Country(CountryCode.us);
  father.events.add(new BirthEvent(father, undefined, czechoslovakia))
  const mother = new People(Gender.female);
  mother.events.add(new BirthEvent(mother, undefined, usa))
  const bornEvent: BirthEvent = new BirthEvent(hynek, new DateTime(new Date(1910, 4, 1)), chicago, father, mother)
  const renderOptions: EventRenderOptions = {
    [RR0EventType.birth]: {
      people: {
        name: {
          first: NameCase.camelCase,
          middle: NameCase.initials,
          last: NameCase.camelCase
        }
      }
    }
  };
  const found = bornEvent.render(renderer, renderOptions)
  expect(found).toBe("Josef A. Hynek naît le dimanche 1 mai 1910 à Chicago (Illinois, États-Unis) d'un père tchécoslovaque et d'une mère américaine")
})

test('renders parents of different nationality', () => {
  const father = new People(Gender.male, 'Joseph');
  const czechoslovakia = new Country(CountryCode.cs);
  const usa = new Country(CountryCode.us);
  father.events.add(new BirthEvent(father, undefined, usa))
  const mother = new People(Gender.female, 'Bertha');
  mother.events.add(new BirthEvent(mother, undefined, czechoslovakia))
  const bornEvent: BirthEvent = new BirthEvent(hynek, new DateTime(new Date(1910, 4, 1)), chicago, father, mother)
  const renderOptions: EventRenderOptions = {
    [RR0EventType.birth]: {
      people: {
        name: {
          first: NameCase.camelCase,
          middle: NameCase.initials,
          last: NameCase.camelCase
        }
      }
    }
  };
  const found = bornEvent.render(renderer, renderOptions)
  expect(found).toBe("Josef A. Hynek naît le dimanche 1 mai 1910 à Chicago (Illinois, États-Unis), fils de Joseph" +
    " (américain) et Bertha (tchécoslovaque)")
})



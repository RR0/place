import {Gender, People} from "../../people/People";
import {City} from "../../place/City";
import {DateTime} from "../DateTime";
import {HTMLEventRenderer} from "./HTMLEventRenderer";
import {Translator} from "../../lang/Translator";
import {HTMLPeopleRenderer, PeopleNameFormat} from "../../people/render/HTMLPeopleRenderer";
import {HTMLTimeRenderer} from "./HTMLTimeRenderer";
import {HTMLPlaceRenderer} from "../../place/render/HTMLPlaceRenderer";
import {HTMLOrganizationRenderer} from "../../org/render/HTMLOrganizationRenderer";
import {grammar_fr, messages_fr} from "../../lang/Messages_fr";
import {TimeRenderFormat} from "../Time";
import {HTMLOccupationRenderer} from "../people/occupation/HTMLOccupationRenderer";
import {BirthEvent, BirthEventRenderOptions, OccupationFormat} from "../people/birth/BirthEvent";
import {HTMLBirthEventRenderer} from "../people/birth/HTMLBirthEventRenderer";
import {HTMLFoundationEventRenderer} from "../org/foundation/HTMLFoundationEventRenderer";
import {HTMLStudyRenderer} from "../people/study/HTMLStudyRenderer";
import {Countries} from "../../place/country/Countries";
import {States} from "../../place/state/States";


const hynek = new People(Gender.male, 'Josef', 'Hynek', `Allen`)
const chicago = new City('Chicago', States.illinois)

const translator = new Translator('fr', messages_fr, grammar_fr);
const peopleRenderer = new HTMLPeopleRenderer(translator);
const placeRenderer = new HTMLPlaceRenderer(translator);
const timeRenderer = new HTMLTimeRenderer(translator);
const orgRenderer = new HTMLOrganizationRenderer(translator, placeRenderer);
const occupationRenderer = new HTMLOccupationRenderer(translator, orgRenderer, peopleRenderer);
const birthEventRenderer = new HTMLBirthEventRenderer(translator, peopleRenderer, timeRenderer, placeRenderer, occupationRenderer);
const foundationRenderer = new HTMLFoundationEventRenderer(translator, peopleRenderer, orgRenderer, timeRenderer, placeRenderer, occupationRenderer);
const studyRenderer = new HTMLStudyRenderer(translator, orgRenderer, peopleRenderer);
const renderer = new HTMLEventRenderer(translator, placeRenderer, timeRenderer, occupationRenderer, birthEventRenderer, foundationRenderer, studyRenderer);


test('renders anonymous parents of same nationality', () => {
  const father = new People(Gender.male);
  father.events.add(new BirthEvent(father, undefined, Countries.cs))
  const mother = new People(Gender.female);
  mother.events.add(new BirthEvent(mother, undefined, Countries.cs))
  const birthEvent: BirthEvent = new BirthEvent(hynek, new DateTime(new Date(1910, 4, 1)), chicago, father, mother)
  const renderOptions: BirthEventRenderOptions = {
    verb: true,
    who: PeopleNameFormat.full,
    time: TimeRenderFormat.fullDate,
    people: PeopleNameFormat.middleAbbreviated,
    parent: {
      people: PeopleNameFormat.full,
      occupation: OccupationFormat.none
    }
  };
  const found = birthEvent.render(renderer, renderOptions)
  expect(found).toBe('Josef A. Hynek naît le dimanche 1 mai 1910 à Chicago (Illinois, États-Unis) de parents tchécoslovaques')
})


test('renders anonymous parents of different nationality', () => {
  const father = new People(Gender.male);
  father.events.add(new BirthEvent(father, undefined, Countries.cs))
  const mother = new People(Gender.female);
  mother.events.add(new BirthEvent(mother, undefined, Countries.us))
  const birthEvent: BirthEvent = new BirthEvent(hynek, new DateTime(new Date(1910, 4, 1)), chicago, father, mother)
  const renderOptions: BirthEventRenderOptions = {
    verb: true,
    who: PeopleNameFormat.full,
    time: TimeRenderFormat.fullDate,
    people: PeopleNameFormat.middleAbbreviated,
    parent: {
      people: PeopleNameFormat.full,
      occupation: OccupationFormat.none
    }
  };
  const found = birthEvent.render(renderer, renderOptions)
  expect(found).toBe("Josef A. Hynek naît le dimanche 1 mai 1910 à Chicago (Illinois, États-Unis) d'un père tchécoslovaque et d'une mère américaine")
})


test('renders parents of different nationality', () => {
  const father = new People(Gender.male, 'Joseph');
  father.events.add(new BirthEvent(father, undefined, Countries.us))
  const mother = new People(Gender.female, 'Bertha');
  mother.events.add(new BirthEvent(mother, undefined, Countries.cs))
  const bornEvent: BirthEvent = new BirthEvent(hynek, new DateTime(new Date(1910, 4, 1)), chicago, father, mother)
  const renderOptions: BirthEventRenderOptions = {
    verb: true,
    who: PeopleNameFormat.full,
    time: TimeRenderFormat.fullDate,
    people: PeopleNameFormat.middleAbbreviated,
    parent: {
      people: PeopleNameFormat.full,
      occupation: OccupationFormat.none
    }
  };
  const found = bornEvent.render(renderer, renderOptions)
  expect(found).toBe("Josef A. Hynek naît le dimanche 1 mai 1910 à Chicago (Illinois, États-Unis), fils de Joseph" +
    " (américain) et Bertha (tchécoslovaque)")
})



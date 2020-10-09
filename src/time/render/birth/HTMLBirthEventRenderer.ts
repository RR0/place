import {HTML, HTMLRenderer} from "../../../HTMLRenderer";
import {BirthEvent, BirthEventRenderer, BirthEventRenderOptions, BirthParentRenderOptions} from "../../BirthEvent";
import {OccupationEvent, OccupationEventRenderer} from "../../OccupationEvent";
import {Translator} from "../../../lang/Translator";
import {Gender, People, PeopleRenderer} from "../../../people/People";
import {TimeRenderer} from "../../Time";
import {Place, PlaceRenderer} from "../../../place/Place";
import {Country} from "../../../place/Country";
import {WithEventMessages} from "../../../lang/Messages";

export class HTMLBirthEventRenderer extends HTMLRenderer implements BirthEventRenderer<HTML> {

  constructor(
    translator: Translator<WithEventMessages>,
    private peopleRenderer: PeopleRenderer<HTML>,
    private timeRenderer: TimeRenderer<HTML>,
    private placeRenderer: PlaceRenderer<HTML>,
    private occupationRenderer: OccupationEventRenderer<HTML>,
  ) {
    super(translator);
  }

  renderBirth(birth: BirthEvent, options: BirthEventRenderOptions): HTML {
    const birthPlace = birth.where
    const birthTime = birth.when
    const baby = birth.who
    const bornMsg = this.translator.messages.event.born
    const born = this.translator.translate(bornMsg.label, {
      who: this.peopleRenderer.render(baby, options.people),
      when: birthTime ? birthTime.render(this.timeRenderer, options.time) : '',
      where: birthPlace ? birthPlace.render(this.placeRenderer) : '',
    })
    const parents = this.parents(birth, options, baby, birthPlace);
    return born + parents
  }

  private parents<R>(birth: BirthEvent, options: BirthEventRenderOptions, baby: People, birthPlace?: Place) {
    const birthCountry = birthPlace?.country
    let fatherName = '', fatherNationality
    const father = birth.father
    {
      if (father) {
        [fatherName, fatherNationality] = this.parentInfo(father, birthCountry, options.parent)
      }
    }
    let motherName = '', motherNationality
    const mother = birth.mother
    {
      if (mother) {
        [motherName, motherNationality] = this.parentInfo(mother, birthCountry, options.parent)
      }
    }
    const bornMsg = this.translator.messages.event.born
    let parents = ''
    if (fatherName || motherName) {
      parents += this.translator.translate(bornMsg.child[baby.gender])
      parents += this.parentNationality(fatherName, fatherNationality, father?.gender)
      const occupations = father!.events.findOfType(OccupationEvent);
      if (occupations.length > 0) {
        let occupationAtBirth: OccupationEvent | undefined = undefined
        for (const occupation of occupations) {
          occupationAtBirth = occupation as OccupationEvent
          if (occupation.isAfter(birth)) {
            break;
          }
        }
        if (occupationAtBirth) {
          parents += occupationAtBirth.render(this.occupationRenderer, options.parent.occupation)
        }
      }
      if (fatherName && motherName) {
        parents += this.translator.translate(bornMsg.parents.and)
      }
      parents += this.parentNationality(motherName, motherNationality, mother?.gender)
    } else {
      const anonParentsMsg = bornMsg.parents.anonymous
      if (fatherNationality === motherNationality) {
        parents += this.translator.translate(anonParentsMsg.nationality, {nationality: fatherNationality})
      } else {
        parents += this.translator.translate(anonParentsMsg.nationalities, {fatherNationality, motherNationality})
      }
    }
    return parents;
  }

  private parentNationality(fatherName?: string, nationality?: string, gender?: Gender) {
    let parentNationality = ''
    if (fatherName) {
      parentNationality += fatherName
      if (nationality) {
        parentNationality += ` (${nationality})`
      }
    } else if (nationality) {
      parentNationality += this.translator.translate(this.translator.messages.event.born[gender === Gender.male ? 'father' : 'mother'].anonymous.nationality, {nationality})
    }
    return parentNationality
  }

  private parentInfo<R>(parent: People, birthCountry: Country | undefined, options: BirthParentRenderOptions) {
    const name = this.peopleRenderer.render(parent, options.people)
    const fatherBirthCountry = parent.firstCountry
    let nationality = ''
    if (birthCountry !== fatherBirthCountry) {
      nationality += fatherBirthCountry?.renderNationality(this.placeRenderer, parent.gender)
    }
    return [name, nationality]
  }
}

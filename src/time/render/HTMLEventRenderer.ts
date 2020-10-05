import {BirthEvent} from "../BirthEvent"
import {HTMLPlaceRenderer} from "../../place/render/HTMLPlaceRenderer"
import {Translator} from "../../lang/Translator"
import {HTMLPeopleRenderer} from "../../people/render/HTMLPeopleRenderer"
import {EventRenderer, RR0Event} from "../Event"
import {HTMLTimeRenderer} from "./HTMLTimeRenderer"
import {Gender, People} from "../../people/People"
import {Country} from "../../place/Country"
import {HTML, HTMLRenderer} from "../../HTMLRenderer"
import {OccupationEvent} from "../OccupationEvent"
import {HTMLOccupationRenderer} from "./HTMLOccupationRenderer";

/**
 * Renders events as HTML.
 */
export class HTMLEventRenderer extends HTMLRenderer implements EventRenderer<HTML> {

  constructor(
    translator: Translator,
    private peopleRenderer: HTMLPeopleRenderer,
    private placeRenderer: HTMLPlaceRenderer,
    private timeRenderer: HTMLTimeRenderer,
    private occupationRenderer: HTMLOccupationRenderer
  ) {
    super(translator)
  }

  render(event: RR0Event): HTML {
    return this.translator.translate('event.default', {
      when: event.when ? event.when.render(this.timeRenderer) : '',
      where: event.where ? event.where.render(this.placeRenderer) : '',
      type: event.type
    })
  }

  renderBirth(birth: BirthEvent): HTML {
    const birthPlace = birth.where
    const birthTime = birth.when
    const baby = birth.who
    const bornMsg = this.translator.message.event.born
    const born = this.translator.translate(bornMsg.label, {
      who: this.peopleRenderer.render(baby),
      when: birthTime ? birthTime.render(this.timeRenderer) : '',
      where: birthPlace ? birthPlace.render(this.placeRenderer) : '',
    })
    const birthCountry = birthPlace?.country
    let fatherName = '', fatherNationality
    const father = birth.father
    {
      if (father) {
        [fatherName, fatherNationality] = this.parentInfo(father, birthCountry)
      }
    }
    let motherName = '', motherNationality
    const mother = birth.mother
    {
      if (mother) {
        [motherName, motherNationality] = this.parentInfo(mother, birthCountry)
      }
    }
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
          parents += occupationAtBirth.render(this)
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
    return born + parents
  }

  renderOccupation(event: OccupationEvent): HTML {
    return this.occupationRenderer.renderOccupation(event)
  }

  private parentNationality(fatherName?: string, nationality?: string, gender?: Gender) {
    let parentNationality = ''
    if (fatherName) {
      parentNationality += fatherName
      if (nationality) {
        parentNationality += ` (${nationality})`
      }
    } else if (nationality) {
      parentNationality += this.translator.translate(this.translator.message.event.born[gender === Gender.male ? 'father' : 'mother'].anonymous.nationality, {nationality})
    }
    return parentNationality
  }

  private parentInfo<R>(parent: People, birthCountry?: Country) {
    const name = this.peopleRenderer.render(parent)
    const fatherBirthCountry = parent.birthCountry
    let nationality = ''
    if (birthCountry !== fatherBirthCountry) {
      nationality += fatherBirthCountry?.renderNationality(this.placeRenderer, parent.gender)
    }
    return [name, nationality]
  }
}

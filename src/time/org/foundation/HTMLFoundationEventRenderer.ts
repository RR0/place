import {Translator} from "../../../lang/Translator";
import {TimeRenderer} from "../../Time";
import {Gender, People, PeopleRenderer} from "../../../people/People";
import {Country} from "../../../place/country/Country";
import {HTML, HTMLRenderer} from "../../../HTMLRenderer";
import {WithEventMessages} from "../../../lang/Messages";
import {Place, PlaceRenderer} from "../../../place/Place";
import {FoundationEvent, FoundationEventRenderer, FoundationEventRenderOptions} from "./FoundationEvent";
import {OccupationEvent, OccupationEventRenderer} from "../../people/occupation/OccupationEvent";
import {Organization, OrganizationRenderer} from "../../../org/Organization";
import {Dictionary} from "../../../lang/Dictionary";

export class HTMLFoundationEventRenderer extends HTMLRenderer implements FoundationEventRenderer<HTML> {

  constructor(
    translator: Translator<WithEventMessages>,
    private peopleRenderer: PeopleRenderer<HTML>,
    private orgRenderer: OrganizationRenderer<HTML>,
    private timeRenderer: TimeRenderer<HTML>,
    private placeRenderer: PlaceRenderer<HTML>,
    private occupationRenderer: OccupationEventRenderer<HTML>,
  ) {
    super(translator);
  }

  renderFoundation(foundation: FoundationEvent, options: FoundationEventRenderOptions): HTML {
    const foundationPlace = foundation.where
    const foundationTime = foundation.when
    const newOrg = foundation.org
    const foundationMsg = this.translator.messages.event.born
    const born = this.translator.translate(foundationMsg.label, {
      who: this.peopleRenderer.render(newOrg, options.people),
      when: foundationTime ? foundationTime.render(this.timeRenderer, options.time) : '',
      where: foundationPlace ? foundationPlace.render(this.placeRenderer) : '',
    })
    const founders = this.founders(foundation, options, newOrg, foundationPlace);
    return born + founders
  }

  private founders<R>(foundation: FoundationEvent, options: FoundationEventRenderOptions, baby: Organization, foundationPlace?: Place) {
    const foundationCountry = foundationPlace?.country
    for (const founder in foundation.founders) {
      let fatherName = '', fatherNationality
      if (founder instanceof People) {
        const founderPeople = founder as People
        fatherName = this.peopleRenderer.render(founderPeople, options.founders.people)
        fatherNationality = this.peopleNationality(founderPeople, foundationCountry)
      } else if (founder instanceof Organization) {
        const founderOrg = founder as Organization
        fatherName = this.orgRenderer.render(founderOrg, options.founders.organization)
        fatherNationality = this.orgNationality(founderOrg, foundationCountry)
      }
    }
    const bornMsg = this.translator.messages.event.born
    let parents = ''
    if (fatherName || motherName) {
      parents += this.translator.translate(bornMsg.child[baby.gender])
      parents += this.parentNationality(fatherName, fatherNationality, father?.gender)
      const occupations = father!.events.findOfType(OccupationEvent);
      if (occupations.length > 0) {
        let occupationAtFoundation: OccupationEvent | undefined = undefined
        for (const occupation of occupations) {
          occupationAtFoundation = occupation as OccupationEvent
          if (occupation.isAfter(foundation)) {
            break;
          }
        }
        if (occupationAtFoundation) {
          parents += occupationAtFoundation.render(this.occupationRenderer, options.founders.occupation)
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

  private peopleNationality<R>(parent: People, foundationCountry?: Country): HTML {
    const fatherFoundationCountry = parent.birthCountry
    let nationality = ''
    if (foundationCountry !== fatherFoundationCountry) {
      nationality += fatherFoundationCountry?.renderNationality(this.placeRenderer, parent.gender)
    }
    return nationality
  }

  private orgNationality<R>(org: Organization, foundationCountry?: Country): HTML {
    const fatherFoundationCountry = org.firstCountry
    let nationality = ''
    if (foundationCountry !== fatherFoundationCountry) {
      const orgGender = Dictionary.getGender(this.translator.messages.dict[org.type]);
      nationality += fatherFoundationCountry?.renderNationality(this.placeRenderer, orgGender)
    }
    return nationality
  }
}

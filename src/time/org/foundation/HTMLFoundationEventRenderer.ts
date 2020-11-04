import {TimeRenderer} from "../../Time";
import {People, PeopleRenderer} from "../../../people/People";
import {Country} from "../../../place/country/Country";
import {HTML, HTMLRenderer} from "../../../HTMLRenderer";
import {Place, PlaceRenderer} from "../../../place/Place";
import {FoundationEvent, FoundationEventRenderer, FoundationEventRenderOptions} from "./FoundationEvent";
import {OccupationEvent, OccupationEventRenderer} from "../../people/occupation/OccupationEvent";
import {Organization, OrganizationRenderer} from "../../../org/Organization";
import {WithEventMessages} from "../../EventMessages";
import {Translation} from "@rr0/lang";

export class HTMLFoundationEventRenderer extends HTMLRenderer implements FoundationEventRenderer<HTML> {

  constructor(
    translation: Translation<WithEventMessages>,
    private peopleRenderer: PeopleRenderer<HTML>,
    private orgRenderer: OrganizationRenderer<HTML>,
    private timeRenderer: TimeRenderer<HTML>,
    private placeRenderer: PlaceRenderer<HTML>,
    private occupationRenderer: OccupationEventRenderer<HTML>,
  ) {
    super(translation);
  }

  renderFoundation(foundation: FoundationEvent, options: FoundationEventRenderOptions): HTML {
    const foundationPlace = foundation.where
    const foundationTime = foundation.when
    const newOrg = foundation.org
    const foundationMsg = this.translation.messages.event.org.foundation
    const born = this.translation.translate(foundationMsg.label, {
      org: this.orgRenderer.render(newOrg, options.organization),
      when: foundationTime ? foundationTime.render(this.timeRenderer, options.time) : '',
      where: foundationPlace ? foundationPlace.render(this.placeRenderer) : '',
    })
    const founders = this.founders(foundation, options, foundationPlace);
    return born + founders
  }

  private founders<R>(foundation: FoundationEvent, options: FoundationEventRenderOptions, foundationPlace?: Place) {
    const foundationCountry = foundationPlace?.country
    const founders = foundation.founders;
    let foundersStr = ''
    if (founders) {
      for (const founder of founders) {
        let founderName = '', fatherNationality
        if (founder instanceof People) {
          const founderPeople = founder as People
          founderName = this.peopleRenderer.render(founderPeople, options.founders.people)
          fatherNationality = this.peopleNationality(founderPeople, foundationCountry)
        } else {
          const founderOrg = founder as Organization
          founderName = this.orgRenderer.render(founderOrg, options.founders.organization)
          fatherNationality = this.orgNationality(founderOrg, foundationCountry)
        }
        foundersStr += foundation.org.render(this.orgRenderer, options.organization)
        foundersStr += this.founderNationality(founderName, fatherNationality)
        const occupations = founder!.events.findOfType(OccupationEvent);
        if (occupations.length > 0) {
          let occupationAtFoundation: OccupationEvent | undefined = undefined
          for (const occupation of occupations) {
            occupationAtFoundation = occupation as OccupationEvent
            if (occupation.isAfter(foundation)) {
              break;
            }
          }
          if (occupationAtFoundation) {
            foundersStr += occupationAtFoundation.render(this.occupationRenderer, options.founders.occupation)
          }
        }
      }
    }
    return foundersStr;
  }

  private founderNationality(founderName?: string, nationality?: string) {
    let founderNationality = ''
    if (founderName) {
      founderNationality += founderName
      if (nationality) {
        founderNationality += ` (${nationality})`
      }
    } else if (nationality) {
      founderNationality += this.translation.translate(this.translation.messages.event.org.foundation.founder.anonymous.nationality, {nationality})
    }
    return founderNationality
  }

  private peopleNationality<R>(parent: People, foundationCountry?: Country): HTML {
    const founderFoundationCountry = parent.birthCountry
    let nationality = ''
    if (foundationCountry !== founderFoundationCountry) {
      nationality += founderFoundationCountry?.renderNationality(this.placeRenderer, parent.gender)
    }
    return nationality
  }

  private orgNationality<R>(org: Organization, foundationCountry?: Country): HTML {
    const founderFoundationCountry = org.firstCountry
    let nationality = ''
    if (foundationCountry !== founderFoundationCountry) {
      const orgGender = this.translation.getGender(this.translation.messages.dict[org.type]);
      nationality += founderFoundationCountry?.renderNationality(this.placeRenderer, orgGender)
    }
    return nationality
  }
}

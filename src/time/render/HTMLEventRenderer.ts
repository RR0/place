import {BirthEvent} from "../BirthEvent";
import {HTMLPlaceRenderer} from "../../place/render/HTMLPlaceRenderer";
import {Translator} from "../../lang/Translator";
import {HTMLPeopleRenderer} from "../../people/render/HTMLPeopleRenderer";
import {EventRenderer, RR0Event} from "../Event";
import {HTMLTimeRenderer} from "./HTMLTimeRenderer";
import {People} from "../../people/People";
import {Country} from "../../place/Country";
import {HTML, HTMLRenderer} from "../../HTMLRenderer";

/**
 * Renders events as HTML.
 */
export class HTMLEventRenderer extends HTMLRenderer implements EventRenderer<HTML> {

  constructor(translator: Translator,
              private peopleRenderer: HTMLPeopleRenderer,
              private placeRenderer: HTMLPlaceRenderer,
              private timeRenderer: HTMLTimeRenderer) {
    super(translator)
  }

  renderBorn(event: BirthEvent): HTML {
    const where = event.where;
    const when = event.when;
    const who = event.who;
    const born = this.translator.translate(this.translator.message.event.born.label, {
      who: this.peopleRenderer.render(who),
      when: when ? when.render(this.timeRenderer) : '',
      where: where ? where.render(this.placeRenderer) : '',
    });
    const birthCountry = where?.country;
    let fatherName = '', fatherNationality;
    {
      const father = event.father;
      if (father) {
        [fatherName, fatherNationality] = this.parentInfo(father, birthCountry);
      }
    }
    let motherName = '', motherNationality;
    {
      const mother = event.mother;
      if (mother) {
        [motherName, motherNationality] = this.parentInfo(mother, birthCountry);
      }
    }
    let parents = ''
    if (fatherName || motherName) {
      parents += this.translator.translate(this.translator.message.event.born.child[who.gender])
      if (fatherName) {
        parents += fatherName
        if (fatherNationality) {
          parents += ` (${fatherNationality})`
        }
      } else if (fatherNationality) {
        parents += this.translator.translate(this.translator.message.event.born.father.anonymous.nationality, {nationality: fatherNationality})
      }
      if (fatherName && motherName) {
        parents += this.translator.translate(this.translator.message.event.born.parents.and)
      }
      if (motherName) {
        parents += motherName
        if (motherNationality) {
          parents += ` (${motherNationality})`
        }
      } else if (motherNationality) {
        parents += this.translator.translate(this.translator.message.event.born.mother.anonymous.nationality, {nationality: fatherNationality})
      }
    } else {
      if (fatherNationality === motherNationality) {
        parents += this.translator.translate(this.translator.message.event.born.parents.anonymous.nationality, {nationality: fatherNationality})
      } else {
        parents += this.translator.translate(this.translator.message.event.born.parents.anonymous.nationalities, {
          fatherNationality,
          motherNationality
        })
      }
    }
    return born + parents
  }

  private parentInfo<R>(parent: People, birthCountry?: Country) {
    const name = this.peopleRenderer.render(parent);
    const fatherBirthCountry = parent.birthCountry;
    let nationality = ''
    if (birthCountry !== fatherBirthCountry) {
      nationality += fatherBirthCountry?.renderNationality(this.placeRenderer, parent.gender)
    }
    return [name, nationality];
  }

  render(event: RR0Event): HTML {
    return this.translator.translate('event.default', {
      when: event.when ? event.when.render(this.timeRenderer) : '',
      where: event.where ? event.where.render(this.placeRenderer) : '',
      type: event.type
    })
  }
}

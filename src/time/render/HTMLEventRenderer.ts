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
    const born = this.translator.translate('event.born', {
      who: this.peopleRenderer.render(event.who),
      when: event.when ? event.when.render(this.timeRenderer) : '',
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
      if (fatherName) {
        parents += fatherName
      } else if (fatherNationality) {
        parents += "d'un père " + fatherNationality
      }
      if (motherName) {
        parents += motherName
      } else if (motherNationality) {
        parents += "d'une mère " + motherNationality
      }
    } else {
      parents += ' de parents '
      if (fatherNationality === motherNationality) {
        parents += fatherNationality + 's'
      } else {
        parents += fatherNationality + ' et ' + motherNationality
      }
    }
    return born + parents
  }

  private parentInfo<R>(parent: People, birthCountry?: Country) {
    const name = this.peopleRenderer.render(parent);
    const fatherBirthCountry = parent.birthCountry;
    let nationality = ''
    if (birthCountry !== fatherBirthCountry) {
      nationality += fatherBirthCountry?.renderNationality(this.placeRenderer)
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

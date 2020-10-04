import {BornEvent} from "../BornEvent";
import {HTMLPlaceRenderer} from "../../place/render/HTMLPlaceRenderer";
import {Translator} from "../../lang/Translator";
import {HTMLPeopleRenderer} from "../../people/render/HTMLPeopleRenderer";
import {Renderer} from "../../Renderer";
import {EventRenderer, RR0Event} from "../Event";
import {HTMLTimeRenderer} from "./HTMLTimeRenderer";

export type HTML = string

/**
 * Renders events as HTML.
 */
export class HTMLEventRenderer extends Renderer implements EventRenderer<HTML> {

  constructor(private peopleRenderer: HTMLPeopleRenderer,
              private placeRenderer: HTMLPlaceRenderer,
              private timeRenderer: HTMLTimeRenderer,
              translator: Translator) {
    super(translator)
  }

  renderBorn(event: BornEvent): HTML {
    let born = this.translator.translate('event.born', {
      who: this.peopleRenderer.render(event.who),
      when: event.when ? event.when.render(this.timeRenderer) : '',
      where: event.where ? event.where.render(this.placeRenderer) : '',
    });
    const father = event.father ? this.peopleRenderer.render(event.father, {nationality: true}) : ''
    const mother = event.mother ? this.peopleRenderer.render(event.mother, {nationality: true}) : ''
    const parents = father + mother
    return born + parents
  }

  render(event: RR0Event): HTML {
    return this.translator.translate('event.default', {
      when: event.when ? event.when.render(this.timeRenderer) : '',
      where: event.where ? event.where.render(this.placeRenderer) : '',
      type: event.type
    })
  }
}

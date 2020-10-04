import {BornEvent, BornEventRenderer} from "../BornEvent";
import {HTMLPlaceRenderer} from "../../place/render/HTMLPlaceRenderer";
import {Translator} from "../../lang/Translator";

export type HTML = string


export class HTMLEventRenderer implements BornEventRenderer<HTML> {
  constructor(private placeRenderer: HTMLPlaceRenderer, private translator: Translator) {
  }

  dateStr(when: Date) {
    return when.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  }

  renderBorn(event: BornEvent): HTML {
    return this.translator.translate('event.born', {
      who: event.who.lastName,
      when: this.dateStr(event.when),
      where: event.where.render(this.placeRenderer)
    })
  }
}

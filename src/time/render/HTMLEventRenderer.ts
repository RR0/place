import {BirthEvent, BirthEventRenderer, BirthEventRenderOptions} from "../BirthEvent"
import {Translator} from "../../lang/Translator"
import {EventRenderer, EventRenderOptions, RR0Event} from "../Event"
import {HTML, HTMLRenderer} from "../../HTMLRenderer"
import {OccupationEvent, OccupationEventRenderer, OccupationRenderOptions} from "../OccupationEvent"
import {PlaceRenderer} from "../../place/Place";
import {TimeRenderer} from "../Time";
import {WithEventMessages} from "../../lang/Messages";

/**
 * Renders events as HTML.
 */
export class HTMLEventRenderer extends HTMLRenderer implements EventRenderer<HTML> {

  constructor(
    translator: Translator<WithEventMessages>,
    private placeRenderer: PlaceRenderer<HTML>,
    private timeRenderer: TimeRenderer<HTML>,
    private occupationRenderer: OccupationEventRenderer<HTML>,
    private birthEventRenderer: BirthEventRenderer<HTML>
  ) {
    super(translator)
  }

  render(event: RR0Event, options: EventRenderOptions): HTML {
    return this.translator.translate(this.translator.messages.event.default, {
      when: event.when ? event.when.render(this.timeRenderer, options.time) : '',
      where: event.where ? event.where.render(this.placeRenderer) : '',
      type: event.type
    })
  }

  renderBirth(birth: BirthEvent, options: BirthEventRenderOptions): HTML {
    return this.birthEventRenderer.renderBirth(birth, options)
  }

  renderOccupation(event: OccupationEvent, options: OccupationRenderOptions): HTML {
    return this.occupationRenderer.renderOccupation(event, options)
  }
}

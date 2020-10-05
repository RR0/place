import {RR0Event} from "./Event";


export interface TimelineRenderer<R> {
  render(timeline: Timeline): R
}


export class Timeline implements Iterable<RR0Event> {

  private readonly events: RR0Event[] = []

  constructor(events: RR0Event[] = []) {
    for (const event of events) {
      this.add(event)
    }
  }

  get length(): number {
    return this.events.length
  }

  get(index: number): RR0Event {
    return this.events[index]
  }

  add(event: RR0Event) {
    this.events.push(event)
    this.events.sort((oc1, oc2) => oc1.isBefore(oc2) ? -1 : oc1.isAfter(oc2) ? 1 : 0)
  }

  [Symbol.iterator](): Iterator<RR0Event> {
    return this.events[Symbol.iterator]();
  }

  render<R>(renderer: TimelineRenderer<R>): R {
    return renderer.render(this)
  }

  findOfType(type: any): Timeline {
    return new Timeline(this.events.filter(event => event instanceof type))
  }
}

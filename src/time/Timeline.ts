import {RR0Event} from "./Event";

export class Timeline {

  private readonly events: RR0Event[] = []

  add(event: RR0Event) {
    this.events.push(event)
  }

  get(index: number): RR0Event {
    return this.events[index]
  }

  findOfType(type: any) {
    return this.events.find(event => event instanceof type)
  }
}

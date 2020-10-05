import {Timeline} from "../time/Timeline";
import {Country} from "../place/Country";
import {BirthEvent} from "../time/BirthEvent";


export interface PeopleRenderer<R> {
  render(people: People): R
}

export enum Gender {
  male = 'male',
  female = 'female'
}

export class People {
  readonly events = new Timeline()

  constructor(readonly gender: Gender, readonly firstName?: string, readonly lastName?: string, readonly middleName?: string) {
  }

  render<R>(renderer: PeopleRenderer<R>): R {
    return renderer.render(this)
  }

  get birthCountry(): Country | undefined {
    let country
    const birthEvents = this.events.findOfType(BirthEvent)
    if (birthEvents.length > 0) {
      if (birthEvents.length === 1) {
        const bornPlace = birthEvents.get(0).where
        if (bornPlace) {
          country = bornPlace.country
        }
      } else {
        throw new Error("More than 1 birth event")
      }
    }
    return country
  }
}

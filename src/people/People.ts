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
    const born = this.events.findOfType(BirthEvent)[0]
    if (born) {
      const bornPlace = born.where
      if (bornPlace) {
        country = bornPlace.country
      }
    }
    return country
  }
}

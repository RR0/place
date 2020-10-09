import {Timeline} from "./time/Timeline";
import {Country} from "./place/Country";


export enum Gender {
  neutral = 'neutral',
  male = 'male',
  female = 'female'
}


export abstract class Entity {

  readonly events = new Timeline()

  protected constructor(readonly gender: Gender) {
  }

  get firstCountry(): Country | undefined {
    return this.events.get(0)?.where?.country
  }
}

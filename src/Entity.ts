import {Timeline} from "./time/Timeline";
import {Country} from "./place/Country";


export abstract class Entity {

  readonly events = new Timeline()

  get firstCountry(): Country | undefined {
    return this.events.get(0).where?.country
  }
}

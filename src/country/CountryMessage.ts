import {StatesMessages} from "./StateMessage.js"


export interface CountryMessage {
  name: string
  nationality: {
    male: string
    female: string
  },
  state: StatesMessages
}

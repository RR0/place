import {StatesMessages} from "country/StateMessage"


export interface CountryMessage {
  name: string
  nationality: {
    male: string
    female: string
  },
  state: StatesMessages
}

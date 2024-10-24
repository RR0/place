import {StatesMessages} from "./StateMessage.js"

/**
 * @deprecated Use @rr0/org instead
 */
export interface CountryMessage {
  name: string
  nationality: {
    male: string
    female: string
  },
  state: StatesMessages
}

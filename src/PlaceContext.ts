import { PlaceMessages } from "./lang/PlaceMessages"
import { allMessages } from "./lang/allMessages"

export class PlaceContext {

  constructor(readonly locale: string, readonly messages: PlaceMessages = allMessages[locale]) {
  }
}

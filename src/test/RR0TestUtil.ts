import { PlaceContext } from "../PlaceContext"

export class RR0TestUtil {

  readonly intlOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  }

  constructor(readonly rootDir = "test") {
  }

  newContext(lang: string = "fr"): PlaceContext {
    return new PlaceContext(lang)
  }
}

export const rr0TestUtil = new RR0TestUtil()

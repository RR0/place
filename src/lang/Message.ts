export interface Message {
  place: {
    country: {
      [countryCode: string]: {
        name: string
        nationality: string
      },
    }
  },
  event: {
    default: string,
    born: string
  }
}

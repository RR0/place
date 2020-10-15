export interface PeopleMessages {
  pronoun: {
    male: string
    female: string
    neutral: string
  }
}


export interface WithPeopleMessages {
  people: PeopleMessages
}

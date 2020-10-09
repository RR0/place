import {Gender} from "../Entity";

export interface WordMessage {
  [gender: string]: string
}

export interface DictionaryMessages {
  cigar: WordMessage
  company: WordMessage
  general: WordMessage
  worker: WordMessage
}

export class Dictionary {

  static getGender(word: WordMessage): Gender {
    return (Gender as any)[Object.keys(word)[0]]
  }
}

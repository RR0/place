import {Place} from '../place/Place'

export enum RR0EventType {
  born = 'born'
}

export class RR0Event {
  constructor(
    readonly type: RR0EventType,
    readonly when: Date,
    readonly where: Place) {

  }
}

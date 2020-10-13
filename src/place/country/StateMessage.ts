export interface StateMessage {
  short: string
  long: string
}


export interface StatesMessages {
  [stateKey: string]: StateMessage
}

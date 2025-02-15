import { Place } from "./Place"
import { Org } from "./org"

export type NamedPlace = {
  readonly name: string
  readonly place?: Place
  readonly org?: Org
}

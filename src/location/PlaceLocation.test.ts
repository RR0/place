import { describe, expect, test } from "@javarome/testscript"
import { PlaceLocation } from "./PlaceLocation.js"
import { rr0TestUtil } from "../test/index.js"

describe("PlaceLocation", () => {

  test("from degrees minutes seconds", () => {
    const location = new PlaceLocation(35.87555555555556, -106.32416666666666)
    expect(PlaceLocation.fromDMS("35° 52′ 32″ N, 106° 19′ 27″ O")).toEqual(location)
    expect(PlaceLocation.fromDMS("35°52′32″N,106°19′27″O")).toEqual(location)
    expect(PlaceLocation.fromDMS(`35°52'32"N,106°19'27"O`)).toEqual(location)
    expect(PlaceLocation.fromDMS(`35°52'32"N,106°19'27"W`)).toEqual(location)
  })

  test("to degrees minutes seconds", () => {
    const location = new PlaceLocation(35.87555555555556, -106.32416666666666)
    const context = rr0TestUtil.newContext()
    expect(location.toDMS(context)).toBe("35°52′32″N,106°19′27″O")
  })
})
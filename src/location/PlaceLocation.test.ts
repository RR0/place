import { describe, expect, test } from "@javarome/testscript"
import { PlaceLocation } from "./PlaceLocation.js"
import { rr0TestUtil } from "../test/index.js"

describe("PlaceLocation", () => {

  test("without seconds", () => {
    expect(PlaceLocation.fromDMS("35°52′N,106°19′O")).toBeDefined()
  })

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

  test("toString", () => {
    let lat = 35.87555555555556
    let lng = -106.32416666666666
    const location = new PlaceLocation(lat, lng)
    expect(location.toString()).toBe(`${lat},${lng}`)
  })
})

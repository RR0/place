import { describe, expect, test } from "@javarome/testscript"
import { PlaceLocation } from "./location"
import { Place } from "./Place"
import { NamedPlace } from "./NamedPlace"

describe("Place", () => {

  describe("toString", () => {

    test("Place", () => {
      const place = new Place([PlaceLocation.fromDMS("14°47′S,53°31′O")])
      expect(place.toString()).toEqual("-14.783333333333333,-53.516666666666666")
    })

    test("NamedPlace", () => {
      const name = "South-East Brazil"
      const place = new NamedPlace(name, [PlaceLocation.fromDMS("14°47′S,53°31′O")])
      expect(place.toString()).toEqual(name)
    })
  })
})

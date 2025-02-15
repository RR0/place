import { GooglePlaceService } from "./GooglePlaceService.js"
import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { PlaceLocation } from "./location"

describe("PlaceService", () => {

  const apiKey = process.env.GOOGLE_MAPS_API_KEY
  if (!apiKey) {
    throw Error("GOOGLE_MAPS_API_KEY is required")
  }

  let service: GooglePlaceService

  beforeEach(() => {
    service = new GooglePlaceService("test/place", apiKey)
  })

  const lanlPosition = new PlaceLocation(35.8440582, -106.287162)
  const lanlElevation = 2161.025390625

  test("build place with one first name", {skip: true}, async () => {
    const laln = await service.get("LANL")
    expect(laln?.locations).toEqual([lanlPosition])
    expect(laln?.elevation?.elevation).toBe(lanlElevation)
  })

  test("read", async () => {
    const fileName = service.getFileName(lanlPosition)
    const result = await service.read(fileName)
    expect(result.locations).toEqual([lanlPosition])
    expect(result.elevation?.elevation).toBe(lanlElevation)
  })
})

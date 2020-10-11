import {Timeline} from "./Timeline";
import {Country} from "../place/country/Country";
import {State} from "../place/State";
import {City} from "../place/City";
import {Gender, People} from "../people/People";
import {DateTime} from "./DateTime";
import {CountryCode} from "../place/country/CountryCode";
import {Army} from "../org/Army";
import {BirthEvent} from "./people/birth/BirthEvent";
import {OccupationEvent, OccupationRole} from "./people/occupation/OccupationEvent";

const hynek = new People(Gender.male, `Josef`, 'Hynek', `Allen`)
const usa = new Country(CountryCode.us)
const illinois = new State('Illinois', usa)
const chicago = new City('Chicago', illinois)
const birthEvent = new BirthEvent(hynek, new DateTime(new Date(1910, 4, 1)), chicago)
const usaf = new Army(Gender.neutral, 'USAF')
const occupationEvent = new OccupationEvent(hynek, OccupationRole.worker, usaf, new DateTime(new Date(1948, 3, 1)))

test('find event type', () => {
  const timeline = new Timeline([birthEvent, occupationEvent])
  const found = timeline.findOfType(BirthEvent)
  expect(found.length).toBe(1)
  expect(found.get(0)).toBe(birthEvent)
})

test('keep events sorted chronologically', () => {
  const timeline = new Timeline([occupationEvent, birthEvent])
  expect(timeline.length).toBe(2)
  expect(timeline.get(0)).toBe(birthEvent)
})



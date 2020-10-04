import {Timeline} from "./Timeline";
import {BornEvent} from "./BornEvent";
import {Country} from "../place/Country";
import {State} from "../place/State";
import {City} from "../place/City";
import {Gender, People} from "../people/People";
import {DateTime} from "./DateTime";
import {CountryCode} from "../place/CountryCode";

test('find event type', () => {
  const timeline = new Timeline()
  const hynek = new People(Gender.male, `Josef`, 'Hynek', `Allen`)
  const usa = new Country(CountryCode.us)
  const illinois = new State('Illinois', usa)
  const chicago = new City('Chicago', illinois)
  const bornEvent: BornEvent = new BornEvent(hynek, new DateTime(new Date(1910, 4, 1)), chicago)
  timeline.add(bornEvent)

  const found = timeline.findOfType(BornEvent)
  expect(found).toBe(bornEvent)
})



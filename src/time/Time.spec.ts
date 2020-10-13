import {DateTime} from "./DateTime";
import {BeforeTime} from "./BeforeTime";


test('compare 2 dates', () => {
  const date1 = new DateTime(new Date(1910, 3, 30));
  const date2 = new DateTime(new Date(1910, 4, 1));

  expect(date1.isBefore(date2)).toBe(true)
  expect(date2.isBefore(date1)).toBe(false)
  expect(date1.isAfter(date2)).toBe(false)
  expect(date2.isAfter(date1)).toBe(true)
})


test('compare date and some date before', () => {
  const birth = new DateTime(new Date(1910, 4, 1));
  const occupation = new BeforeTime(new DateTime(birth.date));

  expect(occupation.isBefore(birth)).toBe(true)
  expect(birth.isBefore(occupation)).toBe(false)
  expect(occupation.isAfter(birth)).toBe(false)
  expect(birth.isAfter(occupation)).toBe(true)
})


test('compare some dates before another', () => {
  const beforeA = new BeforeTime(new DateTime(new Date(1910, 3, 30)));
  const beforeB = new BeforeTime(new DateTime(new Date(1910, 4, 1)));

  expect(beforeA.isBefore(beforeB)).toBe(null)
  expect(beforeA.isAfter(beforeB)).toBe(null)
  expect(beforeB.isBefore(beforeA)).toBe(null)
  expect(beforeB.isAfter(beforeA)).toBe(null)
})



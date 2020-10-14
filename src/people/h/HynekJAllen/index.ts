import {Gender, People} from "../../People";
import {Company} from "../../../org/Company";
import {Countries} from "../../../place/country/Countries";
import {City} from "../../../place/City";
import {OccupationEvent, OccupationRole} from "../../../time/people/occupation/OccupationEvent";
import {DateTime} from "../../../time/DateTime";
import {BirthEvent} from "../../../time/people/birth/BirthEvent";
import {States} from "../../../place/state/States";
import {School, SchoolType} from "../../../org/School";
import {BeforeTime} from "../../../time/BeforeTime";
import {StudyEvent} from "../../../time/people/study/StudyEvent";

const hynek = new People(Gender.male, `Josef`, 'Hynek', `Allen`)
const chicago = new City('Chicago', States.illinois)
const birthDate = new DateTime(new Date(1910, 4, 1));
const father = new People(Gender.male, 'Joseph')
const cigarFactory = new Company(undefined, undefined, ['cigar'])
father.events.add(new BirthEvent(father, undefined, Countries.cs))
father.events.add(new OccupationEvent(father, OccupationRole.worker, cigarFactory, new BeforeTime(birthDate), Countries.cs))
const mother = new People(Gender.female, 'Bertha')
mother.events.add(new BirthEvent(mother, undefined, Countries.cs))
hynek.events.add(new BirthEvent(hynek, birthDate, chicago, father, mother))
const craneTech = new School(SchoolType.highSchool, 'craneTech')
hynek.events.add(new StudyEvent(hynek, craneTech, new BeforeTime(new DateTime(new Date(1927, 1, 1)))))

export default hynek

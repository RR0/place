import {Gender, People} from "./people/People";
import {BirthEvent} from "./time/BirthEvent";
import {City} from "./place/City";
import {User} from "./user/User";
import {Translator} from "./lang/Translator";
import {State} from "./place/State";
import {Country} from "./place/Country";
import {DateTime} from "./time/DateTime";
import {CountryCode} from "./place/CountryCode";
import {HTMLDocRenderer} from "./HTMLDocRenderer";

const user = new User('fr');

const hynek = new People(Gender.male, `Josef`, 'Hynek', `Allen`)
const usa = new Country(CountryCode.us);
const illinois = new State('Illinois', usa);
const chicago = new City('Chicago', illinois);
const father = new People(Gender.male);
const czechoslovakia = new Country(CountryCode.cs);
father.events.add(new BirthEvent(father, undefined, czechoslovakia))
const mother = new People(Gender.female);
mother.events.add(new BirthEvent(mother, undefined, czechoslovakia))
const bornEvent: BirthEvent = new BirthEvent(
  hynek,
  new DateTime(new Date(1910, 4, 1)),
  chicago, father, mother)
hynek.events.add(bornEvent);

const translator = new Translator(user.locale);

const docRenderer = new HTMLDocRenderer(translator)
const eventHTML = hynek.render(docRenderer)
const docHtml = `
${eventHTML}. 
Il fait ses études dans les écoles publiques de la ville, et sort du lycée technique Crane en 1927. 
Il entre alors à l'Université de Chicago, dont il obtient un B.S. en 1931, puis un doctorat en astrophysique en 1935</p>.
`;
const app = document.getElementById("app");
app!.innerHTML = docHtml;

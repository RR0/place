import {Gender, People} from "./people/People";
import {BornEvent} from "./time/BornEvent";
import {City} from "./place/City";
import {HTMLPlaceRenderer} from "./place/render/HTMLPlaceRenderer";
import {HTMLEventRenderer} from "./time/render/HTMLEventRenderer";
import {User} from "./user/User";
import {Translator} from "./lang/Translator";
import {State} from "./place/State";
import {Country} from "./place/Country";
import {HTMLPeopleRenderer} from "./people/render/HTMLPeopleRenderer";
import {HTMLTimeRenderer} from "./time/render/HTMLTimeRenderer";
import {DateTime} from "./time/DateTime";
import {CountryCode} from "./place/CountryCode";

const user = new User('fr');

const hynek = new People(Gender.male, `Josef`, 'Hynek', `Allen`)
const usa = new Country(CountryCode.us);
const illinois = new State('Illinois', usa);
const chicago = new City('Chicago', illinois);
const father = new People(Gender.male);
const czechoslovakia = new Country(CountryCode.cs);
father.events.add(new BornEvent(father, undefined, czechoslovakia))
const mother = new People(Gender.female);
mother.events.add(new BornEvent(mother, undefined, czechoslovakia))
const bornEvent: BornEvent = new BornEvent(
  hynek,
  new DateTime(new Date(1910, 4, 1)),
  chicago, father, mother)
hynek.events.add(bornEvent);

const translator = new Translator(user.locale);
const placeRenderer = new HTMLPlaceRenderer(translator);
const peopleRenderer = new HTMLPeopleRenderer(translator, placeRenderer);
const timeRenderer = new HTMLTimeRenderer(translator);
const eventRenderer = new HTMLEventRenderer(peopleRenderer, placeRenderer, timeRenderer, translator);

let eventStr = ''
for (const event of hynek.events) {
  eventStr += event.render(eventRenderer)
}
const docHtml = `
<h1>${peopleRenderer.render(hynek)}</h1>
<p>${eventStr} de parents tchécoslovaques. 
Il fait ses études dans les écoles publiques de la ville, et sort du lycée technique Crane en 1927. 
Il entre alors à l'Université de Chicago, dont il obtient un B.S. en 1931, puis un doctorat en astrophysique en 1935</p>.
`;
const app = document.getElementById("app");
app!.innerHTML = docHtml;

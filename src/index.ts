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

const user = new User('fr');
const hynek = new People(Gender.male, `Josef`, 'Hynek', `Allen`);
const usa = new Country('USA');
const illinois = new State('Illinois', usa);
const chicago = new City('Chicago', illinois);
const bornEvent: BornEvent = new BornEvent(hynek, new Date(1910, 4, 1), chicago)
hynek.events.add(bornEvent);

const placeRenderer = new HTMLPlaceRenderer();
const peopleRenderer = new HTMLPeopleRenderer();
const translator = new Translator(user.locale);
const eventRenderer = new HTMLEventRenderer(peopleRenderer, placeRenderer, translator);

const event0 = hynek.events.get(0) as BornEvent;

const docHtml = `
<h1>${peopleRenderer.render(hynek)}</h1>
<p>${eventRenderer.renderBorn(event0)} de parents tchécoslovaques. 
Il fait ses études dans les écoles publiques de la ville, et sort du lycée technique Crane en 1927. 
Il entre alors à l'Université de Chicago, dont il obtient un B.S. en 1931, puis un doctorat en astrophysique en 1935</p>.
`;
const app = document.getElementById("app");
app!.innerHTML = docHtml;

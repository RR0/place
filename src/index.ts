import {People} from "./people/People";
import {BornEvent} from "./time/BornEvent";
import {City} from "./place/City";
import {HTMLPlaceRenderer} from "./place/render/HTMLPlaceRenderer";
import {HTMLEventRenderer} from "./time/render/HTMLEventRenderer";
import {User} from "./user/User";
import {Translator} from "./lang/Translator";

const user = new User('fr');
const hynek = new People();
hynek.firstName = `Josef`;
hynek.middleName = `Allen`;
hynek.lastName = "Hynek";
const bornEvent: BornEvent = new BornEvent(
  hynek,
  new Date(1910, 4, 1),
  new City('Chicago', 'Illinois')
)
hynek.events.push(bornEvent);

const event0 = hynek.events[0] as BornEvent;
const placeRenderer = new HTMLPlaceRenderer();
const translator = new Translator(user.locale);
const eventRenderer = new HTMLEventRenderer(placeRenderer, translator);
const docHtml = `
<h1>${hynek.name}</h1>
<p>${eventRenderer.renderBorn(event0)} de parents tchécoslovaques. 
Il fait ses études dans les écoles publiques de la ville, et sort du lycée technique Crane en 1927. 
Il entre alors à l'Université de Chicago, dont il obtient un B.S. en 1931, puis un doctorat en astrophysique en 1935</p>.
`;
const app = document.getElementById("app");
app!.innerHTML = docHtml;

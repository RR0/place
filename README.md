# @rr0/place

[![RR0](https://circleci.com/gh/RR0/place.svg?style=svg)](https://app.circleci.com/pipelines/github/RR0/place)

Places representation API.

## Installation

```
npm install @rr0/place --save
```

## Design

Once place are represented using assembled business objects
(`City`, `State`, `Country`, or several `Place` subtypes), they can be provided as parameters to some `Renderer`, which
will use a `Translator` to convert them to text (or HTML markup, etc.).

## Example

Say we want to render the timeline of some people:

```js
import {grammar_fr, Translation} from "@rr0/lang"
import {messages_fr} from "lang/Messages_fr"
import {City, States, HTMLPlaceRenderer} from '@rr0/place';

const translation = new Translation('fr', grammar_fr, messages_fr)
const renderer = new HTMLPlaceRenderer(translation)
const city = new City('Chicago', States.illinois)
const html = renderer.renderCity(city)
```

will return in `html`:

```html
Chicago (Illinois, États-Unis)
```

Change the parameters of the `Translator` to a `en` locale and to use
`messages_en`, and `grammar_en` and change the custom translation to:

then you will get instead:

```html
Chicago (Illinois, USA)
```

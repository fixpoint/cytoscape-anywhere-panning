# cytoscape-anywhere-panning

## Description

Allow panning from nodes/edges ([demo](https://lambdalisue.github.io/cytoscape-anywhere-panning))

## Dependencies

 * Cytoscape.js ^3.2.0


## Usage instructions

Download the library:
 * via npm: `npm install cytoscape-anywhere-panning`,
 * via unpkg: `https://unpkg.com/cytoscape-anywhere-panning/dist/index.js`

Import the library as appropriate for your project:

ES import:

```js
import cytoscape from 'cytoscape';
import anywherePanning from 'cytoscape-anywhere-panning';

cytoscape.use( anywherePanning );
```

CommonJS require:

```js
let cytoscape = require('cytoscape');
let anywherePanning = require('cytoscape-anywhere-panning');

cytoscape.use( anywherePanning ); // register extension
```

AMD:

```js
require(['cytoscape', 'cytoscape-anywhere-panning'], function( cytoscape, anywherePanning ){
  anywherePanning( cytoscape ); // register extension
});
```

Plain HTML/JS has the extension registered for you automatically, because no `require()` is needed.


## API

```js
cy.anywherePanning();

const enabled = true;
cy.anywherePanning(function() {
    return enabled;
});
```

## Build targets

* `npm run build` : Build `./src/**` into `dist/index.js`
* `npm run lint` : Run eslint on the source

## Publishing instructions

This project is set up to automatically be published to npm and bower.  To publish:

1. Build the extension : `npm run build`
1. Commit the build : `git commit -am "Build for release"`
1. Bump the version number and tag: `npm version major|minor|patch`
1. Push to origin: `git push && git push --tags`
1. Publish to npm: `npm publish .`

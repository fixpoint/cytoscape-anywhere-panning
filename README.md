# cytoscape-anywhere-panning

**NOTE** You may not need this plugin because of [this commit](https://github.com/cytoscape/cytoscape.js/commit/bd4f56ab7fc8b2ff9e5a81c4f1beedda098fb549).

**NOTE** The API has drastically changed from v0.4.0 to v0.5.0.

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

cy.anywherePanning({
    // Drag threshold in pixel.
    // The panning starts only after the distance between start cursor position
    // to the current cursor position beyond the "threshold".
    threshold: 10,

    // A function list which receive cytoscape.EventObject and returns boolean.
    // When non functions return true, anywhere panning is ignored.
    // Note that when no activators are specfied, the default activators like
    // below is used.
    activators: [
        function(evt) {
            if (evt instanceof MouseEvent) {
                // Enable when user drag with left button
                return evt.originalEvent.button === 0;
            }
            else if (evt instanceof TouchEvent) {
                // Enable when user drag with one finger
                return evt.originalEvent.touches.length === 1;
            }
            return false;
        },
    ],
});


// An event which is emitted when panning has started.
// The second argument is an event for "vmousedown".
cy.on('awpanstart', function(evt, evt2) {
    panning = 'started';
});

// An event which is emitted when the cursor has moved during panning.
// The second argument is an event for "vmousemove".
cy.on('awpanmove', function(evt, evt2) {
    panning = 'moving';
});

// An event which is emitted when the panning has ended.
// The second argument is an event for "vmouseup".
cy.on('awpanend', function(evt, evt2) {
    panning = 'ended';
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

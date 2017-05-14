# API View

## What is it?

API viewer can be used as a quick documentation or demo for apis.

RxJS is used more like a ponyfill for Observable, Observable is part of ES7, hope will be part of standards.

### Tooling

The tooling used:

- `webpack` to modularise your Javascript code
- `babel` to utilise ES6+ and Stage-3 features
- `node-sass` to modularise your styling via SASS
- `eslint` to make sure your code meets the standards
- `karma`, `mocha` and `chai` to help you write and run your unit tests in various browsers

### Architetture

Heavily inspired by Flux, use a state for webapps and unidirectonal data flow. Catch is not using React or Redux. 

Its look like overkill for samll app but definitely payoff as app grows.

Each UI components mainly have three exports, 
- template
- an observable
- actions (side effects)

This is more an experimental architecture, on its early stages which needs more refining and testing.

### Install

To start developing, fork and clone the project first, then make sure you have Node.js *4.x* or higher.

You'll need `yarn` to install the dependencies we locked in via the `yarn.lock` checked in to this repo.

You can install `yarn` if you haven't done so via `brew install yarn`.

Once you have `yarn` installed, just run

```
$ yarn install
```

from the project folder.

### Helpful commands

You'll have the following CLI commands available:

- `yarn run dev` running `webpack-dev-server` and serving the project on `localhost`
- `yarn run test -- --browsers Chrome,Safari` running unit tests via `karma` e.g. in Chrome and Safari
- `yarn run lint` running `eslint` against your source (and config) files
- `yarn run build` running `webpack` build
- `yarn run serve` serving the `build/` folder contents

Whilst developing, you'll most likely to run `yarn run dev` in a terminal window, `webpack` will take care of everything, bundling your project to an in-memory `build/` folder and serving it from there. Also, `yarn run test` in another terminal window to see your tests running / failing on every file change which comes very handy when doing TDD.

If you'd like to see the output as files, just run `yarn run build` and the result will be found under a real `build/` folder.

### TODO
- Test on real api server
- Test on many more http methods like post, put, delete etc
- Finish the test cases
- Split bundlejs into vendor and app
- Size of final main.js is now 131K, without 'babel-polyfill' it is 47K, find right config for babel-polyfill to import only what needed or remove babel-polyfill and use corejs to import only ES6 features used.


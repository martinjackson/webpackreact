# webpackreact

![react](img/react-logo.png =60x60)
![es6](img/es6-logo.png =60x60)
![babel](img/babel.svg =60x60)
![webpack](img/webpack-logo.svg =60x60)

A 'zero config' webpack tool preconfigured for React, ES6, Babel.

This gives a briefer output that webpack.

Suitable for use in VSCode's terminal window.

## <u>How to use</u>

```bash
npm install webpackreact --save-dev
```

in your package.json

```json
 "scripts": {
    "setup": "yarn && cd server && yarn",
    "start": "webpackreact && cd server && npx babel-watch server.js 3001 ",
    "build:front-end": "webpackreact --prod",
  },
```

This will pack your frontend React/ES6 code `./src/*.js` into `./server/public/bundle.js`

## Options

- Option 1: `webpackreact`   -or-   `webpackreact --dev`   for building into live debugging
- Option 2: `webpackreact --prod`   for minimized production bundle.

_If you have NODE_ENV set to development_ --dev is not needed

_If you have NODE_ENV set to production_ --prod is not needed

without NODE_ENV or a command line switch --dev is the default

This tool uses webpack 4.16.  

## To remove this tool from a project's build

- copy this project's [webpack.config.js](https://raw.githubusercontent.com/martinjackson/webpackreact/master/webpack.config.js)
- run webpack directly `webpack -p --mode production  --progress`

[DEPRECATED]
Please consider using [create-simple-react](https://www.npmjs.com/package/simple-react-app) instead. 

This remains for research purposes only. 
   Martin Jackson <martin.a.jackson@gmail.com>

# webpackreact

<img alt="react" src='img/react-logo.png' width=60 /><img alt="es6" src='img/es6-logo.png' width=60 /><img alt="babel" src='img/babel-logo.svg' width=60 /><img alt="webpack" src='img/webpack-logo.svg' width=60 />

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

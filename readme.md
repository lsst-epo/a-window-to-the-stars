## A Window to the Stars
#### An LSST Formal Investigation

> This investigation explores properties of stars through images, interactive graphs, and QA sections.

>##### Essential Questions
>- How can an H-R Diagram be used to estimate the ranges of star properties (temperatures, sizes, masses, lifetimes, and energy outputs)?
>- What are the properties of the most common star type observed in our galaxy?
>- Is the Sun an average star? Is it the most common kind of star?


Check out [Production](https://lsst-epo.github.io/a-window-to-the-stars).
Check out [Staging](https://a-window-to-the-stars.netlify.com/#/).

Dev envirnoment inspired by [homegrown Webpack-React starter project](https://github.com/lsst-epo/webpack-react-boilerplate).

### Table of contents

[Project structure](#project-structure)

[Installation](#installation)

[Deploying](#deploying)

[Configuration](#configuration)

[Development Dependencies](#development-dependencies)

[General Dependencies](#general-dependencies)

### Project structure

```
build/
src/
|- index.jsx _______________________________ # application entry
|- App.jsx _________________________________ # application init
|  |- components/___________________________ # react components
|  |- assets/
|    |- images/_____________________________ # currently webpack DOES NOT pass these files thru (must be included through js)
|    |- static-data/_________________________# currently webpack DOES NOT pass these files thru (must be included through js)
|    |- stylesheets/
|       |- STACSS/ _________________________ # global Structure, Typography, and Appearance styles
|       |- components/ _____________________ # should generally correspond to React Compoents
```

### Installation

1- Clone the repo: `git clone https://github.com/lsst-epo/a-window-to-the-stars.git`

2- Install npm packages: `yarn`

### Development

1- Start dev server: `yarn start` (or `yarn start-dash` to run webpack-dev-server with [webpack dashboard](https://github.com/FormidableLabs/webpack-dashboard))

2- Unit testing will watch all your changes in the test files as well as create coverage folder: `yarn test`

3- Build and bundle assets for Production: `yarn build`

4- Build and bundle assets for Staging: `yarn netflify-deploy`

### Deploying

#### Production:

Deploy to Production (Github Pages) via [gh-pages module](https://github.com/tschaub/gh-pages): `yarn deploy`

#### Staging:

Push changes to master, or create pull request to trigger a build/deploy to [Continuous Deployment to Netlify](https://www.netlify.com/docs/continuous-deployment/)

### Configuration

```
Webpack
|- webpack.config.js _______________________ # merging common and environment specific configs
|- paths.js ________________________________ # Webpack paths needed
|- webpack.common.js _______________________ # common Webpack config
|- webpack.dev.js __________________________ # development config
|- webpack.prod.js _________________________ # production config

BrowserList
|- .browserlistrc __________________________ # BrowserList config

Babel
|- babel.config.js _________________________ # Babel config

PostCSS
|- postcss.config.js _______________________ # PostCSS config

linting
|- .eslintrc _______________________________ # ESlint rules to apply
|- .eslintignore ___________________________ # what not to ESlint
|- .prettierrc _____________________________ # Prettier config (consumed by eslint)
|- .stylelintrc ____________________________ # Stylelint config

testing
|- setupTests.js ___________________________ # Enzyme config

IDE
|- .editorconfig ___________________________ # coding styles definitions

git
|- .gitignore ______________________________ # what not to track
|- .PULL_REQUEST_TEMPLATE.md _______________ # if you want to provide a PR template
```

#### Development Dependencies

- [Webpack 4](https://github.com/webpack/webpack)
- [Babel 7](https://github.com/babel/babel) [ transforming JSX, ES6, ES7, and ES8 ]
- [Jest](https://github.com/facebook/jest) [ Unit test]
- [Enzyme](http://airbnb.io/enzyme/) for UI testing.
- [Eslint](https://github.com/eslint/eslint/) with airbnb config
- [Stylelint](https://stylelint.io/) for linting SCSS/CSS
- [Prettier](https://github.com/prettier/prettier) [ JS formatter ]
- [EditorConfig](https://editorconfig.org/) [ Code Style definitions ]
- [STACSS](https://github.com/castiron/STACSS) [ SCSS architecture ]
- [Style Loader](https://github.com/webpack-contrib/style-loader) & [CSS Loader](https://github.com/webpack-contrib/css-loader) & [SASS-loader](https://github.com/webpack-contrib/sass-loader) & [PostCSS](https://github.com/postcss/postcss) with [Autoprefixer](https://github.com/postcss/autoprefixer)
- [Browserslist](https://github.com/browserslist/browserslist) [ Share target browsers between different front-end tools, like Autoprefixer, Stylelint and babel-preset-env ]
- [React hot loader](https://github.com/gaearon/react-hot-loader)
- [Webpack dev server](https://github.com/webpack/webpack-dev-server)
- [gh-pages](https://github.com/tschaub/gh-pages) [Gihub Pages deployment]

#### General Dependencies
- [React](https://github.com/facebook/react) `16.8`
- [prop-types](https://github.com/facebook/prop-types) `16.8`
- [React Router](https://github.com/ReactTraining/react-router) `5.0.1`
- [Reactn](https://github.com/CharlesStover/reactn) `2.1.4`
- [Axios](https://github.com/axios/axios) `0.19.0`
- [Local Storage](https://github.com/bevacqua/local-storage) `2.0.0`
- [Lodash](https://github.com/lodash/lodash)
- [D3](https://github.com/d3/d3) `5.9.2`

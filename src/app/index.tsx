import fs from 'fs';
import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import App from './components/App';
import { loadPlugins } from './utils/plugins';
import typography from '../shared/mixins/typography';
import { getPath } from '../shared/utils/paths';

const robotoLight = require('../shared/fonts/Roboto-Light.ttf');
const robotoMedium = require('../shared/fonts/Roboto-Medium.ttf');
const robotoRegular = require('../shared/fonts/Roboto-Regular.ttf');

declare const module: any;

injectGlobal`
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url(${robotoRegular}) format('truetype');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: url(${robotoMedium}) format('truetype');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    src: url(${robotoLight}) format('truetype');
  }
  
  body {
    user-select: none;
    cursor: default;
    ${typography.body1()}
    margin: 0;
    padding: 0;
  }

  @keyframes nersent-ui-preloader-rotate {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes nersent-ui-preloader-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
    }
  }

  * {
    box-sizing: border-box;
  }
`;

async function setup() {
  if (!fs.existsSync(getPath('plugins'))) {
    fs.mkdirSync(getPath('plugins'));
  }

  await loadPlugins();

  ReactDOM.render(<App />, document.getElementById('app'));
}

setup();

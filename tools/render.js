/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import glob from 'glob';
import { join, dirname } from 'path';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from '../components/Html';
import task from './lib/task';
import fs from './lib/fs';

const DEBUG = !process.argv.includes('release');
const timestamp = Date.now();

function getPages() {
  return new Promise((resolve, reject) => {
    glob('**/*.js', { cwd: join(__dirname, '../pages') }, (err, files) => {
      if (err) {
        reject(err);
      } else {
        const result = files.map(file => {
          let path = '/' + file.substr(0, file.lastIndexOf('.'));
          if (path === '/index') {
            path = '/';
          } else if (path.endsWith('/index')) {
            path = path.substr(0, path.lastIndexOf('/index'));
          }
          return { path, file };
        });
        resolve(result);
      }
    });
  });
}

async function renderManifest() {
  const content = (`
    CACHE MANIFEST

    # ${new Date(timestamp).toLocaleString()}
    3p-libraries/fastclick.js
    3p-libraries/inobounce.js
    tile.png
    https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=AM_CHTML
    https://cdn.mathjax.org/mathjax/2.7-latest/config/AM_CHTML.js?V=2.7.0
    app.js?${timestamp}
    1.app.js
    2.app.js

    # The * indicates that the browser should allow all connections to non-cached
    # resources from a cached page.
    NETWORK:
    *
  `)
    .split('\n')
    .map(line => line.replace(/^\s+/g, ''))
    .join('\n');

  content.split('\n').forEach(line => {
    console.log('    ' + line);
  });
  await fs.writeFile(join(__dirname, '../build/offline.appcache'), content);
}

async function renderPage(page, component) {
  const data = {
    body: ReactDOM.renderToString(component),
    timestamp,
  };
  const file = join(__dirname, '../build', page.file.substr(0, page.file.lastIndexOf('.')) + '.html');
  const html = '<!doctype html>\n' + ReactDOM.renderToStaticMarkup(<Html debug={DEBUG} {...data} />);
  await fs.mkdir(dirname(file));
  await fs.writeFile(file, html);
}

export default task(async function render() {
  const pages = await getPages();
  const { route } = require('../build/app.node');
  for (const page of pages) {
    await route(page.path, renderPage.bind(undefined, page));
  }

  await renderManifest();
});

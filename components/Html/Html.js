/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { PropTypes } from 'react';
import GoogleAnalytics from '../GoogleAnalytics';
import config from '../../config';

function Html({ title, description, body, debug, timestamp }) {
  const mathjaxConfig = `MathJax.Hub.Config({
        asciimath2jax: {
          delimiters: [['%%', '%%'], ['$$', '$$']]
        },
        CommonHTML: { linebreaks: { automatic: true } },
        "HTML-CSS": { linebreaks: { automatic: true } },
        SVG: { linebreaks: { automatic: true } }
  })`;

  return (
    <html manifest="offline.appcache" className="no-js" lang="">
      <head>
        <meta charset="utf-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>{title || config.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="icon" href="cards-stack-32x32.png" />
        <script src='3p-libraries/inobounce.js' />
        <script src='3p-libraries/fastclick.js' />
        <script src={'app.js?' + timestamp} />

        {/* Courtesy of https://megatags.co */}
        {/* COMMON TAGS */}
        {/* Search Engine */}
        <meta name="description" content={description || config.description} />
        <meta name="image" content="https://superflash.cards/cards-stack.svg" />
        {/* Schema.org for Google */}
        <meta itemprop="name" content={title || config.title} />
        <meta itemprop="description" content={description || config.description} />
        <meta itemprop="image" content="https://superflash.cards/cards-stack.svg" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title || config.title} />
        <meta name="twitter:description" content={description || config.description} />
        <meta name="twitter:site" content="@andrewhallagan" />
        <meta name="twitter:image:src" content="https://superflash.cards/cards-tile-wide-1024x512.png" />
        {/* Open Graph general (Facebook, Pinterest & Google+) */}
        <meta name="og:title" content={title || config.title} />
        <meta name="og:description" content={description || config.description} />
        <meta name="og:image" content="https://superflash.cards/cards-tile-wide-1200x630.png" />
        <meta name="og:url" content="https://superflash.cards" />
        <meta name="og:site_name" content={title || config.title} />
        <meta name="og:type" content="website" />

      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: body }} />
        <script type="text/x-mathjax-config" dangerouslySetInnerHTML={{ __html: mathjaxConfig }} />
        <script src='https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=AM_CHTML'/>
      </body>
    </html>
  );
}

Html.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  body: PropTypes.string.isRequired,
  debug: PropTypes.bool.isRequired,
};

export default Html;

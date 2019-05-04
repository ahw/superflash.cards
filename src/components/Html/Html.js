/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { PropTypes } from 'react';
import GoogleAnalytics from '../GoogleAnalytics';
import config from '../../config';

function Html({ title, description, body, debug, timestamp }) {
    // The HTML-CSS and SVG options are irrelevant since we're using the
    // CommonHTML output processor. Leaving them in for reference though.
    const mathjaxConfig = `
        MathJax.Hub.Config({
            asciimath2jax: {
                // Array of pairs of strings that are to be used as math delimiters.
                // The first in each pair is the initial delimiter and the second is
                // the terminal delimiter. You can have as many pairs as you want.
                // For example,
                delimiters: [['%%', '%%'], ['$$', '$$']],

                // This controls whether asciimath2jax inserts MathJax_Preview spans
                // to make a preview available, and what preview to use, when it
                // locates in-line or display mathematics in the page. The default is
                // "AsciiMath", which means use the ASCIIMath code as the preview
                // (which will be visible until it is processed by MathJax). Set to
                // "none" to prevent previews from being inserted (the math will
                // simply disappear until it is typeset). Set to an array containing
                // the description of an HTML snippet in order to use the same preview
                // for all equations on the page.
                preview: 'none',
            },
            CommonHTML: { linebreaks: { automatic: true } },
            "HTML-CSS": { linebreaks: { automatic: true } },
            SVG: { linebreaks: { automatic: true } }
        });

        // -- MathJax.Hub.Register.MessageHook("New Math", function (message) {
        // --     var script = MathJax.Hub.getJaxFor(message[1]).SourceElement();
        // --     // console.log("%c" + message.join(" ") + ": '" + script.text + "'", "color:blue;font-size:20pt");
        // --     // console.log("%cArgs", "color:red", arguments);
        // -- });

        // -- MathJax.Hub.Register.MessageHook("End Process", function (message) {
        // --     // console.log("%c" + message.join(" ") + ": '" + script.text + "'", "color:blue;font-size:20pt");
        // --     console.log("%cArgs", "color:red", arguments);
        // -- });

        // -- MathJax.Hub.signal.Interest(function (message) {
        // --     console.log("%cHub", "color:green", message)
        // -- });
    `;

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
                <meta name="twitter:image:src" content="https://superflash.cards/cards-stack.svg" />
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
                <script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=AM_CHTML'/>
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

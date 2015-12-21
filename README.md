This is a static flash card app built on top of a robust "starter kit"
developed over at [React Static
Boilerplate](https://github.com/koistya/react-static-boilerplate). Refer to that
project's README for all the details.

At the moment this project is a work in progress. It works best on a phone and in fact has a weird interaction mode on desktop.

# Features
- All of your flash cards are stored in a public Google Doc spread sheet.
- You create/edit/re-arrange/remove them at will and just reload the page to see your changes.
- Tracks whether you last answered a card correctly or incorrectly.
- For each deck, shows the total number of correctly-answered cards and the total number of incorrectly-answered cards with state-of-the-art red and green bars.
- The red is a sophisticated Boston University Red (#CC0000) since #FF0000 is dumb.
- **Coming soon!** While flipping through a deck, skips ahead to cards that were answered incorrectly or not answered at all.
- Once all cards have been answered correctly, deck goes into "re-run" mode in which all cards are circulated in order again. If any cards were answered incorrectly in "re-run" mode, the deck will go back to skipping ahead to those incorrectly-answered cards first once it completes a full cycle in "re-run" mode.
- Works offline! You of course need to be online for the very first visit in order to load the app core as well as your Google doc flash cards, but subsequent visits will not require network access. Obviously if you update the Google doc containing your cards, you will need network access to retrieve these latest edits. If you remain offline, your card data remains whatever version was last fetched while online.
- Information about correct and incorrect answers is maintained while offline.

<!--
# How To Use
## Create a Google Spreadsheet

![Google Doc URL](https://pd93f014.s3.amazonaws.com/google-doc-id-1.svg)
-->

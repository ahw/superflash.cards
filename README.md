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
- The red is a sophisticated Boston University Red (#CC0000).
<!-- - **Coming soon!** While flipping through a deck, skips ahead to cards that were answered incorrectly or not answered at all. -->
<!-- - Once all cards have been answered correctly, deck goes into "re-run" mode in which all cards are circulated in order again. If any cards were answered incorrectly in "re-run" mode, the deck will go back to skipping ahead to those incorrectly-answered cards first once it completes a full cycle in "re-run" mode. -->
- Works offline! Use it on a plane! Or a train! You of course need to be online for the very first visit in order to load the app core as well as your Google doc flash cards, but subsequent visits will not require network access. Obviously if you update the Google doc containing your cards, you will need network access to retrieve these latest edits. If you remain offline, your card data remains whatever version was last fetched while online.
- Information about correct and incorrect answers is maintained while offline.

# How To Use: The Short Version

1. Create a Google spreadsheet and make note of the id. It's the long
   alphanumeric string between `/d/` and `/edit/` in the document's URL.
2. Format the sheet with three columns: **tag**, **question**, **answer**, and
   use those exact strings as the column headers in cells A1, A2, and A3,
   respectively.
3. Make the sheet publicly accessibly by clicking **File > Publish to the
   web...**
4. Access your flash cards by visiting https://superflash.cards?id=YOUR_DOC_ID


# How To Use: With Screenshots
### Create a Google Spreadsheet, Note the Id

![Google Sheet URL](https://pd93f014.s3.amazonaws.com/google-doc-id-1.svg)

### Format Your Sheet Like This
_Only the first three columns are important._

![Google Sheet Format](https://pd93f014.s3.amazonaws.com/google-doc-publish-to-web-screenshot-1.png)

### Publish To Web
**Warning! This will make your sheet public to the world!**

![Google Sheet Publish To Web](https://pd93f014.s3.amazonaws.com/google-doc-publish-to-web-screenshot.png)

### Go To Your Flash Cards!

Change the id in this URL to yours!

https://superflash.cards/?id=YOUR_DOC_ID_123

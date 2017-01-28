This is a static flash card app built on top of a robust "starter kit"
developed over at [React Static
Boilerplate](https://github.com/koistya/react-static-boilerplate). Refer to that
project's README for all the details.

At the moment this project is a work in progress. It works best on a phone and in fact has a weird interaction mode on desktop.

# Features
- All of your flash cards are stored in a public Google Doc spread sheet, which
  means you can create/edit/re-arrange/remove them at will and just reload the
  page to see your changes.
- Works offline! Use it on a plane! Or a train! You of course need to be online
  for the very first visit in order to load the app core as well as your Google
  doc flash cards, but subsequent visits will not require network access.
  Obviously if you update the Google doc containing your cards, you will need
  twork access to retrieve these latest edits. If you remain offline, your
  card data remains whatever version was last fetched while online.
- Information about which cards have been answered correctly and incorrectly is
  maintained in local storage and works offline.

# How To Use: The Short Version

1. Create a Google spreadsheet and make note of the id. It's the long
   alphanumeric string between `/d/` and `/edit/` in the document's URL.
2. Format the sheet with three columns: **tag**, **question**, **answer**, and
   use those exact strings as the column headers in cells A1, B1, and C1,
   respectively.
3. Make the sheet publicly accessibly by clicking **File > Publish to the
   web...**
4. Access your flash cards by visiting http://flash-cards-static-app.s3-website-us-east-1.amazonaws.com/?id=YOUR_DOC_ID
   
 <!--
 https://superflash.cards?id=YOUR_DOC_ID
 -->


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

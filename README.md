# Super Flash Cards
![Super Flash Cards](https://pd93f014.s3.amazonaws.com/super-flash-cards-screenshot.jpg)

*It's a flash card web app that runs off a Google doc and it works offline.* **[https://superflash.cards](https://superflash.cards)**

# Features
## :bar_chart: Reads card info from a Google doc
All of your flash cards are stored in a public Google Doc spread sheet, which
means you can create/edit/re-arrange/remove them at will and just reload the
superflash.cards/?id=xyz page to see your changes. The spread sheet contains
three columns: deck name, question text, and answer text.

## :airplane: Works offline
Works offline! Use it on a plane, or a train! You *do* need to be online for the
very first visit in order to load the app itself along with all the flash card data
from your Google doc, but subsequent visits will not require network access.
If you update the Google doc containing your cards, you *will* need network
access to retrieve these latest edits. If you remain offline, your card data
remains whatever version was last fetched while online.

## :white_check_mark: Remembers your progress
Information about which cards have been answered correctly and incorrectly is
maintained in local storage in your browser, which means it's preserved across
page reloads within that same browser. Note that any time you switch to a
different device (for example from a phone to a laptop), you are implicitly
switching browsers and will *not* see your progress synchronized between those
browsers.

## :pencil2: Markdown support
Text in the **question** and **answer** columns of your flash card spreadsheet
is parsed as Markdown, which means you can type \*\*bold\*\* and it will come
out **bold**. See https://en.wikipedia.org/wiki/Markdown if for some reason you
don't know about Markdown.

## :heavy_division_sign: AsciiMath notation
Use any AsciiMath notation between two `%` signs and it will render as a
properly typeset mathematical expression using MathJax. See
http://asciimath.org/ for all the things you can do with AsciiMath.
**Important:** you must sandwich your AsciiMath between two `%` signs, **not**
two <code>\`</code> signs, which is the default. The reason here is because
<code>\`</code> is already a reserved character in Markdown.

**For example, this AsciiMath text...**

> **%Delta C ~~ (del C)/(del v\_1)\*Delta v\_1 + (del C)/(del v\_2)\*Delta v\_2 + cdots + (del C)/(del v\_n)\*Delta v\_n%**

**...becomes this subliminal beauty**

![Cost Function Approximation](https://s3.amazonaws.com/pd93f014/math-equation-1.png)

## :page_facing_up: Other custom preprocessing (newlines, blank spaces, etc.)
In addition to Markdown and AsciiMath parsing, there are a few additional custom
preprocessing steps to make life easier.

1. :leftwards_arrow_with_hook: :leftwards_arrow_with_hook: Three consecutive spaces are replaced with two newline characters.
2. :leftwards_arrow_with_hook: Two consecutive spaces are replaced with one newline character.
3. :leftwards_arrow_with_hook: "\n" is replaced with a single newline
   character (in case you don't want to mess around with lots of spaces)
4. :arrow_right: "\t" is replaced with four spaces (i.e., a "tab")
5. :question:...:question: Three consecutive underscores next to three consecutive periods
   ("\_\_\_...") are replaced with a single blank line that has a "&hellip;"
   symbol hovering just above it. This is so you can write questions with blanks
   in them, where the blank represents multiple words to be filled in. *Water is
   composed of \_\_\_...*
6. :question: Three consecutive underscores ("\_\_\_") are replaced with a blank
   line, about the width of a 5 letter word. This is so you can write questions
   with blanks in them, where the blank represents just a single missing word.
   *Water is composed of two parts \_\_\_ and one part \_\_\_.*

# Caveats
:construction: Consider this a work in progress. It works best on a phone and
in fact has a weird interaction mode on desktop.

:repeat: You can only cycle one-way through a deck. You can't automatically
skip over cards you don't know, and you can't jump to certain cards. You can't
move backwards through a deck. You can't Jeopardy-style invert the cards and
see the answer first.

# How To Create Your Own Cards: The Short Version

1. Create a Google spreadsheet and make note of the id. It's the long
   alphanumeric string between `/d/` and `/edit/` in the document's URL.
2. Format the sheet with three columns: **deck**, **question**, **answer**, in
   that order. You may want to use those exact strings as the column headers in
   cells A1, B1, and C1, respectively.
3. Make the sheet publicly accessible by clicking **File > Publish to the
   web...**. To be clear, this is doing exactly what it sounds like, it's
   making your flash cards publicly accessible to everyone on the internet. Do
   not include information in this spreadsheet which you wouldn't mind anyone
   in the world seeing.
4. Access your flash cards by visiting https://superflash.cards/?id=YOUR\_DOC\_ID
   
# How To Create Your Own Cards: With Screenshots
### 1. Create a Google Spreadsheet, Note the Id
![Google Sheet URL](https://pd93f014.s3.amazonaws.com/google-doc-id-1.svg)

### Format Your Sheet Like This
_Only the first three columns are important._
![Google Sheet Format](https://pd93f014.s3.amazonaws.com/google-doc-publish-to-web-screenshot-1.png)

### 2. Publish To Web
**Warning! This will make your sheet public to the world!**
![Google Sheet Publish To Web Menu Item](https://pd93f014.s3.amazonaws.com/google-doc-publish-to-web-menu-item-selected.png)
![Google Sheet Publish To Web Popup](https://pd93f014.s3.amazonaws.com/google-doc-publish-to-web-popup.png)

### 3. Go To Your Flash Cards
**https://superflash.cards/?id=YOUR_DOC_ID**

# Credits
*This is a static app built on top of a robust "starter kit" developed over at
[React Static Boilerplate](https://github.com/koistya/react-static-boilerplate).
Refer to that project's README for all the details.*

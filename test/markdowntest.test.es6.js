/**
 * This isn't a real unit test file. It's just a one-off script
 */
// const markdown = require('markdown').markdown;
const MarkdownIt = require('markdown-it');

let mdit = new MarkdownIt()
// let mdrender = console.log.bind(console, mdit.render.apply(mdit, arguments))
function mditrender(text) {
  text = text.replace(/\s\s\s/g, "\n\n")
    .replace(/\s\s/g, "\n")
    .replace(/\\t/g, '    ')

  let result = mdit.render(text)
  console.log(result)
  return result
}

function md(text) {
  // text = text.replace(/```(.+)```/g, '<pre>$1</pre>')
  text = text.replace(/\s\s\s/g, "\r\n\r\n")
    .replace(/\s\s/g, "\r\n")
    .replace(/\\t/g, '    ')

  let html = markdown.toHTML(text)
  console.log(html)
  return html
}

// console.log('markdown')
// console.log('--------')
// md('1. log(XY) = log(X) + log(Y)  2. log(X/Y) = log(X) - log(Y)  3. another thing  4. last')
// md('Differences between   1. application/x-www-form-urlencoded  2. multipart/form-data  3. text/plain')
// md("```  var xhr = new XMLHttpRequest();  xhr.open('GET', '/fun/web-fundamentals/file.txt');  xhr.onreadystatechange = function(e) {  \tif (xhr.readyState === 2) {  \t\tconsole.log('Received headers');  \t}  \tif (xhr.readyState === 4) {  \t\tconsole.log('Request is complete. Response:', xhr.responseText);  \t}  }  xhr.onload = function(e) {  \tconsole.log('xhr has finished loading', e);  }   xhr.send();  ```")
// md("```hello  goodbye```")
// md("here is a code block\r\n    one\r\n    two\r\n    three\r\n\r\nnow it is over")

console.log('')
console.log('markdown-it')
console.log('-----------')
mditrender('1. log(XY) = log(X) + log(Y)  2. log(X/Y) = log(X) - log(Y)  3. another thing  4. last')
mditrender('Differences between   1. application/x-www-form-urlencoded  2. multipart/form-data  3. text/plain')
mditrender("```  var xhr = new XMLHttpRequest();  xhr.open('GET', '/fun/web-fundamentals/file.txt');  xhr.onreadystatechange = function(e) {  \tif (xhr.readyState === 2) {  \t\tconsole.log('Received headers');  \t}  \tif (xhr.readyState === 4) {  \t\tconsole.log('Request is complete. Response:', xhr.responseText);  \t}  }  xhr.onload = function(e) {  \tconsole.log('xhr has finished loading', e);  }   xhr.send();  ```")
mditrender("```  hello  goodbye  ```")
mditrender("here is a code block\r\n    one\r\n    two\r\n    three\r\n\r\nnow it is over")

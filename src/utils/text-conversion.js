import MarkdownIt from 'markdown-it';
import { parseLine } from '../grammar/parse';

const md = new MarkdownIt();
// convert text to MD
// convert MD to HTML

export function getHtml({ question: spreadsheetQuestion, answer: spreadsheetAnswer }) {
    const result = parseLine(spreadsheetQuestion);
    
    if (spreadsheetAnswer || result.error) {
        return {
            question: legacyTextToHtml(spreadsheetQuestion),
            answer: legacyTextToHtml(spreadsheetAnswer),
        };
    } else if (result.question && result.answer) {
        return {
            question: markdownToHtml(result.question),
            answer: markdownToHtml(result.answer),
        };
    } else if (result.question && result.answer === null) {
        let questionHtml = markdownToHtml(result.question);
        let answerHtml = questionHtml;
        let blankIndex = 0;
        while (/BLANKPLACEHOLDER(\.\.\.)?/.test(answerHtml)) {
            answerHtml = answerHtml.replace(/BLANKPLACEHOLDER(\.\.\.)?/, formatFilledBlank(result.blanks[blankIndex]));
            questionHtml = questionHtml.replace(/BLANKPLACEHOLDER(\.\.\.)?/, formatEmptyBlank(result.blanks[blankIndex]));
            ++blankIndex;
        }

        return {
            question: questionHtml,
            answer: answerHtml,
        };
    }
}

export function formatFilledBlank(blank) {
    return `<span style="padding:0 2px; border-bottom:1px solid red">${blank}</span>`;
}

export function formatEmptyBlank(blank) {
    return `<span style="padding:0 2px; border-bottom:1px solid black; color:white;background:white">${blank}</span>`;
}

export function legacyTextToHtml(text) {
    const markdownText = text
        .replace(/ {3}/g, '\n\n')
        .replace(/ {2}/g, '\n')
        .replace(/\\t/g, '    ')
        .replace(/\\n/g, '\n')
        .replace(/^(Definition):\s/, '### $1\n');

    const html = md.render(markdownText)
        .replace(/___\.\.\./g, '<span class="blankspace">&hellip;</span>')
        .replace(/___/g, '<span class="blankspace"></span>');
    return html;
}

export function markdownToHtml(markdownText) {
    if (typeof markdownText !== 'string') {
        return markdownText;
    }
    
    return md.render(markdownText);
}
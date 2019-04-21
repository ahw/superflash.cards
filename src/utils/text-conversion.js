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
        debugger;
        const questionHtml = markdownToHtml(result.question);
        let filledInAnswer = questionHtml;
        let blankIndex = 0;
        while (/___(\.\.\.)?/.test(filledInAnswer)) {
            filledInAnswer = filledInAnswer.replace(/___(\.\.\.)?/, formatBlankAnswer(result.blanks[blankIndex]));
            ++blankIndex;
        }

        return {
            question: questionHtml,
            answer: filledInAnswer,
        };
    }
}

export function formatBlankAnswer(blank) {
    return `<span style="background:yellow">${blank}</span>`;
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
    
    const html = md.render(markdownText);
        //.replace(/___\.\.\./g, '<span class="blankspace">&hellip;</span>')
        //.replace(/___/g, '<span class="blankspace"></span>');
    return html;
}
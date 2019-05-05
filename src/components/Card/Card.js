import React, { PropTypes } from 'react';
import './Card.scss';
import { getHtml } from '../../utils/text-conversion';

function linearTransform(domain, range, x) {
    // rise / run
    const slope = (range[1] - range[0]) / (domain[1] - domain[0]);
    // b = y - mx
    const intercept = range[0] - slope * domain[0];
    if (typeof x === 'number') {
        // If a domain value was provided, return the transformed result
        return slope * x + intercept;
    }
    // If no domain value was provided, return a function
    return x => slope * x + intercept;
}

const getRotation = linearTransform([-1, 1], [-10, 10]);
const getYTranslation = linearTransform([0, 1], [0, -100]);

const starStyle = {
    display: 'block',
    position: 'absolute',
    color: 'gold',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '128px',
    opacity: 0.8,
};
const star = <span style={starStyle} dangerouslySetInnerHTML={{ __html: '&#9733;' }} />;

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingQuestion: !!props.isShowingQuestion,
            skipOpacity: 0,
            backOpacity: 0,
        };
    }

    showAnswer() {
        this.setState({
            isShowingQuestion: false,
        });
    }

    showQuestion() {
        this.setState({
            isShowingQuestion: true,
        });
    }

    flipCard(e) {
        if (e && e.target && e.target.tagName !== 'A') {
            this.props.onFlip();
            this.setState({
                isShowingQuestion: !this.state.isShowingQuestion,
            });
        }
    }

    onTouchStart(e) {
        const { clientX: x, clientY: y } = e.targetTouches[0];
        this.setState({
            lastTouchStart: { x, y },
        });
    }

    onTouchMove(e) {
        const { clientX: x, clientY: y } = e.targetTouches[0];
        const { lastTouchStart } = this.state;
        const deltaXRatio = (x - lastTouchStart.x) / window.document.documentElement.clientWidth;
        const deltaYRatio = 3 * (y - lastTouchStart.y) / window.document.documentElement.clientHeight;
        const rgbaValue = deltaXRatio > 0 ? `rgba(0, 128, 0, ${Math.abs(deltaXRatio)})` : `rgba(204, 0, 0, ${Math.abs(deltaXRatio)})`;
        this.setState({
            backgroundColor: rgbaValue,
            skipOpacity: deltaYRatio > 0 ? deltaYRatio : 0,
            backOpacity: deltaYRatio < 0 ? Math.abs(deltaYRatio) : 0,
        });
    }

    onTouchEnd(e) {
        this.setState({
            backgroundColor: 'transparent',
        });
    }

    onKeyDown(e) {
        if (e.code === 'ArrowUp') this.props.onBackToAllDecks();
        else if (e.code === 'ArrowLeft') this.props.onAnsweredIncorrectly();
        else if (e.code === 'ArrowRight') this.props.onAnsweredCorrectly();
        else if (e.code === 'ArrowDown') this.props.onSkip();
        else if (e.code === 'Space') this.flipCard(e);
        else if (e.code === 'Escape') this.props.onBackToAllDecks();
        else this.flipCard(e);
    }

    componentDidMount() {
        if (window.iNoBounce) window.iNoBounce.enable();
        this._keyDownListener = this.onKeyDown.bind(this);
        document.addEventListener('keydown', this._keyDownListener);

        // Search for math on the page to typeset
        // See http://stackoverflow.com/questions/5200545/how-to-recall-or-restart-mathjax
        MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this._keyDownListener);
    }

    render() {
        const backgroundColor = this.state.isShowingQuestion ? 'white' : '#fffcce';

        const style = {
            backgroundColor: (this.state.backgroundColor || backgroundColor),
            visibility: (this.props.mathJaxHasStartedProcessing && this.props.mathJaxHasFinishedProcessing) ? 'visible' : 'hidden',
        };

        const { question: questionHtml, answer: answerHtml } = getHtml(this.props);

        return (
            <div
                className="flashcard"
                style={style}
                onClick={this.flipCard.bind(this)}
                onTouchStart={this.onTouchStart.bind(this)}
                onTouchMove={this.onTouchMove.bind(this)}
                onTouchEnd={this.onTouchEnd.bind(this)}
            >
                <h1 className="flashcard-header">
                    {this.props.hasAnsweredAllCorrectly ? star : ''}
                    {' '}
                    {this.state.isShowingQuestion ? 'Question' : 'Answer'}
                </h1>
                <div
                    className="flashcard-content"
                    dangerouslySetInnerHTML={{ __html: questionHtml }}
                    style={{
                        margin: 'auto',
                        width: '85%',
                        display: this.state.isShowingQuestion ? 'block': 'none',
                    }}
                />
                <div
                    className="flashcard-content"
                    dangerouslySetInnerHTML={{ __html: answerHtml }}
                    style={{
                        margin: 'auto',
                        width: '85%',
                        display: !this.state.isShowingQuestion ? 'block' : 'none',
                    }}
                />
                <span style={{
                    fontSize: 24, position: 'absolute', display: 'block', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: this.state.skipOpacity,
                }}>
                    Skip
                </span>
                <span style={{
                    fontSize: 24, position: 'absolute', display: 'block', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: this.state.backOpacity,
                }}
                >
                    Home
                </span>
            </div>
        );
    }
}

Card.defaultProps = {
    lastSeen: null,
    isShowingQuestion: true,
    onFlip() {},
};

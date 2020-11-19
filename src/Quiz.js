import React from 'react';
import  './Quiz.css';
import quizlogo from './quizlogo.svg';

const Start = ({loadQuestion}) => {
    return(
        <div className="quiz-start-area"> 
            <section>
                <img src={quizlogo} alt="logo"/>
                <h4>Test your knowledge on countries! It contains 10 questions.</h4>
            </section>
            <section>
                <button className="nav-button" onClick={loadQuestion}>start</button>
            </section>
        </div>
    );
}

class Quiz extends React.Component {

    constructor(props) {
        super(props);
        
        this.handleOption = this.handleOption.bind(this)
        this.handleNext = this.handleNext.bind(this)
        this.handleRetry = this.handleRetry.bind(this)
    }

    handleOption(el) {
        this.props.checkAnswer(el.target.value)
    }

    handleRetry() {
        setTimeout(() => { this.props.retry(); }, 200);
    }

    handleNext() {
        this.props.next()
    }

    render() {

        if (this.props.quizState === "start") {
            return(
                <Start loadQuestion={() =>this.props.loadQuestion()}/>
            );
            
        }
        else if (this.props.quizState === "ongoing") {

            let correctClass = null, wrongClass = '';


            if (this.props.showAnswer) {
                correctClass = 'correct-button'
                wrongClass = 'wrong-button'
            }
            return(
                <div className="quiz-area">
                    <img src={quizlogo} alt="logo" className="top-logo"/>
                    <section>
                        <h1>
                            <span>{this.props.questionNumber}.</span>
                            <span> what is the capital of {this.props.question}</span>
                        </h1>
                    </section>
                    <section className="button-group">
                        <button className={`option-button ${(this.props.options[0].value) ? correctClass : wrongClass}`}
                            onClick={this.handleOption} 
                            value={this.props.options[0].value}
                            disabled={this.props.disabled}
                        >
                            {this.props.options[0].capital}
                        </button>

                        <button className={`option-button ${(this.props.options[1].value) ? correctClass : wrongClass}`}
                            onClick={this.handleOption} 
                            value={this.props.options[1].value}
                            disabled={this.props.disabled}
                        >
                            {this.props.options[1].capital}
                        </button>

                        <button className={`option-button ${(this.props.options[2].value) ? correctClass : wrongClass}`}
                            onClick={this.handleOption} 
                            value={this.props.options[2].value}
                            disabled={this.props.disabled}
                        >
                            {this.props.options[2].capital}
                        </button>

                        <button className={`option-button ${(this.props.options[3].value) ? correctClass : wrongClass}`}
                            onClick={this.handleOption} 
                            value={this.props.options[3].value}
                            disabled={this.props.disabled}
                        >
                            {this.props.options[3].capital}
                        </button>

                    </section>
                    <section>
                        <button className="nav-button" onClick={this.handleNext}>Next</button>
                    </section>
                </div>
            );
        }
        else {
            return(
                <div className="quiz-end-area">
                    <section>
                        <h1>You scored {this.props.score} points</h1>
                    </section>
                    <section>
                        <button className="nav-button" onClick={this.handleRetry}>Retry?</button>
                    </section>
                </div>
            );
        }
    }
}

export default Quiz;
import React from 'react';
import  './Quiz.css';
import quizlogo from './quizlogo.svg';

class Quiz extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        if (this.props.quizState === "start") {
            return(
                <div className="quiz-start-area"> 
                    <section>
                        <img src={quizlogo} alt="logo"/>
                        <h4>Test your knowledge on countries! It contains 10 questions.</h4>
                    </section>
                    <section>
                        <button className="nav-button" onClick={this.props.loadQuiz}>start</button>
                    </section>
                </div>
            );
        }
        else if (this.props.quizState === "ongoing") {
            return(
                <div className="quiz-area">
                    <img src={quizlogo} alt="logo" className="top-logo"/>
                    <section>
                        <h1>what is the capital of</h1>
                    </section>
                    <section className="button-group">
                        <button className="option-button">option 1</button>
                        <button className="option-button">option 2</button>
                        <button className="option-button">option 3</button>
                        <button className="option-button">option 4</button>
                    </section>
                    <section>
                        <button className="nav-button">Next</button>
                    </section>
                </div>
            );
        }
        else {
            return(
                <div className="quiz-end-area">
                    <section>
                        <h1>You scored x points</h1>
                    </section>
                    <section>
                        <button className="nav-button">Retry</button>
                    </section>
                </div>
            );
        }
    }
}

export default Quiz;
import React from 'react';
import  './Quiz.css';
import quizlogo from './quizlogo.svg';
import winner from './winner.svg';

const Start = ({loadQuestion}) => {
    return(
        <div className="quiz-start-area"> 
            <section>
                <img src={quizlogo} alt="logo"/>
            </section>
            <section>
                <h3>How well do you know about countries around the world? Take the test to find out!</h3>
                <p></p>
            </section>
            <section>
                <button className="nav-button" onClick={loadQuestion}>START</button>
            </section>
        </div>
    );
}

const End = ({retry, score}) => {
    return(
        <div className="quiz-end-area">
            <section>
                <img src={winner} alt="logo"/>
            </section>
            <section>
                <h1>You scored {score} points</h1>
            </section>
            <section>
                <button className="nav-button" onClick={retry}>RETRY</button>
            </section>
            <section>
                <p>(reload the page. I don't know why the button doesn't work. Drop a message if you can help. :)</p>
            </section>
        </div>
    );
}

class Quiz extends React.Component {

    constructor(props) {
        super(props);
        
        this.handleOption = this.handleOption.bind(this)
        this.handleNext = this.handleNext.bind(this)
    }

    handleOption(el) {
        this.props.checkAnswer(el.target.value)
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

            let correctClass = '', wrongClass = '';

            if (this.props.showAnswer) {
                correctClass = 'correct-button'
                wrongClass = 'wrong-button'
            }
            return(
                <div className="quiz-area">
                    <img src={quizlogo} alt="logo" className="top-logo"/>
                    {(this.props.questionType === 'capital') ?
                        <section className="question">
                            <h4>
                                <span>{this.props.questionNumber}.</span>
                                <span> What is the capital of {this.props.question}?</span>
                            </h4>
                        </section> 
                    :
                    <section className="question">
                        <span><img src={this.props.question} alt="logo" className="question-img"/></span>
                        <h4>
                            <span>{this.props.questionNumber}.</span>
                            <span> The flag belongs to which country?</span>
                        </h4>
                    </section>
                    }

                    <section className="button-group">
                        <button className={`option-button ${(this.props.options[0].value === 'correct') ? correctClass : ((this.props.options[0].value === 'wrong') ? wrongClass: '')}`}
                            onClick={this.handleOption} 
                            value={this.props.options[0].capital}
                            disabled={this.props.disabled}
                        >
                            {this.props.options[0].capital}
                        </button>

                        <button className={`option-button ${(this.props.options[1].value === 'correct') ? correctClass : ((this.props.options[1].value === 'wrong') ? wrongClass: '')}`}
                            onClick={this.handleOption} 
                            value={this.props.options[1].capital}
                            disabled={this.props.disabled} 
                        >
                            {this.props.options[1].capital}
                        </button>

                        <button className={`option-button ${(this.props.options[2].value === 'correct') ? correctClass : ((this.props.options[2].value === 'wrong') ? wrongClass: '')}`}
                            onClick={this.handleOption} 
                            value={this.props.options[2].capital}
                            disabled={this.props.disabled}
                        >
                            {this.props.options[2].capital}
                        </button>

                        <button className={`option-button ${(this.props.options[3].value === 'correct') ? correctClass : ((this.props.options[3].value === 'wrong') ? wrongClass: '')}`}
                            onClick={this.handleOption} 
                            value={this.props.options[3].capital}
                            disabled={this.props.disabled}
                        >
                            {this.props.options[3].capital}
                        </button>

                    </section>
                    <section>
                        <button className="nav-button" onClick={this.handleNext} disabled={!this.props.showAnswer}>Next</button>
                    </section>
                </div>
            );
        }
        else {
            return(
                <End retry={() =>this.props.retry()} score={this.props.score}/>
            );
        }
    }
}

export default Quiz;
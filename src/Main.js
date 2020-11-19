import React from 'react';
import Quiz from './Quiz';
import './Main.css'

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            country_capital: [],
            quizState: 'start',
            question: '',
            answer: '',
            options: [],
            buttonDisabled: false,
            showAnswer: false,
            score: 0,
            questionNumber: 1
        }

        this.fetchData = this.fetchData.bind(this); 
        this.loadQuestion = this.loadQuestion.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
        this.retry = this.retry.bind(this);
        this.next = this.next.bind(this);
    }

    loadQuestion() {

        if (this.state.data.length > 0) {
            let item = this.state.country_capital[Math.floor(Math.random()*this.state.country_capital.length)]
            
            let question = item.name;
            let answer = item.capital;

            let options_set = new Set();
            let main_entry = {};
            main_entry.capital = answer;
            main_entry.value = true;
            options_set.add(main_entry)
            while(options_set.size < 4) {
                let option_entry = {};

                option_entry.capital = this.state.country_capital[Math.floor(Math.random()*this.state.country_capital.length)].capital;

                option_entry.value = false;

                options_set.add(option_entry)
            }

            let options = [...options_set];

            //fischer-yates algorithm for random shuffle
            var i = options.length, k , temp;
            while(--i > 0){
                k = Math.floor(Math.random() * (i+1));
                temp = options[k];
                options[k] = options[i];
                options[i] = temp;
            }

            this.setState({
                question: question,
                answer: answer,
                options: [...options]
            })
        }
        
        this.setState({quizState: 'ongoing'})
    }

    checkAnswer(ans) {

        if(ans === 'false') {
            this.setState({
                buttonDisabled: true,
                showAnswer: true,
            })
        }   
        else {
            this.setState({
                score: this.state.score + 1,
                buttonDisabled: true,
                showAnswer: true,
            })
        }
    }

    next() {

        if(this.state.questionNumber !== 10) {
            this.setState({
                buttonDisabled: false,
                showAnswer: false,
                questionNumber: this.state.questionNumber + 1
            })
            this.loadQuestion()
        }

        else {
            this.setState({
                quizState: 'end',
                questionNumber: 1,
            })
        }
    }

    retry() {
        console.log(this.state)
        this.setState = ({
            data: [],
            country_capital: [],
            quizState: 'start',
            question: '',
            answer: '',
            options: [],
            buttonDisabled: false,
            showAnswer: false,
            score: 0,
            questionNumber: 1
        })
    }

    fetchData() {
        fetch('https://restcountries.eu/rest/v2/all')
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                data: data
            })
        })
        .then(() => {
            let lst = this.state.data.map((item) => {
                var obj = {
                    name: item.name,
                    capital: item.capital
                }
                return obj;
            })
            this.setState({
                country_capital: lst
            })
        })
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {

        return(
            <div className="play-area">
                <h1>Country Quiz</h1>
                <Quiz quizState={this.state.quizState}
                    loadQuestion = {this.loadQuestion}
                    question = {this.state.question}
                    options = {this.state.options}
                    checkAnswer = {this.checkAnswer}
                    disabled = {this.state.buttonDisabled}
                    showAnswer = {this.state.showAnswer}
                    score = {this.state.score}
                    retry = {this.retry}
                    questionNumber = {this.state.questionNumber}
                    next = {this.next}
                />
            </div>
        );
    }
}

export default Main;
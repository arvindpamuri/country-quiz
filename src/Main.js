import React from 'react';
import Quiz from './Quiz';
import './Main.css'
class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            regions: ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'],
            quizState: "start"
        }

        this.fetchData = this.fetchData.bind(this); 
        this.loadQuiz = this.loadQuiz.bind(this);
    }

    loadQuiz() {
        this.setState({quizState: "ongoing"})
    }

    fetchData() {
        fetch('https://restcountries.eu/rest/v2/all')
        .then((response) => response.json())
        .then((data) => {
            let country_names = data.map(item => item.name)
            this.setState({
                countries: country_names
              }); 
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
                    loadQuiz = {this.loadQuiz}
                />
            </div>
        );
    }
}

export default Main;
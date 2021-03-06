import React from "react";
import classes from './Quiz.module.css'
import { Component } from 'react';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from "../../axios/axios-quiz";
import Loader from '../../components/UI/Loader/Loader'
class Quiz extends Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [],
        loading: true
    }
    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results
        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: { [answerId]: 'success' },
                results
            })
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {




                    this.setState({
                        isFinished: true
                    })



                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout)
            }, 1000)


        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: { [answerId]: 'error' },
                results
            })
        }

    }
    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }
    // ???????????? ?? ???????? ????????????

    async componentDidMount() {
        try {
            const responce = await axios.get(`/quizes/${this.props.match.params.id}.json`)
            const quiz = responce.data;

            this.setState({
                quiz,
                loading: false
            })

        } catch (e) {
            console.log(e)
        }

    }
    render() {
        console.log({...this.state})
       
        return (

            <div className={classes.Quiz}>

                <div className={classes.QuizWrapper}>

                    <h1>???????????????? ???? ?????? ??????????????</h1>
                    {!this.state.quiz.length && <Loader />}

                    {this.state.quiz.length && this.state.isFinished && <FinishedQuiz
                        results={this.state.results}
                        quiz={this.state.quiz}
                        onRetry={this.retryHandler}
                    />}

                    {this.state.quiz.length && !this.state.isFinished && <ActiveQuiz
                        question={this.state.quiz[this.state.activeQuestion].question}
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
                    />}
                </div>
            </div>
        )
    }
}
export default Quiz;



// { 
//     this.state.loading
//     ? <Loader/>
//     :  this.state.isFinished
//     ? <ActiveQuiz
//     question={this.state.quiz[this.state.activeQuestion].question}
//     answers={this.state.quiz[this.state.activeQuestion].answers}
//     onAnswerClick={this.onAnswerClickHandler}
//     quizLength={this.state.quiz.length}
//     answerNumber={this.state.activeQuestion + 1}
//     state={this.state.answerState} 
//     : <FinishedQuiz
//     results={this.state.results}
//     quiz={this.state.quiz}
//     onRetry={this.retryHandler}
//      />

// />

// }





// { 
//     this.state.loading
//     ? <Loader/>
//     :  this.state.isFinished
//     ? <FinishedQuiz
//     results={this.state.results}
//     quiz={this.state.quiz}
//     onRetry={this.retryHandler}
//      />
//     :
//     <ActiveQuiz
//     question={this.state.quiz[this.state.activeQuestion].question}
//     answers={this.state.quiz[this.state.activeQuestion].answers}
//     onAnswerClick={this.onAnswerClickHandler}
//     quizLength={this.state.quiz.length}
//     answerNumber={this.state.activeQuestion + 1}
//     state={this.state.answerState}
// />

// }
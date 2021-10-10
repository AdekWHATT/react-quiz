import React from "react";
import classes from './Quiz.module.css'
import { Component } from 'react';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
class Quiz extends Component {
    state = {
        results: {} ,// {[id]: success, error}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // { [id]: 'success' 'error'}
        quiz: [
            {
                question: 'Кто был первым президентом России?',
                rightAnswerId: 2,
                id: 1,
                answers: [
                    { text: 'В.В. Путин', id: 1 },
                    { text: 'Б.Н. Ельцин', id: 2 },
                    { text: 'В.В. Путин', id: 3 },
                    { text: 'В.В. Путин', id: 4 }

                ]


            },{
                question: 'Сколько будет 2*5?',
                rightAnswerId: 2,
                id: 1,
                answers: [
                    { text: '14', id: 1 },
                    { text: '10', id: 2 },
                    { text: '16', id: 3 },
                    { text: '20', id: 4 }

                ]


            },
            {
                question: 'В Каком году основали Санкт-Петербург?',
                rightAnswerId: 3,
                id: 2,
                answers: [
                    { text: '1700', id: 1 },
                    { text: '1702', id: 2 },
                    { text: '1703', id: 3 },
                    { text: '1803', id: 4 }

                ]


            }
        ]
    }
    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState) [0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }
        // console.log('Answer ID', answerId)
        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results
        if (question.rightAnswerId === answerId) {
                if (!results[question.id]) {
                    results[question.id] = 'success'
                }

            this.setState({
                answerState: {[answerId]: 'success'},
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
                },1000)

            
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
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
    // проверка правильности определения  ID теста
    componentDidMount() {
        console.log('Quiz ID = ' , this.props.match.params.id )
    }

    render() {
        return (
            <div className={classes.Quiz}>

                <div className={classes.QuizWrapper}>

                    <h1>Ответьте на все вопросы</h1>

                    {
                        this.state.isFinished
                        ? <FinishedQuiz
                        results={this.state.results}
                        quiz={this.state.quiz}
                        onRetry={this.retryHandler}
                        
                        />
                        :
                        <ActiveQuiz
                        question={this.state.quiz[this.state.activeQuestion].question}
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
                    />
                    }
                   

                </div>
            </div>
        )
    }
}
export default Quiz;
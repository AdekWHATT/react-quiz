import React, { Component } from "react";
import classes from './QuizList.module.css'
import { NavLink } from "react-router-dom";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

export default class QuizList extends Component {

    state = {
        quiz: [],
        loading: true
    }

    renderQuizes() {
        return this.state.quiz.map((quiz) => { // возвращаем массиы из 3 элементов,впоследствии данный массив заменим на то что приходит с сервера
            // на казжой итерации получим quiz и index
            return ( // вернуть должны jsx и корневой элемент списка должен быть <li>, т.к.  {this.renderQuizes()} находится с теге <ul>
                <li
                    key={quiz.id}
                >
                    {/* контент который будет представлять тег li это будет ссылка NavLink */}
                    <NavLink to={'/quiz/' + quiz.id}>
                        {/* впоследствии в навлинк будет динамический id, но пока как-то так)) */}
                        {quiz.name}

                    </NavLink>
                </li>
            )
        })
    }
    // Компонент жизненного цикла в котором идет обращение к серверу

    async componentDidMount() {
        try {
            const responce = await axios.get('/quizes.json')
            const quizes = []
            Object.keys(responce.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`
                })
            })
            this.setState({
                quizes, loading: false
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов:</h1>
                    {

                        this.state.loading
                            ? <Loader />
                            : <ul> {this.renderQuizes()} </ul>
                    }

                </div>
            </div>
        )
    }
}
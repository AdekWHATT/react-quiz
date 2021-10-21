import React, {Component} from "react";
import classes from './QuizList.module.css'
import { NavLink } from "react-router-dom";
import axios from "axios";
export default class QuizList extends Component {

    renderQuizes() {
        // впоследствии список тестов будем забирать из бэкэнда, а пока 
        // создаем испровизированный список из обычного массива
        return [1,2,3].map((quiz,index) => { // возвращаем массиы из 3 элементов,впоследствии данный массив заменим на то что приходит с сервера
           // на казжой итерации получим quiz и index
            return ( // вернуть должны jsx и корневой элемент списка должен быть <li>, т.к.  {this.renderQuizes()} находится с теге <ul>
                <li
                key={index}
                > 
                {/* контент который будет представлять тег li это будет ссылка NavLink */}
                    <NavLink to={'/quiz/' + quiz}>
                      {/* впоследствии в навлинк будет динамический id, но пока как-то так)) */}
                       Тест {quiz} 

                    </NavLink>
                </li>
            )
        })
    }

componentDidMount() {
    axios.get('https://react-quiz-f5616-default-rtdb.firebaseio.com/quiz.json').then(response => {
        console.log(response)
    })
}

    render() {
        return(
            <div className={classes.QuizList}>
                <div>
                <h1>Список тестов:</h1>
                <ul>
                    {/* метод renderQuizes()  выводит список тестов из массива */}
                    {this.renderQuizes()} 

                </ul>
                </div>
            </div>
        )
    }
}
import React, {Component} from "react";
import classes from './QuizList.module.css'
import { NavLink } from "react-router-dom";
import axios from "axios";
export default class QuizList extends Component {

    state = {
        quizes: [],
    }

    renderQuizes() {
        return this.state.quizes.map((quiz) => { // возвращаем массиы из 3 элементов,впоследствии данный массив заменим на то что приходит с сервера
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
 const responce = await axios.get('https://react-quiz-f5616-default-rtdb.firebaseio.com/quizes.json')
    const quizes = []   
    Object.keys(responce.data).forEach((key, index) => {
        quizes.push({
            id: key,
            name: `Тест №${index + 1 }`
        })
        })
        this.setState({
            quizes
        })
} catch (e) {
    console.log(e)
}
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
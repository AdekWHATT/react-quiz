import axios from "axios";

export default axios.create({
    baseURL: 'https://react-quiz-f5616-default-rtdb.firebaseio.com/'
})
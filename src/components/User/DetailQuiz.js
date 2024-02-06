import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import { getDataQuiz } from "../../services/apiService"
import _ from "lodash"
import "./DetailQuiz.scss"
import Question from "./Question"

const DetailQuiz = (props) => {
    const params = useParams()
    const location = useLocation() // để biết người dùng từ trang nào chạy qua
    const quizId = params.id
    const [dataQuiz, setDataQuiz] = useState([])
    const [index, setIndex] = useState(0)

    useEffect(() => {
        fetchQuestions()
    }, [quizId]) // quizId thay đổi useEffect sẽ được chạy lại

    const fetchQuestions = async() => {
        let res = await getDataQuiz(quizId)
        if (res && res.EC === 0) {
            let raw = res.DT
            let data = _.chain(raw)
            // Group the elements of Array based on `id` property
            .groupBy("id")
            // `key` is group's name (id), `value` is the array of objects
            .map((value, key) => { // thay ngoặc tròn thành ngoặc nhọn, chúng ta đang viết 1 function đầy đủ
                let answers = []
                let questionDescription, image = null
                value.forEach((item, index) => { //Biến index sẽ lặp từ 0 đến phần tử chót
                    if(index === 0){
                        questionDescription = item.description
                        image = item.image
                    }
                    item.answers.isSelected = false
                    answers.push(item.answers)
                })

                return { questionId: key, answers: answers, questionDescription, image }
            })
            .value()
            setDataQuiz(data)
        }
    }

    const handlePrev = () => {
        if (index - 1 < 0) return
            setIndex(index - 1)
    }

    const handleNext = () => {
        if(dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1)
    }
    
    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz) // React Hook doesn't merge state
        let question = dataQuizClone.find(item => +item.questionId === +questionId) // + convert to number
        if (question && question.answers) {
            question.answers = question.answers.map(item => {
                if(+item.id === +answerId){
                    item.isSelected = !item.isSelected
                }
                return item
            })
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) { // nếu tìm thấy thì nó sẽ trả ra vị trí của phần tử, không tìm thấy trả ra -1
            dataQuizClone[index] = question
            setDataQuiz(dataQuizClone)
        }
    }

    const handleFinishQuiz = () => {
        console.log(">>> check data before submit: ", dataQuiz)
        let payload = {
            quizId: +quizId, // "+" to covert to integer
            answers: []
        }
        let answers = []
        if (dataQuiz && dataQuiz.length > 0){
            dataQuiz.forEach(question => {
                let questionId = question.questionId
                let userAnswerId = []
                question.answers.forEach(a => { // vòng lặp bên trong vòng lặp video Lesson 87 12:56
                    if(a.isSelected === true) {
                        userAnswerId.push(a.id)
                    }
                })
                answers.push ({
                    questionId: +questionId, // "+" to covert to integer
                    userAnswerId: userAnswerId
                })
            })
            payload.answers = answers
            console.log("Final payload: ", payload)
        }
    }

    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <hr/>
                <div className="q-body">
                    <img/>
                </div>
                <div className="q-content">
                    <Question 
                        index = {index}
                        handleCheckbox = {handleCheckbox}
                        data = {dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                    />
                </div>
                <div className = "footer">
                    <button 
                        className="btn btn-secondary"
                        onClick = {() => handlePrev()}
                    >Prev</button>
                    <button 
                        className="btn btn-primary"
                        onClick = {() => handleNext()}
                    >Next</button>
                    <button 
                        className="btn btn-warning"
                        onClick = {() => handleFinishQuiz()}
                    >Finish</button>
                </div>
            </div>
            <div className="right-content">
                count down
            </div>
        </div>
    )
}
export default DetailQuiz


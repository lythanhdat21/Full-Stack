import { useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"
import { getDataQuiz } from "../../services/apiService"
import _ from "lodash"
import "./DetailQuiz.scss"

const DetailQuiz = (props) => {
    const params = useParams()
    const location = useLocation() // để biết người dùng từ trang nào chạy qua
    const quizId = params.id

    useEffect(() => {
        fetchQuestions()
    }, [quizId]) // quizId thay đổi useEffect sẽ được chạy lại

    const fetchQuestions = async() => {
        let res = await getDataQuiz(quizId)
        console.log('>>> check question: ', res)
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
                    answers.push(item.answers)
                    console.log("item answers: ", item.answers)
                })
                console.log('value: ', value, ' key: ', key)

                return { questionId: key, answers: answers, questionDescription, image }
            })
            .value()
            console.log(data)
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
                    <div className = "question">Question 1: How are you doing?</div>
                    <div className = "answer">
                        <div className="a-child">A. fdagwer</div>
                        <div className="a-child">B. fdagwer</div>
                        <div className="a-child">C. fdagwer</div>
                    </div>
                </div>
                <div className = "footer">
                    <button className="btn btn-secondary">Prev</button>
                    <button className="btn btn-primary">Next</button>
                </div>
            </div>
            <div className="right-content">
                count down
            </div>
        </div>
    )
}
export default DetailQuiz


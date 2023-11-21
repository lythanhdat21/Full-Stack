import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getDataQuiz } from "../../services/apiService"
import _ from "lodash"

const DetailQuiz = (props) => {
    const params = useParams()
    // console.log("check params: ", params)
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

                return { questionId: key, answers: answers, questionDescription, image } // Delete detail
            })
            .value()
            console.log(data)
        }
    }
    
    return (
        <div className="detail-quiz-container">
            DetailQuiz
        </div>
    )
}
export default DetailQuiz



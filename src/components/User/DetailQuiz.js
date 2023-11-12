import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getDataQuiz } from "../../services/apiService"

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
    }
    
    return (
        <div className="detail-quiz-container">
            DetailQuiz
        </div>
    )
}
export default DetailQuiz



import React, { useState, useRef } from 'react';
import'./ManageQuiz.scss'
import Select from 'react-select'
import { postCreateNewQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
import { Tabs } from 'react-bootstrap';
import { Tab } from 'bootstrap';
import { useTranslation } from 'react-i18next';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const ManageQuiz = (props) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState('') // Delete EASY
    const[image, setImage] = useState()
    const fileInputRef = useRef(null);

    const { t } = useTranslation()

    const handleChangeFile = (event) => {
        if(event.target && event.target.files && event.target.files[0]){
            setImage(event.target.files[0])
        }
    }

    const handleSubmitQuiz = async() => {
        let res = await postCreateNewQuiz(description, name, type?.value, image)
        // validate
        if (!name || !description) {
            toast.error ("Name/Description is required")
            return
        }
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName("")
            setDescription("")
            setImage(null)
            fileInputRef.current.value = ''; // Xóa giá trị của input file
        }else{
            toast.error(res.EM)
        }
    }

    return(
        <div className="quiz-container">
            <Tabs
                defaultActiveKey="profile"
                id = "uncontrolled-tab-example"
                className = "mb-2"
                justify
            >
                <Tab className ="p-3 pt-0" eventKey = "profile" title ={t('admin.manage-quiz.a1')}>
                    <div className = "add-new">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                {/* <Accordion.Header>Manage Quizzes</Accordion.Header> */}
                                    <Accordion.Body>
                                        <div className="add-new">
                                            <fieldset className="border rounded-3 p-3">
                                                <legend className="float-none w-auto px-3">Add new Quiz</legend>
                                                <div className="form-floating mb-3">
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        placeholder="Your quiz name"
                                                        value={name}
                                                        onChange={(event) => setName(event.target.value)}
                                                    />
                                                    <label>Name</label>
                                                </div>
                                                <div className="form-floating">
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        placeholder="Description..."
                                                        value={description}
                                                        onChange={(event) => setDescription(event.target.value)}
                                                    />
                                                    <label>Description</label>
                                                </div>
                                                <div className='my-3'>            
                                                    <Select
                                                        defaultValue={type}
                                                        onChange={setType}
                                                        options={options}
                                                        placeholder = {"Quiz type..."}
                                                    />
                                                </div>
                                                <div className='more-actions form-group'>
                                                    <label className='mb-1'>Upload Image</label>
                                                    <input 
                                                        type = "file" 
                                                        className='form-control'
                                                        onChange = {(event) => handleChangeFile(event)}
                                                        id = "fileInput"
                                                        ref={fileInputRef}
                                                    />
                                                </div>
                                                <div className='mt-3'>
                                                    <button 
                                                        onClick={() => handleSubmitQuiz()}
                                                        className='btn btn-warning'>Save</button>
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className="list-detail">
                                            <TableQuiz/>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Update Q/A Quizzes</Accordion.Header>
                                    <Accordion.Body>
                                        <QuizQA/>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Assign to Users</Accordion.Header>
                                    <Accordion.Body>
                                        <AssignQuiz/>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                    <div className = "list-detail">
                        <TableQuiz/>
                    </div>
                </Tab>
                <Tab className ="p-3 pt-0" eventKey = "password" title ={t('admin.manage-quiz.a2')}>
                    <QuizQA/>
                </Tab>
                <Tab className ="p-3 pt-0" eventKey = "history" title ={t('admin.manage-quiz.a3')}>
                    <AssignQuiz/>
                </Tab>
            </Tabs>

        </div>
    )
}
export default ManageQuiz


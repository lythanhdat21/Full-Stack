import React, { useState, useRef } from 'react';
import'./ManageQuiz.scss'
import Select from 'react-select'
import { postCreateNewQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';

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
            <div className="title">
                Manage Quizzes
            </div>
            <hr/>
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
                table
            </div>
        </div>
    )
}
export default ManageQuiz


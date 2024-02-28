import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {FcPlus} from 'react-icons/fc'
import { toast } from 'react-toastify';
import _ from 'lodash' // Lesson 63 20:12
import { putUpdateQuizForAdmin } from '../../../../services/apiService';

const ModalUpdateQuiz = (props) => {
    const {show, setShow, dataUpdate} = props // biến props là một biến object

    const handleClose = () => {
        setShow(false);
        setName("")
        setDescription("")
        setDifficulty("")
        setImage("")
        setPreviewImage("")
        props.setDataUpdate() //
    }
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [image, setImage] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    // useEffect = componentDidMount
    useEffect (() =>{
        // console.log('>>> Run use Effect: ', dataUpdate)
        if(!_.isEmpty(dataUpdate)){ // Nếu biến dataUpdate không rỗng
            //Update State
            setName(dataUpdate.name)
            setDescription(dataUpdate.description)
            setDifficulty(dataUpdate.difficulty)
            setImage("")
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`) // vì APIs đang trả ra thuộc tính image
            }
        }  
    }, [props.dataUpdate])

    const handleUploadImage = (event) => {
        if(event.target && event.target.files && event.target.files[0]){
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        } else {
            // setPreviewImage("")
        }
    }

    const handSubmitUpdateQuiz = async () => {
        let data = await putUpdateQuizForAdmin (dataUpdate.id, description, name, difficulty, image)

        if(data && data.EC === 0) {
            toast.success(data.EM)
            handleClose() // reset lại giá trị của React
            await props.fetchQuiz()
        }

        if(data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }
    
    return (
        <>
            <Modal 
                show={show} 
                onHide={handleClose} 
                size = "xl"
                backdrop = "static"
                className = "modal-add-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update The Quizz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                    <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value ={description}
                                onChange = {(event) => setDescription(event.target.value)}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Difficulty </label>
                            <select 
                                className="form-select" 
                                onChange = {(event) => setDifficulty(event.target.value)}
                                value = {difficulty}
                            >
                                <option value = "EASY">EASY</option>
                                <option value = "MEDIUM">MEDIUM</option>
                                <option value = "HARD">HARD</option>
                            </select>
                        </div>
                        <div className = 'col-md-12'>
                            <label className="form-label label-upload" htmlFor='labelUpload'>
                                <FcPlus /> Upload File Image
                            </label>
                            <input 
                                type = "file" 
                                id = "labelUpload" 
                                hidden
                                onChange ={(event) => handleUploadImage(event)}
                            />
                        </div>
                        <div className = 'col-md-12 img-preview'>
                            {previewImage ?
                                <img src = {previewImage} />
                                :
                                <span>Preview Image</span>
                            }
                        </div>
                    </form>                    
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handSubmitUpdateQuiz()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalUpdateQuiz


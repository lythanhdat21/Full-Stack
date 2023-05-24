import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {FcPlus} from 'react-icons/fc'
// import axios from 'axios'
import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../services/apiService'; //Lesson 50 4:40

const ModalCreateUser = (props) => {
    const {show, setShow} = props // biến props là một biến object

    const handleClose = () => {
        setShow(false);
        setEmail("")
        setPassword("")
        setUsername("")
        setRole("")
        setImage("")
        setPreviewImage("")
    }
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("USER")
    const [image, setImage] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    const handleUploadImage = (event) => {
        if(event.target && event.target.files && event.target.files[0]){
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        } else {
            // setPreviewImage("")
        }
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };

    const handSubmitCreateUser = async() => {

        // validate
        // const isValidEmail = validateEmail(email)
        // if(!isValidEmail) {
        //     toast.error('Invalid email')
        //     // toast.success('test success')
        //     // toast.info('test information')
        //     return
        // }

        if(!password) {
            toast.error('Invalid password')
            return
        }

        let data = await postCreateNewUser (email, password, username, role, image)

        console.log('>>> component res: ', data)

        if(data && data.EC === 0) { // Delete res
            toast.success(data.EM) // Delete res
            handleClose() // reset lại giá trị của React
        }

        if(data && data.EC !== 0) { // Delete res
            toast.error(data.EM) // Delete res
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
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                value ={email}
                                onChange = {(event) => setEmail(event.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                value = {password}
                                onChange = {(event) => setPassword(event.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Role </label>
                            <select className="form-select" onChange = {(event) => setRole(event.target.value)} value = {role}>
                                <option value = "USER">USER</option>
                                <option value = "ADMIN">ADMIN</option>
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
                                // <img src = "https://bit.ly/eric-bot-2" />
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
                    <Button variant="primary" onClick={() => handSubmitCreateUser()}> {/*Delete handleClose*/}
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalCreateUser


import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {FcPlus} from 'react-icons/fc'
import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../services/apiService'; //Lesson 50 4:40
import _ from 'lodash' // Lesson 63 20:12

const ModalUpdateUser = (props) => {
    const {show, setShow, dataUpdate} = props // biến props là một biến object

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

    // useEffect = componentDidMount
    useEffect (() =>{
        console.log('>>> Run use Effect: ', dataUpdate)
        if(!_.isEmpty(dataUpdate)){ // Nếu biến dataUpdate không rỗng
            //Update State
            setEmail(dataUpdate.email)
            setUsername(dataUpdate.username)
            setRole(dataUpdate.role)
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

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };

    const handSubmitCreateUser = async() => {
        if(!password) {
            toast.error('Invalid password')
            return
        }

        let data = await postCreateNewUser (email, password, username, role, image)

        if(data && data.EC === 0) {
            toast.success(data.EM)
            handleClose() // reset lại giá trị của React
            await props.fetchListUsers() // bằng với fetchListUsers của ManageUser.js
        }

        if(data && data.EC !== 0) { // Delete res
            toast.error(data.EM) // Delete res
        }
    }

    // console.log ('Check data Update: ', props.dataUpdate)
    console.log ('Check data render: data Update: ', dataUpdate)
    
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
                    <Modal.Title>Update a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                value ={email}
                                disabled = {true}
                                onChange = {(event) => setEmail(event.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                value = {password}
                                disabled = {true}
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
                            <select 
                                className="form-select" 
                                onChange = {(event) => setRole(event.target.value)}
                                value = {role}
                            >
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
                    <Button variant="primary" onClick={() => handSubmitCreateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalUpdateUser


import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuizForAdmin } from '../../../../services/apiService';

const ModalDeleteQuiz = (props) => {
    const {show, setShow, dataDelete} = props

    const handleClose = () => setShow(false);

    const handleSubmitDeleteQuiz = async() => {
        let data = await deleteQuizForAdmin (dataDelete.id)
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
        backdrop = "static" // Click ra bên ngoài modal sẽ không tự động đóng lại
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete the Quiz ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this this quiz = 
          <b>
            {dataDelete && dataDelete.id ? dataDelete.id : ""}
          </b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={ () => {handleSubmitDeleteQuiz()}}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteQuiz


import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDeleUser = (props) => {
    const {show, setShow, dataDelete} = props

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const handleSubmitDeleteUser = () => {
    alert('alert me')
  }

  return (
    <>
      <Modal 
        show={show} 
        onHide={handleClose}
        backdrop = "static" // Click ra bên ngoài modal sẽ không tự động đóng lại
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete the User ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this user. email = 
          <b>
            {dataDelete && dataDelete.email ? dataDelete.email : ""}
          </b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={ () => {handleSubmitDeleteUser()}}> {/* Delete handleClose */}
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleUser


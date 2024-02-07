import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../services/apiService';
import { toast } from 'react-toastify';

const ModalDeleUser = (props) => {
  const {show, setShow, dataDelete} = props

  const handleClose = () => setShow(false);

  const handleSubmitDeleteUser = async() => {
    let data = await deleteUser (dataDelete.id)
      if(data && data.EC === 0) {
        toast.success(data.EM)
        handleClose() // reset lại giá trị của React
        // await props.fetchListUsers() // lấy tất cả người dùng
        props.setCurrentPage (1) // cập nhật trạng thái người dùng ở trang 1
        await props.fetchListUsersWithPaginate(1) 
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
          <Button variant="primary" onClick={ () => {handleSubmitDeleteUser()}}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleUser


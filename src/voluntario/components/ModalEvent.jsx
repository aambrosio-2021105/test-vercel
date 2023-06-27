import React from 'react'
import { FormVoluntario } from "./FormVoluntario"
import { Modal } from "react-bootstrap";
export const ModalEvent = ({ isOpen, onClose, voluntarioEdit }) => {
    if (!isOpen) {
        return null;
      }
  return (
    <>
      
      <Modal show={isOpen}>
          <Modal.Header>
            <Modal.Title className="text-dark">ID: {voluntarioEdit._id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormVoluntario
              userProp={voluntarioEdit}
              titleButton="Actualizar"
              option={2}
            ></FormVoluntario>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-danger" onClick={onClose}>
              Cerrar
            </button>
          </Modal.Footer>
        </Modal>

    </>
  )
}

import React from "react";
import { useEffect, useState } from "react";
import {
  apiGetPdf,
  apiGetPdfArchivo,
  apiVoluntarioDelete,
} from "../api/apiFile";
import { CreateVoluntario } from "./CreateVoluntario";
import { Link } from "react-router-dom";
import { Voluntario } from "../models/models.voluntario";
import { ModalEvent } from "./ModalEvent";
import Swal from "sweetalert2";

export const ListVoluntario = () => {
  const [listVoluntario, setListVoluntario] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEvent, setShowModalEvent] = useState(false);
  const [voluntarioEdit, setVoluntarioEdit] = useState(Voluntario);

  const viewVoluntariolList = async () => {
    const getListVoluntarioFromAPI = await apiGetPdf();
    setListVoluntario(getListVoluntarioFromAPI);
  };

  useEffect(() => {
    viewVoluntariolList();
  }, [showModal, showModalEvent]);

  const eliminarVoluntario = async (id) => {
    let result = await apiVoluntarioDelete(id);
    if (result) {
      setListVoluntario(listVoluntario.filter((h) => h._id !== id));
      Swal.fire({
        icon: "success",
        title: "Voluntario Eliminado",
        text: "Se ha eliminado correctamente",
        showConfirmButton: true,
        confirmButtonText: "Ok",
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Error",
        text: "No se ha podido eliminar",
        showConfirmButton: true,
        confirmButtonText: "Ok",
      });
    }
  };
  const VisualizarPdf = async (nombreArchivo) => {
    console.log(nombreArchivo);

    try {
      const archivoBlob = await apiGetPdfArchivo(nombreArchivo);

      window.open(archivoBlob, "_blank");
    } catch (error) {
      console.error("Error al descargar o mostrar el archivo:", error);
    }
  };

  //modal
  const handleOpenModal = (v) => {
    setShowModal(true);
    setVoluntarioEdit(v);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  console.log(listVoluntario);
  return (
    <>
      <main className="container seccion">
        <h1>Voluntariados</h1>
        <Link to="/agregar-Voluntario" className="boton boton-verde">
          <button>Nuevo Voluntario</button>
        </Link>
        <table className="propiedades">
          <thead>
            <tr>
              <th className="text-center">FotoPerfil</th>
              <th className="text-center">Nombre</th>
              <th className="text-center">Correo</th>
              <th className="text-center">Telefono</th>
              <th className="text-center">Direccion</th>
              <th className="text-center">Rol</th>
              <th className="text-center">array_img</th>
              <th className="text-center">array_historial_voluntariados</th>
              <th className="text-center">DPI</th>
              <th className="text-center">CV</th>
              <th className="text-center">antecedentes</th>
              <th className="text-center">Eliminar</th>
              <th className="text-center">Editar</th>
            </tr>
          </thead>
          <tbody>
            {listVoluntario.map((v) => {
              return (
                <tr key={v._id}>
                  <td className="text-center">
                    <img
                      src={v.fotoPerfil}
                      alt="Foto de perfil"
                      style={{ maxWidth: "100%", maxHeight: "100px" }}
                    />
                  </td>
                  <td className="text-center">{v.nombre}</td>
                  <td className="text-center">{v.correo}</td>
                  <td className="text-center">{v.telefono}</td>
                  <td className="text-center">{v.direccion}</td>
                  <td className="text-center">{v.rol}</td>
                  <td className="text-center">{v.array_img}</td>
                  <td className="text-center">
                    {v.array_historial_voluntariados}
                  </td>
                  <td className="text-center">
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => VisualizarPdf(v.CV)}
                    >
                      DPI
                    </button>
                  </td>
                  <td className="text-center">
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => VisualizarPdf(v.DPI)}
                    >
                      CV
                    </button>
                  </td>
                  <td className="text-center">
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => VisualizarPdf(v.antecedentes)}
                    >
                      Antecedentes
                    </button>{" "}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger ms-2 w-100"
                      onClick={() => eliminarVoluntario(v._id)}
                    >
                      Eliminar
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning ms-2 w-100"
                      onClick={() => handleOpenModal(v)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ModalEvent
          voluntarioEdit={voluntarioEdit}
          isOpen={showModal}
          onClose={() => handleCloseModal()}
        ></ModalEvent>
      </main>
    </>
  );
};

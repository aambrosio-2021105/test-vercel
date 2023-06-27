import axios from 'axios';
import Swal from 'sweetalert2';

const token = localStorage.getItem('token');

const URL = "http://localhost:8080/api/voluntario/";

export const apiGetPdf = async () => {
    try {

        const { data: { voluntario } } = await axios.get(`${URL}voluntario`,
            { headers: { "x-token": token } });

        return voluntario;

    } catch ({ response: { data: { msg } } }) {
        if (msg === "Token no válido") {
            Swal.fire({
                icon: 'info',
                title: 'Error',
                text: 'Inicie sesion de nuevo',
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("token");
                    window.location.href = '/login';
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: msg,
                showConfirmButton: true,
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed) {
                } else {
                }
            });
        }
    }

}
export const apiGetPdfArchivo = async (nombre) => {

    try {
        const { data: { fileUrl } } = await axios.get(`${URL}fileVoluntario/${nombre}`);
        console.log(fileUrl);
        return fileUrl;

    } catch ({ response: { data: { msg } } }) {
        if (msg === "Token no válido") {
            Swal.fire({
                icon: 'info',
                title: 'Error',
                text: 'Inicie sesion de nuevo',
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("token");
                    window.location.href = '/';
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: msg,
                showConfirmButton: true,
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed) {
                } else {
                }
            });
        }
    }

}
export const apiPDF = async (nombre, correo, password, dpi, telefono, direccion, rol, array_img, array_historial_voluntariados, CV, DPI, antecedentes,fotoPerfil,fotoFondo) => {

    try {
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("correo", correo);
        formData.append("password", password);
        formData.append("dpi", dpi);
        formData.append("telefono", telefono);
        formData.append("direccion", direccion);
        formData.append("rol", rol);
        formData.append("array_img", array_img);
        formData.append("array_historial_voluntariados", array_historial_voluntariados);
        formData.append("photo", CV);
        formData.append("photo", DPI);
        formData.append("photo", antecedentes);
        formData.append("photo", fotoPerfil);
        formData.append("photo", fotoFondo);
        const userSavecv = await axios.post(`${URL}save`, formData);

        return true;

    } catch ({ response: { data: { msg } } }) {
       
        if (msg === 'el token ha expirado') {
            Swal.fire({
                icon: 'info',
                title: 'Error',
                text: 'Inicie sesion de nuevo',
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("token");
                    window.location.href = '/';
                }
            });
        } {
            Swal.fire({
                icon: 'error',
                title: 'Error al agregar',
                text: msg,
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                console.log(result);
            });
        }
    }

}

export const apiUpdatePDF = async (id, nombre, correo, password, dpi, telefono, direccion, rol, array_img, array_historial_voluntariados, CV, DPI,antecedentes,fotoPerfil,fotoFondo) => {

    console.log(`${URL}editar/${id}`);

    const formData = new FormData();
    formData.append("id", id);
    formData.append("nombre", nombre);
    formData.append("correo", correo);
    formData.append("password", password);
    formData.append("dpi", dpi);
    formData.append("telefono", telefono);
    formData.append("direccion", direccion);
    formData.append("rol", rol);
    formData.append("array_img", array_img);
    formData.append("array_historial_voluntariados", array_historial_voluntariados);
    formData.append("photo", CV);
    formData.append("photo", DPI);
    formData.append("photo", antecedentes);

    formData.append("photo", fotoPerfil);
    formData.append("photo", fotoFondo);

    try {
        const userSavecv = await axios.put(`${URL}editar/${id}`, formData);

        return true;

    } catch ({ response: { data: { msg } } }) {

        if (msg === 'el token ha expirado') {
            Swal.fire({
                icon: 'info',
                title: 'Error',
                text: 'Inicie sesion de nuevo',
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("token");
                    window.location.href = '/login';
                }
            });
        } {
            Swal.fire({
                icon: 'error',
                title: 'Error al editar',
                text: msg,
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                console.log(result);
            });
        }
    }

}

export const apiVoluntarioDelete = async (id) => {
    try {
        const { } = await axios.delete(`${URL}/eliminar/${id}`);
        return true;
    } catch ({ response: { data: { msg } } }) {

        if (msg === "Token no válido") {
            localStorage.removeItem("token");
            window.location.href = '/login';
        }
        if (msg) {
            return msg;
        }
    }

}

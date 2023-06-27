import React from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { formOptions, formVoluntarioHelper } from "../helpers/formVoluntarioHelper";
import { useEffect } from "react";
import { apiGetPdf } from '../api/apiFile';
import Button from 'react-bootstrap/Button';
import bcrypt from 'bcryptjs';
import { Document, Page } from 'react-pdf';
export const FormVoluntario = ({ userProp, titleButton, option }) => {
    //--pdf--
const [cvFilePath, setCVFilePath] = useState('');
  const [dpiFilePath, setDPIFilePath] = useState('');
  const [antecedentesFilePath, setAntecedentesFilePath] = useState('');
  const [documento, setDocumento] = useState({
    ruta:'',
    nombre:''
  });
  //----usuario
    const [usuario, setUsuario] = useState(userProp);
    const viewPdf = async () => {
      //  let result = await apiGetPdf();
        //ssetPdf(result);
    };
    const [Pdf, setPdf] = useState()

    useEffect(() => { 
        viewPdf(); 
    
    }, []);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(formOptions);

    useEffect(() => {
        setUsuario({ ...usuario });
    }, [])

    const crud = async () => {
        await formVoluntarioHelper(usuario, option);

           
    }
    const handleChange = (e) => {
       
        e.preventDefault();
        const nombreArchivo = e.target.name;
        const archivo = e.target.files[0];
        
        setUsuario((prevFormulario) => ({
            ...prevFormulario,
            [nombreArchivo]: archivo
          }));
       
    
    }
    
    return (
        <>
            <div className='container'>
                <main >
                    <form className="formulario" onSubmit={handleSubmit(crud)}>
                        <fieldset className="mt-5">
                            <legend>Informacion General</legend>
                            <label >Nombre</label>
                            <input
                                {...register("nombre")}
                                type="text"
                                className="form-control"
                                value={usuario.nombre}
                                onChange={({ target: { value } }) => {
                                    setUsuario(() => ({ ...usuario, nombre: value }));
                                }
                                }
                            />
                            {errors.nombre && (<span>{errors.nombre.message}</span>)}
                            <label htmlFor="correo">Correo</label>
                            <input
                                {...register("correo")}
                                type="email"

                                className="form-control"
                                value={usuario.correo}
                                onChange={({ target: { value } }) => {
                                    setUsuario(() => ({ ...usuario, correo: value }));
                                }
                                }
                            />
                            {errors.correo && (<span>{errors.correo.message}</span>)}

                            <label htmlFor="password">Password</label>
                            <input

                                {...register("password")}
                                type="password"
                                className="form-control"
                                value={usuario.password}
                                onChange={({ target: { value } }) => {
                                    setUsuario(() => ({ ...usuario, password: value }));
                                }}
                            />
                            {errors.password && (<span>{errors.password.message}</span>)}

                            <label >Telefono</label>
                            <input
                                {...register("telefono")}
                                type="text"
                                className="form-control"
                                value={usuario.telefono}
                                onChange={({ target: { value } }) => {
                                    setUsuario(() => ({ ...usuario, telefono: value }));
                                }
                                }
                            />
                            {errors.telefono && (<span>{errors.telefono.message}</span>)}
                            <label >Direccion</label>
                            <input
                                {...register("direccion")}
                                type="text"
                                className="form-control"
                                value={usuario.direccion}
                                onChange={({ target: { value } }) => {
                                    setUsuario(() => ({ ...usuario, direccion: value }));
                                }
                                }
                            />
                            {errors.direccion && (<span>{errors.direccion.message}</span>)}
                            <label >Rol</label>
                            <input
                                {...register("rol")}
                                type="text"
                                className="form-control"
                                value={usuario.rol}
                                onChange={({ target: { value } }) => {
                                    setUsuario(() => ({ ...usuario, rol: value }));
                                }
                                }
                            />
                            {errors.rol && (<span>{errors.rol.message}</span>)}
                            <label >Image</label>
                            <input
                                {...register("array_img")}
                                type="text"
                                className="form-control"
                                value={usuario.array_img}
                                onChange={({ target: { value } }) => {
                                    setUsuario(() => ({ ...usuario, array_img: value }));
                                }
                                }
                            />
                            {errors.array_img && (<span>{errors.array_img.message}</span>)}
                            <label >Voluntariados</label>
                            <input
                                {...register("array_historial_voluntariados")}
                                type="text"
                                className="form-control"
                                value={usuario.array_historial_voluntariados}
                                onChange={({ target: { value } }) => {
                                    setUsuario(() => ({ ...usuario, array_historial_voluntariados: value }));
                                }
                                }
                            />
                            {errors.array_historial_voluntariados && (<span>{errors.array_historial_voluntariados.message}</span>)}
                        </fieldset>
                        <label >DPI</label>
                        <br />
                        <input
                            type='file'
                            name="DPI"
                            id="DPI"
                            
                            onChange={(e) => handleChange(e)}></input>
                            <br />
                        <label >CV</label>
                        <input
                            type='file'
                            name="CV"
                            id="CV"
                                
                            onChange={(e) => handleChange(e)}></input>
                            <br />
                             <label >Antecedentes</label>
                        <input
                            type='file'
                            name="antecedentes"
                            id="antecedentes"
                            
                            onChange={(e) => handleChange(e)}></input>
                            <br />
                              <label >foto Perfil</label>
                        <input
                            type='file'
                            name="fotoPerfil"
                            id="fotoPerfil"
                            
                            onChange={(e) => handleChange(e)}></input>
                            <br />
                              <label >foto Fondo</label>
                        <input
                            type='file'
                            name="fotoFondo"
                            id="fotoFondo"
                            
                            onChange={(e) => handleChange(e)}></input>

                        <button type="submit" className="btn btn-success" onClick={crud}>{titleButton}</button>
                    </form>
                </main>
                { Pdf === undefined ? []:[
                <button key={"CV"} variant="success" onClick={()=><ViewPdf tipoDdf={"CV"} rutaPdf={Pdf.dpiPath} ></ViewPdf>} >CV</button>,
                <button key={"dpi"} variant="warning" onClick={()=>setDocumento({ruta:Pdf.dpiPath, nombre:"DPI"})}>DPI</button>,
                <button key={"Ante"} variant="danger" onClick={()=>setDocumento({ruta:Pdf.antecedentesPath, nombre:"Antecedentes"})}>Antecedentes</button>,
                 
                ]
                    
                }
            </div>
            
        </>
    )
}

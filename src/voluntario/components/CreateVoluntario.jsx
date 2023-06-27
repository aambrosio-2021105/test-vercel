import React from 'react'
import { FormVoluntario } from './FormVoluntario'
import { Voluntario } from "../models/models.voluntario"



export const CreateVoluntario = () => {
  return (
    <>
    <div>CreateVoluntario</div>
    {
      <FormVoluntario userProp={Voluntario}titleButton={'Crear Cuenta'}option={1}></FormVoluntario>
      
    }
    
  
  </>
  )
}

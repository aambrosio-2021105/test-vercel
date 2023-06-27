import React from 'react'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import { ListVoluntario } from './voluntario/components/ListVoluntario'
import { CreateVoluntario } from './voluntario/components/CreateVoluntario';
export const AppRoutes = () => {
  return (
    <>
     
     <Router>
      <Routes >
        <Route path="/" element={<ListVoluntario />} />
        <Route path="/agregar-Voluntario" element={<CreateVoluntario />} />
      </Routes>
    </Router>
        
       
      
    </>

  )
}

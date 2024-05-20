import React from 'react'
import { Outlet } from "react-router-dom";
import Menu from '../Menu/Menu';
import "./LayoutForm.css";



const LayoutForm = ({ sections }) => {
  return (
    <div className="layout-container">
        <Menu sections={sections} />
        <div className="layout-container-content">
            <Outlet />
        </div>
      
    </div>
  )
}

export default LayoutForm;
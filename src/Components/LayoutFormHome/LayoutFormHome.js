import React from 'react'
import { Outlet } from "react-router-dom";
import MenuHome from '../MenuHome/MenuHome';
import "./LayoutFormHome.css";

function LayoutFormHome({ sections1, sections2 }) {
    return (
        <div className="layout-container">
            <MenuHome sections1={sections1} sections2={sections2}/>
            <div className="layout-container-content">
                <Outlet />
            </div>
          
        </div>
    )
}

export default LayoutFormHome

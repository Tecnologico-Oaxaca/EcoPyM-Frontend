import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import { HiMiniUserGroup } from "react-icons/hi2";
import { RiUser3Fill } from "react-icons/ri";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import Layout from './Components/LayoutForm/LayoutForm';
import LayoutHome from './Components/LayoutFormHome/LayoutFormHome';
import Owner from './Components/Owner/Owner';
import Company from './Components/Company/Company';
import Employee from './Components/Employee/Employee'; 
import Dashboard from './Components/Dashboard/Dashboard'; 
import Stock from './Components/Stock/Stock';

function App() {

  const registroSections = [
    { id: 1, path: "/registro", title: "Datos de la Empresa", Icon: SiHomeassistantcommunitystore },
    { id: 2, path: "/registro/Propietario", title: "Registro Propietario", Icon: RiUser3Fill },
    { id: 3, path: "/registro/MisEmpleados", title: "Registro Empleado", Icon: HiMiniUserGroup },
  ];

  const MenuSections1 = [
    { id: 1, path: "/registro/Menu", title: "Inicio", Icon: RiUser3Fill },
    { id: 2, path: "/registro/Menu/MisVentas", title: "Ventas", Icon: SiHomeassistantcommunitystore },
    { id: 3, path: "/registro/Menu/MisUsuarios", title: "Usuarios", Icon: HiMiniUserGroup },
    { id: 4, path: "/registro/Menu/MisProductos", title: "Productos", Icon: HiMiniUserGroup },
    { id: 5, path: "/registro/Menu/MisProveedores", title: "Proveedores", Icon: HiMiniUserGroup }
  ];

  const MenuSections2 = [
    { id: 1, path: "/registro/Perfil", title: "Perfil", Icon: RiUser3Fill },
    { id: 2, path: "/registro/Contactanos", title: "Contactanos", Icon: SiHomeassistantcommunitystore },
    { id: 3, path: "/registro/Salir", title: "Salir", Icon: HiMiniUserGroup }
  ];


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/registro' element={<Layout sections={registroSections} />}>
          <Route index element={<Company />} />
          <Route path='Propietario' element={<Owner />} />
          <Route path='MisEmpleados' element={<Employee />} />
      </Route>
      <Route path='/registro/Menu' element={<LayoutHome sections1={MenuSections1} sections2={MenuSections2} />}>
          <Route index element={<Dashboard />} />
          <Route path='MisVentas' element={<Stock />} />
          
      </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
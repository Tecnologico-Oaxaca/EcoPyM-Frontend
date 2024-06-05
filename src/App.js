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
import RegisterCode from './Components/Employee/RegisterCode';
import Users from './Components/Users/Users';
import Sales from './Components/Sales/Sales';
import Trend from './Components/Trend/Trend';
import { FaArrowTrendUp } from "react-icons/fa6";
import { CiShoppingBasket } from "react-icons/ci";
import { IoExitOutline } from "react-icons/io5";



function App() {

  const registroSections = [
    { id: 1, path: "/registro", title: "Datos de la Empresa", Icon: SiHomeassistantcommunitystore },
    { id: 2, path: "/registro/Propietario", title: "Registro Propietario", Icon: RiUser3Fill },
    { id: 3, path: "/registro/MisEmpleados", title: "Registro Empleado", Icon: HiMiniUserGroup },
  ];

  const registroCode = [
    { id: 1, path: "/Code", title: "Registro de mis Datos", Icon: SiHomeassistantcommunitystore }
  ];

  const MenuSections1 = [
    { id: 1, path: "/Menu", title: "Inicio", Icon: RiUser3Fill },
    { id: 2, path: "/Menu/MisVentas", title: "Ventas", Icon: SiHomeassistantcommunitystore },
    { id: 3, path: "/Menu/MisUsuarios", title: "Usuarios", Icon: HiMiniUserGroup },
    { id: 4, path: "/Menu/MisProductos", title: "Productos", Icon: CiShoppingBasket },
    //{ id: 5, path: "/Menu/MisProveedores", title: "Proveedores", Icon: HiMiniUserGroup },
    { id: 5, path: "/Menu/Tendencias", title: "Tendencias", Icon: FaArrowTrendUp }

  ];

  const MenuSections2 = [
    { id: 1, path: "/registro/Perfil", title: "Perfil", Icon: RiUser3Fill },
    { id: 2, path: "/registro/Contactanos", title: "Contactanos", Icon: SiHomeassistantcommunitystore },
    { id: 3, path: "/registro/Salir", title: "Salir", Icon: IoExitOutline }
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
      <Route path='/Code' element={<Layout sections={registroCode} />}>
          <Route index element={<RegisterCode />} />
      </Route>
      <Route path='/Menu' element={<LayoutHome sections1={MenuSections1} sections2={MenuSections2} />}>
          <Route index element={<Dashboard />} />
          <Route path='MisVentas' element={<Sales />} />
          <Route path='MisUsuarios' element={<Users />} />
          <Route path='MisProductos' element={<Stock />} />
          <Route path='Tendencias' element={<Trend />} />
      </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
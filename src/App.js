import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import { HiMiniUserGroup } from "react-icons/hi2";
import { RiUser3Fill } from "react-icons/ri";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import Layout from './Components/LayoutForm/LayoutForm';
import Owner from './Components/Owner/Owner';
import Company from './Components/Company/Company';


function App() {

  const registroSections = [
    { id: 1, path: "/registro", title: "Registro", Icon: RiUser3Fill },
    { id: 2, path: "/registro/miNegocio", title: "Datos de la Empresa", Icon: SiHomeassistantcommunitystore },
    { id: 3, path: "/registro/MisEmpleados", title: "Registro Empleado", Icon: HiMiniUserGroup },
  ];


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/registro' element={<Layout sections={registroSections} />}>
          <Route index element={<Owner />} />
          <Route path='miNegocio' element={<Company />} />
      </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
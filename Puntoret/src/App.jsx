import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Employee from './Components/Employee'
import AddEmployee from './Components/AddEmployee'
import EditEmployee from './Components/EditEmployee'
import Start from './Components/Start'
import PrivateRoute from './Components/PrivateRoute'
import Kryepuntor from './Components/Uji-Kryepuntorët/Kryepuntor'
import KryePuntorLogin from './Components/KryePuntorlogin'
import KHome from './Components/Uji-Kryepuntorët/KHome'
import KEmployee from './Components/Uji-Kryepuntorët/KEmployee'
import KAddEmployee from './Components/Uji-Kryepuntorët/KAddEmployee'
import KEditEmployee from './Components/Uji-Kryepuntorët/KEditEmployee'
import Klista from './Components/Uji-Kryepuntorët/KLista'
import KEditLista from './Components/Uji-Kryepuntorët/KEditLista'
import KAddLista from './Components/Uji-Kryepuntorët/KAddLista'
import PuntoretUji from './Components/Admin/PuntoretUji'
import AddPuntoretUji from './Components/Admin/AddPuntoretUji'
import EditPuntoretUji from './Components/Admin/EditPuntoretUji'
import KOret from './Components/Uji-Kryepuntorët/KOret'
import KPuntoret from './Components/Uji-Kryepuntorët/KPuntoret'
import KontaDashboard from './Components/Kontabilist/KontaDashboard'
import KontaHome from './Components/Kontabilist/KontaHome'
import Uji from './Components/Kontabilist/Uji'
import DataPuntoret from './Components/Puntoret/DataPuntoret'
import PuntorLogin from './Components/Puntoret/PuntorLogin'
import { useEffect, useState } from 'react'
import ChangePassword from './Components/Puntoret/ChangePassword'
import ContactForm from './Components/ContactForm'
import AddAdmin from './Components/Admin/AddAdmin'
import ProgMain from './Components/Programer/ProgMain'
import ProgHome from './Components/Programer/ProgHome'
import ProgEmployee from './Components/Programer/ProgEmployee'
import ProgAddEmployee from './Components/Programer/ProgAddEmployee'
import ProgEditEmployee from './Components/Programer/ProgEditEmployee'
import Proglista from './Components/Programer/ProgLista'
import ProgEditLista from './Components/Programer/ProgEditLista'
import ProgAddLista from './Components/Programer/ProgAddLista'
import ProgOret from './Components/Programer/ProgOret'
import ProgPuntoret from './Components/Programer/ProgPuntoret'



function App() {

  const [workerId, setWorkerId] = useState(null);


  useEffect(() => {
    const handlePopState = () => {
      // Clear localStorage when navigating back
      localStorage.clear();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start />}></Route>
        <Route path='/login' element={<Login setWorkerId={setWorkerId} />}></Route>
        <Route path='/contactus' element={<ContactForm />}></Route>

        {/* UJI */}
        <Route path='/kryepuntor' element={<PrivateRoute allowedRoles={['uji']}>
          <Kryepuntor />
        </PrivateRoute>}>
          <Route path='' element={<KHome />}></Route>
          <Route path='/kryepuntor/employee' element={<KEmployee />}></Route>
          <Route path='/kryepuntor/add_employee' element={<KAddEmployee />}></Route>
          <Route path='/kryepuntor/edit_employee/:id' element={<KEditEmployee />}></Route>
          <Route path='/kryepuntor/klista' element={<Klista />}></Route>
          <Route path='/kryepuntor/edit_klista/:id' element={<KEditLista />}></Route>
          <Route path='/kryepuntor/add_klista' element={<KAddLista />}></Route>
          <Route path='/kryepuntor/oret/:id' element={<KOret />}></Route>
          <Route path='/kryepuntor/puntoret' element={<KPuntoret />}></Route>


        </Route>


        {/* Programer */}
        <Route path='/programer' element={<PrivateRoute allowedRoles={['Programer']}>
          <ProgMain />
        </PrivateRoute>}>
          <Route path='' element={<ProgHome />}></Route>
          <Route path='/programer/employee' element={<ProgEmployee />}></Route>
          <Route path='/programer/add_employee' element={<ProgAddEmployee />}></Route>
          <Route path='/programer/edit_employee/:id' element={<ProgEditEmployee />}></Route>
          <Route path='/programer/klista' element={<Proglista />}></Route>
          <Route path='/programer/edit_klista/:id' element={<ProgEditLista />}></Route>
          <Route path='/programer/add_klista' element={<ProgAddLista />}></Route>
          <Route path='/programer/oret/:id' element={<ProgOret />}></Route>
          <Route path='/programer/puntoret' element={<ProgPuntoret />}></Route>


        </Route>

        {/* KONTABILIST */}

        <Route path='/kontabilist' element={<KontaDashboard />}>
          <Route path='' element={<KontaHome />}></Route>
          <Route path='/kontabilist/uji' element={<Uji />}></Route>

        </Route>

        {/* Puntoret */}


        <Route path='/datapuntoret' element={<PrivateRoute allowedRoles={['puntor']}> <DataPuntoret workerId={workerId} /></PrivateRoute>}></Route>
        <Route path='/change/password/:id' element={<PrivateRoute allowedRoles={['puntor']}> <ChangePassword /></PrivateRoute>}></Route>



        {/* Dashboard ADMIN */}

        <Route path='/addadmin' element={<PrivateRoute allowedRoles={['admin']}>
          <AddAdmin />
        </PrivateRoute>}>
        </Route>

        <Route path='/dashboard' element={
          <PrivateRoute allowedRoles={['admin']} >
            <Dashboard />
          </PrivateRoute>
        }>
          <Route path='' element={<Home />}></Route>
          <Route path='/dashboard/employee' element={<Employee />}></Route>
          <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
          <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>

          {/* Admin */}
          <Route path='/dashboard/puntoretuji' element={<PuntoretUji />}></Route>
          <Route path='/dashboard/addpuntoretuji' element={<AddPuntoretUji />}></Route>
          <Route path='/dashboard/editpuntoretuji/:id' element={<EditPuntoretUji />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

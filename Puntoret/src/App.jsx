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
import Kryepuntor from './Components/GameDesign/Kryepuntor'

import KHome from './Components/GameDesign/KHome'
import KEmployee from './Components/GameDesign/KEmployee'
import KAddEmployee from './Components/GameDesign/KAddEmployee'
import KEditEmployee from './Components/GameDesign/KEditEmployee'
import Klista from './Components/GameDesign/KLista'
import KEditLista from './Components/GameDesign/KEditLista'
import KAddLista from './Components/GameDesign/KAddLista'
import PuntoretUji from './Components/Admin/PuntoretUji'
import AddPuntoretUji from './Components/Admin/AddPuntoretUji'
import EditPuntoretUji from './Components/Admin/EditPuntoretUji'
import KOret from './Components/GameDesign/KOret'
import KPuntoret from './Components/GameDesign/KPuntoret'
import KontaDashboard from './Components/Kontabilist/KontaDashboard'
import KontaHome from './Components/Kontabilist/KontaHome'
import GameDesign from './Components/Kontabilist/GameDesign'
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
import Programers from './Components/Kontabilist/Programers'
import SoundMain from './Components/SoundEffect/SoundMain'
import SoundHome from './Components/SoundEffect/SoundHome'
import SoundEmployee from './Components/SoundEffect/SoundEmployee'
import SoundAddEmployee from './Components/SoundEffect/SoundAddEmployee'
import SoundEditEmployee from './Components/SoundEffect/SoundEditEmployee'
import SoundLista from './Components/SoundEffect/SoundLista'
import SoundEditLista from './Components/SoundEffect/SoundEditLista'
import SoundAddLista from './Components/SoundEffect/SoundAddLista'
import SoundOret from './Components/SoundEffect/SoundOret'
import SoundPuntoret from './Components/SoundEffect/SoundPuntoret'
import SoundEffect from './Components/Kontabilist/SoundEffect'



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
        <Route path='/gamedesign' element={<PrivateRoute allowedRoles={['gamedesign','admin']}>
          <Kryepuntor />
        </PrivateRoute>}>
          <Route path='' element={<KHome />}></Route>
          <Route path='/gamedesign/employee' element={<KEmployee />}></Route>
          <Route path='/gamedesign/add_employee' element={<KAddEmployee />}></Route>
          <Route path='/gamedesign/edit_employee/:id' element={<KEditEmployee />}></Route>
          <Route path='/gamedesign/klista' element={<Klista />}></Route>
          <Route path='/gamedesign/edit_klista/:id' element={<KEditLista />}></Route>
          <Route path='/gamedesign/add_klista' element={<KAddLista />}></Route>
          <Route path='/gamedesign/oret/:id' element={<KOret />}></Route>
          <Route path='/gamedesign/puntoret' element={<KPuntoret />}></Route>


        </Route>


        {/* Programer */}
        <Route path='/programer' element={<PrivateRoute allowedRoles={['programer','admin']}>
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



        {/* Sound Effect */}
        <Route path='/soundeffect' element={<PrivateRoute allowedRoles={['soundeffect','admin']}>
          <SoundMain />
        </PrivateRoute>}>
          <Route path='' element={<SoundHome />}></Route>
          <Route path='/soundeffect/employee' element={<SoundEmployee />}></Route>
          <Route path='/soundeffect/add_employee' element={<SoundAddEmployee />}></Route>
          <Route path='/soundeffect/edit_employee/:id' element={<SoundEditEmployee />}></Route>
          <Route path='/soundeffect/klista' element={<SoundLista />}></Route>
          <Route path='/soundeffect/edit_klista/:id' element={<SoundEditLista />}></Route>
          <Route path='/soundeffect/add_klista' element={<SoundAddLista />}></Route>
          <Route path='/soundeffect/oret/:id' element={<SoundOret />}></Route>
          <Route path='/soundeffect/puntoret' element={<SoundPuntoret />}></Route>


        </Route>

        {/* KONTABILIST */}

        <Route path='/kontabilist' element={<PrivateRoute allowedRoles={['kontabilist']}>
          <KontaDashboard />
          </PrivateRoute>}>
          <Route path='' element={<KontaHome />}></Route>
          <Route path='/kontabilist/gamedesign' element={<GameDesign />}></Route>
          <Route path='/kontabilist/programers' element={<Programers />}></Route>
          <Route path='/kontabilist/soundeffect' element={<SoundEffect />}></Route>

        </Route>

        {/* Puntoret */}


        <Route path='/datapuntoret' element={<PrivateRoute allowedRoles={['puntor']}> <DataPuntoret workerId={workerId} /></PrivateRoute>}></Route>
        <Route path='/change/password/:id' element={<PrivateRoute allowedRoles={['puntor']}> <ChangePassword /></PrivateRoute>}></Route>



        {/* Dashboard ADMIN */}

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

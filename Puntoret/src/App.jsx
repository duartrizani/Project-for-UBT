import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Login from './Components/Login'
import Dashboard from './Components/Admin/Dashboard'
import Home from './Components/Admin/Home'
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
import KOret from './Components/GameDesign/KOret'
import KPuntoret from './Components/GameDesign/KPuntoret'
import KontaDashboard from './Components/Kontabilist/KontaDashboard'
import KontaHome from './Components/Kontabilist/KontaHome'
import GameDesign from './Components/Kontabilist/GameDesign'
import DataPuntoret from './Components/Puntoret/DataPuntoret'
import ChangePassword from './Components/Puntoret/ChangePassword'
import ContactForm from './Components/ContactForm'
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
import AKEmployee from './Components/Admin/AGameDesign/AKEmployee'
import AKAddEmployee from './Components/Admin/AGameDesign/AKAddEmployee'
import AKEditEmployee from './Components/Admin/AGameDesign/AKEditEmployee'
import AKlista from './Components/Admin/AGameDesign/AKLista'
import AKEditLista from './Components/Admin/AGameDesign/AKEditLista'
import AKAddLista from './Components/Admin/AGameDesign/AKAddLista'
import AKOret from './Components/Admin/AGameDesign/AKOret'
import AKPuntoret from './Components/Admin/AGameDesign/AKPuntoret'
import AProgEmployee from './Components/Admin/AProgramer/AProgEmployee'
import AProgAddEmployee from './Components/Admin/AProgramer/AProgAddEmployee'
import AProgEditEmployee from './Components/Admin/AProgramer/AProgEditEmployee'
import AProglista from './Components/Admin/AProgramer/AProgLista'
import AProgEditLista from './Components/Admin/AProgramer/AProgEditLista'
import AProgAddLista from './Components/Admin/AProgramer/AProgAddLista'
import AProgOret from './Components/Admin/AProgramer/AProgOret'
import AProgPuntoret from './Components/Admin/AProgramer/AProgPuntoret'
import ASoundEmployee from './Components/Admin/ASoundEffect/ASoundEmployee'
import ASoundAddEmployee from './Components/Admin/ASoundEffect/ASoundAddEmployee'
import ASoundEditEmployee from './Components/Admin/ASoundEffect/ASoundEditEmployee'
import ASoundLista from './Components/Admin/ASoundEffect/ASoundLista'
import ASoundEditLista from './Components/Admin/ASoundEffect/ASoundEditLista'
import ASoundAddLista from './Components/Admin/ASoundEffect/ASoundAddLista'
import ASoundOret from './Components/Admin/ASoundEffect/ASoundOret'
import ASoundPuntoret from './Components/Admin/ASoundEffect/ASoundPuntoret'



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

        {/* Game Design */}
        <Route path='/gamedesign' element={<PrivateRoute allowedRoles={['gamedesign']}>
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
        <Route path='/programer' element={<PrivateRoute allowedRoles={['programer']}>
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
        <Route path='/soundeffect' element={<PrivateRoute allowedRoles={['soundeffect']}>
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

        {/* Game Design */}
          <Route path='/dashboard/gamedesign/employee' element={<AKEmployee />}></Route>
          <Route path='/dashboard/gamedesign/add_employee' element={<AKAddEmployee />}></Route>
          <Route path='/dashboard/gamedesign/edit_employee/:id' element={<AKEditEmployee />}></Route>
          <Route path='/dashboard/gamedesign/klista' element={<AKlista />}></Route>
          <Route path='/dashboard/gamedesign/edit_klista/:id' element={<AKEditLista />}></Route>
          <Route path='/dashboard/gamedesign/add_klista' element={<AKAddLista />}></Route>
          <Route path='/dashboard/gamedesign/oret/:id' element={<AKOret />}></Route>
          <Route path='/dashboard/gamedesign/puntoret' element={<AKPuntoret />}></Route>


          {/* Programer */}
          <Route path='/dashboard/programer/employee' element={<AProgEmployee />}></Route>
          <Route path='/dashboard/programer/add_employee' element={<AProgAddEmployee />}></Route>
          <Route path='/dashboard/programer/edit_employee/:id' element={<AProgEditEmployee />}></Route>
          <Route path='/dashboard/programer/klista' element={<AProglista />}></Route>
          <Route path='/dashboard/programer/edit_klista/:id' element={<AProgEditLista />}></Route>
          <Route path='/dashboard/programer/add_klista' element={<AProgAddLista />}></Route>
          <Route path='/dashboard/programer/oret/:id' element={<AProgOret />}></Route>
          <Route path='/dashboard/programer/puntoret' element={<AProgPuntoret />}></Route>


          {/* Sound Effect */}
          <Route path='/dashboard/soundeffect/employee' element={<ASoundEmployee />}></Route>
          <Route path='/dashboard/soundeffect/add_employee' element={<ASoundAddEmployee />}></Route>
          <Route path='/dashboard/soundeffect/edit_employee/:id' element={<ASoundEditEmployee />}></Route>
          <Route path='/dashboard/soundeffect/klista' element={<ASoundLista />}></Route>
          <Route path='/dashboard/soundeffect/edit_klista/:id' element={<ASoundEditLista />}></Route>
          <Route path='/dashboard/soundeffect/add_klista' element={<ASoundAddLista />}></Route>
          <Route path='/dashboard/soundeffect/oret/:id' element={<ASoundOret />}></Route>
          <Route path='/dashboard/soundeffect/puntoret' element={<ASoundPuntoret />}></Route>


        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

import './App.css';
import {Route, Routes} from 'react-router-dom'
import Welcome from '../src/components/Welcome/Welcome'
import Home from '../src/components/Home/Home'
import Detalle from '../src/components/Detail/Detalle'
import CreatePokemon from '../src/components/Create/CreatePokemon'
import Page404 from '../src/components/ErrorInfo/Page404'
import  UpdatePokemon from '../src/components/Update/UpdatePokemon';

function App() {
  return (
        <div className="App">
          <Routes>
            <Route path='*' element={<Page404/>} />
            <Route path="/" element={<Welcome/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/home/:id" element={<Detalle/>}/>
            <Route path="/create" element={<CreatePokemon/>}/>
            <Route path="/update" element={<UpdatePokemon/>}/>
          </Routes>
        </div>
    
  );
}

export default App;

import { useState, useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyNavbar from './Components/Navbar';

import './App.css';

import Home from './views/Home';
import Pokemones from './views/Pokemones'
import NoMatch from './views/NoMatch';

import { MyContext } from './Context';

function App() {

  const [pokemones, setPokemones] = useState([]);

  useEffect(() => {
    getPokemones();
  }, []);

  const getPokemones = async () => {
    const endpoint = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
    const response = await fetch(endpoint);
    const { results } = await response.json();

    // console.log(results)

    setPokemones(results);
  }

  return (
    <div className="App">

      <MyContext.Provider value={{pokemones}}>

        <BrowserRouter>
          <MyNavbar />

          {/* {console.log(pokemones)} */}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemones" element={<Pokemones />} />
            <Route path="/pokemones/:namePokemon" element={<Pokemones />} />
            <Route path='*' element={<NoMatch />} />
          </Routes>
        </BrowserRouter>
      </MyContext.Provider>
    </div>
  );
}

export default App;

import React from 'react';
import SharedLayout from './Components/SharedLayout';
import Main from './Components/Main/Main';
import Four04 from '../Pages/Four04/Four04';
import Mac from '../Pages/Mac/Mac';
import Productpage from '../Pages/Productpage/Productpage';
import Iphone from '../Pages/Iphone/iphone';
import { Route ,Routes } from 'react-router-dom';

export default function App() {
  return (
    <div>
      
      <Routes>
        < Route path='/' Component={SharedLayout}>
          <Route path='/mac' Component={Mac} />
          <Route path='/' Component={Main} />
          <Route path='/iphone' Component={Iphone} />
          <Route path='/iphone/:pid' Component={Productpage} />
          <Route path='*' Component={Four04} />
          </Route>
      </Routes>
    </div>
  );
}

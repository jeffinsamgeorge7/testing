
import './App.css';
import { lazy,Suspense } from 'react';

import {Routes,Route} from 'react-router-dom';


function App() {
  const Defo=lazy(()=>import('../src/components/defaultpage'))
  const Prod =lazy(()=>import('../src/components/productsform'))
  const Prodlis =lazy(()=>import('../src/components/productslist'))
  const Editprod =lazy(()=>import('../src/components/updateproduct'))

  return (
   <Suspense fallback={<div>Comming Soon</div>}>
      <Routes>
        <Route path='/' element={<Defo/>}/>
        <Route path='/addproduct' element={<Prod/>}/>
        <Route path='/productlist' element={<Prodlis/>}/>
        
        <Route path='/edit/:id' element={<Editprod />}/>
  
  
      </Routes>
   </Suspense>
  );
}

export default App;

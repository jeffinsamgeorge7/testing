
import './App.css';
import { lazy,Suspense } from 'react';
import {Routes,Route} from 'react-router-dom';

function App() {
  const Defo=lazy(()=>import('../src/components/defaultpage'))
  const Prod =lazy(()=>import('../src/components/productsform'))
  return (
   <Suspense fallback={<div>Comming soon</div>}>
      <Routes>
        <Route path='/' element={<Defo/>}/>
        <Route path='/addproduct' element={<Prod/>}/>
      </Routes>
   </Suspense>
  );
}

export default App;

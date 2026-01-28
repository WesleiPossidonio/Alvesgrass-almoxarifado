import { Routes, Route } from 'react-router-dom'
import {
  AddProduct,
  Catalog,
  ClientsPage,
  ExitProduct,
Home,
Login
} from '../pages'



export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/saida' element={<ExitProduct />} />
      <Route path='/entrada' element={<AddProduct />} />
      <Route path='/catalogo' element={<Catalog />} />
      <Route path='/clientes' element={<ClientsPage />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}
import React, { useEffect, useState } from 'react';
import ProductForm from './components/ProductForm';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Productslist from './pages/Productslist';
import Order from './pages/Order';
import Home from './pages/Home';
import UpdateForm from './components/UpdateForm';

function App() {
  const [data, setData] = useState([]);
  const [openModel, setopenModel] = useState(false);
  const [setCurrentProductID, setsetCurrentProductID] = useState('');
  const getAllProducts = async () => {
    const res = await fetch('http://localhost:8000/admin/allproduct')
    const result = await res?.json()
    setData(result)
  }
  useEffect(() => {
    getAllProducts()
  }, [])
  const isOpenModel = (item) => {
    setsetCurrentProductID(item)
    setopenModel(true)


  }
  const productDelte = async (id) => {
    const res = await fetch(`http://localhost:8000/admin/delete-product/${id}`, {
      method: 'DELETE',
    })
    const result = await res.json()
    console.log(result.message);
    getAllProducts()
  }

  return (
    <div className="">
      {openModel && <UpdateForm getAllProducts={getAllProducts} setopenModel={setopenModel} item={setCurrentProductID} />}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/admin/products-list' element={<Productslist data={data} productDelte={productDelte} isOpenModel={isOpenModel} />} />
          <Route path='/admin/product-add' element={<ProductForm getAllProducts={getAllProducts} />} />
          <Route path='/admin/order' element={<Order />} />
          <Route path='/' element={<Home data={data} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

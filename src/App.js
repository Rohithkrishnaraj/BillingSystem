import { useEffect, useState } from 'react';
import Product from './Product';
import Grocery from './Grocery';
import img from './welcome img.jpg';


function App() {
    const[act,setact]=useState("")
    const[items,setItems]=useState([])

    useEffect(() => {
      fetch('http://localhost:5000/products')
        .then(response => response.json())
        .then(data => setItems(data))
        .catch(error => console.error('Error fetching data:', error))
    }, [])
    
    function newPro(newItem){
      setItems([...items,newItem])
    }

    function upPro(updateItems){
      setItems(updateItems)
    }

  return (
  <>
  <div className=''>
   <div>
    <h1 className='text-center font-semibold text-2xl p-2 uppercase mt-5'>Welcome Admin</h1>
  </div>
  <div className='flex justify-center p-10 '>
    <img src={img} alt="" className='rounded-3xl' />
  </div>
  <div className='flex space-x-3 justify-center mb-7 mt-2  '>
    <button className='border-2 border-black bg-yellow-200 p-2 rounded-md' onClick={()=>setact("pro")}>Product Page</button>
    <button className='border-2 border-black bg-orange-200  p-2 rounded-md' onClick={()=>setact("gro")}>Grocery Page</button>
  </div>
  <div>
    {act==="pro" && <Product items={items} newPro={newPro} upPro={upPro}/>}
    {act==="gro" && <Grocery products={items}/>}
  </div>
  </div>
  </>
  );
}

export default App;

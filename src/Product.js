import React from 'react'

import { useState} from 'react'

const Product = ({items,newPro,upPro}) => {
  const [data, setData] = useState({
    name: "",
    category: "",
    sku: "",
    price: "",
    stockqty: "",
    unit: "",
    expdate: "",
    suppliername: "",
    description: "",
  })

  const seteditindex=useState(null)

  function handleChange(e){
    setData({...data,[e.target.name]:e.target.value})
  }
  

  function save(e) {
    e.preventDefault()
    fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(newItem => newPro(newItem))
  }

  function deleteItem(index){
    const id = items[index].id;

    fetch(`http://localhost:5000/products/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updateItems = items.filter((_, i) => i !== index)
        upPro(updateItems)
      })
      
  }
  function clear(){
    setData({
    name: "",
    category: "",
    sku: "",
    price: "",
    stockqty: "",
    unit: "",
    expdate: "",
    suppliername: "",
    description: "",
    })
  }
  function editItem(index){
    let itemEdit=items[index]
    setData(itemEdit)
    seteditindex(index)
  }
  return (
    <div className='bg-blue-100 p-4'>
      <h1 className='text-center text-3xl font-bold p-2 rounded-lg'>Product Screen</h1>
      <form action=""  className='bg-violet-200 p-2 flex  justify-center'  >
        <div className='flex flex-col p-5 mt-1 relative '>

          <table className=' shadow-2xl  w-5 bg-gray-200 rounded-md  '>
            <thead> 
             <tr>
                <th className=''></th>
                 <th className=''></th>
            </tr>
            </thead>
            <tr>
                  <td className=' ' >Name :</td>
                  <td className=''><input type="text" value={data.name} name='name' onChange={handleChange} className='border-2 rounded-md text-center' /></td>
            </tr>
            <tr>
                  <td>Category :</td>
                  <td><input type="text" value={data.category} name='category'onChange={handleChange}  className='border-2 rounded-md text-center' /></td>
            </tr>
            <tr>
                  <td>SKU :</td>
                  <td><input type="text" value={data.sku} name='sku'onChange={handleChange}  className='border-2 rounded-md text-center' /></td>
            </tr>
            <tr>
                  <td>Price :</td>
                  <td><input type="text" value={data.price} name='price' onChange={handleChange} className='border-2 rounded-md text-center' /></td>
            </tr>
            <tr>
                  <td>Stock Qty :</td>
                  <td><input type="text" value={data.stockqty} name='stockqty' onChange={handleChange} className='border-2 rounded-md text-center' /></td>
            </tr>
            <tr>
                  <td>Unit:</td>
                  <td><input type="text" value={data.unit} name='unit' onChange={handleChange} className='border-2 rounded-md text-center' /></td>
            </tr>
            <tr>
                  <td className=' '>Exp Date :</td>
                  <td className=' '><input type="date" value={data.expdate} name='expdate' onChange={handleChange} className='border-2 rounded-md text-center w-full  ' /></td>
            </tr>
            <tr>
                  <td>Supplier Name :</td>
                  <td><input type="text" value={data.suppliername} name='suppliername' onChange={handleChange}  className='border-2 rounded-md text-center' /></td>
            </tr>
            <tr>
                  <td>Description:</td>
                  <td><input type="text" value={data.description} name='description'onChange={handleChange}  className='border-2 rounded-md text-center' /></td>
            </tr>
            
          </table>

        </div>

        </form>

        <div className='flex justify-center space-x-5 text-2xl  p-6 '>
          <button onClick={save}   type='submit' className='border-2 p-1 text-white bg-green-500 rounded-xl '>Save</button>
          <button className='border-2 p-1 text-white bg-red-500 rounded-xl' onClick={clear} >Clear</button>
        </div>
      

      <div className='p-5 flex justify-center'>
        <table className=''>
          <thead className='border-collapse  '>
            <tr>
            <th className='border-2 border-black p-1'>Name</th>
            <th className='border-2 border-black p-1'>category</th>
            <th className='border-2 border-black p-1'>SKU</th>
            <th className='border-2 border-black p-1'>Price</th>
            <th className='border-2 border-black p-1'>Stock-Qty </th>
            <th className='border-2 border-black p-1'>Unit</th>
            <th className='border-2 border-black p-1'>Exp-Date</th>
            <th className='border-2 border-black p-1'>Supplier-Name</th>
            <th className='border-2 border-black p-1'>Description</th>
            <th className='border-2 border-black p-1'>Action</th>
            </tr>
          </thead>
          
      
      <tbody>
      {items.map((item, index)=>(
        <tr key={index}>
        <td className='border-2 border-black p-1' >{item.name}</td>
        <td className='border-2 border-black p-1'  >{item.category}</td>
        <td className='border-2 border-black p-1'  >{item.sku}</td>
        <td className='border-2 border-black p-1' >{item.price}</td>
        <td className='border-2 border-black p-1'  >{item.stockqty}</td>
        <td className='border-2 border-black p-1' >{item.unit}</td>
        <td className='border-2 border-black p-1'  >{item.expdate}</td>
        <td className='border-2 border-black p-1'  >{item.suppliername}</td>
        <td className='border-2 border-black p-1'  >{item.description}</td>
        <td className='border-2 border-black p-1'  ><button onClick={()=>deleteItem(index)} className='border-2 border-black px-2 text-white bg-red-700'>Delete</button> <button onClick={()=>editItem(index)} className='border-2 border-black px-2 text-white bg-blue-500'>Edit</button></td>
        
      </tr> 
      ))}
      
     
     
     </tbody>
       
      

        </table>

    

      </div>
    </div>
  )
}

export default Product
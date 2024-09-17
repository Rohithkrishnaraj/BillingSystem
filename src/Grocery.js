import React, { useState } from 'react'

const Grocery = ({products}) => {
    const [data, setData] = useState({
        productName: "",
        category:"",
        qty: "",
        price: "",
        unit: "",
        amount: "",
    })
    const [inpValue,setInpValue]=useState("")
    const [sug,setSug]=useState([])
    const [item, setItem] = useState([])
    const [editIndex,seteditindex]=useState(null)


    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value })
        
    }

    function amtCal(){
        let qty=data.qty
        let price=data.price
        return qty * price
    }

    function save(e) {
        e.preventDefault()
        let updatedata={...data,amount:amtCal()}
        if(editIndex !== null){
            let upItem=[...item]
            upItem[editIndex]=updatedata
            setItem(upItem)
            seteditindex(null)
        }
        else{
            setItem([...item,updatedata])
        }

    }

    function deleteItem(index) {
        let delItem = item.filter((_, i) => i !== index)
        setItem(delItem)
    }

    function inpChange(e){
        let value = e.target.value
       setInpValue(value)
        if (value.length > 0) {
          let filt = products.filter(product =>
            product.name.toLowerCase().includes(value.toLowerCase())
          )
          setSug(filt)
          setData({ ...data, [e.target.name]: e.target.value })
        } else {
          setSug([])
        }

    }
    function autofill(product){
        setData({
            productName:product.name,
            category:product.category,
            price:product.price,
            unit:product.unit,
            qty:data.qty,
            amount:data.amount
        })
        setInpValue(product.name)
    }

    function editBillItems(index){
        let editItem = item[index]
        setData(editItem)
        seteditindex(index)
        setInpValue(editItem.productName)


    }
    return (
        <div className='bg-orange-100'>

            <h1 className='text-center text-3xl font-semibold p-5'>Grocery</h1>
            <div className='flex justify-around p-5 bg-red-50'>
                <div className='border-2 border-black p-5 bg-lime-50'>
                    <h3 className='text-xl text-center'>User Address</h3>
                    <p className='text-lg p-2'>Address:</p>
                    <textarea className='bg-gray-300 h-20 ' name="" id=""></textarea>
                </div>
                <div className='border-2 border-black p-2 bg-lime-50' >
                    <form action="">
                        <div className='flex p-3 space-x-3 '><p>Email:</p> <input className='border-2' type="text" /></div>
                        <div className='flex p-3 space-x-3'><p>Phone:</p> <input className='border-2' type="text" /></div>
                        <div className='flex p-3 space-x-3'><p>Home Delivery</p> <input className='border-2' type="radio" /> <p>Yes</p><input type="radio" /> <p>No</p></div>
                        <div className='flex p-3 space-x-3'><p>Payment</p><input className='border-2' type="radio" /> <p>Cash</p><input type="radio" /> <p>Card</p></div>

                    </form>
                </div>

                

            </div>

            <h1 className='text-3xl font-semibold p-3 text-center bg-orange-200 '> Billed Items</h1>
            <div className='flex justify-center p-5 '>
                <table className=''>
                    <thead className=''>
                        <tr>
                            <th className='border-2 p-2 border-black'>Product Name</th>
                            <th className='border-2 p-2 border-black'>Category</th>
                            <th className='border-2 p-2 border-black'>Qty</th>
                            <th className='border-2 p-2 border-black'>Price</th>
                            <th className='border-2 p-2 border-black'>Unit</th>
                            <th className='border-2 p-2 border-black'>Amount</th>
                            <th className='border-2 p-2 border-black'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td className='border-2 p-2 border-black'><input type="text" value={inpValue} name='productName' onChange={inpChange}  />{item.productName}
                            {sug.length > 0 &&(
                                <ul>{sug.map((products,index)=>(
                                    <li key={index} onClick={()=>autofill(products)}>{products.name}</li>
                                ))}</ul>
                            )}
                            </td>
                            <td className='border-2 p-2 border-black'> <select name="category" id="" value={data.category} ><option value="">Select Category</option><option value="essentials">Essentials</option><option value="dairy">Dairy</option><option value="grains">Grains</option><option value="bakery">Bakery</option><option value="poultry">Poultry</option><option value="beverages">Beverages</option><option value="personalCare">Personal Care</option></select></td>
                            <td className='border-2 p-2 border-black'><input type="number" value={data.qty} name='qty' onChange={handleChange} />{item.qty}</td>
                            <td className='border-2 p-2 border-black'><input type="text" value={data.price} name='price'  />{item.price}</td>
                            <td className='border-2 p-2 border-black'><select name="unit" id="" value={data.unit}  ><option value="">Select Unit</option><option value="kg">KG</option><option value="litre">Litre</option><option value="piece">Piece</option></select></td>
                            <td className='border-2 p-2 border-black'><input type="text" value={data.amount} name='amount' onChange={handleChange}/>{item.amount}</td>
                            <td className='border-2 p-2 border-black space-x-5'><button className='border-2 border-black px-2 text-white bg-blue-500' onClick={save}>Save</button></td>
                        </tr>
                        {item.map((item, index) => (

                            <tr key={index}>
                                <td className='border-2 p-2 border-black'>{item.productName}</td>
                                <td className='border-2 p-2 border-black'>{item.category}</td>
                                <td className='border-2 p-2 border-black'>{item.qty}</td>
                                <td className='border-2 p-2 border-black'>{item.price}</td>
                                <td className='border-2 p-2 border-black'>{item.unit}</td>
                                <td className='border-2 p-2 border-black'>{item.amount}</td>
                                <td className='border-2 p-2 border-black space-x-5'><button className='border-2 border-black px-2 text-white bg-red-700' onClick={() => deleteItem(index)}>delete</button> <button className='border-2 border-black px-2 text-white bg-fuchsia-300' onClick={() => editBillItems(index)}>Edit</button></td>
                            </tr>




                        ))}

      
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Grocery
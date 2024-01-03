import React, {useEffect, useState} from "react";
import  {Modal} from "react-bootstrap";
import axios from "axios";

interface Product{
    _id:string,
    name:string,
    description:string,
    image:string
    unitPrice:number
    qtyOnHand:number
}

const Product:React.FC = ()=> {

    const [name,setName]=useState('');
    const [description,setDescription]=useState('');
    const [unitPrice,setUnitPrice]=useState<number | ''>('');
    const [qtyOnHand,setQtyOnHand]=useState<number | ''>('');

    const saveProduct = async ()=>{

        const imageUrl='https://cdn.4imprint.com/qtz/homepage/categories/images21/drinkware0222.jpg';

        try {
            const response = axios.post('http://localhost:3000/api/v1/products/create',{
                name,description,unitPrice,qtyOnHand,image:imageUrl
            })
            console.log(response);
            setName('');
            setDescription('');
            setUnitPrice('');
            setQtyOnHand('');


        }catch(e){
            console.log(e);
        }
    }

    const [products,setProducts] = useState<Product[]>([]);
    useEffect(()=>{
        findAllProducts();
    },[]);

    const findAllProducts = async () =>{
        const response = await axios.get('http://localhost:3000/api/v1/products/find-all?searchText=&page=1&size=10');
        setProducts(response.data);
        console.log(products);
    }

    const deleteProduct= async (id: string)=>{
        await axios.delete('http://localhost:3000/api/v1/products/delete-by-id/'+id);
    }

    const [modalState, setModalState]=useState<boolean>(false);

    const [selectedProductId,setSelectedProductId]=useState('');

    const [updateName,setUpdateName]=useState('');
    const [updateDescription,setUpdateDescription]=useState('');
    const [updateUnitPrice,setUpdateUnitPrice]=useState<number | ''>('');
    const [updateQtyOnHand,setUpdateQtyOnHand]=useState<number | ''>('');

    const updateProduct= async ()=>{
        try{

            await axios.put('http://localhost:3000/api/v1/products/update/'+selectedProductId,{
                name:updateName,description:updateDescription,unitPrice:updateUnitPrice,qtyOnHand:updateQtyOnHand
            });
            setModalState(false);
            findAllProducts();

        }catch (e){
            console.log(e)
        }
    }

    const loadModal= async (id: string)=>{
        const product = await axios.get('http://localhost:3000/api/v1/products/find-by-id/'+id);
        console.log(product.data)
        setSelectedProductId(product.data._id)
        setUpdateName(product.data.name)
        setUpdateDescription(product.data.description)
        setUpdateUnitPrice(parseFloat(product.data.unitPrice))
        setUpdateQtyOnHand(parseFloat(product.data.qtyOnHand))

        setModalState(true);
    }

    return(
        <>
        <div className='container'>
            <div className="row">
                <div className="col-12 col-sm-6 col-md-3">
                    <label htmlFor="productName">Product Name</label>
                    <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" className='form-control' id='productName'/>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                    <label htmlFor="unitPrice">Unit Price</label>
                    <input value={unitPrice} onChange={(e)=>{setUnitPrice(parseFloat(e.target.value))}} type="number" className='form-control' id='unitPrice'/>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                    <label htmlFor="qtyOnHand">Qty On Hand</label>
                    <input value={qtyOnHand} onChange={(e)=>{setQtyOnHand(parseFloat(e.target.value))}} type="number" className='form-control' id='qtyOnHand'/>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                    <label htmlFor="productImage">Product Image</label>
                    <input type="file" className='form-control' id='productImage'/>
                </div>
                <div className="col-12">
                    <label htmlFor="description">Description</label>
                    <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}}rows={5} className='form-control' id='description'/>
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col-12">
                    <button onClick={saveProduct} className='btn btn-primary col-12'>Save Product</button>
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col-12">
                    <input type="search" className='form-control' id='search' placeholder='Search Customer Here'/>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <table className='table table-hover table-bordered'>
                        <thead>
                        <tr>
                            <th>#Id</th>
                            <th>Product Name</th>
                            <th>QTY On Hand</th>
                            <th>Unit Price</th>
                            <th>Delete Option</th>
                            <th>Update Option</th>
                            <th>See more</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product,index)=>
                            <tr key={index}>
                                <td>#{index}</td>
                                <td>{product.name}</td>
                                <td>{product.unitPrice}</td>
                                <td>{product.qtyOnHand}</td>
                                <td>{product.description}</td>
                                <td>
                                    <button
                                        onClick={()=>{
                                            if (confirm('are you sure?')){
                                                deleteProduct(product._id);
                                            }}}
                                        className="btn btn-outline-danger btn-sm">Delete</button>
                                </td>
                                <td>
                                    <button
                                        onClick={()=>{
                                            loadModal(product._id);
                                        }}
                                        className="btn btn-outline-success btn-sm">Update</button>
                                </td>
                                <td>
                                    <button className="btn btn-outline-info btn-sm">View</button>
                                </td>
                            </tr>
                        )}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

            {/*==============================*/}

            <Modal show={modalState}>

                <div className='p-4'>
                    <h2>Update Products</h2>
                    <hr/>

                    <div className="col-12">
                        <div className="form-group">
                            <input type="text" defaultValue={updateName}
                                   onChange={(e)=>setUpdateName(e.target.value)}
                                   className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input type="text" defaultValue={updateUnitPrice}
                                   onChange={(e)=>setUpdateUnitPrice(parseFloat(e.target.value))}
                                   className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input
                                onChange={(e)=>setUpdateQtyOnHand(parseFloat(e.target.value))}
                                type="text" defaultValue={updateQtyOnHand} className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input
                                onChange={(e)=>setUpdateDescription(e.target.value)}
                                type="text" defaultValue={updateDescription} className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <button type='button' className='btn-success btn col-12'
                                onClick={()=>updateProduct()}
                        >Update Product</button>
                        <br/>
                        <br/>
                        <button type='button' className='btn-secondary btn col-12' onClick={()=>setModalState(false)}>Close Modal</button>
                    </div>

                </div>

            </Modal>


            {/*==============================*/}
        </>
    )
}
export default Product;
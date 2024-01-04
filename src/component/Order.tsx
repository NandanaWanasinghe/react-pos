import React, {useEffect, useState} from "react";
import Customer from "./Customer";
import axios from "axios";
import product from "./Product";

interface Cart{
    _id:string | undefined,
    description:string| undefined,
    unitPrice:number| '',
    qty:number| undefined,
    total:number| undefined
}

const Order:React.FC = () => {
    const styleObj: React.CSSProperties = {
        marginBottom: '20px'
    }
    const bottomContext: React.CSSProperties = {
        width:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between'
    }
    const TotalText: React.CSSProperties = {
        color:'red',
        margin:0
    }

    const [customers, setCustomers]=useState<Customer[]>([]);

    const [address,setAddress]=useState('');
    const [salary,setSalary]=useState<number | ''>('');



    useEffect(()=>{
        findAllCustomers();
        findAllProducts()

    }, []);

    const findAllCustomers= async ()=>{
        const response = await axios.get('http://localhost:3000/api/v1/customers/find-all?searchText=&page=1&size=10');
        setCustomers(response.data);
    }

    const getCustomerById= async (id:string)=>{
        const customer = await axios.get('http://localhost:3000/api/v1/customers/find-by-id/'+id);
        setSelectedCustomer(customer.data);
        setAddress(customer.data.address)
        setSalary(parseFloat(customer.data.salary))
    }

    const [products,setProducts] = useState<product[]>([]);

    const [description,setDescription]=useState('');
    const [unitPrice,setUnitPrice]=useState<number | ''>('');
    const [qtyOnHand,setQtyOnHand]=useState<number | ''>('');

    const findAllProducts = async () =>{
        const response = await axios.get('http://localhost:3000/api/v1/products/find-all?searchText=&page=1&size=10');
        setProducts(response.data);
        console.log(response);
    }

    const getProductById= async (id:string)=>{
        const product = await axios.get('http://localhost:3000/api/v1/products/find-by-id/'+id);
        setSelectedProduct(product.data);
        setDescription(product.data.description);
        setQtyOnHand(product.data.qtyOnHand);
        setUnitPrice(product.data.unitPrice);

    }

    const [cart, setCart]=useState<Cart[]>([]);

    const [selectedCustomer,setSelectedCustomer] = useState<Customer | null>(null);
    const [selectedProduct,setSelectedProduct]=useState<product | null>(null);

    const [userQty,setUserQty]=useState<number>(0);

    const addToCart= async (newItem:Cart)=>{
        setCart((prevState)=>[...prevState,newItem]);
    }
    return (
        <>
            <br/>

            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4" style={styleObj}>
                        <div className="from-group">
                            <label htmlFor="customer">Select Customer</label>
                            <select id="customer" className="form-control" onChange={
                                (e)=>(getCustomerById(e.target.value))}>

                                <option value="">Select Value</option>

                                {customers.map((customer,index)=>(
                                    <option key={index} value={customer._id}>{customer.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="from-group">
                            <label htmlFor="address">Customer Address</label>
                            <input value={address} type="text" disabled className="form-control" id="address"/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="from-group">
                            <label htmlFor="salary">Salary</label>
                            <input value={salary} type="number" disabled className="form-control" id="salary"/>
                        </div>
                    </div>
                </div>

                <hr/>
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-3" style={styleObj}>
                        <div className="from-group">
                            <label htmlFor="customer">Select Product</label>
                            <select id="product" className="form-control" onChange={
                                (e)=>(getProductById(e.target.value))
                            }>
                                <option value="">Select Value</option>
                                {products.map((product, index)=>(
                                    <option key={index} value={product._id}>{product.name}</option>
                                ))}

                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3" style={styleObj}>
                        <div className="from-group">
                            <label htmlFor="description">Product Description</label>
                            <input value={description} type="text" disabled className="form-control" id="description"/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3" style={styleObj}>
                        <div className="from-group">
                            <label htmlFor="price">Unit Price</label>
                            <input value={unitPrice} type="number" disabled className="form-control" id="price"/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3" style={styleObj}>
                        <div className="from-group">
                            <label htmlFor="qtyOnHand">Qty On Hand</label>
                            <input value={qtyOnHand} type="number" disabled className="form-control" id="qtyOnHand"/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3" style={styleObj}>
                        <div className="from-group">
                            <label htmlFor="qty">Qty</label>
                            <input onChange={(e)=>{setUserQty(parseFloat(e.target.value))}} type="number" className="form-control" id="qty"/>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <button className='btn btn-primary col-12' onClick={()=>{

                            const cartProduct:Cart= {
                                _id:selectedProduct?._id,
                                description:description,
                                unitPrice:unitPrice,
                                qty:userQty,
                                total:(userQty*(unitPrice?unitPrice:0))
                            }
                            addToCart(cartProduct);
                        }}>+ Add Product</button>
                    </div>
                </div>

                <br/>
                <div className="row">
                    <div className="col-12">
                        <table className="table table-hover table-bordered">
                            <thead>
                            <tr>
                                <th>#Id</th>
                                <th>Product Name</th>
                                <th>Unit Price</th>
                                <th>QTY</th>
                                <th>Total</th>
                                <th>Delete Option</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cart.map((data, index)=>(
                                <tr key={index}>
                                    <td>#{index}</td>
                                    <td>{data.description}</td>
                                    <td>{data.unitPrice}</td>
                                    <td>{data.qty}</td>
                                    <td>{data.total}</td>
                                    <td>
                                        <button
                                            onClick={(e)=>{

                                                setCart((prevState)=>prevState.filter((cartData)=>cartData._id!==data._id));
                                            }}
                                            className='btn btn-outline-danger btn-sm'>Remove</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <br/>

                        <div className="bottom-context" style={bottomContext}>
                            <div className="total-router">
                                <h1 style={TotalText}>
                                    Total : 2500.00
                                </h1>
                            </div>
                            <div className="place-order-button-context">
                                <button className="btn btn-primary">Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Order;
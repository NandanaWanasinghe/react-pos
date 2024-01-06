import DefaultCard from "../card/DefaultCard";
import MinQtyCard from "../card/MinQtyCard";
import React, {useEffect, useState} from "react";
import Product from "./Product";
import axios from "axios";
import DefaultChart from "../card/DefaultChart";

const Home:React.FC = () => {

    const [products, setProducts]=useState<Product[]>([]);
    const[productCount,setProductCount]=useState<number>();
    const[customerCount,setCustomerCount]=useState<number>();
    const[orderCount,setOrderCount]=useState<number>();

    useEffect(()=>{
        findAllProducts();
        findAllCounts();

    }, [])
    const findAllProducts= async ()=>{
        const response = await axios.get('http://localhost:3000/api/v1/products/find-all-min');
        setProducts(response.data);
    }
    const findAllCounts= async ()=>{
        const productCount = await axios.get('http://localhost:3000/api/v1/products/find-all-count');
        setProductCount(productCount.data);
        const customerCount = await axios.get('http://localhost:3000/api/v1/customers/find-count');
        setCustomerCount(customerCount.data);
        const orderCount = await axios.get('http://localhost:3000/api/v1/orders/find-count');
        setOrderCount(orderCount.data);

    }


    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail='https://img.freepik.com/free-photo/business-partners-shaking-hands-agreement_53876-25164.jpg?w=360&t=st=1703006685~exp=1703007285~hmac=3b90b394fcff56c7f8368ab50275733fbe4dbda0b8c32a0195cb66a18165165b'
                            description='Free photo business partners shaking hands in'
                            title='customers'
                            value={customerCount}
                            key={1}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail='https://img.freepik.com/free-psd/skincare-products-instagram-post-set_174241-157.jpg?w=740&t=st=1703006830~exp=1703007430~hmac=1c18b8457110b3ea06956ed0516786b51edaf72a9bccbb1efa927aa253fe2dbb'
                            description='Free vector cosmetics 2x2 design concept'
                            title='products'
                            value={productCount}
                            key={2}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail='https://img.freepik.com/free-vector/realistic-black-friday-concept_23-2148705145.jpg?w=740&t=st=1703006894~exp=1703007494~hmac=5fdbb59545cfd679771b3833759abc8b7875bf66cead4869c4ee7019e540bbe2'
                            description='Free vector realistic black friday concept'
                            title='sales'
                            value={orderCount}
                            key={3}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail='https://img.freepik.com/premium-photo/businessman-putting-coins-stacking-with-virtual-graph-currency-sign-such-as-dollar-pound-sterling-yen-yuan-euro-business-investment-saving-profit-concept_50039-1543.jpg?w=740'
                            description='Photo businessman putting coins stacking with v'
                            title='income'
                            value={250}
                            key={4}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-9">
                            <DefaultChart/>
                    </div>
                    <div className="col-12 col-md-3">
                        {products.map((prod,index)=>(
                            <MinQtyCard name={prod.name} image={prod.image} description={prod.description} key={index} />
                        ))}
                    </div>

                </div>
            </div>
        </>
    )
}
export default Home;
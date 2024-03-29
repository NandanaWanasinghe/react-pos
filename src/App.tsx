import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from "./component/Home";
import Customer from "./component/Customer";
import Product from "./component/Product";
import Order from "./component/Order";
import Login from "./component/Login";
import Signup from "./component/Signup";

function App() {
    return(
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <div className="navbar-brand">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Wattpad-logo-vector.svg/1200px-Wattpad-logo-vector.svg.png"
                                 alt="" className='logo'/>
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/customer">Customers</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/order">Order Management</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/product">Products</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

            <hr/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/customer' element={<Customer/>}/>
                <Route path='/product' element={<Product/>}/>
                <Route path='/order' element={<Order/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signUp' element={<Signup/>}/>
            </Routes>
        </Router>
    )
}
export default App;
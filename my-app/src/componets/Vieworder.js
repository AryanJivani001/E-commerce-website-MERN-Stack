import React, { useEffect, useState } from 'react'
import './css/vieworder.css'
import axios from "axios"
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
// import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckIcon from '@mui/icons-material/Check';

function Vieworder() {
    const navigate=useNavigate();
    const [data, setdata] = useState([])
    const [email, setemail] = useState("")
    useEffect(() => {
        const auth=localStorage.getItem('user');
        if(auth){
        axios.get("http://localhost:5000/getconformorder")
            .then(res => {
                setdata(res.data)
            })
            setemail(JSON.parse(auth).email)
        }else{
            navigate("/")
        }
    })
    return (
        <>
            <Button className='button' style={{marginBottom:"-150px"}} onClick={(e)=>{navigate("/")}} variant="outline-secondary">Back</Button>{' '}
        <div className='top'>
            <div className='Left'>
                <div>
                    <h1>Panding Orders</h1>
                </div>
                <div style={{border:"1px solid gray",width:"550px"}}></div>
                <Table className='order_detail1' hover size="sm">
                    <thead className='head'>
                        <tr>
                            <th>Image</th>
                            <th>title</th>
                            <th>Price</th>
                            <th>size</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    { 
                        data.map((item, i) => {
                            return (
                                <>
                                    {
                                    item.__v===0 && item.email===email &&
                                    <tbody>
                                        <tr>
                                            <td><img className='list_img1' src={item.ImageUrl} alt="" /></td>
                                            <td>{item.title}</td>
                                            <td>{item.Price}</td>
                                            <td>{item.size}</td>
                                            <td>{item.quantity}</td>
                                            <td><LocalShippingIcon  style={{color:"#DF2E38"}} /></td>
                                            <td><CheckIcon  style={{color:"#5D9C59"}} /></td>
                                        </tr>
                                    </tbody>
                                    }
                                    
                                </>
                            )
                        })
                    }

                </Table>
                
            </div>
            
            <div className="vl1"></div>
            <div className='Right'>
                <div>
                    <h1>Conform Orders</h1>
                </div>
                <div style={{border:"1px solid gray",width:"550px"}}></div>
                <div>
                <Table className='order_detail1' hover size="sm">
                    <thead className='head'>
                        <tr>
                            <th>Image</th>
                            <th>title</th>
                            <th>Price</th>
                            <th>size</th>
                            <th>Quantity</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    { 
                        data.map((item, i) => {
                            return (
                                <>
                                    {
                                    item.__v===1 && item.email===email &&
                                    <tbody>
                                        <tr>
                                            <td><img className='list_img1' src={item.ImageUrl} alt="" /></td>
                                            <td>{item.title}</td>
                                            <td>{item.Price}</td>
                                            <td>{item.size}</td>
                                            <td>{item.quantity}</td>
                                            <td><AssignmentTurnedInIcon style={{color:"#5D9C59"}}/></td>
                                        </tr>
                                    </tbody>
                                    }
                                    
                                </>
                            )
                        })
                    }

                </Table>
                </div>
            </div>
        </div>
        </>
    )
}

export default Vieworder

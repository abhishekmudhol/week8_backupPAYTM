import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAsyncEffect from "use-async-effect";

function Balance() {
    const [balance, setBalance] = useState(null)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useAsyncEffect(async()=>{
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/account/balance`,{
                headers : {
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                }
            })
            if (response) {
                setBalance(response.data.accountBalance.toFixed(2))
            }
        }catch (error) {
            if(!error.response){
                navigate('/error' , { state : {message : "No response received from server"}})
            }else{
                navigate('/error' , {state : {message : error.response.data.message}})
            }
        }
    },[])

    return (
        <div className="flex items-center font-medium text-lg text-deep-slate-blue">
            <div className="font-bold">
                Your balance :
            </div>
            <div className="font-semibold ml-4 text-lg text-orange-600">
                Rs {balance}
            </div>
        </div>
    );
}

export default Balance;

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

function SendMoney() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [searchQueryParams , setSearchQueryParams] = useSearchParams()
    const id = searchQueryParams.get('id');
    const name = searchQueryParams.get('name');
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [isSubmitting ,setIsSubmitting] = useState(false)

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        try {
            //await new Promise((r)=>setTimeout(r,4000)) //TODO=> SHOW LOADER
            const response = await axios.post(`http://localhost:5000/api/v1/account/transfer`, {
                to: id,
                amount: data.amount
            },{
                headers : {
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                }
            });

            if (response.data.message == 'Transaction Successful') {
                navigate(`/success`) 
            }

        } catch (error) {
            if(!error.response){
                navigate('/error' , { state : {message : "No response received from server"}})
            }else{
                navigate('/error' , {state : {message : error.response.data.message}})
            }
        }finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
                >
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name.charAt(0).toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="amount"
                                >
                                    Amount (in Rs)
                                </label>
                                <input
                                    type="number"
                                    {...register("amount", { required: true })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                                {errors.amount && <p className="text-red-500 text-sm before:content-['⚠'] before:mr-0">Amount is required.</p>}
                            </div>
                            <button
                                type="submit"
                                disabled ={isSubmitting}
                                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                            >
                                {isSubmitting? 'Transfering Money...':'Initiate Transfer'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SendMoney;

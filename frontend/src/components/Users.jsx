import { useRef, useState } from "react";
import { useAsyncEffect } from 'use-async-effect';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "./Button"
import Loading from "./Loading";

function Users() {
    const inputRef = useRef();
    const navigate = useNavigate()
    const timeoutIdRef = useRef(null);
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token')

    useAsyncEffect(async () => {
        setLoading(true)
        try {
            const usersFromDb = await axios.get(`http://localhost:5000/api/v1/user/bulk?filter=${filter}` , {
                headers : {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                }
            });
            setUsers(usersFromDb.data.users);
        } catch (error) {
            if(!error.response){
                navigate('/error' , { state : {message : "No response received from server" , status : 500}})
            }else{
                navigate('/error', { state: { message: error.response.data.message, status: error.response.status} });
            }
        }finally{
            setLoading(false)
        }
    }, [filter]);

    function onChangeHandler() {
        clearTimeout(timeoutIdRef.current);
        
        timeoutIdRef.current = setTimeout(() => {
            setFilter(inputRef.current.value);
        }, 1000);
    }

    if (loading) {
        return <Loading/>
    }

    return (
        <>
            <div className="pb-1 font-bold mt-6 text-lg text-deep-slate-blue">
                Users
            </div>
            <div className="my-2">
                <input
                    type="text"
                    ref={inputRef}
                    onChange={onChangeHandler}
                    placeholder="Search users..."
                    className="w-full px-2 py-1 border rounded border-muted-sage-green text-deep-slate-blue"
                />
            </div>
            <div className="pt-2">
                {users.map(user => <User key={user._id} user={user}/>)}
            </div>
        </>
    );
}

function User({ user }) {
    const navigate = useNavigate()
    
    return (
        <div className="flex justify-between items-center bg-antique-white p-2 rounded-md mb-2">
            <div className="flex items-center">
                <div className="rounded-full h-12 w-12 bg-muted-sage-green flex justify-center items-center mt-1 mr-2">
                    <div className="text-xl font-bold text-deep-slate-blue">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <div className="text-deep-slate-blue">
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>
            <div className="pt-2 flex flex-col justify-center">
                <Button
                    label={'Send Money'}
                    onClick={(e)=>{ navigate(`/send?id=${user._id}&name=${user.firstName}`)}}
                />
            </div>
        </div>
    );
}

export default Users;
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'

function Appbar() {
    const [firstName, setFirstName] = useState('')

    useEffect(()=>{
        const storedName = localStorage.getItem('firstName')

        if (storedName) {
            setFirstName(storedName)
        } else {
            console.log(`firstName ${storedName}`);
        }
    },[])

    return (
        <div className="shadow h-14 flex justify-between bg-deep-slate-blue text-antique-white">
            <div className="flex flex-col justify-center h-full ml-4 text-lg font-semibold">
                PayTM App
            </div>
            <div className="flex items-center">
                <div className="flex flex-col justify-center h-full mr-4 text-lg font-medium">
                    <Link to='/update' className="hover:text-green-500">{firstName}</Link>
                </div>
                <div className="rounded-full h-12 w-12 bg-terra-cotta flex justify-center items-center mt-1 mr-2">
                    <div className="text-xl font-bold text-antique-white">
                        {firstName.charAt(0).toUpperCase()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appbar;
import React from 'react'
import {useLocation , useNavigate} from 'react-router-dom'

function Error() {
    const navigate = useNavigate()
    const location = useLocation()
    
    const message = location.state?.message || `Error happened try again....`
    const status = location.state?.status || 400

    function buttonHandlerSignIn(){
        navigate('/signin')
    }

    function buttonHandlerDashboard(){
        navigate(`/dashboard`)
    }
    
    return (
        <section className="bg-white dark:bg-gray-900 pt-24">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">{status}</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">{message}.</p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">We are already working to solve the problem.</p>
                    <button
                        onClick={buttonHandlerSignIn}
                        className="mt-8 px-6 py-3 rounded-md bg-blue-500 text-white text-lg font-medium hover:bg-muted-sage-green focus:outline-none focus:ring-4 focus:ring-muted-sage-green transition-colors"
                    >Sign In</button>
                    <button
                        onClick={buttonHandlerDashboard}
                        className=" ml-8 mt-8 px-6 py-3 rounded-md bg-blue-500 text-white text-lg font-medium hover:bg-muted-sage-green focus:outline-none focus:ring-4 focus:ring-muted-sage-green transition-colors"
                    >Go back to Dashboard</button>
                </div>
            </div>
        </section>
    );
}

export default Error
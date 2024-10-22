import { useNavigate } from "react-router-dom"
import Button from "../components/Button"

function Success(){
    const navigate = useNavigate()

    function buttonHandler(){
        navigate(`/dashboard`)
    }
    return(
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="text-center">
                    <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            x="0px"
                            y="0px" 
                            width="100" 
                            height="100" 
                            viewBox="0 0 120 120">
                            <circle 
                                cx="60" 
                                cy="64" 
                                r="48" opacity=".35">                            
                            </circle>
                            <circle 
                                cx="60" 
                                cy="60" 
                                r="48" 
                                fill="#44bf00">
                            </circle>
                            <polygon 
                                points="53.303,89 26.139,61.838 33.582,54.395 53.303,74.116 86.418,41 93.861,48.443" 
                                opacity=".35">
                            </polygon>
                            <polygon 
                                fill="#fff" 
                                points="53.303,84 26.139,56.838 33.582,49.395 53.303,69.116 86.418,36 93.861,43.443">
                            </polygon>
                        </svg>
                        <h2 className="text-3xl font-bold text-green-500 mb-4">Transaction Successful</h2>
                    </div>
                    <div className="mt-8">
                        <Button
                            onClick={buttonHandler}
                            propClassName={"hover:bg-green-700 justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"}
                            label={'Go back to Dashboard'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Success
// function Loading() {
//     return (
//         <div className="flex justify-center items-center h-screen">
//             <div className="flex gap-2">
//                 <div className="w-5 h-5 rounded-full animate-pulse bg-terra-cotta"></div>
//                 <div className="w-5 h-5 rounded-full animate-pulse bg-terra-cotta"></div>
//                 <div className="w-5 h-5 rounded-full animate-pulse bg-terra-cotta"></div>
//             </div>
//         </div>
//     );
// }

function Loading() {
    return (
        <div className={`flex justify-center items-center`} style={{ height : "80vh"}}>
            <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-terra-cotta"></div>
        </div>
    );
}

export default Loading
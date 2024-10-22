function Button({ label, onClick , propClassName}) {
    const localClassName ="w-full text-white bg-terra-cotta hover:bg-muted-sage-green focus:outline-none focus:ring-4 focus:ring-muted-sage-green font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
    return (
        <button 
            onClick={onClick} 
            type="button" 
            className={propClassName || localClassName}
        >
            {label}
        </button>
    );
}

export default Button;
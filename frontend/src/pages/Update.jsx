import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../components/Button';

function Update() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);

    const submit = async (data) => {
        setIsSubmitting(true);
        try {
        const response = await axios.put(
            'http://localhost:5000/api/v1/user/',
            {
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
            },
            {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            }
        );

        if (response.data.message == 'Updated successfully') {
            setIsSuccessful(true);
            localStorage.setItem('firstName', data.firstName);
            // await new Promise(resolve => setTimeout(resolve, 2000));
            // navigate('/dashboard')  //TODO=> Other approach directly redirect to dashboard page
        } else {
            navigate('/error', {
            state: { message: 'Unexpected response from server' },
            });
        }
        } catch (error) {
            if (!error.response) {
                navigate('/error', {
                state: { message: 'No response received from server' },
                });
            } else {
                navigate('/error', { state: { message: error.response.data.message } });
            }
        } finally {
        setIsSubmitting(false);
        }
    };

    function buttonHandler() {
        navigate('/dashboard');
    }

    return (
        <>
        {isSuccessful ? (
            <div className="flex justify-center h-screen bg-gray-100">
                <div className="h-full flex flex-col justify-center">
                    <div className="text-center">
                        <div className="flex flex-col items-center">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="100"
                            height="100"
                            viewBox="0 0 120 120"
                            >
                            <circle
                                cx="60"
                                cy="64"
                                r="48"
                                opacity=".35"
                                fill="#FFA500"
                            ></circle>
                            <circle cx="60" cy="60" r="48" fill="#FF8C00"></circle>
                            <polygon
                                points="53.303,89 26.139,61.838 33.582,54.395 53.303,74.116 86.418,41 93.861,48.443"
                                opacity=".35"
                                fill="#FF6347"
                            ></polygon>
                            <polygon
                                fill="#FFFFFF"
                                points="53.303,84 26.139,56.838 33.582,49.395 53.303,69.116 86.418,36 93.861,43.443"
                            ></polygon>
                            </svg>
                            <h2 className="text-3xl font-bold text-orange-600 mb-4">
                            Updated successfully
                            </h2>
                        </div>
                        <div className="mt-8">
                            <Button
                            onClick={buttonHandler}
                            propClassName={
                                'hover:bg-orange-700 justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-orange-600 text-white'
                            }
                            label={'Go back to Dashboard'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="flex justify-center items-center h-screen bg-orange-100">
                <form onSubmit={handleSubmit(submit)} className="bg-white p-6 rounded-lg shadow-lg w-[25rem]">
                    <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">
                        Update Info
                    </h2>
                    <p className="text-gray-800 mb-6 text-center">
                        Enter your information to Update an account
                    </p>

                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="First Name"
                            {...register('firstName', {
                            required: `This field is required`,
                            minLength: {
                                value: 4,
                                message: `First name must be at least 4 characters long`,
                            },
                            maxLength: {
                                value: 50,
                                message: `First name must be at most 50 characters long`,
                            },
                            })}
                            className="w-full p-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        {errors.firstName && (
                            <p className="text-red-700 text-sm mt-1 before:content-['⚠'] before:mr-0">
                            {errors.firstName.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Last Name"
                            {...register('lastName', {
                            required: `This field is required`,
                            minLength: {
                                value: 4,
                                message: `Last Name must be at least 4 characters long`,
                            },
                            maxLength: {
                                value: 50,
                                message: `Last name must be at most 50 characters long`,
                            },
                            })}
                            className="w-full p-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        {errors.lastName && (
                            <p className="text-red-700 text-sm mt-1 before:content-['⚠'] before:mr-0">
                            {errors.lastName.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            autoComplete="new-password"
                            {...register('password', {
                            required: `This field is required`,
                            minLength: {
                                value: 8,
                                message: `Password must be at least 8 characters long`,
                            },
                            })}
                            className="w-full p-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        {errors.password && (
                            <p className="text-red-700 text-sm mt-1 before:content-['⚠'] before:mr-0">
                            {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                        >
                        {isSubmitting ? 'Updating....' : 'Update'}
                    </button>

                    <p className="mt-4 text-gray-800 text-center">
                        Want to go back to Dashboard?{' '}
                        <Link to="/dashboard" className="text-orange-600 font-semibold">
                            dashboard
                        </Link>
                    </p>
                </form>
            </div>
        )}
        </>
    );
}

export default Update;
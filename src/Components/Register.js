import React, { useEffect } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import Lodaing from './Lodaing';

const Register = () => {
    const navigate = useNavigate();
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [createUserWithEmailAndPassword, , user, loading, error,] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updateError] = useUpdateProfile(auth);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (user || googleUser) {
            navigate('/add')
        }
    }, [googleUser, user, navigate]);

    if (googleLoading || loading) {
        return <Lodaing></Lodaing>
    }
    let signUpError;
    if (googleError || error || updateError) {
        signUpError = <p className='text-red-600'>{googleError?.message || error?.message || updateError?.message}</p>
    }

    const onSubmit = async data => {
        console.log(data);
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
        alert('profile updated');
        reset()

    };
    return (
        <div className="card w-1/2 mx-auto my-auto bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-center text-secondary text-3xl font-bold ">Sign Up</h2>

                <form onSubmit={handleSubmit(onSubmit)} className=' grid grid-cols-1 gap-3 justify-items-center'>

                    <div className="form-control w-full max-w-xs text-center">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="Enter your name" className="input input-bordered w-full max-w-xs"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: 'Name is required'
                                }
                            })} />

                        <label className="label">
                            {errors.name?.type === 'required' && <span className="label-text-alt text-red-600">{errors.name.message}</span>}
                        </label>

                    </div>
                    <div className="form-control w-full max-w-xs text-center">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="Enter your email" className="input input-bordered w-full max-w-xs"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Email is required'
                                },
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: 'Provide a valid pattern'
                                }
                            })} />

                        <label className="label">
                            {errors.email?.type === 'required' && <span className="label-text-alt text-red-600">{errors.email.message}</span>}

                            {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-600">{errors.email.message}</span>}
                        </label>

                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Enter your password" className="input input-bordered w-full max-w-xs"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: 'Password is required'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Password should be 6 characters'
                                }
                            })} />

                        <label className="label">
                            {errors.password?.type === 'required' && <span className="label-text-alt text-red-600">{errors.password.message}</span>}

                            {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-600">{errors.password.message}</span>}
                        </label>
                    </div>

                    <input className='btn  text-white uppercase font-bold  w-full max-w-xs' type="submit" />

                    <p>Already have an account? <Link className='text-secondary' to='/login'>SignIn</Link> </p>

                    {signUpError}
                </form>

                <div className="flex flex-col w-full border-opacity-50">
                    <div className="divider">OR</div>
                </div>

                <button onClick={() => signInWithGoogle()} className="btn btn-outline lg:w-1/2 mx-auto text-white">Continue with Google</button>
            </div>
        </div>
    );
};

export default Register;
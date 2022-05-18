import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../firebase.init';
import Lodaing from './Lodaing';

const RequireAuth = ({ children }) => {
    const location = useLocation()
    const [user, loading] = useAuthState(auth);
    const [sendEmailVerification] = useSendEmailVerification(
        auth
    );
    if (loading) {
        return <Lodaing></Lodaing>
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (!user?.emailVerified) {
        return (
            <div className='flex justify-center my-10'>
                <button onClick={async () => {
                    await sendEmailVerification();
                    alert('Sent email');
                }} className="btn">Verify your email</button>
            </div>
        )
    }
    return children;
};

export default RequireAuth;
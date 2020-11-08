import React, { useEffect } from 'react';
import {useAuth} from '../contexts/AuthProvider';
import {useRouter} from 'next/router';

const Dashboard = () => {
    const {currUser} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!currUser){
            router.push("/login");            
        }
    }, [])

    return (
        <div>
            
        </div>
    );
};

export default Dashboard;
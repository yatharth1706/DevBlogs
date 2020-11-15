import React from 'react';
import Router from 'next/router';
import {useAuth} from '../contexts/AuthProvider';
const login = '/login?redirected=true'; // Define your login route address.

/**
 * Check user authentication and authorization
 * It depends on you and your auth service provider.
 */
const getUser = () =>{
    const {currUser} = useAuth();
    return currUser;
}

export default  WrappedComponent  => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;
  
  hocComponent.getInitialProps = async (context) => {
    
    const userAuth = getUser();

    // Are you an authorized user or not?
    if (!userAuth) {
      // Handle server-side and client-side rendering.
      if (context.res) {
        context.res?.writeHead(302, {
          Location: login,
        });
        context.res?.end();
      } else {
        Router.replace(login);
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({...context, auth: userAuth});
      return { ...wrappedProps, userAuth };
    }

    return { userAuth };
  };

  return hocComponent;
};
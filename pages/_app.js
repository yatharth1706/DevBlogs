import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../layouts/layout';
import {AuthProvider} from '../contexts/AuthProvider';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'


function MyApp({ Component, pageProps }) {
  return (
  <AuthProvider>
    <Layout>
      <ReactNotification />      
      <Component {...pageProps} />
    </Layout>
  </AuthProvider>
  )
}

export default MyApp

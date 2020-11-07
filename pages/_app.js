import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../layouts/layout';
import {AuthProvider} from '../contexts/AuthProvider';

function MyApp({ Component, pageProps }) {
  return (
  <AuthProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </AuthProvider>
  )
}

export default MyApp

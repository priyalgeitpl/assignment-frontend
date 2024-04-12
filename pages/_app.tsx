import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from '../store/store';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
                <ToastContainer />
            </Layout>
        </Provider>
    );
};

export default MyApp;

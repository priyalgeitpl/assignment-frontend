import { ReactNode } from 'react';
import Header from '../Header/Header';
import styles from './Layout.module.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

type LayoutProps = {
    children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.main}>
                <AppRouterCacheProvider>
                    {children}
                </AppRouterCacheProvider>
            </main>
        </div>
    );
};

export default Layout;

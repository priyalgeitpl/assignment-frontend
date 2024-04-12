import { Container, Grid, Typography } from '@mui/material';
import { Search, ShoppingCart, KeyboardArrowRight, KeyboardArrowLeft } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/userSlice';
import { apiService } from '@/Services/apiService';

const Header = () => {
    const dispatch = useDispatch();
    const checkedItems = useSelector((state: RootState) => state.checkedItems.checkedItems);
    const user = useSelector((state: RootState) => state.user.user);

    const router = useRouter();

    const handleLogout = async () => {
        const apiResponse = await apiService.SaveCategories(user.id, checkedItems);
        if (apiResponse) {
            dispatch(logoutUser());
            sessionStorage.removeItem('accessToken');
            router.push('/login');
        }
    };

    const handleClick = () => {
        router.push('/');
    }

    return (
        <Container className="mt-5">
            <Grid container alignItems="center" justifyContent="space-between" spacing={2} className="min-h-9">
                <Typography variant="h6" className="flex justify-end w-full">
                    <a href="#" className="font-inter text-xs font-normal leading-tight text-left mr-2">Help</a>
                    <a href="#" className="font-inter text-xs font-normal leading-tight text-left mr-2">Orders & Returns</a>
                    <a href="#" className="font-inter text-xs font-normal leading-tight text-left mr-2">Hi, {user.name}</a>
                    <a href="#" className="font-inter text-xs font-normal leading-tight text-left mr-2" onClick={handleLogout}>
                        Logout
                    </a>
                </Typography>
            </Grid>
            <div className="flex items-center justify-between min-h-12">
                <Typography
                    className="font-sans text-2xl font-bold leading-tight cursor-pointer text-left" onClick={handleClick}>
                    ECOMMERCE
                </Typography>
                <Typography variant="h6" className="flex flex-wrap justify-center gap-2 mr-16">
                    <a href="#" className="font-inter text-sm font-semibold leading-tight text-left mr-2">Categories</a>
                    <a href="#" className="font-inter text-sm font-semibold leading-tight text-left mr-2">Sale</a>
                    <a href="#" className="font-inter text-sm font-semibold leading-tight text-left mr-2">Clearance</a>
                    <a href="#" className="font-inter text-sm font-semibold leading-tight text-left mr-2">New stock</a>
                    <a href="#" className="font-inter text-sm font-semibold leading-tight text-left mr-2">Trending</a>
                </Typography>
                <div>
                    <Search sx={{ marginRight: 2 }} />
                    <ShoppingCart />
                </div>
            </div>
            <Grid container alignItems="center" justifyContent="space-between" spacing={2} className="min-h-9 mt-1">
                <KeyboardArrowLeft sx={{ fontSize: '24px', marginLeft: 55 }} />
                <Typography variant="h6" className="font-inter text-xs font-medium leading-tight text-left">
                    Get 10% off on business sign up
                </Typography>
                <KeyboardArrowRight sx={{ fontSize: '24px', marginRight: 55 }} />
            </Grid>
        </Container>
    );
};

export default Header;

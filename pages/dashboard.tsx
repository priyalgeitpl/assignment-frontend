import React, { useEffect, useState } from 'react';
import { Card, Typography, List, ListItem, ListItemText, Checkbox } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { RootState, AppDispatch } from '../store/store';
import { setCheckedItems } from '../store/categorySlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { apiService } from '@/Services/apiService';

const Dashboard = () => {
    const router = useRouter();

    const user = useSelector((state: RootState) => state.user.user);

    const [options, setOptions] = useState<any[]>([]);

    const checkedItems = useSelector((state: RootState) => state.checkedItems.checkedItems);
    const dispatch = useDispatch<AppDispatch>();

    const [page, setPage] = useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleToggle = (value: string) => () => {
        const currentIndex = checkedItems.indexOf(value);
        const newChecked = [...checkedItems];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        dispatch(setCheckedItems(newChecked));
    };

    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem('accessToken');
        if (!isAuthenticated) {
            router.push('/login');
        }
        dispatch(setCheckedItems(user.category));
        getAllCategories();
    }, [user.category]);

    const getAllCategories = async () => {
        const data = await apiService.getAllCategories()
        const categories = data.map((o: { title: any; }) => o.title)
        setOptions(categories);
    }

    const optionsPerPage = 6;
    const startIndex = (page - 1) * optionsPerPage;
    const endIndex = startIndex + optionsPerPage;
    const displayedOptions = options.slice(startIndex, endIndex);

    return (
        <div className="flex justify-center">
            <Card className="flex justify-center" sx={{ maxWidth: '576px', maxHeight: '691px', top: '176px', left: '432px', borderRadius: '15px', border: '1px solid #C1C1C1' }}>
                <form className='p-10'>
                    <Typography style={{ fontSize: 24, fontWeight: 600, textAlign: 'center', marginBottom: '5px' }}>Please mark your interests!</Typography>
                    <Typography style={{ fontSize: 16, fontWeight: 400, textAlign: 'center', marginBottom: '8px' }}>We will keep you notified.</Typography>

                    <List>
                        <Typography style={{ fontSize: 16, fontWeight: 600, textAlign: 'left', marginBottom: '8px' }}>My saved interests!</Typography>

                        {displayedOptions.map((option, index) => (
                            <ListItem key={index} dense onClick={handleToggle(option)} sx={{ padding: 0 }}>
                                <Checkbox
                                    checked={checkedItems.indexOf(option) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    sx={{
                                        '& .MuiSvgIcon-root': {
                                            color: 'black',
                                        },
                                    }}
                                />
                                <ListItemText primary={option} />
                            </ListItem>
                        ))}
                    </List>

                    <Pagination count={Math.ceil(options.length / optionsPerPage)} page={page} onChange={handleChange} />

                </form>
            </Card >
        </div >
    );
};

export default Dashboard;

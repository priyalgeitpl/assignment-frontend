import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { Button, Typography, Link } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { InputAdornment } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { apiService } from '@/Services/apiService';
import { loginUser } from '../store/userSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.email.trim()) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Email is required',
            }));
            return;
        }

        if (!formData.password.trim()) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                password: 'Password is required',
            }));
            return;
        }

        try {
            const response = await apiService.login(formData);

            if (response.status === 200) {
                toast.success('User Logged in successfully!');
                dispatch(loginUser(response.user));

                sessionStorage.setItem('accessToken', response.user.token);
                router.push('/dashboard');

            } else if (response.status === 401) {
                toast.error('Invalid Password');
            } else if (response.status === 404) {
                toast.error('User Not Found!');
            }
        } catch (error) {
            console.error('login failed:', error);
        }
    };

    return (
        <div className="flex justify-center">
            <Card className="flex justify-center" sx={{ maxWidth: '576px', maxHeight: '691px', top: '176px', left: '432px', borderRadius: '15px', border: '1px solid #C1C1C1' }}>
                <form onSubmit={handleSubmit} className='p-10'>
                    <Typography style={{ fontSize: 24, fontWeight: 600, textAlign: 'center', marginBottom: '16px' }}>Login</Typography>
                    <Typography style={{ fontSize: 24, fontWeight: 500, textAlign: 'center', marginBottom: '8px' }}>Welcome back to ECOMMERCE</Typography>
                    <Typography style={{ fontSize: 16, fontWeight: 400, textAlign: 'center', marginBottom: '8px' }}>The next-gen business marketplace</Typography>
                    <InputLabel sx={{ color: 'black' }}>Email</InputLabel>
                    <TextField
                        name="email"
                        variant="outlined"
                        size="small"
                        placeholder="Enter"
                        fullWidth
                        autoComplete="off"
                        style={{ marginBottom: 24 }}
                        InputLabelProps={{ shrink: false }}
                        value={formData.email}
                        onChange={handleChange}
                        error={Boolean(formErrors.email)}
                        helperText={formErrors.email}
                    />
                    <InputLabel sx={{ color: 'black' }}>Password</InputLabel>
                    <TextField
                        name="password"
                        variant="outlined"
                        size="small"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter"
                        fullWidth
                        style={{ marginBottom: 24 }}
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="off"
                        InputLabelProps={{ shrink: false }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Link href="#" underline="always" style={{ color: 'black', textDecoration: 'underline' }} onClick={togglePasswordVisibility}>
                                        {showPassword ? 'Hide' : 'Show'}
                                    </Link>
                                </InputAdornment>
                            ),
                        }}
                        error={Boolean(formErrors.password)}
                        helperText={formErrors.password}
                    />
                    <div className="flex justify-center">
                        <Button variant="contained" type="submit" style={{ width: 456, height: 56, backgroundColor: 'black', marginTop: 30 }}>
                            LOGIN
                        </Button>
                    </div>
                    <div className="flex justify-center mt-7 mb-16">
                        <span className='mr-2'>Don’t have an Account?</span>
                        <Link href="/" color="black" underline="none">
                            SIGN UP
                        </Link>
                    </div>
                </form>
            </Card >
        </div>
    );
};

export default Login;

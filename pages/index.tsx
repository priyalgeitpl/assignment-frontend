import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { NextPageContext } from 'next';
import { apiService } from '@/Services/apiService';
import { updateEmail } from '@/store/userSlice';
import { useDispatch } from 'react-redux';
import { ClipLoader } from 'react-spinners';

interface SignUpProps {
    formData: {
        email: string;
        password: string;
        name: string;
    };
}

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const SignUp = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors: { [key: string]: string } = {};

        if (formData.email.trim() === '' || !isEmailValid(formData.email)) {
            errors.email = 'Invalid email address';
        }

        if (formData.password.trim() === '' || !isPasswordValid(formData.password)) {
            errors.password = 'Password must have at least one uppercase letter, one digit, and one symbol';
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                setLoading(true);
                dispatch(updateEmail(formData.email));
                const response = await apiService.sendEmail(formData);

                if (response.status === 200) {
                    setLoading(false);
                    toast.success('Email sent successfully!');
                    router.push({
                        pathname: '/verify',
                    });
                }

                if (response.status === 409) {
                    setLoading(false);
                    toast.error('User already exists!');
                }

            } catch (error) {
                setLoading(false);
                toast.error('Something went wrong!');
            }
        }
    };

    const isEmailValid = (email: string) => {
        return emailPattern.test(email);
    };

    const isPasswordValid = (password: string) => {
        return passwordPattern.test(password);
    };

    return (
        <div className="flex justify-center">
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-32 h-32 rounded-md flex items-center justify-center">
                        <ClipLoader color="#36D7B7" size={32} loading={loading} />
                    </div>
                </div>
            )}
            <Card className="flex justify-center" sx={{ maxWidth: '576px', maxHeight: '691px', top: '176px', left: '432px', borderRadius: '15px', border: '1px solid #C1C1C1' }}>
                <form onSubmit={handleSubmit} className='p-10'>
                    <Typography style={{ fontSize: 24, fontWeight: 600, textAlign: 'center', marginBottom: '16px' }}>Create your account</Typography>
                    <InputLabel sx={{ color: 'black' }}>Name</InputLabel>
                    <TextField
                        name="name"
                        variant="outlined"
                        size="small"
                        placeholder="Enter"
                        fullWidth
                        autoComplete="off"
                        style={{ marginBottom: 24 }}
                        InputLabelProps={{ shrink: false }}
                        value={formData.name}
                        onChange={handleChange}
                        error={Boolean(formErrors.name)}
                        helperText={formErrors.name ? "Name is required" : ""}
                    />
                    <InputLabel sx={{ color: 'black' }}>Email</InputLabel>
                    <TextField
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        placeholder="Enter"
                        fullWidth
                        InputLabelProps={{ shrink: false }}
                        style={{ marginBottom: 24 }}
                        error={Boolean(formErrors.email)}
                        helperText={formErrors.email}
                    />
                    <InputLabel sx={{ color: 'black' }}>Password</InputLabel>
                    <TextField
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        placeholder="Enter"
                        fullWidth
                        InputLabelProps={{ shrink: false }}
                        style={{ marginBottom: 24 }}
                        error={Boolean(formErrors.password)}
                        helperText={formErrors.password}
                    />
                    <div className="flex justify-center">
                        <Button variant="contained" type="submit" style={{
                            width: 456, height: 56, backgroundColor: 'black', marginTop: 30
                        }}>
                            Create account
                        </Button>
                    </div>

                    <div className="flex justify-center mt-7 mb-16">
                        <span className='mr-2'>Have an Account?{' '}</span>
                        <Link href="/login" color="black" underline="none">
                            LOGIN
                        </Link>
                    </div>
                </form>
            </Card >
        </div>
    );
};

SignUp.getInitialProps = ({ query }: NextPageContext): SignUpProps => {
    const { email, password, name } = query as { email: string; password: string; name: string };
    const formData = { email, password, name };
    return { formData };
};

export default SignUp;

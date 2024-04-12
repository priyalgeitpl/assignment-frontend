import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { createContext, useContext, useState } from 'react';
import { NextPageContext } from 'next';

interface SignUpProps {
    formData: {
        email: string;
        password: string;
        name: string;
    };
}

const SignUp = () => {

    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prevState: any) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            debugger
            const response = await fetch('https://assignment-backend-five.vercel.app/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const email = formData.email as string;

            router.push({
                pathname: '/verify',
                query: { formData: JSON.stringify(formData) },
            });

            if (response.status === 409) {
                toast.error('User already exists !');
            }

            else if (response.status === 201) {
                toast.success('User Registered Successfully !');
                router.push('/login');
            }

        } catch (error) {
            toast.error('Something went Wrong !');
        }
    };


    return (
        <div className="flex justify-center">
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
                    />
                    <div className="flex justify-center">
                        <Button variant="contained" type="submit" style={{
                            width: 456, height: 56, backgroundColor: 'black', marginTop: 30
                        }}>
                            Create account
                        </Button>
                    </div>

                    <div className="flex justify-center mt-7 mb-16">
                        Have an Account?{' '}
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

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { Button, Typography, Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { apiService } from '../Services/apiService';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface VerifyEmailProps {
    formData: {
        email: string;
        password: string;
        name: string;
    };
}

const VerifyEmail: React.FC<VerifyEmailProps> = () => {
    const router = useRouter();
    const userEmail = useSelector((state: RootState) => state.user.user.email);

    const [verificationCode, setVerificationCode] = useState(Array(8)?.fill(""));
    const inputRefs = useRef<HTMLInputElement[]>([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0]?.focus();
        }
    }, []);

    const handleChange = (index: number, value: string) => {
        const newVerificationCode = [...verificationCode];
        newVerificationCode[index] = value;
        setVerificationCode(newVerificationCode);

        if (value && index < 7) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLDivElement>) => {
        const backspaceKey = "Backspace";
        if (e.key === backspaceKey && !verificationCode[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerify = async () => {
        const code = verificationCode.join('');
        const data = { email: userEmail, code: code };
        const response = await apiService.verifyEmail(data);

        if (response.status === 400) {
            toast.error('Invalid Verification code !');
        }
        else if (response.status === 201) {
            toast.success('User Registered successfully !');
            router.push('/login');
        }
        else if (response.status === 500) {
            toast.error('Error registering user !');
        }
    };

    return (
        <div className="flex justify-center">
            <Card className="grid justify-center" sx={{ maxWidth: '576px', padding: 5, maxHeight: '691px', top: '176px', left: '432px', borderRadius: '15px', border: '1px solid #C1C1C1' }}>
                <Typography style={{ fontSize: 24, fontWeight: 600, textAlign: 'center', marginBottom: '16px' }}>Verify your email</Typography>
                <Typography style={{ fontSize: 16, fontWeight: 400, textAlign: 'center', marginBottom: '8px' }}>Enter the 8 digit code you have received on<br></br>
                    {userEmail}</Typography>

                <InputLabel sx={{ color: 'black' }}>Code</InputLabel>
                <Grid container spacing={1} justifyContent="center">
                    {verificationCode.map((value, index) => (
                        <Grid item key={index}>
                            <TextField
                                variant="outlined"
                                size="small"
                                value={value}
                                onChange={(e) => handleChange(index, e.target.value)}
                                inputProps={{ maxLength: 1 }}
                                style={{ width: 50, textAlign: 'center' }}
                                inputRef={ref => inputRefs.current[index] = ref}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                            />
                        </Grid>
                    ))}
                </Grid>
                <div className="flex justify-center">
                    <Button variant="contained" style={{
                        width: 456, height: 56, backgroundColor: 'black', marginTop: 30
                    }} onClick={handleVerify}>
                        VERIFY</Button>
                </div>
            </Card>
        </div>
    );
};

export default VerifyEmail;

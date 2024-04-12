const BASE_URL = 'http://localhost:3002';

export const apiService = {

    verifyEmail: async (data: any) => {
        try {
            const response = await fetch(`${BASE_URL}/verify/email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const apiResponse = response;
            return apiResponse;

        } catch (error) {
            console.error('Error verifying email:', error);
            throw error;
        }
    },

    sendEmail: async (data: any) => {
        try {
            const response = await fetch(`${BASE_URL}/send/email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const resdata = await response;
            return resdata;

        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    },

    login: async (data: any) => {
        try {
            const response = await fetch('http://localhost:3002/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            const apiResponse = {
                status: response.status,
                user: responseData.user,
            };

            return apiResponse;

        } catch (error) {
            throw error;
        }
    },

    SaveCategories: async (userId: number, categories: string[]) => {
        try {
            const data = { userId: userId, categories: categories };
            const response = await fetch('http://localhost:3002/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            const apiResponse = {
                status: response.status,
                user: responseData.user,
            };

            return apiResponse;

        } catch (error) {
            throw error;
        }
    },

    getAllCategories: async () => {
        try {
            const response = await fetch('http://localhost:3002/categories', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseData = await response.json();

            return responseData;

        } catch (error) {
            throw error;
        }
    }
};

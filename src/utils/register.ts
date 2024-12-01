interface PaymentData {
    firstName: string; // Add more fields if needed
    lastName: string; // Add more fields if needed
    email: string; // Add more fields if needed
    password: string; // Add more fields if needed

}

interface PaymentResponse {
    // Define the structure of the response if known
    [key: string]: any; // Replace with specific keys if the response structure is known
}

export const register = async (data: PaymentData): Promise<PaymentResponse> => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('f_name', data.firstName);
        formData.append('l_name', data.lastName);
        formData.append('email', data.email);
        formData.append('password', data.password);

        fetch("https://testworld.online/be/public/api/auth/register", {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((jsonData: PaymentResponse) => {
                resolve(jsonData);
            })
            .catch(error => {
                reject(error);
            });
    });
};

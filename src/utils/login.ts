interface PaymentData {
    email: string; // Add more fields if needed
    password: string; // Add more fields if needed

}

interface PaymentResponse {
    // Define the structure of the response if known
    [key: string]: any; // Replace with specific keys if the response structure is known
}

export const loginAPi = async (data: PaymentData): Promise<PaymentResponse> => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password', data.password);

        fetch("https://testworld.online/be/public/api/auth/login", {
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

interface LoginGoogleResponse {
    url: string; // Define other properties if the response contains more data
}

export const loginGoogle = async (): Promise<LoginGoogleResponse> => {
    try {
        const response = await fetch("https://testworld.online/be/public/auth/google/redirect", {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData: LoginGoogleResponse = await response.json();
        return jsonData;
    } catch (error: any) {
        console.error("Error in loginGoogle:", error.message);
        throw new Error("Failed to initiate Google Sign-In. Please try again.");
    }
};


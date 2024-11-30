interface PaymentData {
    phone: string; // Add more fields if needed
}

interface PaymentResponse {
    // Define the structure of the response if known
    [key: string]: any; // Replace with specific keys if the response structure is known
}

export const PayMent = async (data: PaymentData): Promise<PaymentResponse> => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('amount', "100");
        formData.append('mobileNumber', data.phone);

        fetch("https://testworld.online/be/public/api/pay", {
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

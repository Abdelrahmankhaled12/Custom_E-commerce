const URL_API = "https://testtestapp.store/be";


interface LoginData {
    email: string;
    password: string;
}

interface PaymentResponse {
    // Define the structure of the response here
    token: string;
    userId: number;
}

export const loginAPi = async (data: LoginData): Promise<PaymentResponse> => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password', data.password);

        fetch(URL_API + "/public/api/auth/login", {
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


// =========================================================================================
// =========================================================================================


interface LoginGoogleResponse {
    url: string; // Define other properties if the response contains more data
}

export const loginGoogle = async (): Promise<LoginGoogleResponse> => {
    try {
        const response = await fetch(URL_API + "/public/auth/google/redirect", {
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


// =========================================================================================
// =========================================================================================

interface PaymentData {
    phone: string; // Add more fields if needed
    amount: any; // Add more fields if needed
}

interface PaymentResponse {
    // Define the structure of the response if known
    [key: string]: any; // Replace with specific keys if the response structure is known
}

export const PayMentPhone = async (data: PaymentData): Promise<PaymentResponse> => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('amount', data.amount);
        formData.append('mobileNumber', data.phone);

        fetch(URL_API + "/public/api/pay", {
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

// =========================================================================================
// =========================================================================================

export const PayMentPaypal = async (data: PaymentData): Promise<PaymentResponse> => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('amount', data.amount);
        formData.append('mobileNumber', data.phone);

        fetch(URL_API + "/public/api/paypal/pay", {
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

// =========================================================================================
// =========================================================================================
interface PaymentDataRegister {
    firstName: string; // Add more fields if needed
    lastName: string; // Add more fields if needed
    email: string; // Add more fields if needed
    password: string; // Add more fields if needed

}

interface PaymentResponseRegister {
    // Define the structure of the response if known
    [key: string]: any; // Replace with specific keys if the response structure is known
}

export const register = async (data: PaymentDataRegister): Promise<PaymentResponseRegister> => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('f_name', data.firstName);
        formData.append('l_name', data.lastName);
        formData.append('email', data.email);
        formData.append('password', data.password);

        fetch(URL_API + "/public/api/auth/register", {
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

// =========================================================================================
// =========================================================================================

interface UserData {
    token: string;
}

interface PaymentResponseUserData {
    // Define the structure of the response here
    data: any;
}

export const userData = async (data: UserData): Promise<PaymentResponseUserData> => {
    try {
        const response = await fetch(URL_API + `/public/api/auth/user-data?token=${data.token}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData: PaymentResponseUserData = await response.json();
        return jsonData;
    } catch (error: any) {
        console.error("Error in loginGoogle:", error.message);
        throw new Error("Failed to initiate Google Sign-In. Please try again.");
    }
};

// =========================================================================================
// =========================================================================================

interface DiscountData {
    discount: string;
}

interface ResponseDiscount {
    message: string;
    status: number;
    data: any;
}

export const discountApi = async (data: DiscountData): Promise<ResponseDiscount> => {
    try {
        const response = await fetch(URL_API + `/public/api/discount/${data.discount}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData: ResponseDiscount = await response.json();
        return jsonData;
    } catch (error: any) {
        console.error("Error in loginGoogle:", error.message);
        throw new Error("Failed to initiate Google Sign-In. Please try again.");
    }
};


// =========================================================================================
// =========================================================================================

export const GetIP = async () => {
    try {
        const response = await fetch(URL_API + `/public/api/get-ip-info`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        return jsonData;
    } catch (error: any) {
        console.error("Error in loginGoogle:", error.message);
        throw new Error("Failed to initiate Google Sign-In. Please try again.");
    }
};


export const SuccessPaymentApi = async (data: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('package_id', data.package_id);
        formData.append('user_id', data.user_id);
        formData.append('interactions_count', data.interactions_count);
        formData.append('country', data.country);
        formData.append('mobile_number', data.number);

        fetch(URL_API + `/public/api/paypal/success-payment`, {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((jsonData: any) => {
                resolve(jsonData);
            })
            .catch(error => {
                reject(error);
            });
    });
};


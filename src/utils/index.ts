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
        fetch(URL_API + "/public/api/auth/login", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then(response => {
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
    package_id: string; // Add more fields if needed
    user_id: string; // Add more fields if needed
    interactions_count: string; // Add more fields if needed
    mobile_number: any; // Add more fields if needed
    country: string; // Add more fields if needed
    discount_code?: string; // Add more fields if needed
    email: string; // Add more fields if needed
    full_name: string; // Add more fields if needed
}

interface PaymentResponse {
    // Define the structure of the response if known
    [key: string]: any; // Replace with specific keys if the response structure is known
}

export const PayMentPhone = async (data: PaymentData): Promise<PaymentResponse> => {
    return new Promise((resolve, reject) => {

        fetch(URL_API + "/public/api/pay", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(data),
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

        fetch(URL_API + "/public/api/paypal/pay", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(data),
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

export const register = async (data: any): Promise<any> => {
    return new Promise((resolve, reject) => {

        fetch(URL_API + "/public/api/auth/register", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then(response => {
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


// =========================================================================================
// =========================================================================================

export const FREE_TRIAL = async (data: any): Promise<any> => {
    return new Promise((resolve, reject) => {

        fetch(URL_API + "/public/api/free-trial", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then(response => {
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


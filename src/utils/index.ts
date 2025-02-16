const URL_API = "https://caseprep.co/sandbox/be";


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



// =========================================================================================
// =========================================================================================

interface ProfileData {
    token: string,
    f_name: string,
    l_name: string,
    contact: string,
    city: string,
    country: string,
    current_status: string,
    last_institute: string,
    education: string,
    student_year: string,
    professional_company: string,
    work_ex: string,
    role_level: string,
    projects: string,
    extracurriculars: string,
}

interface ProfileResponse {
    // Define the structure of the response if known
    [key: string]: any; // Replace with specific keys if the response structure is known
}

export const PROFILE_UPDATE = async (data: ProfileData): Promise<ProfileResponse> => {
    return new Promise((resolve, reject) => {

        fetch(URL_API + "/public/api/update-profile", {
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
            .then((jsonData: ProfileResponse) => {
                resolve(jsonData);
            })
            .catch(error => {
                reject(error);
            });
    });
};
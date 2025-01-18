import React, { useState } from 'react'; // Explicit React import
import { PayMentPaypal, PayMentPhone } from '../../../../utils/index'; // Payment utility function
import CountryInput from './CountryInput'; // Country dropdown component
import PhoneNumberInput from './PhoneNumberInput'; // Phone number input component
import './style.scss'; // SCSS file for styling
import Discount from './Discount';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

/**
 * BillingDetails Component
 * Handles user input for billing details, including name, email, phone number, country, and discount code.
 */
const BillingDetails: React.FC = () => {
    // State management for form inputs
    const [name, setName] = useState<string>(''); // Full name
    const [email, setEmail] = useState<string>(''); // Email address
    const [phone, setPhone] = useState<string | undefined>(''); // Allow undefined
    const [country, setCountry] = useState<string>('india'); // Selected country
    const [discountValue, setDiscountVslue] = useState<string>(''); // Selected country


    /**
     * Handles the payment submission process.
     * Opens a new tab with the payment URL received from the API response.
     */


    const packagee = useSelector((state: RootState) => state.packagee?.package);
    const login = useSelector((state: RootState) => state.login);
    const countryIP = useSelector((state: RootState) => state.countryIP); // Access login state from Redux

    const submit = async () => {
        let dataApi;
        if (discountValue !== "")
            dataApi = {
                package_id: packagee.package_id,
                user_id: login.userData.user_id,
                interactions_count: packagee.amount,
                country: country,
                mobile_number: phone,
                discount_code: discountValue,
                email: email,
                full_name: name,
            }
        else
            dataApi = {
                package_id: packagee.package_id,
                user_id: login.userData.user_id,
                interactions_count: packagee.amount,
                country: country,
                mobile_number: phone,
                email: email,
                full_name: name,
            }

        if (countryIP?.countryIpData.country === "India") {
            const response = await PayMentPhone(dataApi);
            window.location.href = response.data.url;
        } else {
            const response = await PayMentPaypal(dataApi);
            window.location.href = response.data.url;
        }
    }

    return (
        <div className="billingDetails">
            {/* Form for user billing details */}
            <form onSubmit={(e) => e.preventDefault()}>
                <Discount setDiscount={(value) => setDiscountVslue(value)} />
                <h1>Billing Details</h1>

                {/* Full Name Input */}
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                {/* Email Address Input */}
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Country Selection */}
                <CountryInput
                    country={country}
                    setCountry={setCountry}
                />

                {/* Phone Number Input */}
                <PhoneNumberInput
                    phone={phone}
                    setPhone={setPhone}
                />

                {/* Discount Code Input */}

                {/* Submit Button */}
                <button onClick={submit} type="submit">
                    Complete Purchase
                </button>
            </form>
        </div>
    );
};

export default BillingDetails;

import React, { useState } from 'react'; // Importing React and hooks
import { PayMentPaypal, PayMentPhone } from '../../../../utils/index'; // Utility functions for payment
import CountryInput from './CountryInput'; // Dropdown for selecting country
import PhoneNumberInput from './PhoneNumberInput'; // Component for phone input
import './style.scss'; // Styling for the component
import Discount from './Discount'; // Discount code input component
import { useSelector } from 'react-redux'; // Redux hook for accessing state
import { RootState } from '../../../../store'; // Root state type for Redux store
import { Spinner } from '../../../../components'; // Spinner component for loading state

/**
 * BillingDetails Component
 * This component handles user input for billing details, including name, email, phone number,
 * country selection, and discount code. It integrates with Redux for package and user data.
 */
const BillingDetails: React.FC = () => {
    // States for managing form inputs
    const [name, setName] = useState<string>(''); // User's full name
    const [email, setEmail] = useState<string>(''); // User's email address
    const [phone, setPhone] = useState<string | undefined>(''); // User's phone number
    const [country, setCountry] = useState<string>('india'); // Selected country
    const [discountValue, setDiscountValue] = useState<string>(''); // Discount code
    const [spinnerRun, setSpinnerRun] = useState<boolean>(false); // Spinner state

    // Redux selectors to access global state
    const packagee = useSelector((state: RootState) => state.packagee?.package); // Selected package
    const login = useSelector((state: RootState) => state.login); // Logged-in user data
    const countryIP = useSelector((state: RootState) => state.countryIP); // Country information from IP

    /**
     * Handles the payment submission process.
     * Depending on the user's country, it redirects to the appropriate payment gateway.
     */
    const handlePaymentSubmission = async () => {
        setSpinnerRun(true); // Show spinner during API call

        // Construct the payload for the API
        const dataApi = {
            package_id: packagee.package_id,
            user_id: login.userData.user_id,
            interactions_count: packagee.amount,
            country,
            mobile_number: phone,
            discount_code: discountValue || undefined, // Include discount code only if provided
            email,
            full_name: name,
        };

        try {
            let response;
            // Determine payment method based on user's country
            if (countryIP?.countryIpData.country === 'India') {
                response = await PayMentPhone(dataApi); // Use phone payment for India
            } else {
                response = await PayMentPaypal(dataApi); // Use PayPal for other countries
            }
            window.location.href = response.data.url; // Redirect to payment URL
        } catch (error) {
            console.error('Payment submission failed:', error); // Handle errors gracefully
        } finally {
            setSpinnerRun(false); // Hide spinner after API call
        }
    };

    return (
        <div className="billingDetails">
            <form onSubmit={(e) => e.preventDefault()}>
                {/* Discount Code Input */}
                <Discount setDiscount={(value) => setDiscountValue(value)} />

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

                {/* Country Selection Dropdown */}
                <CountryInput
                    country={country}
                    setCountry={setCountry}
                />

                {/* Phone Number Input */}
                <PhoneNumberInput
                    phone={phone}
                    setPhone={setPhone}
                />

                {/* Submit Button */}
                {!spinnerRun ? (
                    <button onClick={handlePaymentSubmission} type="submit">
                        Complete Purchase
                    </button>
                ) : (
                    <Spinner />
                )}
            </form>
        </div>
    );
};

export default BillingDetails;

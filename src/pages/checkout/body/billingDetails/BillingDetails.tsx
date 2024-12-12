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

    /**
     * Handles the payment submission process.
     * Opens a new tab with the payment URL received from the API response.
     */


    const packagee = useSelector((state: RootState) => state.packagee?.package);
    const discount = useSelector((state: RootState) => state.discount); // Access discount state from Redux

    const submit = async () => {
        if (country === "india") {
            const gst = packagee?.price_inr ? +(packagee.price_inr * 0.18).toFixed(2) : 0;
            const totalPrice = packagee?.price_inr ? +(packagee.price_inr + gst).toFixed(2) : 0;
            let amount = discount.discountStatus ? (totalPrice - (totalPrice * discount.discount)).toFixed(0) : totalPrice.toFixed(0);

            if (phone) {
                try {
                    const response = await PayMentPhone({ phone , amount });
                    window.open(response.data.url, '_blank'); // Open the payment link in a new tab
                } catch (error) {
                    console.error('Payment submission failed:', error);
                    alert('Failed to process payment. Please try again.');
                }
            }
        } else {
            const gst = packagee?.price_usd ? +(packagee.price_usd * 0.18).toFixed(2) : 0;
            const totalPrice = packagee?.price_usd ? +(packagee.price_usd + gst).toFixed(2) : 0;
            let amount = discount.discountStatus ? (totalPrice - (totalPrice * discount.discount)).toFixed(0) : totalPrice.toFixed(0);
            if (phone) {
                try {
                    const response = await PayMentPaypal({ phone, amount });
                    window.open(response.data.url, '_blank'); // Open the payment link in a new tab
                } catch (error) {
                    console.error('Payment submission failed:', error);
                    alert('Failed to process payment. Please try again.');
                }
            }
        }


    };

    return (
        <div className="billingDetails">
            {/* Form for user billing details */}
            <form onSubmit={(e) => e.preventDefault()}>
                <Discount />
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

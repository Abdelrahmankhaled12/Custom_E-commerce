import React, { useState } from 'react'; // Explicit React import
import { PayMent } from '../../../../utils/pay'; // Payment utility function
import CountryInput from './CountryInput'; // Country dropdown component
import PhoneNumberInput from './PhoneNumberInput'; // Phone number input component
import './style.scss'; // SCSS file for styling

/**
 * BillingDetails Component
 * Handles user input for billing details, including name, email, phone number, country, and discount code.
 */
const BillingDetails: React.FC = () => {
    // State management for form inputs
    const [name, setName] = useState<string>(''); // Full name
    const [email, setEmail] = useState<string>(''); // Email address
    const [phone, setPhone] = useState<string | undefined>(''); // Allow undefined
    const [country, setCountry] = useState<string>(''); // Selected country
    const [discount, setDiscount] = useState<string>(''); // Discount code (optional)

    /**
     * Handles the payment submission process.
     * Opens a new tab with the payment URL received from the API response.
     */
    const submit = async () => {
        if (phone) {
            try {
                const response = await PayMent({ phone });
                window.open(response.data.url, '_blank'); // Open the payment link in a new tab
            } catch (error) {
                console.error('Payment submission failed:', error);
                alert('Failed to process payment. Please try again.');
            }
        }
    };

    return (
        <div className="billingDetails">
            {/* Form for user billing details */}
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group form-group-flex">
                    <div style={{ flex: 1 }}>
                        <label htmlFor="discountCode">Discount Code (Optional)</label>
                        <input
                            type="text"
                            id="discountCode"
                            name="discountCode"
                            placeholder="Enter discount code"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                    </div>
                    <button type="button" className="apply-btn">
                        Apply
                    </button>
                </div>
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

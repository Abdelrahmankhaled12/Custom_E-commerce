import React from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

// Define the props with TypeScript types
interface PhoneNumberInputProps {
    phone: string | undefined; // Phone number can be undefined
    setPhone: React.Dispatch<React.SetStateAction<string | undefined>>; // Adjust type for compatibility
}

/**
 * PhoneNumberInput Component
 * A reusable component for handling phone number input with validation.
 */

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ phone, setPhone }) => {
    return (
        <div className="form-group">
            <label htmlFor="phone-input">Phone Number</label>
            <PhoneInput
                id="phone-input"
                placeholder="Enter phone number"
                value={phone}
                onChange={setPhone} // React's setter is compatible now
                required
                aria-label="Phone number input"
            />
        </div>
    );
};

export default PhoneNumberInput;

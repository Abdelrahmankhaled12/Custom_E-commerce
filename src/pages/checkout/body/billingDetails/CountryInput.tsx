import React from 'react';

// Define the props with TypeScript types for better type safety
interface CountryInputProps {
    country: string; // Current selected country
    setCountry: (value: string) => void; // Function to update the selected country
}

/**
 * CountryInput Component
 * A reusable dropdown for selecting a country.
 */
const CountryInput: React.FC<CountryInputProps> = ({ country, setCountry }) => {
    // List of country options to simplify scalability
    const countryOptions = [
        { value: 'india', label: 'India' },
        { value: 'usa', label: 'USA' },
        { value: 'uk', label: 'UK' },
        { value: 'canada', label: 'Canada' },
        { value: 'australia', label: 'Australia' },
    ];

    return (
        <div className="form-group">
            {/* Label for the dropdown, linked via the 'for' attribute */}
            <label htmlFor="country">Country</label>

            {/* Dropdown for selecting a country */}
            <select
                id="country" // Accessibility: connects to the label
                name="country" // Name attribute for form submission
                value={country} // Controlled component value
                onChange={(e) => setCountry(e.target.value)} // Update state on selection change
                required // Marks this field as mandatory
                aria-label="Country selector" // Accessibility label for screen readers
            >
                {/* Dynamically render country options */}
                {countryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CountryInput;

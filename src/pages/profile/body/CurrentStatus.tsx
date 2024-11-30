import React from 'react';

// Define props interface for better type safety
interface CurrentStatusProps {
    currentStatus: string;
    setCurrentStatus: (value: string) => void;
}

/**
 * CurrentStatus Component
 * Dropdown for selecting the user's current status.
 */

const CurrentStatus: React.FC<CurrentStatusProps> = ({ currentStatus, setCurrentStatus }) => {
    // Options for the dropdown
    const currentStatusOptions = [
        { value: '', label: 'Select your current status' },
        { value: 'Undergraduate Student', label: 'Undergraduate Student' },
        { value: 'Postgraduate Student', label: 'Postgraduate Student' },
        { value: 'Graduate Working Professional', label: 'Graduate Working Professional' },
        { value: 'Postgraduate Working Professional', label: 'Postgraduate Working Professional' },
    ];

    return (
        <div className="form-group">
            <label htmlFor="currentStatus">Current Status</label>
            <select
                id="currentStatus"
                name="currentStatus"
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value)}
                required
                aria-label="Select your current status"
            >
                {currentStatusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CurrentStatus;

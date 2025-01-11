import { useState } from 'react';
import { discountApi } from '../../../../utils';
import { AppDispatch, RootState } from "../../../../store";
import { useDispatch, useSelector } from 'react-redux';
import { setDiscountData, toggleDiscountStatus } from '../../../../store/discount';

const Discount: React.FC = () => {
    const [discountValue, setDiscountValue] = useState<string>(''); // State for the discount code input
    const [loading, setLoading] = useState<boolean>(false); // State for loading
    const [error, setError] = useState<string | null>(null); // State for error messages

    const discount = useSelector((state: RootState) => state.discount); // Access discount state from Redux
    const dispatch: AppDispatch = useDispatch();

    /**
     * Handles the discount code submission
     */
    const submit = async () => {
        // Reset error state
        setError(null);

        if (!discountValue.trim()) {
            setError('Please enter a discount code.');
            return;
        }

        if (!discount.discountStatus) {
            try {
                setLoading(true);
                const response = await discountApi({ discount: discountValue });

                if (response.status === 200) {
                    dispatch(toggleDiscountStatus());
                    dispatch(setDiscountData(response.data.discount));
                } else {
                    setError('Discount code is invalid.');
                }
            } catch (err: any) {
                console.error('Discount API Error:', err.message);
                setError('An error occurred while applying the discount. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <div className="form-group form-group-flex">
                <div style={{ flex: 1 }}>
                    <label htmlFor="discountCode">Discount Code</label>
                    <input
                        type="text"
                        id="discountCode"
                        name="discountCode"
                        placeholder="Enter discount code"
                        value={discountValue}
                        onChange={(e) => setDiscountValue(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    className="apply-btn"
                    onClick={submit}
                    disabled={loading} // Disable button while loading
                >
                    {loading ? 'Applying...' : 'Apply'}
                </button>
            </div>
            {error && <p className="error-message">{error}</p>} {/* Display error messages */}
        </>

    );
};

export default Discount;

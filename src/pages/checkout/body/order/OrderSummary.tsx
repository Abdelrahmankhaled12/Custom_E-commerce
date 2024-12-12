import './style.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

interface Package {
    name: string;
    description: string;
    price_usd: number;
    price_inr?: number;
}

const OrderSummary: React.FC = () => {
    const packagee = useSelector((state: RootState) => state.packagee?.package) as Package | null;
    const discount = useSelector((state: RootState) => state.discount); // Access discount state from Redux

    // Calculate GST (18%) dynamically
    const gst = packagee?.price_usd ? +(packagee.price_usd * 0.18).toFixed(2) : 0;
    const totalPrice = packagee?.price_usd ? +(packagee.price_usd + gst).toFixed(2) : 0;

    return (
        <div className="orderSummary">
            <h1>Order Summary</h1>
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <p>{packagee?.name || 'No package selected'}</p>
                            <p>{packagee?.description || 'Please select a package to view details.'}</p>
                        </td>
                        <td>${packagee?.price_usd?.toFixed(2) || '0.00'}</td>
                    </tr>
                    <tr>
                        <td>GST (18%)</td>
                        <td>${gst.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td><strong>Total Price</strong></td>
                        <td><strong>${totalPrice.toFixed(2)}</strong></td>
                    </tr>
                    {
                        discount.discountStatus && (
                            <tr>
                                <td><strong>Discount</strong></td>
                                <td><strong>{(100 * discount?.discount)}%</strong></td>
                            </tr>
                        )
                    }
                    {
                        discount.discountStatus && (
                            <tr>
                                <td><strong>Total Price After Discount</strong></td>
                                <td><strong>${(totalPrice - (totalPrice * discount.discount)).toFixed(2)}</strong></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default OrderSummary;

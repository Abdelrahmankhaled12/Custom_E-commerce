import './style.scss'

const OrderSummary = () => {
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
                        <td>Beginner Package (3 Interactions)</td>
                        <td>$12.00</td>
                    </tr>
                    <tr>
                        <td>GST (18%)</td>
                        <td>$2.16</td>
                    </tr>
                    <tr>
                        <td><strong>Total Price</strong></td>
                        <td><strong>$14.16</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default OrderSummary
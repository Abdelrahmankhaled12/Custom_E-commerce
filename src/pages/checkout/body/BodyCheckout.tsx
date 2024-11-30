import React from 'react'; // Explicit import for React
import BillingDetails from './billingDetails/BillingDetails'; // Billing details component
import OrderSummary from './order/OrderSummary'; // Order summary component
import './styl.scss'; // SCSS file for styling

/**
 * BodyCheckout Component
 * Represents the main content area of the checkout page, including order summary and billing details.
 */

const BodyCheckout: React.FC = () => {
  return (
    <div className="bodyCheckout">
      {/* Main container for the checkout body */}
      <div className="container">
        {/* Content section that holds the order summary and billing details */}
        <div className="content">
          {/* Order summary section */}
          <OrderSummary />
          {/* Billing details section */}
          <BillingDetails />
        </div>
      </div>
    </div>
  );
};

export default BodyCheckout;

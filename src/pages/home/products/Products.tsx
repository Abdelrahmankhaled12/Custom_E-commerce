import React, { useEffect, useState } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { LoginUser } from '../../../components';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
import { setPackage } from '../../../store/package';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

interface ProductData {
  name: string;
  description: string;
  package_id: string;
  interactions_price_combos: { number: number; price_inr: number; price_usd: number }[];
}

const Products: React.FC = () => {
  const [counters, setCounters] = useState<number[]>([]); // State for product counters
  const [data, setData] = useState<Record<string, ProductData> | null>(null); // State for product data
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const login = useSelector((state: RootState) => state.login); // Login state from Redux
  const countryIP = useSelector((state: RootState) => state.countryIP); // Access login state from Redux

  // Fetch product data and initialize counters
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(db, 'packages'));
        if (snapshot.exists()) {
          const products = snapshot.val();
          setData(products);
          setCounters(Array(Object.keys(products).length).fill(0)); // Initialize counters to 0
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle "Get Now" button click
  const submitGetNow = (product: ProductData, comboIndex: number) => {
    const selectedCombo = product?.interactions_price_combos[comboIndex];
    dispatch(
      setPackage({
        name: product.name,
        description: product.description,
        price_inr: selectedCombo?.price_inr || 0,
        price_usd: selectedCombo?.price_usd || 0,
        package_id: product?.package_id,
        amount: selectedCombo?.number,
      })
    );

    sessionStorage.setItem('login', "true");
    sessionStorage.setItem("package", JSON.stringify({
      name: product.name,
      description: product.description,
      price_inr: selectedCombo?.price_inr || 0,
      price_usd: selectedCombo?.price_usd || 0,
      package_id: product?.package_id,
      amount: selectedCombo?.number,
    }));

    if (!login.loginStatus) {
      setIsOpenLogin(true); // Show login modal if not logged in
    } else {
      navigate('/checkout'); // Navigate to checkout if logged in
    }
  };

  // Handle counter changes
  const handleCounterChange = (index: number, value: string) => {
    const selectedValue = parseInt(value, 10);
    setCounters((prevCounters) =>
      prevCounters.map((item, idx) => (idx === index ? selectedValue : item))
    );
  };

  return (
    <>
      {(data && countryIP?.countryIpData) ? (
        <div className="products" id='products'>
          <div className="container">
            <div className="title" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
              <h2>Get the package that fits you the best</h2>
            </div>

            <div className="boxes">
              {Object.keys(data).map((level, index) => {
                if (level === "PTRIAL") {
                  return;
                }
                const product = data[level];
                const selectedCombo = product?.interactions_price_combos[counters[index]];

                return (
                  <div
                    className="box"
                    key={level}
                    data-aos="fade-up"
                    data-aos-delay={(index + 1) * 100}
                    data-aos-duration="800"
                  >
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                    </div>
                    <div>
                      <h5>Get Interactions</h5>
                      {/* Dropdown for selecting combo */}
                      <select
                        value={counters[index]}
                        onChange={(e) => handleCounterChange(index, e.target.value)}
                        aria-label={`Select interactions for ${product.name}`}
                      >
                        {product.interactions_price_combos.map((combo, comboIndex) => (
                          <option key={comboIndex} value={comboIndex}>
                            {combo.number}
                          </option>
                        ))}
                      </select>
                      {
                        countryIP?.countryIpData?.country === "India" ? (
                          <span>For Rs. {selectedCombo?.price_inr || 0}</span>
                        ) : (
                          <span>For USD. {selectedCombo?.price_usd || 0}</span>
                        )
                      }
                      <button
                        onClick={() => submitGetNow(product, counters[index])}
                        className="getNow"
                      >
                        Get Now
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading products...</p>
      )}

      {/* Login Modal */}
      <LoginUser isOpen={isOpenLogin} closeModel={() => setIsOpenLogin(false)} nav="checkout" />
    </>
  );
};

export default Products;

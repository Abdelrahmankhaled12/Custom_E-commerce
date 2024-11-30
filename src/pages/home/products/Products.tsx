import React, { useEffect, useState } from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { LoginUser } from '../../../components';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

// Firebase configuration (securely use environment variables)
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

const Products: React.FC = () => {
  const [counters, setCounters] = useState<number[]>([]); // State for product counters
  const [data, setData] = useState<Record<string, any> | null>(null); // State for product data
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  const navigate = useNavigate();
  const login = useSelector((state: RootState) => state.login); // Get login state from Redux

  // Fetch product data and initialize counters
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(db, 'packages'));
        if (snapshot.exists()) {
          const products = snapshot.val();
          setData(products);
          setCounters(Array(Object.keys(products).length).fill(1)); // Initialize all counters to 1
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle counter changes
  const changeCounter = (action: string, index: number) => {
    setCounters((prevCounters) => {
      const updatedCounters = [...prevCounters];
      if (action === 'minus' && updatedCounters[index] > 1) {
        updatedCounters[index] -= 1; // Decrease the counter
      }
      if (action === 'plus') {
        updatedCounters[index] += 1; // Increase the counter
      }
      return updatedCounters;
    });
  };

  // Handle "Get Now" button click
  const submitGetNow = () => {
    if (!login.loginStatus) {
      setIsOpenLogin(true); // Show login modal if user is not logged in
    } else {
      navigate('/checkout'); // Navigate to checkout if logged in
    }
  };

  return (
    <>
      {data ? (
        <div className="products">
          <div className="container">
            <div className="title" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
              <h2>Get the package that fits you the best</h2>
            </div>

            <div className="boxes">
              {Object.keys(data).map((level, index) => (
                <div
                  className="box"
                  key={level}
                  data-aos="fade-up"
                  data-aos-delay={(index + 1) * 100}
                  data-aos-duration="800"
                >
                  <h3>{data[level]?.name}</h3>
                  <p>{data[level]?.description}</p>
                  <h5>Get Inter</h5>

                  <div className="counter">
                    <button
                      onClick={() => changeCounter('minus', index)}
                      disabled={counters[index] === 1}
                      style={counters[index] === 1 ? { cursor: 'not-allowed' } : { cursor: 'pointer' }}
                      aria-label="Decrease quantity"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <p>{counters[index]}</p>
                    <button
                      onClick={() => changeCounter('plus', index)}
                      aria-label="Increase quantity"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>

                  <span>For Rs. 1000</span>
                  <button onClick={submitGetNow} className="getNow">
                    Get Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading products...</p>
      )}

      {/* Login Modal */}
      <LoginUser isOpen={isOpenLogin} closeModel={() => setIsOpenLogin(false)} />
    </>
  );
};

export default Products;

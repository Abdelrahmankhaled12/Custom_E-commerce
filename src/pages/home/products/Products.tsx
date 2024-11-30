// Import necessary libraries and styles
import { useEffect, useState } from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { LoginUser } from '../../../components';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBZXyp48UgtFbjpsTS_UX4nhI78r7VXuzk",
  authDomain: "custom-web-513b1.firebaseapp.com",
  databaseURL: "https://custom-web-513b1-default-rtdb.firebaseio.com",
  projectId: "custom-web-513b1",
  storageBucket: "custom-web-513b1.firebasestorage.app",
  messagingSenderId: "151002132153",
  appId: "1:151002132153:web:8ecc3104c99a3d6fab7568",
  measurementId: "G-6QNL9T7MP4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const dbRef = ref(db, 'packages');  // Reference to the "packages" node

// Define the Products component
const Products = () => {
  // State to manage counters for each product
  const [counters, setCounters] = useState([1, 1, 1, 1]); // Initial counters for each product
  const [isOpenLogin, setIsOpenLogin] = useState(false)


  const [data, setData] = useState({
    "P10001": {
      "description": "Entry-level package designed for beginners.",
      "interactions_price_combos": [
        {
          "is_recommended": false,
          "number": 2,
          "price_inr": 20,
          "price_usd": 10
        },
        {
          "is_recommended": true,
          "number": 3,
          "price_inr": 25,
          "price_usd": 12
        },
        {
          "is_recommended": false,
          "number": 5,
          "price_inr": 30,
          "price_usd": 15
        }
      ],
      "models": [
        {
          "category": "Basic",
          "is_mandatory": true,
          "model_ids": [
            "M0001",
            "M0004",
            "M0010"
          ]
        },
        {
          "category": "Optional",
          "is_mandatory": false,
          "model_ids": [
            "M0002",
            "M0006"
          ]
        }
      ],
      "name": "Level 1",
      "package_id": "P10001"
    },
    "P10002": {
      "description": "Intermediate package for experienced users.",
      "interactions_price_combos": [
        {
          "is_recommended": true,
          "number": 5,
          "price_inr": 40,
          "price_usd": 20
        },
        {
          "is_recommended": false,
          "number": 7,
          "price_inr": 50,
          "price_usd": 25
        },
        {
          "is_recommended": true,
          "number": 10,
          "price_inr": 60,
          "price_usd": 30
        }
      ],
      "models": [
        {
          "category": "Intermediate",
          "is_mandatory": true,
          "model_ids": [
            "M0011",
            "M0012",
            "M0020"
          ]
        },
        {
          "category": "Special",
          "is_mandatory": false,
          "model_ids": [
            "M0023",
            "M0026"
          ]
        }
      ],
      "name": "Level 2",
      "package_id": "P10002"
    },
    "P10003": {
      "description": "Advanced package for professionals.",
      "interactions_price_combos": [
        {
          "is_recommended": true,
          "number": 10,
          "price_inr": 80,
          "price_usd": 40
        },
        {
          "is_recommended": true,
          "number": 15,
          "price_inr": 100,
          "price_usd": 50
        },
        {
          "is_recommended": false,
          "number": 20,
          "price_inr": 120,
          "price_usd": 60
        }
      ],
      "models": [
        {
          "category": "Advanced",
          "is_mandatory": true,
          "model_ids": [
            "M0031",
            "M0034",
            "M0040"
          ]
        },
        {
          "category": "Expert",
          "is_mandatory": false,
          "model_ids": [
            "M0043",
            "M0046",
            "M0050"
          ]
        }
      ],
      "name": "Level 3",
      "package_id": "P10003"
    },
    "P10004": {
      "description": "Specialized package for customized needs.",
      "interactions_price_combos": [
        {
          "is_recommended": false,
          "number": 1,
          "price_inr": 10,
          "price_usd": 5
        },
        {
          "is_recommended": true,
          "number": 3,
          "price_inr": 30,
          "price_usd": 15
        },
        {
          "is_recommended": false,
          "number": 6,
          "price_inr": 50,
          "price_usd": 25
        }
      ],
      "models": [
        {
          "category": "Fitment Basic",
          "is_mandatory": true,
          "model_ids": [
            "M0051",
            "M0054"
          ]
        },
        {
          "category": "Fitment Advanced",
          "is_mandatory": false,
          "model_ids": [
            "M0060",
            "M0064",
            "M0070"
          ]
        }
      ],
      "name": "Fitment",
      "package_id": "P10004"
    }
  });

  // useEffect(() => {
  //   get(dbRef)
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         setData(snapshot.val());
  //       } else {
  //         console.log("No data available");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  console.log()

  // Function to handle increment and decrement of the counter for a specific product
  const changeCounter = (action: string, index: number) => {
    setCounters((prevCounters) => {
      const updatedCounters = [...prevCounters];
      if (action === "minus" && updatedCounters[index] > 1) {
        updatedCounters[index] -= 1; // Decrease the counter
      }
      if (action === "plus") {
        updatedCounters[index] += 1; // Increase the counter
      }
      return updatedCounters;
    });
  };

  const navigate = useNavigate();  // Initializing navigate function from useNavigate hook

  const login = useSelector((state: RootState) => state.login);


  const sumbitGetNow = () => {

    if (!login.loginStatus) {
      setIsOpenLogin(true)
    } else {
      navigate("/checkout")
    }

  }

  return (
    <>
      <div className='products'> {/* Main container for the products section */}
        <div className="container"> {/* Wrapper for layout */}
          <div className="title" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800"> {/* Section title */}
            <h2>Get the package that fits you the best</h2>
          </div>
          <div className="boxes"> {/* Container for all product boxes */}

            {
              Object.keys(data).map((level, index) => (
                <div className="box" key={level} data-aos="fade-up" data-aos-delay={(index + 1) * 100} data-aos-duration="800"> {/* Individual product box */}
                  <h3>{data[level]?.name}</h3> {/* Product title */}
                  <p>
                    {/* Description of the product */}
                    {data[level]?.description}
                  </p>
                  <h5>Get Inter</h5>
                  <div className="counter"> {/* Counter section */}
                    {/* Decrement button */}
                    <button
                      onClick={() => changeCounter("minus", index)}
                      style={counters[index] === 1 ? { cursor: "not-allowed" } : { cursor: "pointer" }}
                      disabled={counters[index] === 1} // Disable button if counter is 1
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <p>{counters[index]}</p> {/* Display the current counter value */}
                    {/* Increment button */}
                    <button onClick={() => changeCounter("plus", index)}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  <span>For Rs. 1000</span> {/* Price of the product */}
                  <button onClick={sumbitGetNow} className='getNow'> {/* Button to purchase */}
                    Get Now
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
      <LoginUser isOpen={isOpenLogin} closeModel={() => setIsOpenLogin(false)} />
    </>

  );
};

// Export the Products component for use in other parts of the application
export default Products;

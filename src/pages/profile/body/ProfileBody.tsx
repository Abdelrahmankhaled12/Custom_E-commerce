import React, { useState } from 'react'; // React import
import './style.scss'; // SCSS styling
import ContactNumber from './ContactNumber'; // Reusable component for phone number input
import CurrentStatus from './CurrentStatus'; // Reusable component for current status input
import { PROFILE_UPDATE } from '../../../utils'; // API utility for profile updates
import CountryInput from './CountryInput'; // Reusable component for country selection
import { useSelector } from 'react-redux'; // Redux hook for accessing state
import { RootState } from '../../../store'; // Root state type for Redux store
import Swal from 'sweetalert2/dist/sweetalert2.js'; // SweetAlert2 for displaying alerts
import { setUserData } from '../../../store/login'; // Redux action for updating user data
import { useDispatch } from 'react-redux'; // Redux hook for dispatching actions
import { AppDispatch } from '../../../store'; // Type for Redux dispatch
import { Spinner } from '../../../components';

/**
 * ProfileBody Component
 * 
 * This component collects and updates user profile information, including personal, educational, 
 * and professional details. It uses React hooks for state management and Redux for global state.
 */
const ProfileBody: React.FC = () => {
    // State management for form fields
    const [firstName, setFirstName] = useState<string>(''); // User's first name
    const [lastName, setLastName] = useState<string>(''); // User's last name
    const [currentStatus, setCurrentStatus] = useState<string>(''); // User's current status (e.g., student, professional)
    const [phone, setPhone] = useState<string | undefined>(''); // User's phone number
    const [city, setCity] = useState<string>(''); // User's city
    const [lastCourseCompleted, setLastCourseCompleted] = useState<string>(''); // Last course completed by the user
    const [experience, setExperience] = useState<string>(''); // User's work experience in years
    const [currentRole, setCurrentRole] = useState<string>(''); // User's current job role
    const [projectsAndInternships, setProjectsAndInternships] = useState<string>(''); // User's projects and internships
    const [extracurricularActivities, setExtracurricularActivities] = useState<string>(''); // User's extracurricular activities
    const [lastInstitutionAttended, setLastInstitutionAttended] = useState<string>(''); // Last institution attended by the user
    const [professional, setProfessional] = useState<string>(''); // User's professional details (if applicable)
    const [student, setStudent] = useState<string>(''); // User's student details (if applicable)
    const [country, setCountry] = useState<string>('india'); // User's selected country
    const [spinnerRun, setSpinnerRun] = useState<boolean>(false); // Spinner state

    // Redux state and dispatch
    const login = useSelector((state: RootState) => state.login); // Access logged-in user data from Redux store
    const dispatch: AppDispatch = useDispatch(); // Redux dispatch function

    /**
     * Handles form submission.
     * Validates required fields and updates the user's profile data via an API call.
     * Displays a success message using SweetAlert2 upon successful submission.
     */
    const handleSubmit = async () => {
        setSpinnerRun(true); // Show spinner during API call

        // Validate required fields
        if (!currentStatus || !phone) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            // Call the API to update the profile
            const response = await PROFILE_UPDATE({
                token: login.userData.token,
                f_name: firstName,
                l_name: lastName,
                contact: phone,
                city: city,
                country: country,
                current_status: currentStatus,
                last_institute: lastInstitutionAttended,
                education: lastCourseCompleted,
                student_year: student,
                professional_company: professional,
                work_ex: experience,
                role_level: currentRole,
                projects: projectsAndInternships,
                extracurriculars: extracurricularActivities,
            });

            if (response.status === 200) {
                setSpinnerRun(false); // Show spinner during API call
                // Update Redux store and session storage with new user data
                dispatch(setUserData(response.data));
                sessionStorage.setItem('data', JSON.stringify(response.data));
                setFirstName("")
                setLastName("")
                setCurrentStatus("")
                setPhone("")
                setCity("")
                setLastCourseCompleted("")
                setExperience("")
                setCurrentRole("")
                setProjectsAndInternships("")
                setLastInstitutionAttended("")
                setProfessional("")
                setStudent("")
                setCountry("india")
                setExtracurricularActivities("")

                // Display success message
                Swal.fire({
                    title: 'Good job!',
                    text: 'Profile submitted successfully!',
                    icon: 'success',
                });
            }
        } catch (error) {
            setSpinnerRun(false); // Show spinner during API call
            console.error('Error updating profile:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to update profile. Please try again.',
                icon: 'error',
            });
        }
    };

    return (
        <div className="profileBody">
            <div className="container">
                {/* Profile Form */}
                <form onSubmit={(e) => e.preventDefault()}>
                    <h1>Your Profile</h1>

                    {/* First Name Input */}
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Last Name Input */}
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Phone Number Input */}
                    <ContactNumber phone={phone} setPhone={setPhone} />

                    {/* Country Selection Dropdown */}
                    <CountryInput country={country} setCountry={setCountry} />

                    {/* City Input */}
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder="Enter your city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>

                    {/* Current Status Input */}
                    <CurrentStatus currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} />

                    {/* Last Institution Attended Input */}
                    <div className="form-group">
                        <label htmlFor="lastInstitutionAttended">Last Institution Attended</label>
                        <input
                            type="text"
                            id="lastInstitutionAttended"
                            name="lastInstitutionAttended"
                            placeholder="Enter the name of your last institution"
                            value={lastInstitutionAttended}
                            onChange={(e) => setLastInstitutionAttended(e.target.value)}
                            required
                        />
                    </div>

                    {/* Last Course Completed Input */}
                    <div className="form-group">
                        <label htmlFor="lastCourseCompleted">Last Course Completed</label>
                        <input
                            type="text"
                            id="lastCourseCompleted"
                            name="lastCourseCompleted"
                            placeholder="Enter the name of your last course"
                            value={lastCourseCompleted}
                            onChange={(e) => setLastCourseCompleted(e.target.value)}
                            required
                        />
                    </div>

                    {/* Student Year Input */}
                    <div className="form-group">
                        <label htmlFor="student">If You Are a Student, What Year Are You In?</label>
                        <input
                            type="text"
                            id="student"
                            name="student"
                            placeholder="e.g., 2nd Year, 3rd Year"
                            value={student}
                            onChange={(e) => setStudent(e.target.value)}
                            required
                        />
                    </div>

                    {/* Professional Company Input */}
                    <div className="form-group">
                        <label htmlFor="professional">If You Are a Professional, Where Do You Work?</label>
                        <input
                            type="text"
                            id="professional"
                            name="professional"
                            placeholder="Enter your company name"
                            value={professional}
                            onChange={(e) => setProfessional(e.target.value)}
                            required
                        />
                    </div>

                    {/* Work Experience Input */}
                    <div className="form-group">
                        <label htmlFor="experience">Work Experience (Years)</label>
                        <input
                            type="number"
                            id="experience"
                            name="experience"
                            min="0"
                            placeholder="Enter your work experience (years)"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            required
                        />
                    </div>

                    {/* Current Role Input */}
                    <div className="form-group">
                        <label htmlFor="currentRole">Current Role</label>
                        <input
                            type="text"
                            id="currentRole"
                            name="currentRole"
                            placeholder="Enter your current job title or position"
                            value={currentRole}
                            onChange={(e) => setCurrentRole(e.target.value)}
                            required
                        />
                    </div>

                    {/* Projects and Internships Input */}
                    <div className="form-group">
                        <label htmlFor="projectsAndInternships">Projects and Internships</label>
                        <textarea
                            id="projectsAndInternships"
                            name="projectsAndInternships"
                            placeholder="Enter details about your past projects and internships"
                            value={projectsAndInternships}
                            onChange={(e) => setProjectsAndInternships(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    {/* Extracurricular Activities Input */}
                    <div className="form-group">
                        <label htmlFor="extracurricularActivities">Extracurricular Activities</label>
                        <textarea
                            id="extracurricularActivities"
                            name="extracurricularActivities"
                            placeholder="Enter details about extracurricular activities"
                            value={extracurricularActivities}
                            onChange={(e) => setExtracurricularActivities(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    {!spinnerRun ? (
                        <button onClick={handleSubmit} type="submit">
                            Submit Your Profile
                        </button>
                    ) : (
                        <Spinner />
                    )}
                </form>
            </div>
        </div>
    );
};

export default ProfileBody;
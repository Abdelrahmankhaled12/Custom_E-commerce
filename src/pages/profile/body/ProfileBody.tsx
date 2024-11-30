import React, { useState } from 'react'; // React import
import './style.scss'; // SCSS styling
import ContactNumber from './ContactNumber';
import CurrentStatus from './CurrentStatus';

/**
 * ProfileBody Component
 * Collects user information for their profile, including personal, educational, and professional details.
 */

const ProfileBody: React.FC = () => {
    // State management for form fields
    const [name, setName] = useState<string>(''); // Full name
    const [currentStatus, setCurrentStatus] = useState<string>(''); // Current status
    const [phone, setPhone] = useState<string | undefined>(''); // Phone number
    const [location, setLocation] = useState<string>(''); // Location
    const [lastCourseCompleted, setLastCourseCompleted] = useState<string>(''); // Last completed course
    const [experience, setExperience] = useState<string>(''); // Work experience
    const [currentRole, setCurrentRole] = useState<string>(''); // Current job role
    const [projectsAndInternships, setProjectsAndInternships] = useState<string>(''); // Projects and internships
    const [extracurricularActivities, setExtracurricularActivities] = useState<string>(''); // Extracurricular activities
    const [lastInstitutionAttended, setLastInstitutionAttended] = useState<string>(''); // Last institution attended
    const [professional, setProfessional] = useState<string>(''); 
    const [student, setStudent] = useState<string>(''); 

    /**
     * Handles form submission.
     * Validates inputs and simulates saving the profile data.
     */
    const submit = async () => {
        if (!name || !currentStatus || !phone) {
            alert('Please fill in all required fields.');
            return;
        }
        // Mock API submission logic
        console.log({
            name,
            currentStatus,
            phone,
            location,
            lastInstitutionAttended,
            lastCourseCompleted,
            experience,
            currentRole,
            projectsAndInternships,
            extracurricularActivities,
        });
        alert('Profile submitted successfully!');
    };

    return (
        <div className="profileBody">
            <div className="container">
                {/* Profile Form */}
                <form onSubmit={(e) => e.preventDefault()}>
                    <h1>User Profile Form</h1>

                    {/* Full Name Input */}
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Phone Number Input */}
                    <ContactNumber phone={phone} setPhone={setPhone} />

                    {/* Location Input */}
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            placeholder="Enter your location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>

                    {/* Current Status Input */}
                    <CurrentStatus
                        currentStatus={currentStatus}
                        setCurrentStatus={setCurrentStatus}
                    />

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

                    {/* If You Are a Student, What Year Are You In? Input */}
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

                    {/* If You Are a Professional, Where Do You Work? Input */}
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

                    {/* Submit Button */}
                    <button onClick={submit} type="submit">
                        Submit Your Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileBody;

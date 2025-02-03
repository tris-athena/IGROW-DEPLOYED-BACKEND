import React, { useState } from 'react';

// Sample data for the user's profile and testimonial (this could be dynamic in a real app)
const user = {
  name: 'John Doe',
  profileImage: 'https://via.placeholder.com/100',
};

const sampleTestimonial = {
  id: 1,
  user: 'John Doe',
  title: 'Great Service!',
  caption: 'This service helped me grow my business. Highly recommend!',
  imageUrl: 'https://via.placeholder.com/150',
};

const Landing = () => {
  const [testimonial, setTestimonial] = useState(sampleTestimonial);

  const handleDelete = (id) => {
    // Handle delete functionality
    alert(`Testimonial with ID: ${id} has been deleted`);
    // Optionally remove or replace testimonial if needed
  };

  return (
    <div style={styles.pageContainer}>
      {/* User Profile and Create Post Button Section */}
      <div style={styles.profileSection}>
        <div style={styles.profileBox}>
          <img src={user.profileImage} alt={user.name} style={styles.profileImage} />
          <div style={styles.profileDetails}>
            <h3 style={styles.profileName}>{user.name}</h3>
          </div>
        </div>

        <button style={styles.createPostButton}>Create Post</button>
      </div>

      {/* Recent Testimonial Section */}
      <div style={styles.recentPostsContainer}>
        <h2 style={styles.recentPostsHeading}>Your Recent Post</h2>

        {/* Displaying One Testimonial */}
        <div style={styles.recentPostImage}>
          <div style={styles.postMessageBox}>
            {/* User Profile */}
            <div style={styles.postHeader}>
              <img
                src={testimonial.imageUrl}
                alt={testimonial.user}
                style={styles.postThumbnail}
              />
              <div>
                <p style={styles.userName}>{testimonial.user}</p>
              </div>
            </div>

            {/* Title */}
            <h3 style={styles.postTitle}>{testimonial.title}</h3>

            {/* Caption */}
            <p style={styles.postMessage}>{testimonial.caption}</p>

            {/* Image */}
            <img src={testimonial.imageUrl} alt="Testimonial" style={styles.testimonialImage} />

            {/* Delete button */}
            <div style={styles.actionButtons}>
              <button onClick={() => handleDelete(testimonial.id)} style={styles.deleteButton}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Logos Section */}
      <div style={styles.iconContainer}>
        <img src="images/logoTaguig.png" alt="Taguig Logo" className="icon" />
        <img src="images/logoCentralSignal.png" alt="Central Signal Logo" className="icon" />
        <img src="images/logoTUP.png" alt="TUP Logo" className="icon" />
      </div>
    </div>
  );
};

// Styles for the Landing Page
const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  profileSection: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  profileBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  profileImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  profileDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  profileName: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  createPostButton: {
    padding: '10px 20px',
    backgroundColor: '#105d5e',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  recentPostsContainer: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px', // Limit the width for a cleaner design
    width: '100%',
    textAlign: 'center', // Center everything inside
  },
  recentPostsHeading: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  recentPostImage: {
    marginBottom: '20px',
  },
  postMessageBox: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ddd',
  },
  postHeader: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    justifyContent: 'center', // Center profile image and name
  },
  userName: {
    fontSize: '18px',
    color: '#333',
    fontWeight: 'bold',
  },
  postTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#333',
    margin: '10px 0',
  },
  postMessage: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '10px',
  },
  testimonialImage: {
    width: '100%',
    height: 'auto',
    marginTop: '10px',
  },
  postThumbnail: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15px',
  },
  deleteButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '30px',
  },
  logo: {
    width: '50px',
    height: '50px',
    objectFit: 'contain',
    cursor: 'pointer',
  },
};

export default Landing;

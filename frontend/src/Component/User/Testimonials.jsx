import React, { useState } from 'react';

// Sample data for the testimonials (in a real app, this could come from an API)
const sampleTestimonials = [
  {
    id: 1,
    user: 'John Doe',
    title: 'Great Service!',
    caption: 'This service helped me grow my business. Highly recommend!',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    user: 'Jane Smith',
    title: 'Fantastic Support!',
    caption: 'Customer support was quick and efficient. Will use again!',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    user: 'Mike Johnson',
    title: 'Amazing Experience!',
    caption: 'A wonderful experience from start to finish.',
    imageUrl: 'https://via.placeholder.com/150',
  },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(sampleTestimonials);

  const handleEdit = (id) => {
    // Handle edit functionality
    alert(`Edit testimonial with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete functionality
    const updatedTestimonials = testimonials.filter((testimonial) => testimonial.id !== id);
    setTestimonials(updatedTestimonials);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.recentPostsContainer}>
        <h2 style={styles.recentPostsHeading}>Testimonials</h2>
        <p style={styles.recentPostsMessage}>Here’s what our users have to say</p>
        <div style={styles.recentPostImages}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} style={styles.postRow}>
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
                
                {/* Edit & Delete buttons */}
                <div style={styles.actionButtons}>
                  <button onClick={() => handleEdit(testimonial.id)} style={styles.editButton}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(testimonial.id)} style={styles.deleteButton}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Logos */}
        <div style={styles.iconContainer}>
          <img src="images/logoTaguig.png" alt="Taguig Logo" className="icon" />
          <img src="images/logoCentralSignal.png" alt="Central Signal Logo" className="icon" />
          <img src="images/logoTUP.png" alt="TUP Logo" className="icon" />
        </div>
      </div>
    </div>
  );
};

// Styles for the Testimonials page
const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    flexWrap: 'wrap', // This will allow the content to wrap on smaller screens
  },
  recentPostsContainer: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '1200px', // Limit max width for larger screens
  },
  recentPostsHeading: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#333',
    textAlign: 'center',
  },
  recentPostsMessage: {
    fontSize: '16px',
    marginBottom: '20px',
    color: '#666',
    textAlign: 'center',
  },
  recentPostImages: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  postRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  postMessageBox: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ddd',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  postHeader: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  userName: {
    fontSize: '16px',
    color: '#333',
    fontWeight: 'bold',
  },
  postTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
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
    gap: '10px',
    marginTop: '15px',
  },
  editButton: {
    padding: '8px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '8px 15px',
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
  // Responsive Design
  '@media (max-width: 768px)': {
    pageContainer: {
      flexDirection: 'column', // Stack content vertically on small screens
      padding: '10px',
    },
    recentPostsContainer: {
      width: '100%', // Full width on smaller screens
    },
    recentPostsHeading: {
      fontSize: '20px',
    },
    recentPostsMessage: {
      fontSize: '14px',
    },
    postMessageBox: {
      padding: '15px',
    },
    postTitle: {
      fontSize: '16px',
    },
    postMessage: {
      fontSize: '14px',
    },
    iconContainer: {
      flexDirection: 'column',
      gap: '10px',
    },
    logo: {
      width: '40px', // Smaller logos for mobile view
      height: '40px',
    },
  },
  '@media (max-width: 480px)': {
    postRow: {
      gap: '10px',
    },
    actionButtons: {
      flexDirection: 'column',
      gap: '10px',
    },
    editButton: {
      width: '100%',
    },
    deleteButton: {
      width: '100%',
    },
  },
};

export default Testimonials;

import React, { useState } from 'react';

// Sample data for the user's profile and testimonial
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

const recentPosts = [
  {
    id: 1,
    title: 'How to Improve Your Business',
    description: 'Learn how to optimize your business processes and increase revenue.',
    imageUrl: 'https://via.placeholder.com/600',
  },
  {
    id: 2,
    title: 'Customer Engagement Strategies',
    description: 'Effective strategies to engage with your customers and grow your audience.',
    imageUrl: 'https://via.placeholder.com/600',
  },
];

const Landing = () => {
  const [testimonial, setTestimonial] = useState(sampleTestimonial);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  // Function to handle modal opening
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle modal closing
  const closeModal = () => {
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
    setImage(null);
  };

  // Handle form submission
  const handlePost = () => {
    if (title && description && image) {
      console.log('New Post Data:', { title, description, image });
      closeModal(); // Close modal after posting
    } else {
      alert('Please fill all fields and upload an image.');
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Rectangle Text Box */}
      <div style={styles.textBox}>
        {/* User Profile and Create Post Button */}
        <div style={styles.profileSection}>
          <div style={styles.profileBox}>
            <img src={user.profileImage} alt={user.name} style={styles.profileImage} />
            <div style={styles.profileDetails}>
              <h3 style={styles.profileName}>{user.name}</h3>
            </div>
          </div>
          <button onClick={openModal} style={styles.createPostButton}>Create Post</button>
        </div>

        {/* Testimonial Section */}
        {testimonial && (
          <div style={styles.testimonialContainer}>
            <div style={styles.testimonialBox}>
              <div style={styles.testimonialImageContainer}>
                <h5 style={styles.testimonialTitle}>{testimonial.title}</h5>
                <img
                  src={testimonial.imageUrl}
                  alt={testimonial.user}
                  style={styles.testimonialImage}
                />
              </div>
              <p style={styles.testimonialCaption}>{testimonial.caption}</p>
            </div>
          </div>
        )}
      </div>

      {/* Your Recent Post Section */}
      <div style={styles.recentPostSection}>
        <h2 style={styles.recentPostHeading}>Your Recent Post</h2>
        <ul style={styles.recentPostsList}>
          {recentPosts.map((post) => (
            <li key={post.id} style={styles.recentPostItem}>
              {/* Each post in its own separate box */}
              <div style={styles.recentPostBox}>
                <h4 style={styles.recentPostTitle}>{post.title}</h4>
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  style={styles.recentPostImage}
                />
                <p style={styles.recentPostDescription}>{post.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Logos Section */}
      <div style={styles.iconContainer}>
        <img src="images/logoTaguig.png" alt="Taguig Logo" style={styles.logo} />
        <img src="images/logoCentralSignal.png" alt="Central Signal Logo" style={styles.logo} />
        <img src="images/logoTUP.png" alt="TUP Logo" style={styles.logo} />
      </div>

      {/* Modal for Create Post */}
      {isModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>Create a New Post</h2>
            <label htmlFor="postTitle">Title</label>
            <input
              type="text"
              id="postTitle"
              placeholder="Enter your title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.inputField}
            />
            <label htmlFor="postDescription">Description</label>
            <textarea
              id="postDescription"
              placeholder="Enter your description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={styles.textareaField}
            />
            <label htmlFor="imageUpload">Upload Image</label>
            <input type="file" id="imageUpload" onChange={(e) => setImage(e.target.files[0])} />
            <div style={styles.modalActions}>
              <button onClick={closeModal} style={styles.cancelButton}>Cancel</button>
              <button onClick={handlePost} style={styles.postButton}>Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles for the Landing Page
const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  textBox: {
    width: '80%',
    padding: '30px',
    marginBottom: '40px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    textAlign: 'left',
  },
  profileSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  profileImage: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
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
    padding: '8px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px', // Added margin-top for better spacing
  },
  testimonialContainer: {
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  testimonialTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  testimonialBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  testimonialImageContainer: {
    position: 'relative',
  },
  testimonialImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
  },
  testimonialCaption: {
    fontSize: '14px',
    color: '#555',
  },
  recentPostSection: {
    width: '100%',
    padding: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    marginBottom: '40px',
  },
  recentPostHeading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  recentPostsList: {
    listStyleType: 'none',
    padding: '0',
  },
  recentPostItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '15px',
  },
  recentPostBox: {
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
  },
  recentPostTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  recentPostImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    marginBottom: '15px',
  },
  recentPostDescription: {
    fontSize: '14px',
    color: '#555',
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

  // Modal Styles
  modal: {
    display: 'flex',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    width: '400px',
    textAlign: 'center',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  cancelButton: {
    padding: '8px 15px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  postButton: {
    padding: '8px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },

  // Input and Textarea Styles
  inputField: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  },
  textareaField: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    height: '100px',
  },
};

export default Landing;

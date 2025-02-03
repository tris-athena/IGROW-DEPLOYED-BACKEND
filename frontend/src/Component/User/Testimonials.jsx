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
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  // Handle Modal open
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Handle Modal close
  const closeModal = () => {
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
    setImage(null);
  };

  // Handle form submission
  const handlePost = () => {
    if (title && description && image) {
      const newTestimonial = {
        id: testimonials.length + 1,
        user: 'New User', // In a real case, this would be dynamically set based on the current user
        title,
        caption: description,
        imageUrl: URL.createObjectURL(image), // Assuming image is a File object
      };

      setTestimonials([...testimonials, newTestimonial]);
      closeModal(); // Close the modal after posting
    } else {
      alert('Please fill all fields and upload an image.');
    }
  };

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
        
        
        {/* Button to open Modal */}
        <button onClick={openModal} style={styles.createPostButton}>Create Post</button>
        
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

      {/* Modal for Create Post */}
      {isModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>Create a New Testimonial</h2>
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

// Styles for the Testimonials page
const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    flexWrap: 'wrap',
  },
  recentPostsContainer: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '1200px',
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
  createPostButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
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

export default Testimonials;

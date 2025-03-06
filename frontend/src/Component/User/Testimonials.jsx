import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Testimonials = () => {
  const [posts, setPosts] = useState([]); // State to store all posts
  const [loading, setLoading] = useState(true);
  const [image,setImage] = useState();
  const [error, setError] = useState(null);

  // Fetch all posts made by the user
  const fetchPosts = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const email = user ? user.emailuser : null;

      if (email) {
        const response = await axios.get(`http://localhost:4001/api/v1/posts`);
        setPosts(response.data.posts); // Assuming posts are in response.data.posts
      } else {
        setError('User email not found.');
      }
    } catch (err) {
      setError('Error fetching posts: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
    
      setImage(user.dp);
    }
    fetchPosts();
  }, []); // Empty dependency array to run once when component mounts
  
  const handleDelete = (id) => {
    console.log('Deleting post with ID:', id);
  };

  const handleEdit = (id) => {
    console.log('Editing post with ID:', id);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Testimonials</h1>
      {loading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        posts.map((testimonial) => (
          <div key={testimonial._id} style={styles.testimonialBox}>
            <div style={styles.profileBox}>
              <img
                src={image || 'https://via.placeholder.com/50'}
                alt={testimonial.userName}
                style={styles.profileImage}
              />
              <span style={styles.profileName}>{testimonial.userName}</span>
            </div>
            <h3 style={styles.postTitle}>{testimonial.title}</h3>
            <p style={styles.postCaption}>{testimonial.description}</p>
            <div style={styles.imageContainer}>
                      {testimonial.images.map((image, i) => (
                        <img
                          key={i}
                          src={image.url || 'https://via.placeholder.com/150'}  // Check if 'image.url' exists
                          alt={`Image ${i}`}
                          style={styles.postImage}
                        />
                      ))}
                    </div>
            <div style={styles.actions}>
              <button onClick={() => handleEdit(testimonial.id)} style={styles.editButton}>Edit</button>
              <button onClick={() => handleDelete(testimonial.id)} style={styles.deleteButton}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    padding: '20px',
    backgroundColor: '#f8f9f0',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageContainer: {
    display: 'flex',
    
    gap: '10px',
    flexDirection: 'row', // Display images side by side
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center', // Allow images to wrap if there's more than one
  },
  header: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#333',
  },
  testimonialBox: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: '#fff',
    padding: '20px',
    marginBottom: '20px',
    boxSizing: 'border-box',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  profileBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '10px',
  },
  profileImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  profileName: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  postTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  postCaption: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '15px',
  },
  postImage: {
    width: '20%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  editButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Testimonials;

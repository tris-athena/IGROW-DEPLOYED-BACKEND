import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Testimonials = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState();
  const [error, setError] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedContent, setEditedContent] = useState({});
  const [carouselIndex, setCarouselIndex] = useState({});

  const fetchPosts = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const email = user ? user.emailuser : null;

      if (email) {
        const response = await axios.get(`http://localhost:4001/api/v1/posts`);
        setPosts(response.data.posts);
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
  }, []);

  useEffect(() => {
    const indexMap = {};
    posts.forEach(post => {
      indexMap[post._id] = 0;
    });
    setCarouselIndex(indexMap);
  }, [posts]);

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((post) => post._id !== id));
  };

  const handleEdit = (post) => {
    setEditingPostId(post._id);
    setEditedContent({ title: post.title, description: post.description });
  };

  const handleSave = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post._id === id ? { ...post, ...editedContent } : post
      )
    );
    setEditingPostId(null);
    setEditedContent({});
  };

  const handleCancel = () => {
    setEditingPostId(null);
    setEditedContent({});
  };

  const handleAddPhotoClick = (postId) => {
    // Trigger file input click for specific post
    const fileInput = document.getElementById(`fileInput-${postId}`);
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleAddPhotoChange = (e, postId) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? { ...post, images: [...post.images, { url: newImageUrl }] }
            : post
        )
      );
      setCarouselIndex((prev) => ({
        ...prev,
        [postId]: posts.find(post => post._id === postId)?.images.length || 0,
      }));
    }
  };

  const handleDeletePhoto = (postId, photoIndex) => {
    alert(`Delete Photo functionality not implemented yet for post: ${postId}, photo index: ${photoIndex}`);
  };

  const handlePrevImage = (postId) => {
    setCarouselIndex(prev => ({
      ...prev,
      [postId]: Math.max((prev[postId] || 0) - 1, 0),
    }));
  };

  const handleNextImage = (postId, imagesLength) => {
    setCarouselIndex(prev => ({
      ...prev,
      [postId]: Math.min((prev[postId] || 0) + 1, imagesLength - 1),
    }));
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
            <div style={styles.profileHeader}>
              <div style={styles.profileBox}>
                <img
                  src={image || 'https://via.placeholder.com/50'}
                  alt={testimonial.userName}
                  style={styles.profileImage}
                />
                <span style={styles.profileName}>{testimonial.userName}</span>
              </div>
              {editingPostId !== testimonial._id && (
                <button
                  onClick={() => handleEdit(testimonial)}
                  style={styles.editButtonAligned}
                >
                  Edit Post
                </button>
              )}
            </div>

            {editingPostId === testimonial._id ? (
              <div>
                <input
                  type="text"
                  value={editedContent.title}
                  onChange={(e) =>
                    setEditedContent({ ...editedContent, title: e.target.value })
                  }
                  style={styles.input}
                />
                <textarea
                  value={editedContent.description}
                  onChange={(e) =>
                    setEditedContent({ ...editedContent, description: e.target.value })
                  }
                  style={styles.textarea}
                />
                <div style={styles.actions}>
                  <button onClick={() => handleSave(testimonial._id)} style={styles.saveButton}>Save</button>
                  <button onClick={handleCancel} style={styles.cancelButton}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <h3 style={styles.postTitle}>{testimonial.title}</h3>
                <p style={styles.postCaption}>{testimonial.description}</p>
              </>
            )}

            <div style={styles.imageCenter}>
              <div style={styles.carouselWrapper}>
                {testimonial.images.length > 0 && (
                  <div style={styles.carousel}>
                    <button
                      onClick={() => handlePrevImage(testimonial._id)}
                      style={styles.carouselButton}
                      disabled={carouselIndex[testimonial._id] === 0}
                    >
                      ◀
                    </button>
                    <img
                      src={testimonial.images[carouselIndex[testimonial._id]]?.url || 'https://via.placeholder.com/150'}
                      alt="Carousel"
                      style={styles.carouselImage}
                    />
                    <button
                      onClick={() => handleNextImage(testimonial._id, testimonial.images.length)}
                      style={styles.carouselButton}
                      disabled={carouselIndex[testimonial._id] === testimonial.images.length - 1}
                    >
                      ▶
                    </button>
                  </div>
                )}
                {/* Hidden file input per post for add photo */}
                <input
                  type="file"
                  id={`fileInput-${testimonial._id}`}
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={(e) => handleAddPhotoChange(e, testimonial._id)}
                />
              </div>
            </div>

            {/* Buttons aligned side by side */}
            <div style={{ ...styles.actions, justifyContent: 'space-between', maxWidth: '300px', margin: '20px auto 0' }}>
              <button
                onClick={() => handleAddPhotoClick(testimonial._id)}
                style={styles.addPhotoButton}
              >
                + Add Photo
              </button>

              <button
                onClick={() => handleDelete(testimonial._id)}
                style={styles.deleteButton}
              >
                Delete Post
              </button>
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#333',
  },
  testimonialBox: {
    position: 'relative',
    width: '100%',
    maxWidth: '800px',
    backgroundColor: '#fff',
    padding: '20px',
    marginBottom: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
    textAlign: 'center',
  },
  profileHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  profileBox: {
    display: 'flex',
    alignItems: 'center',
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
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  postCaption: {
    fontSize: '15px',
    color: '#555',
    margin: '10px 0',
  },
  imageCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  carouselWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  carousel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
  },
  carouselImage: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '6px',
  },
  carouselButton: {
    backgroundColor: '#ccc',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  addPhotoButton: {
    padding: '8px 16px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  actions: {
    display: 'flex',
    gap: '15px',
    // Removed justifyContent to allow override in usage
  },
  editButtonAligned: {
    padding: '8px 12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  saveButton: {
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#9e9e9e',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
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
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    minHeight: '60px',
    marginBottom: '10px',
  },
  carouselImage: {
    width: '500px',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '6px',
  },
  postTitle: {
  fontSize: '20px',
  fontWeight: 'bold',
  marginTop: '10px',
  maxWidth: '100%',
  wordWrap: 'break-word',
  marginLeft: 'auto',
  marginRight: 'auto',
},

postCaption: {
  fontSize: '15px',
  color: '#555',
  margin: '10px auto',
  maxWidth: '100%',
  wordWrap: 'break-word',
  whiteSpace: 'pre-wrap',
},
};

export default Testimonials;

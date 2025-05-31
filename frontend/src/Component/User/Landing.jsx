import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

// Sample static user data for fallback
const defaultUser = {
  name: 'Aivylat',
  profileImage: 'https://via.placeholder.com/100',
};

const Landing = () => {
  const [userProfile, setUserProfile] = useState(defaultUser); // Default user profile data
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [name, setName] = useState(null);
  const [emails, setEmail] = useState(""); // Default to empty string
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch posts for user email
  const fetchPosts = async () => {
    if (!emails) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:4001/api/v1/post/${emails}`);
      const responseData = response.data;

      if (responseData.success && Array.isArray(responseData.posts)) {
        const sortedPosts = responseData.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts.slice(0, 3)); // Get latest 3 posts
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImages(files);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(files[0]);
    }
  };

  const handlePost = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const email = user?.emailuser || "";

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("email", email);
      Array.from(images).forEach((image, idx) => {
        formData.append('images', image, `image_${idx}.jpg`);
      });

      await axios.post("http://localhost:4001/api/v1/post-create", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setSuccess("Posted Successfully");
      toast.success("Posted successfully!", { position: "bottom-right" });
      navigate('/landing');
      closeModal();
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      setError(message);
      toast.error(message, { position: "bottom-right" });
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
    setImages([]);
    setImagePreview('');
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setEmail(user.emailuser);
      setName(user.name);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [emails]);

  return (
    <div style={styles.pageContainer}>
      {/* Header with styled iGROW */}
      <div style={styles.headerText}>
        dual-source aquaponics{' '}
        <span style={{ color: '#105d5e', fontWeight: 'bold' }}>iGROW</span>
      </div>

      {/* User Profile and Create Post Button */}
      <div style={styles.textBox}>
        <div style={styles.profileSection}>
          <div style={styles.profileBox}>
            <img
              src={userProfile.profileImage || 'https://via.placeholder.com/100'}
              alt={name || 'User'}
              style={styles.profileImage}
            />
            <div style={styles.profileDetails}>
              <h3 style={styles.profileName}>
                {loading ? 'Loading...' : name || userProfile.name}
              </h3>
            </div>
          </div>
          <button onClick={openModal} style={styles.createPostButton}>Create Post</button>
        </div>
      </div>

      {/* Recent Posts Section */}
      <div style={styles.recentPostSection}>
        <h2 style={styles.recentPostHeading}>Your Recent Post</h2>
        <ul style={styles.recentPostsList}>
          {loading ? (
            <li>Loading posts...</li>
          ) : posts.length > 0 ? (
            posts.map((post, index) => (
              <li key={index} style={styles.postCard}>
                <div style={styles.cardContent}>
                  <h3 style={styles.postTitle}>{post.title}</h3>
                  <p style={styles.postDescription}>{post.description}</p>
                  {post.images && post.images.length > 0 && (
                    <div style={styles.imageContainer}>
                      {post.images.map((img, i) => (
                        <img
                          key={i}
                          src={img.url || 'https://via.placeholder.com/150'}
                          alt={`Post image ${i}`}
                          style={styles.postImage}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))
          ) : (
            <li>No recent posts available.</li>
          )}
        </ul>
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
            <input type="file" id="imageUpload" onChange={handleImageChange} multiple />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ marginTop: '10px', maxWidth: '100%', borderRadius: '8px' }}
              />
            )}
            <div style={styles.modalActions}>
              <button onClick={closeModal} style={styles.cancelButton}>Cancel</button>
              <button onClick={handlePost} style={styles.postButton} disabled={loading}>
                {loading ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f8f9f0',
    minHeight: '100vh',
  },
  headerText: {
    fontSize: '28px',
    fontWeight: 'normal',
    marginBottom: '30px',
    color: '#000',
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
    objectFit: 'cover',
  },
  profileDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  profileName: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0,
  },
  createPostButton: {
    padding: '8px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  recentPostSection: {
    width: '80%',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  recentPostHeading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  recentPostsList: {
    listStyleType: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    gap: '40px',
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '20px',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    flexGrow: 1,
  },
  postTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  postDescription: {
    fontSize: '16px',
    color: '#555',
    wordWrap: 'break-word',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  imageContainer: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postImage: {
    width: '100%',
    maxWidth: '150px',
    height: 'auto',
    borderRadius: '4px',
  },
  modal: {
    display: 'flex',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
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

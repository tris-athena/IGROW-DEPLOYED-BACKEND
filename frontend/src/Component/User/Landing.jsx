import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";  // Ensure correct import
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
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [emails, setEmail] = useState(""); // Default to empty string
  const [images, setImages] = useState([]);
  const [success, setSuccess] = useState("");
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    email: "",
  });

  // Fetch user profile data when the component mounts
  const fetchPosts = async () => {
    try {
      // Fetch posts using the user's email
      if (emails) {
        const api = emails;
        console.log(api)
        const postResponse = await axios.get(`http://localhost:4001/api/v1/post/${api}`);

        console.log('Raw response:', postResponse.data);

        const responseData = postResponse.data;

        // Check if the response contains posts and is in the expected format
        if (responseData.success && Array.isArray(responseData.posts)) {
          const postsArray = responseData.posts;
          console.log('Posts Array:', postsArray); // Log the raw posts array

          // Sort posts in descending order by createdAt
          const sortedPosts = postsArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setPosts(sortedPosts.slice(0, 3)); // Update state with sorted posts (slice to get the 2 most recent)
        } else {
          console.log('No posts or incorrect format');
        }
      } else {
        console.log('User email not found in session storage');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Set the preview of the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview URL
      };
      reader.readAsDataURL(file);
      setImages(e.target.files); // Set the selected files
    }
  };

  // Handle post creation
  const handlePost = async (formData) => {
    try {
      setLoading(true);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const user = JSON.parse(sessionStorage.getItem("user"));
      const email = user ? user.emailuser : null;
      const data = new FormData();
      data.set("title", title);
      data.set("description", description);
      data.set("email", email);
      Array.from(images).forEach((image, index) => {
        data.append('images', image, `image_${index}.jpg`);
      });

      const response = await axios.post("http://localhost:4001/api/v1/post-create", data, config);
      setLoading(false);
      setSuccess("Posted Successfully");
      navigate('/landing');
      toast.success("Posted successfully!", {
        position: "bottom-right",  // Hardcoded position string for testing
      });

      closeModal(); // Close the modal after posting
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "Something went wrong");
      toast.error(error.message, {
        position: "bottom-right",  // Hardcoded position string for testing
      });
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
    setImage(null);
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setEmail(user.emailuser);
      setImage(user.dp);
      setName(user.name);
    }
    fetchPosts();
  }, [emails]); // Use 'emails' dependency to refetch posts when the email changes

  return (
    <div style={styles.pageContainer}>
      {/* User Profile and Create Post Button */}
      <div style={styles.textBox}>
        <div style={styles.profileSection}>
          <div style={styles.profileBox}>
            <img
              src={image || 'https://via.placeholder.com/100'}
              alt={userProfile.name || 'User'}
              style={styles.profileImage}
            />
            <div style={styles.profileDetails}>
              <h3 style={styles.profileName}>
                {loading ? 'Loading...' : name}
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
                      {post.images.map((image, i) => (
                        <img
                          key={i}
                          src={image.url || 'https://via.placeholder.com/150'}  // Check if 'image.url' exists
                          alt={`Image ${i}`}
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
            <input type="file" id="imageUpload" onChange={handleImageChange} />
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

const styles = {
  recentPostSection: {
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
    flexDirection: 'row', // Stack posts vertically
    gap: '40px', // Space between cards
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '100%',
    maxWidth: '400px', // Limit the width of each card
    margin: '0 auto', // Center align cards
    display: 'flex',
    flexDirection: 'column', // Allow flexibility in height and content
    justifyContent: 'space-between', // Spread the content evenly
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    flexGrow: 1, // Allow the content to grow and fill available space
  },
  postTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0,
    overflow: 'hidden', // Hide any overflow text
    textOverflow: 'ellipsis', // Use ellipsis for overflow text
    whiteSpace: 'nowrap', // Prevent wrapping the title into new lines
  },
  postDescription: {
    fontSize: '16px',
    color: '#555',
    wordWrap: 'break-word', // Ensure the text wraps properly when it exceeds the container's width
    overflow: 'hidden', // Prevent overflow of content
    textOverflow: 'ellipsis', // Use ellipsis for overflow text
  },
  imageContainer: {
    display: 'flex',
    gap: '10px',
    flexDirection: 'row', // Display images side by side
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center', // Allow images to wrap if there's more than one
  },
  postImage: {
    width: '100%', // Ensure images take full width of their container
    maxWidth: '150px', // Limit the max width of each image
    height: 'auto',
    borderRadius: '4px',
  },
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f8f9f0',  // Updated background color here
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
    marginTop: '10px',
  },

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

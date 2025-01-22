import React from 'react';

const Testimonials = () => {
  return (
    <div style={styles.pageContainer}>
      {/* Left Section - Testimonials (Column Layout with square-like message boxes) */}
      <div style={styles.testimonialsContainer}>
        <div style={styles.testimonialBox}>
          <div style={styles.testimonialTextContainer}>
            <p style={styles.testimonialText}>
              "iabdsbdhbjednkwndklejmflemjfloejmwlkfinefnheiwfhiewfjiekfeff,
              dbduheihdiehdiehfiehfiehifheifhiehfiewhfiehfiehfiehwfiehfiehwf"
            </p>
            <h3 style={styles.testimonialAuthor}>- aivylat</h3>
            <a href="#" style={styles.showMoreLink}>Show More</a>
          </div>
          <img 
            src="images/Logo.png" 
            alt="Person 1" 
            style={styles.testimonialImage} 
          />
        </div>

        <div style={styles.testimonialBox}>
          <div style={styles.testimonialTextContainer}>
            <p style={styles.testimonialText}>
              "dwsdhusawhdsiwkanchsikanckisncksemdnkesmnakdmnsefmnefe
              djubsujdbusdbujbduebduebdjuesbdjkbesnjkfbjekdbfjkedbfj"
            </p>
            <h3 style={styles.testimonialAuthor}>- beabilat</h3>
            <a href="#" style={styles.showMoreLink}>Show More</a>
          </div>
          <img 
            src="images/Logo.png" 
            alt="Person 2" 
            style={styles.testimonialImage} 
          />
        </div>
      </div>

      {/* Right Section - Recent Posts */}
      <div style={styles.recentPostsContainer}>
        <h2 style={styles.recentPostsHeading}>Recent Posts</h2>
        <p style={styles.recentPostsMessage}>
          recent post recent post recent post
        </p>
        <div style={styles.recentPostImages}>
          <div style={styles.postRow}>
            <div style={styles.postImage}>
              <img src="images/Logo.png" alt="Post 1" style={styles.postThumbnail} />
            </div>
            <div style={styles.postMessageBox}>
              <p style={styles.postMessage}>tup</p>
            </div>
          </div>

          <div style={styles.postRow}>
            <div style={styles.postImage}>
              <img src="images/Logo.png" alt="Post 2" style={styles.postThumbnail} />
            </div>
            <div style={styles.postMessageBox}>
              <p style={styles.postMessage}>tupt</p>
            </div>
          </div>

          <div style={styles.postRow}>
            <div style={styles.postImage}>
              <img src="images/Logo.png" alt="Post 3" style={styles.postThumbnail} />
            </div>
            <div style={styles.postMessageBox}>
              <p style={styles.postMessage}>tupt</p>
            </div>
          </div>

          <div style={styles.postRow}>
            <div style={styles.postImage}>
              <img src="images/Logo.png" alt="Post 4" style={styles.postThumbnail} />
            </div>
            <div style={styles.postMessageBox}>
              <p style={styles.postMessage}>tupt</p>
            </div>
          </div>
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
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  testimonialsContainer: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  testimonialBox: {
    backgroundColor: '#105d5e',
    color: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'row', // Square-like layout for message box and image
    gap: '20px',
    marginBottom: '20px',
    height: '300px',
  },
  testimonialImage: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginTop: '10px',
  },
  testimonialTextContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  testimonialText: {
    fontSize: '16px',
    lineHeight: '1.5',
  },
  testimonialAuthor: {
    marginTop: '10px',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  showMoreLink: {
    color: '#f1c40f',
    textDecoration: 'none',
    marginTop: '10px',
    display: 'inline-block',
  },
  recentPostsContainer: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    marginLeft: '20px', // Space between message box and recent posts
  },
  recentPostsHeading: {
    fontSize: '20px',
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
    flexDirection: 'column', // One image per row
    gap: '20px', // Space between rows
  },
  postRow: {
    display: 'flex',
    flexDirection: 'row-reverse', // Image on the left, message on the right
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },
  postMessageBox: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  postMessage: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '10px',
  },
  postImage: {
    width: '200px',
    height: 'auto',
  },
  postThumbnail: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
  },
};

export default Testimonials;

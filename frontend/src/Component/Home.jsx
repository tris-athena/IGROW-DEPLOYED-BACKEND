import React, { useState } from 'react';

const Home = () => {
  // State to manage the visibility of the prompt
  const [showPrompt, setShowPrompt] = useState(false);

  // Function to handle the button click
  const handleGrowMoreClick = () => {
    setShowPrompt(true); // Show the prompt
  };

  // Function to close the prompt
  const handleClosePrompt = () => {
    setShowPrompt(false); // Hide the prompt
  };

  return (
    <div className="home" style={styles.homeContainer}>
      <div className="content" style={styles.contentContainer}>
        {/* Text Section */}
        <div className="text-section" style={styles.textSection}>
          <p style={styles.textLine}>dual-source aquaponics</p>
          <h2 style={styles.igrowText}>iGROW</h2>
        </div>

        {/* Button Section */}
        <div className="button-section" style={styles.buttonSection}>
          <button 
            onClick={handleGrowMoreClick} 
            style={styles.button}
          >
            Grow More!
          </button>
        </div>

        {/* Logos Section */}
        <div className="logo-section" style={styles.logoSection}>
          <img 
            src="images/logoTaguig.png" 
            alt="Taguig Logo" 
            style={styles.logoImage}
          />
          <img 
            src="images/logoCentralSignal.png" 
            alt="Central Signal Logo" 
            style={styles.logoImage}
          />
          <img 
            src="images/logoTUP.png" 
            alt="TUP Logo" 
            style={styles.logoImage}
          />
        </div>
      </div>

      {/* Image Section */}
      <div className="image-section" style={styles.imageSection}>
        <img 
          src="images/system.png" 
          alt="Large Image" 
          style={styles.largeImage}
        />
      </div>

      {/* Prompt Modal */}
      {showPrompt && (
        <div style={styles.promptOverlay}>
          <div style={styles.prompt}>
            <p>Please login first.</p>
            <button onClick={handleClosePrompt} style={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles for layout and positioning
const styles = {
  homeContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '100px',
    backgroundColor: '#f8f9f0',
    fontFamily: 'Poppins, sans-serif',
    flexWrap: 'wrap', // Allow wrapping for responsiveness
  },
  contentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: '20px',
    position: 'relative',
    flexBasis: '50%', // Initial flex size for larger screens
    padding: '20px',
  },
  textSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    margin: '0',
    padding: '0',
    marginBottom: '20px',
  },
  textLine: {
    fontSize: '30px',
    margin: '0',
    padding: '0',
    display: 'block',
    color: '#6d412b',
  },
  igrowText: {
    fontSize: '150px',
    fontWeight: 'bold',
    margin: '0',
    padding: '0',
    display: 'block',
  },
  buttonSection: {
    marginTop: '20px',
  },
  button: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#105d5e',
    borderRadius: '30px',
    textDecoration: 'none',
    padding: '10px 20px',
    display: 'inline-block',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
    marginLeft: '50px',
  },
  logoSection: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '20px',
    marginTop: '80px',
    flexWrap: 'wrap', // Allow logos to wrap on smaller screens
  },
  logoImage: {
    width: '60px',
    height: 'auto',
  },
  imageSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',  // Align image to the right
    alignItems: 'center',
    flexBasis: '50%', // Image takes 50% of space on larger screens
    marginTop: '20px',
  },
  largeImage: {
    maxWidth: '100%',
    height: 'auto',
    maxHeight: '500px',
  },
  promptOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prompt: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',
  },
  closeButton: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#105d5e',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
  },
  // Media Queries for responsiveness
  '@media screen and (max-width: 768px)': {
    homeContainer: {
      flexDirection: 'column',
      padding: '20px',
    },
    contentContainer: {
      flexBasis: '100%',
      marginRight: '0',
    },
    igrowText: {
      fontSize: '100px', // Smaller font size for mobile
    },
    button: {
      fontSize: '14px', // Adjust button font size
      padding: '8px 16px', // Adjust button padding
    },
    logoImage: {
      width: '50px', // Smaller logos for mobile
    },
    imageSection: {
      flexBasis: '100%', // Full width on smaller screens
      marginTop: '20px',
      justifyContent: 'center', // Center the image on mobile
    },
  },

  '@media screen and (max-width: 480px)': {
    igrowText: {
      fontSize: '80px', // Even smaller font size for very small screens
    },
    button: {
      fontSize: '12px', // Smaller button text for smaller screens
      padding: '6px 12px',
    },
    textLine: {
      fontSize: '20px', // Smaller text for smaller screens
    },
  },
};

export default Home;

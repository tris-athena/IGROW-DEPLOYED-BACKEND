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
    padding: '70px',
    backgroundColor: '#f8f5f0',
  },
  contentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: '20px',
    position: 'relative',
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
  },
  igrowText: {
    fontSize: '200px',
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
  },
  logoSection: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '20px',
    marginTop: '30px',
  },
  logoImage: {
    width: '60px',
    height: 'auto',
  },
  imageSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  closeButton: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#105d5e',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Home;

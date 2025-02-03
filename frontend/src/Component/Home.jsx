import React, { useState } from 'react';
import '../Component/Home.css';  // Import the CSS file

const Home = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  const handleGrowMoreClick = () => {
    setShowPrompt(true);
  };

  const handleClosePrompt = () => {
    setShowPrompt(false);
  };

  return (
    <div className="home" style={styles.homeContainer}>
      <div className="content" style={styles.contentContainer}>
        {/* Text and Image Section */}
        <div className="text-and-image-section" style={styles.textAndImageSection}>
          <div className="text-section" style={styles.textSection}>
            <p className="textLine">dual-source aquaponics</p>  {/* Use className here */}
            <h2 className="igrowText">iGROW</h2>  {/* Use className here */}
          </div>
          <div className="image-section" style={styles.inlineImageSection}>
            <img 
              src="images/system.png" 
              alt="System Image" 
              style={styles.systemImage}
            />
          </div>
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

const styles = {
  homeContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '80px',
    backgroundColor: '#f8f9f0',
    fontFamily: 'Poppins, sans-serif',
    flexWrap: 'wrap',
  },
  contentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: '20px',
    flexBasis: '50%',
    padding: '0px',
  },
  textAndImageSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: '20px',
  },
  textSection: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: '0',
    padding: '0',
  },
  inlineImageSection: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  systemImage: {
    marginLeft: '200px',
    maxWidth: '100%',
    maxHeight: '1000px',
    objectFit: 'contain',
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
    flexWrap: 'wrap',
  },
  logoImage: {
    width: '60px',
    height: 'auto',
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
};

export default Home;

import React from 'react';

const AboutUs = () => {
  return (
    <div style={styles.pageContainer}>
      {/* Left Section */}
      <div style={styles.textContainer}>
        <h1 style={styles.heading}>About Us</h1>
        <div style={styles.messageBox}>
          <p>With its smart, dual-source aquaponics system, iGrow is leading the way.</p>
          <p>This new method joins the beneficial parts of fish farming and growing plants without soil.</p>
          <p>It is a place where fish and plants live well together.</p>
          <p>Using clever tools, iGrow ensures optimal use of water, plant food, and power.</p>
          <p>The main thing about iGrow's system is how it mixes fish farming with growing plants without dirt.</p>
          <p>This loop transforms fish waste into plant food. Then, the plants clean the water, which goes back to the fish.</p>
          <p>This mutual exchange reduces waste and extends the lifespan of items.</p>
        </div>
      </div>

      {/* Center Section - Image */}
      <div style={styles.imageContainer}>
        <img 
          src="images/igrowteam.png" 
          alt="About Us" 
          style={styles.image}
        />
        <h2 style={styles.teamHeading}>iGROW Team</h2>
      </div>

      {/* Lower Right Section - Logos */}
      <div style={styles.logoContainer}>
        <img src="images/logoTaguig.png" alt="Taguig Logo" style={styles.logo} />
        <img src="images/logoCentralSignal.png" alt="Central Signal Logo" style={styles.logo} />
        <img src="images/logoTUP.png" alt="TUP Logo" style={styles.logo} />
      </div>
    </div>
  );
};

// Styles for the AboutUs page
const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: '#f8f9f0', // Updated color here
    height: '100vh',
    position: 'relative',
  },
  textContainer: {
    flex: 1,
    marginRight: '20px',
    textAlign: 'left',
  },
  heading: {
    fontSize: '36px',
    marginBottom: '20px',
  },
  messageBox: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#105d5e', // Keep message box color as is
    color: '#ffffff', // Ensure text is readable
  },
  imageContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Required for absolute positioning of text
  },
  image: {
    maxWidth: '70%',  // Make the image smaller by adjusting width
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  teamHeading: {
    position: 'absolute', // Allow text to overlap on the image
    top: '10px', // Slightly lower to overlap image
    left: '10px', // Align to the left of the image
    fontSize: '24px',
    fontWeight: 'bold',
    backgroundColor: '#105d5e', // Matching with message box color
    color: '#ffffff', // Ensure text is readable
    padding: '5px 10px',
    borderRadius: '8px',
    zIndex: 1, // Ensure text is above the image
  },
  logoContainer: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    display: 'flex',
    gap: '10px',
  },
  logo: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '50%',
  },
};

export default AboutUs;

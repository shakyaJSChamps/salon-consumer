import React from 'react';

const Loading = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    marginTop: 165,
    marginBottom: 200,

    backgroundColor: 'grey',
    color:"white",
    zIndex: 9999,
  };

  const textStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#000',
  };

  return (
    <div style={containerStyle}>
      <p style={textStyle}>Loading...</p>
    </div>
  );
}

export default Loading;

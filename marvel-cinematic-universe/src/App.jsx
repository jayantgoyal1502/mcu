import React from 'react';
import './App.css';
import Timeline from './pages/Timeline';
import AnimatedLoader from './components/AnimatedLoader.jsx';
function App() {

  // Show animated loader on load
  const [showLoader, setShowLoader] = React.useState(true);
  return (
    <div>
      {showLoader && (
        <AnimatedLoader onFinish={() => setShowLoader(false)} />
      )}
      {!showLoader && <Timeline />}
    </div>
  );
}

export default App

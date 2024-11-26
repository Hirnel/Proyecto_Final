import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { UserContext } from './context/UserContext';
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home';

function App() {
  const [count, setCount] = useState(0)

  const [username, setUsername] = useState('bolito');

  const updateUsername = (newUsername) => {
    setUsername(newUsername);
  };

  const userData = {
    username,       //string
    updateUsername, //función

  }
  return (
    <>
      <UserContext.Provider value={userData}>
      <Router>
        <Header />
        <NavBar /> {/* NavBar está aquí */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </UserContext.Provider>
    </>
  )
}

export default App

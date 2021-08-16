import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();       // userData is the value resulting from calling our custom hook useUserData() that is inside the lib/hooks.js file


  return (
    <UserContext.Provider value={ userData }>
      <Navbar />
      <Component {...pageProps} />
      <Toaster/>
    </UserContext.Provider>
  );
}

export default MyApp;

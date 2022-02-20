import './App.css';
import Imessage from './components/Imessage';
import { login, logout, selectUser } from './features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import Login from './components/Login'
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';


function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(async () => {

    onAuthStateChanged(auth, authUser => {
      if (authUser) {
        // User is logged in
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,

        }))

      } else {
        // User is logged out
        dispatch(logout())
      }
    })

  }, [])

  return (
    <div className='app' >
      {
        user ? <Imessage /> : <Login />
      }
    </div>
  );
}

export default App;

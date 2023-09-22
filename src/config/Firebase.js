import {getAuth} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
const firebaseConfig = {
  apiKey: 'AIzaSyBDUWdFZxR3NmfgF56SwqBEXwpSXD-Afek',
  authDomain: 'whatsapp-clone-b6998.firebaseapp.com',
  projectId: 'whatsapp-clone-b6998',
  storageBucket: 'whatsapp-clone-b6998.appspot.com',
  messagingSenderId: '958985265835',
  appId: '1:958985265835:web:f235e82791fd2b83cfcdee',
  measurementId: 'G-B1JGQNL04E',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};

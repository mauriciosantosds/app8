import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
  apiKey: 'AIzaSyBDUWdFZxR3NmfgF56SwqBEXwpSXD-Afek',
  authDomain: 'whatsapp-clone-b6998.firebaseapp.com',
  projectId: 'whatsapp-clone-b6998',
  storageBucket: 'whatsapp-clone-b6998.appspot.com',
  messagingSenderId: '958985265835',
  appId: '1:958985265835:web:f235e82791fd2b83cfcdee',
  measurementId: 'G-B1JGQNL04E',
  databaseURL: 'https://whatsapp-clone-b6998-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
}); //getAuth(app);
const db = getDatabase(app);

export {auth, db};

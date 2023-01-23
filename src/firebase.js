import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAlUL608IRG0btSF_nCDss4UNM6ZUOoLXI",
  authDomain: "transport-management-sys-46540.firebaseapp.com",
  databaseURL: "https://transport-management-sys-46540-default-rtdb.firebaseio.com",
  projectId: "transport-management-sys-46540",
  storageBucket: "transport-management-sys-46540.appspot.com",
  messagingSenderId: "373593541398",
  appId: "1:373593541398:web:2d370102bfac496fdade37",
  measurementId: "G-NGZK16MK2J"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const fsDb = getFirestore(app);
const storage = getStorage(app);
const rtDb = getDatabase(app)

export { analytics, auth, fsDb, rtDb, storage };


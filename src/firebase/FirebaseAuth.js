import { firebaseapp } from "./FirebaseInitialize";
import { getAuth } from "firebase/auth";

const firebaseauth = getAuth(firebaseapp);

export { firebaseauth };

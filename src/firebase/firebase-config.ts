import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCaz9riBF_cnqEPn8j3Yn6EVw3I9Q8QoaE',
  authDomain: 'table-assignment.firebaseapp.com',
  projectId: 'table-assignment',
  storageBucket: 'table-assignment.appspot.com',
  messagingSenderId: '1019793282052',
  appId: '1:1019793282052:web:98d852c552e23cf6df9151',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

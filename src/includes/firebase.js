import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyABZ4vXqxAbW-MUyGrzDBXD-qwZ8Us_tWg',
  authDomain: 'vue-music-player-2da99.firebaseapp.com',
  projectId: 'vue-music-player-2da99',
  storageBucket: 'vue-music-player-2da99.appspot.com',
  appId: '1:579962749003:web:2476127e47390916520dce'
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

const usersCollection = db.collection('users')
const songsCollection = db.collection('songs')
const commentsCollection = db.collection('comments')

export { auth, db, usersCollection, storage, songsCollection, commentsCollection }

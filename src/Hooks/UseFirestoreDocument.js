import { useState, useEffect } from 'react';
import { firestore } from '../firebase';

export default function UseFirestore(collection, document) {
  const [doc, setDoc] = useState(null)

  //TODO: Refactor possibly to use get instead of onSnapshot.
  useEffect(() => {
    const postRef = firestore.collection(collection).doc(document);
    console.log('UseFirestoreDcouemnt is firing')
    const unsub = postRef.onSnapshot((snapshot) => {
      if (snapshot.exists) {
        const document = { id: snapshot.id, ...snapshot.data(), };
        console.log(document);
        setDoc(document);
      } else {
        // TODO: Make errors appear as alerts or elsewise in DOM.
        console.log('Document not found');
      }
    })
    return () => unsub();
  }, [collection, document])

  return doc;
}
import { useState, useEffect } from 'react';
import { firestore } from '../firebase';

export default function UseFirestore(collection, document) {
  const [doc, setDoc] = useState(null)

  useEffect(() => {
    const postRef = firestore.collection(collection).doc(document);
    const unsub = postRef.onSnapshot((snapshot) => {
      if (snapshot.exists) {
        const document = { id: snapshot.id, ...snapshot.data(), };
        setDoc(document);
      } else {
        console.log('Document not found');
      }
    })
    return () => unsub();
  }, [collection, document])

  return doc;
}
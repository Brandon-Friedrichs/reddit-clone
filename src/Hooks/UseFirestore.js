import { useState, useEffect } from 'react';
import { firestore } from '../firebase';

export default function UseFirestore(collection) {
  const [docs, setDocs] = useState(null)

  useEffect(() => {
    const query = firestore.collection(collection);
    const unsub = query.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data(), };
      });
      setDocs(documents);
    });
    return () => unsub();
  }, [collection])

  return [docs];
}
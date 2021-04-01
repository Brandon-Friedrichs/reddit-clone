import { useState, useEffect } from 'react';
import { firestore } from '../firebase';

export default function UseFirestore(collection, subreddit) {
  const [docs, setDocs] = useState(null)

  useEffect(() => {
    const query = firestore.collection(collection).where('subreddit', '==', subreddit).limit(10);
    const unsub = query.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data(), };
      });
      setDocs(documents);
    });
    return () => unsub();
  }, [collection, subreddit])

  return [docs];
}

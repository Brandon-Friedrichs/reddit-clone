import React, {useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { firestore } from '../firebase';
import { ArrowUpSquare, ArrowDownSquare } from 'react-bootstrap-icons';

export default function VoteOnPost({ postData, postId }) {
  const { currentUser } = useAuth();
  const [score, setScore] = useState(0);
  const [currentVote, setCurrentVote] = useState(0);
  
  useEffect(() => {
    const scoreRef = firestore.collection('posts').doc(postId).collection('votes');
    const unsub = scoreRef.onSnapshot((snapshot) => {
      const votes = snapshot.docs.map((doc) =>{
        return { ...doc.data() };
      });
      const upVotes = votes.map(a => a.vote).reduce((a, b) => a + b, 0);
      setScore(upVotes);

      if (currentUser) {
        const hasVoted = votes.some(item => item.user === currentUser.email);
        if (hasVoted) {
          const userScore = votes.find(item => item.user === currentUser.email).vote;
          setCurrentVote(userScore);
        }
      }
    })
    return () => unsub()
  }, [postId, currentUser])

  function voteUp() {
    if (currentUser) {
      if (currentVote === 1) {
        removeVote();
      } else {
        firestore.collection('posts').doc(postId).collection('votes').doc(currentUser.email).set({
          user: currentUser.email,
          vote: +1
        });
      }
    } else {
      alert('You need to be logged in to vote on a post');
    }
  }

  function voteDown() {
    if (currentUser) {
      if (currentVote === -1) {
        removeVote();
      } else {
        firestore.collection('posts').doc(postId).collection('votes').doc(currentUser.email).set({
          user: currentUser.email,
          vote: -1
        });
      }
    } else {
      alert('You need to be logged in to vote on a post');
    }
  }

  function removeVote() {
    firestore.collection('posts').doc(postId).collection('votes').doc(currentUser.email).delete().then(() => {
      console.log('Document deleted successfully');
      setCurrentVote(0)
    }).catch((error) => {
      console.error('Error deleteing document')
    });
  }

  return (
    <div className='vote-container'>
      <h3 className={currentVote === 1 ? 'vote-btn up active' : 'vote-btn up'} onClick={voteUp}>
        <ArrowUpSquare />
      </h3>
      <span className='vote-score' >
        {score}
      </span>
      <h3 className={currentVote === -1 ? 'vote-btn down active' : 'vote-btn down'} onClick={voteDown}>
        <ArrowDownSquare />
      </h3>
    </div>
  )
}

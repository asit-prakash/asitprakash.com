import { NextPage } from "next";
import { useEffect, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import dynamic from "next/dynamic";
import Image from 'next/image'
import styles from '../styles/Home.module.css';

const Go: NextPage = () => {
  const [noButtonMoving, setNoButtonMoving] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({
    top: 0,
    left: 0,
  });
  const { width, height } = useWindowSize();
  const [sheSaidYes, setSheSaidYes] = useState(false);
  const [noButtonText, setNoButtonText] = useState("No :(")

  useEffect(() => {
    fetch('/api/log?data=Page opened');
    console.log('Page opened')
  },[])

  const handleYesClick = () => {
    setSheSaidYes(true);
    fetch('/api/log?data=Simi said yes to meet');
    console.log("Simi said yes to meet");
  };

  const handleNoHover = () => {
    setNoButtonMoving(Math.random());
  };

  const handleNoClick = () => {
    fetch('/api/log?data=Simi said no to meet');
    console.log("Simi said no to meet");
  };

  const handleYesHover = () => {
    fetch('/api/log?data=yes');
    console.log('hovered on yes');
  }

  const handleMouseEnterForNo = () =>{
    setNoButtonText('shhh')
  }

  const handleMouseLeaveForNo = () =>{
    setTimeout(() => {
      setNoButtonText('No :(')
    }, 1000);
  }

  useEffect(() => {
    if (noButtonMoving) {
      fetch('/api/log?data=hovered on no');
      console.log('hovered on no');
      setNoButtonPosition({
        top: Math.random() * window.innerHeight,
        left: Math.random() * window.innerWidth,
      });
    }
  }, [noButtonMoving]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h3 style={{
    wordWrap: 'break-word', // Allows long words to be broken and wrap onto the next line
    fontSize: '24px', // Default font size
    textAlign: 'center',
    maxWidth: '600px', // Set a maximum width to prevent excessive stretching on larger screens
    margin: '20px', // Add some margin for better spacing
  }}>
   {!sheSaidYes ? `Don't be bored this weekend, let's go out.. You up?` : "See you soon!"}
  </h3>
  {sheSaidYes ? <div>
    <Image className={styles.image} src="/b-g.png" alt="" width={300} height={300}  />
  </div> :  null}
  {!sheSaidYes ? (
    <div style={{ display: 'flex',alignItems: 'center' }}>
      <button
        onMouseOver={handleYesHover}
        style={{
          padding: '10px',
          margin: '5px',
          backgroundColor: '#4CAF50', /* Green */
          border: 'none',
          color: 'white',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '16px',
          cursor: 'pointer',
          borderRadius: '5px',
        }}
        onClick={handleYesClick}
      >
        Yes :)
      </button>
      <button
        onMouseEnter={handleMouseEnterForNo}
        onMouseLeave={handleMouseLeaveForNo}
        onMouseOver={handleNoHover}
        onClick={handleNoClick}
        style={{
          padding: '10px',
          margin: '5px',
          backgroundColor: '#f44336', /* Red */
          border: 'none',
          color: 'white',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '16px',
          cursor: 'pointer',
          borderRadius: '5px',
          ...(noButtonMoving ? {
             position: 'absolute',
          top: `${noButtonPosition.top}px`,
          left: `${noButtonPosition.left}px`,
          transition: 'top 0.5s ease, left 0.5s ease', // Smooth transition
          } : {})
        }}
      >
       {noButtonText}
      </button>
    </div>
  ) : (
    <p>Text me :)</p>
  )}

  {sheSaidYes ? (
    <Confetti
      run
      recycle
      numberOfPieces={600}
      wind={0}
      gravity={0.2}
      opacity={100}
      width={width}
      height={height}
    />
  ) : null}

  <p>The universe took its time on you 🌱</p>
</div>

  );
};

export default dynamic(() => Promise.resolve(Go), {
  ssr: false,
});

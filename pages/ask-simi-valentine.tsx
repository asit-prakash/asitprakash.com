import { NextPage } from "next";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Go: NextPage = () => {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const yesButtonSize = noCount * 20 + 16;
  const { width, height } = useWindowSize();

  useEffect(() => {
    fetch("/api/log?data=Page opened valentine");
  }, []);

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    fetch("/api/log?data=no for valetine");
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Give it another thought!",
      "Are you sure?",
      "Really sure?",
      "Think again, seriously!",
      "Don't rush!",
      "Surely not, reconsider!",
      "You might regret this!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "Have a heart!",
      "Don't be so cold-hearted!",
      "A change of heart, perhaps?",
      "Wouldn't you reconsider? I care about you!",
      "Is that your final answer?",
      "You're breaking my heart ;(",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {yesPressed ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3h3M3A2OXRvM2plNzdoZHM3Z3ZpdmoxcHZyNDcxYml4NTc2ZWhrZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEhmDMA4r9GxhwEqA/giphy.gif"
            alt="together"
            width={500}
            height={300}
          />
          <h2>yayyy!!!</h2>
        </>
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image
            className={styles.cat}
            src="https://media.giphy.com/media/1QfjQKX3fZ7lgrGOiE/giphy.gif?cid=790b7611ffiyclg3feedc3ttx57tnxmqdzflew56fw9hq2m3&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            width={400}
            height={300}
            alt="cat"
          />
          <h1 className="text-4xl my-4">Will you be my Valentine?</h1>
          <div>
            <button
              style={{
                padding: "10px",
                margin: "5px",
                backgroundColor: "#4CAF50" /* Green */,
                border: "none",
                color: "white",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                cursor: "pointer",
                borderRadius: "5px",
                fontSize: yesButtonSize,
              }}
              onClick={() => {
                fetch("/api/log?data=yes for valentine");
                setYesPressed(true);
              }}
            >
              Yes
            </button>
            <button
              onClick={handleNoClick}
              style={{
                padding: "10px",
                margin: "5px",
                backgroundColor: "#f44336" /* Red */,
                border: "none",
                color: "white",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "16px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              {noCount === 0 ? "No" : getNoButtonText()}
            </button>
          </div>
        </>
      )}
      {yesPressed ? (
        <Confetti
          run
          recycle
          numberOfPieces={200}
          wind={0}
          gravity={0.1}
          opacity={100}
          width={width}
          height={height}
          drawShape={(ctx) => {
            ctx.beginPath();
            for (let i = 0; i < 22; i++) {
              const angle = 0.35 * i;
              const x = 16 * Math.pow(Math.sin(angle), 3);
              const y =
                13 * Math.cos(angle) -
                5 * Math.cos(2 * angle) -
                2 * Math.cos(3 * angle) -
                Math.cos(4 * angle);
              ctx.lineTo(x, y);
            }
            ctx.fillStyle = "red"; // Set the fill color to red
            ctx.fill(); // Fill the heart with red color
            ctx.closePath();
          }}
        />
      ) : null}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Go), {
  ssr: false,
});

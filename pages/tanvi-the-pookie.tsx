import { NextPage } from "next";
import { useEffect, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Go: NextPage = () => {
  const { width, height } = useWindowSize();

  useEffect(() => {
    fetch("/api/log?data=Page_opened");
    console.log("Page opened");
  }, []);

  const handleAudioHover = () => {
    fetch("/api/log?data=hover_over_audio");
    console.log("hover_over_audio");
  };

  const handleMainInstaHover = () => {
    fetch("/api/log?data=hover_over_main_insta");
    console.log("hover_over_main_insta");
  };

  const handleSecInstaHover = () => {
    fetch("/api/log?data=hover_over_sec_insta");
    console.log("hover_over_sec_insta");
  };

  const handleTextHover = () => {
    fetch("/api/log?data=hover_over_text");
    console.log("hover_over_text");
  };

  const handleMainInstaClick = (event: any) => {
    fetch("/api/log?data=main_insta_click");
    console.log("main_insta_click");
  };

  const handleSecInstaClick = (event: any) => {
    fetch("/api/log?data=sec_insta_click");
    console.log("sec_insta_click");
  };

  const handleAudioPlay = () => {
    fetch("/api/log?play");
    console.log("play");
  };

  const handleAudioPause = () => {
    fetch("/api/log?pause");
    console.log("pause");
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
      <Image
        className={styles.image}
        src="/b-g.png"
        alt=""
        width={300}
        height={300}
      />
      <audio
      onMouseEnter={handleAudioHover}
        style={{ marginTop: "10px" }}
        controls
        onPlay={handleAudioPlay}
        onPause={handleAudioPause}
      >
        <source
          src="https://firebasestorage.googleapis.com/v0/b/go-bucket.appspot.com/o/Madhubala.m4a?alt=media&token=d22b56ac-4938-4710-922d-d264d4518e89"
          type="audio/mp3"
        />
      </audio>
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

      <p onMouseEnter={handleTextHover}>Hey Tanvi 🎀, hope you liked it :) {`What's a song that you can't stop playing lately?`}</p>
      <p>
        IG:{" "}
        <a
          style={{ color: "blue" }}
          target="_blank"
          rel="noreferrer"
          href="https://www.instagram.com/asit.prakash/"
          onClick={handleMainInstaClick}
          onMouseEnter={handleMainInstaHover}
        >
          @asit.prakash
        </a>
        <a
          style={{ color: "blue", marginLeft: "10px" }}
          target="_blank"
          rel="noreferrer"
          href="https://www.instagram.com/nomadtapes/"
          onClick={handleSecInstaClick}
          onMouseEnter={handleSecInstaHover}
        >
          @nomadtapes
        </a>
      </p>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Go), {
  ssr: false,
});

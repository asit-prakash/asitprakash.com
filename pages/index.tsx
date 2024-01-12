import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { FaLinkedin,FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Asit Prakash</title>
        <meta name='description' content='Asit Prakash - Software Engineer' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>

        <p className={styles.description}>Asit Prakash - Sr. Software Engineer</p>
        <div style={{
          display:'flex',
          justifyContent:'center',
          alignItems: 'center',
        }}>

        <a
          href='https://www.linkedin.com/in/asitprakash/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaLinkedin size={30} />
        </a>
        <a
          href='https://github.com/asit-prakash'
          target='_blank'
          rel='noopener noreferrer'
          style={{marginLeft:'20px'}}
        >
          <FaGithub  size={30} />
        </a>
        <a
          href='https://twitter.com/asitprksh'
          target='_blank'
          rel='noopener noreferrer'
          style={{marginLeft:'20px'}}
        >
          <FaXTwitter  size={30} />
        </a>
        </div>
      </main>
    </div>
  );
};

export default Home;

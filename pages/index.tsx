import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Asit Prakash</title>
        <meta name='description' content='Asit Prakash - Frontend Engineer' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>asitprakash.com</h1>

        <p className={styles.description}>Asit Prakash - Frontend Engineer</p>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://www.linkedin.com/in/asitprakash/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Linkedin
        </a>
        <a
          href='https://github.com/asit-prakash'
          target='_blank'
          rel='noopener noreferrer'
        >
          Github
        </a>
        <a
          href='https://twitter.com/asitprksh'
          target='_blank'
          rel='noopener noreferrer'
        >
          Twitter
        </a>
      </footer>
    </div>
  );
};

export default Home;

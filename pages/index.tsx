import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ImpactStrip from '../components/ImpactStrip';
import ChatPromptBar from '../components/ChatPromptBar';
import Expertise from '../components/Expertise';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';

export default function Home() {
  return (
    <>
      <Head>
        <title>Asit Prakash — Senior Software Engineer</title>
        <meta
          name="description"
          content="Asit Prakash — Senior Software Engineer building AI & LLM Training Platforms. 6+ years of full-stack experience with React, TypeScript, Node.js, and NestJS."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Asit Prakash — Senior Software Engineer"
        />
        <meta
          property="og:description"
          content="Building AI & LLM Training Platforms. Full-stack engineer with 6+ years of experience."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Asit Prakash — Senior Software Engineer"
        />
      </Head>

      <Navbar />

      <main>
        <Hero />
        <ImpactStrip />
        <ChatPromptBar />
        <Expertise />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
      <ChatBot />
    </>
  );
}

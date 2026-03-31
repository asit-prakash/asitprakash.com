import { Html, Head, Main, NextScript } from 'next/document';

const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (t === 'light') return;
    if (t === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  } catch(e){}
})();
`;

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head />
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

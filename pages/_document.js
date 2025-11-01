import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="ConnectHub - Platform komunitas dan event" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
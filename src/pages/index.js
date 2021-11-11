import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>blockbase</title>
        <meta name="description" content="lightweight ethereum blockchain explorer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        This is blockbase
      </main>
    </div>
  );
};

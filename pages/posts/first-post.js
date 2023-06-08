import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Script from 'next/script';

import Layout from '../../components/layout';

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <Script
        src='https://connect.facebook.net/en_US/sdk.js'
        strategy='lazyOnload'
        onLoad={() => console.log(`Все ок`)}
        onError={() => console.log(`Обасрутушки. Без VPN не работает`)}
      />
      <h1>First Post</h1>
      <h2>
      <Image
        priority
        src="/images/profile.jpg"
        height={200}
        width={200}
        alt='Your name'
      />
        <Link href={'/'}>Back to home</Link>
      </h2>
    </Layout>
  )
}
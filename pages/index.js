import { getSortedPostData } from '../lib/posts';

import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Date from '../components/data';

import Link from 'next/link';

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi! I am Bo</p>
        <p>
          Это простое приложение, сделаное по статье на Next.js Learn
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      
      {/* Новая часть */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <Date dateString={date}/>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostData();
  return {
    props: {
      allPostsData,
    }
  }
}

/* export async function getServerSideProps(context) {
  return {
    props: {
      // Пропсы для компонента
    }
  }
} */

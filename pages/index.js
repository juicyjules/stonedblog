import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Date from '../components/date'
import { getSortedPostsData } from '../lib/posts'
import Layout, {siteTitle} from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import BlogpostInfo from '../components/blogpost'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <p>
        Hello there.
        Geb hier meinen Saft (Senf) zu verschiedensten Sachen ab.
        Der Blog wurde mit ganz viel Liebe, Next.js und SSR gebaut.
      </p>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Posts</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map((post) => (
            <BlogpostInfo key={post.id} post={post}/>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

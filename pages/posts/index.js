import Link from "next/link"
import Head from "next/head"
import Layout, { siteTitle } from "../../components/layout"
import styles from "../../styles/Posts.module.css"
import utilStyles from "../../styles/utils.module.css"
import BlogpostInfo from "../../components/blogpost"

import {
    getSortedPostsData,
} from '../../lib/posts'

export async function getStaticProps({}) {
    const posts = getSortedPostsData()
    return {
        props: {
            posts
        }
    }
}


export default function Posts({ posts }){
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <h1 className={utilStyles.headingXl}>Posts</h1>
            <section className={utilStyles.headingMd}>
            <ul className={utilStyles.list}>
                {posts.map((post) => (
                    <BlogpostInfo post={post}/>
                ))}
            </ul>
        </section>
        </Layout>
    )
}
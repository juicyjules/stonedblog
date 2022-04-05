import Date from './date'
import Link from 'next/link'
import styles from '../styles/Posts.module.css'
import utilStyles from '../styles/utils.module.css'

export default function BlogpostInfo({ post }){
    return (
        <Link href={`/posts/${post.id}`}>
            <li className={`${utilStyles.listItem} ${styles.postentry}`} key={post.id}>
                <a>{post.title}</a>
                <br />
                <small className={utilStyles.lightText}>
                    <Date dateString={post.date} />
                </small>
            </li>
        </Link>
    )
}
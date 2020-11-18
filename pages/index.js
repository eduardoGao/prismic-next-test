import Link from 'next/link'
import Prismic from 'prismic-javascript'
import { RichText, Date } from 'prismic-reactjs'
import { client, linkResolver, hrefResolver } from '../prismic-configuration'

export async function getServerSideProps() {
  const home = await client.getSingle('blog_home')

  const posts = await client.query(
    Prismic.Predicates.at('document.type', 'post'),
    { orderings: '[my.post.date desc]' }
  )

  return { props: { home, posts } }
}

const Home = ({ home, posts }) => {
  console.log(posts)
  return (
    <div>
      <img src={home.data.image.url} alt="avatar image" />
      <h1>{RichText.asText(home.data.headline)}</h1>
      <p>{RichText.asText(home.data.description)}</p>

      <ul>
        {posts.results.map((post) => (
          <li key={post.uid}>
            {/* {RichText.render(post.data.title)} */}
            <Link href={hrefResolver(post)} as={linkResolver(post)} passHref>
              <a>{RichText.render(post.data.title)}</a>
            </Link>
            <span>{post.data.date}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home

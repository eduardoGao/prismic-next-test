import Prismic from 'prismic-javascript'
import { RichText, Date } from 'prismic-reactjs'
import { client } from '../prismic-configuration'

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
    </div>
  )
}

export default Home

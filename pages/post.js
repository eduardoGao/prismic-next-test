import Link from 'next/link'
import { RichText, Date } from 'prismic-reactjs'
import { client } from '../prismic-configuration'

export async function getServerSideProps({ query }) {
  const post = await client.getByUID('post', query.uid)

  return { props: { post } }
}

const Post = ({ post }) => {
  console.log(post)
  return(
    <div>
      {RichText.render(post.data.title)}
      <span>{Date(post.data.date).toString()}</span>
      {RichText.render(post.data.body[0].primary.text)}
    </div>
  ) 
}

export default Post

import PostFeed from '../components/PostFeed';
import Loader from '../components/Loader';
import { firestore, fromMillis, postToJSON } from '../lib/firebase';

import { useState } from 'react';

const LIMIT = 10;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, 
  };
}

export default function Home(props) { 
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);                                 
    const last = posts[posts.length - 1];             

    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

    const query = firestore                           
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)                             
      .limit(LIMIT);                                  

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);                                

    if (newPosts.length < LIMIT) {                   
      setPostsEnd(true);
    }
  };

  return (
    <main>
      
      <img src="/transparentbanner.png" alt="image"></img>
      <img src="/stonks_meme.png" alt='image'></img>
      <div className="card card-info">
        <h2> Services </h2>
        <h3> FireStonks.com is A Platform for Sharing Information </h3>
        <p>Sign up for an 👨‍🎤 account, ✍️ share due diligence, then 🔥 fire content created by other users. All public content is server-rendered and search-engine optimized.</p>
        </div>

        <div className="card card-info">
        <h2> About FireStonks.com </h2>
        <p>Any content posted on Firestonks.com reflects the opinions of only the authors who are associated persons of Firestonks.com and do not reflect the views of Firestonks.com or any of its subsidiaries or affiliates.</p>
        <p>This platform is for independent investors and stock market enthusiasts to share their thoughts, research, and opinions. Content on FireStonk.com is not provided by FireStonks.com. The Firestonks.com platform is intended for informational purposes only, any content on FireStonks.com is not intended to serve as a recommendation to buy or sell any security in a self-directed brokerage account or any other account, and are not an offer or sale of a security.</p>
        <p>Any content on FireStonks.com is also not official research reports and are not intended to serve as the basis for any investment decision. Any third-party information provided therein does not reflect the views FireStonks.com or any of their subsidiaries or affiliates. All investments involve risk and the past performance of a security or financial product does not guarantee future results or returns. </p>
        <p>Keep in mind that while diversification may help spread risk, it does not assure a profit or protect against loss. There is always the potential of losing money when you invest in securities or other financial products.</p>
        <p>Investors should consider their investment objectives and risks carefully before investing. The price of a given security may increase or decrease based on market conditions and customers may lose money, including their original investment. FireStonks.com</p>
        <p>Any content shared on FireStonks.com may not be representative of the experience of other customers and are not guarantees of future performance or success. FireStonks.com</p>
      </div>

      <PostFeed posts={posts} /> 

      {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}  

      <Loader show={loading} /> 

      {postsEnd && 'You have reached the end!'} 
    </main>
  );
}

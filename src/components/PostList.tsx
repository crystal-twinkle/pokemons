import React from 'react';
import { IPost } from '../types/models';
import styles from '../assets/PostList.module.css';
import { useAppSelector } from '../store/redux-hooks';
import Loading from './Loading';
import { useRouter } from 'next/router';

type PostListProps = {
  page: number;
  dataAll: IPost[];
};

const PostList = (props: PostListProps) => {
  const { query } = useAppSelector((state) => state.search);
  const { posts, loading, error } = useAppSelector((state) => state.pokemon);
  const { dataAll } = props;
  const router = useRouter();

  let postsCurrent: IPost[];
  if (query) {
    postsCurrent = posts;
  } else {
    postsCurrent = dataAll;
  }

  function notFound() {
    return (
      <h3 style={{ textAlign: 'center', marginTop: '50px' }}>
        No posts found!
      </h3>
    );
  }

  function mainBlock() {
    return (
      <div style={{ marginTop: '50px' }}>
        <h2 style={{ textAlign: 'center' }}>List</h2>
        <div className={styles.list}>
          {postsCurrent.map((post: IPost) => (
            <div className={styles.list__element} key={post.name}>
              <p className={styles.list__name}> {post.name}</p>
              <button
                className={styles.btnDetail}
                onClick={() => {
                  navigateDetailPage(post);
                }}
              >
                Details
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const navigateDetailPage = (post: IPost) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, id: `${post.name}` },
    });
  };

  return <>{!loading ? !error ? mainBlock() : notFound() : <Loading />}</>;
};

export default PostList;

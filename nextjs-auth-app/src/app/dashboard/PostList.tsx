// components/dashboard/PostList.tsx

import React from 'react';
import type { Post } from '@/types/post.type';
import styles from './page.module.css';

type PostListProps = {
  posts: Post[];
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

const PostList: React.FC<PostListProps> = ({ posts, page, totalPages, onPrev, onNext }) => {
  return (
    <>
      <div className="postList">
        {posts.map((post) => (
          <div key={post.id} className={styles.postCard}>
            <h3>
              {post.id}. {post.title}
            </h3>
            <p>{post.body}</p>
            <small>User ID: {post.userId}</small>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button onClick={onPrev} disabled={page === 1}>
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button onClick={onNext} disabled={page === totalPages}>
          Siguiente
        </button>
      </div>
    </>
  );
};

export default PostList;

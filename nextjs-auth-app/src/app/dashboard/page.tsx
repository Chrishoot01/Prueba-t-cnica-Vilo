'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import type { Post } from '@/types/post.type';
import styles from './page.module.css';

import PostFilters from './PostFilters';
import PostList from './PostList';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [userIdFilter, setUserIdFilter] = useState('');
  const [page, setPage] = useState(1);
  const [showList, setShowList] = useState(false);

  const POSTS_PER_PAGE = 10;

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(data);
      } catch (err: any) {
        setError(err.message || 'Error inesperado al obtener los posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase());
      const matchesUser = userIdFilter ? post.userId === Number(userIdFilter) : true;
      return matchesSearch && matchesUser;
    });
  }, [posts, search, userIdFilter]);

  const paginatedPosts = filteredPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const resetFilters = () => {
    setSearch('');
    setUserIdFilter('');
    setPage(1);
  };

  if (!user) return null;

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.header}>
        <h1>Bienvenido, {user}</h1>
        <button onClick={logout} className={styles.logoutBtn}>
          Cerrar sesión
        </button>
      </div>

      {!showList && (
        <button className={styles.showListBtn} onClick={() => setShowList(true)}>
          Listado de Post
        </button>
      )}

      {showList && (
        <div className={styles.postsSection}>
          <h2>Listado de Post</h2>

          <PostFilters
            search={search}
            onSearchChange={setSearch}
            userIdFilter={userIdFilter}
            onUserIdChange={setUserIdFilter}
            onReset={resetFilters}
            userIds={[...new Set(posts.map((p) => p.userId))]}
          />

          {loading && <p className={styles.status}>Cargando posts...</p>}
          {error && <p className={styles.error}>{error}</p>}
          {!loading && !error && filteredPosts.length === 0 && (
            <p className={styles.status}>No se encontraron resultados con los filtros actuales.</p>
          )}

          {!loading && !error && filteredPosts.length > 0 && (
            <PostList
              posts={paginatedPosts}
              page={page}
              totalPages={totalPages}
              onPrev={() => setPage((p) => Math.max(p - 1, 1))}
              onNext={() => setPage((p) => Math.min(p + 1, totalPages))}
            />
          )}
        </div>
      )}
    </div>
  );
}



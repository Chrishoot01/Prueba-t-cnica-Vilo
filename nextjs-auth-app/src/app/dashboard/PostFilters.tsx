// components/dashboard/PostFilters.tsx

import React from 'react';
import styles from './page.module.css';

type PostFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  userIdFilter: string;
  onUserIdChange: (value: string) => void;
  onReset: () => void;
  userIds: number[];
};

const PostFilters: React.FC<PostFiltersProps> = ({
  search,
  onSearchChange,
  userIdFilter,
  onUserIdChange,
  onReset,
  userIds,
}) => {
  return (
    <div className={styles.filters}>
      <input
        type="text"
        placeholder="Buscar por título o cuerpo"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        value={userIdFilter}
        onChange={(e) => onUserIdChange(e.target.value)}
      >
        <option value="">Todos los usuarios</option>
        {userIds.map((id) => (
          <option key={id} value={id}>
            Usuario {id}
          </option>
        ))}
      </select>
      <button type="button" className={styles.resetBtn} onClick={onReset}>
        Resetear filtros
      </button>
    </div>
  );
};

export default PostFilters;

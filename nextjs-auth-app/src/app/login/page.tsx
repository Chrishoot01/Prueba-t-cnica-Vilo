'use client';

import type { ILoginItem } from '@/types/login.type';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { useAuth } from '@/context/AuthContext';
import { FaUser, FaSpinner } from 'react-icons/fa';

export default function LoginPage() {
  const [data, setData] = useState<ILoginItem>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    if (data.email === 'test@example.com' && data.password === '123456') {
      setError(null);
      setIsLoading(true);

      //Tiempo de carga, loading
      setTimeout(() => {
        login(data.email);
        router.push('/dashboard');
      }, 2500); 
    } else {
      setIsLoading(false);
      setError('Credenciales incorrectas. Intenta nuevamente.');
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.waveBackground}></div>
      <div className={styles.loginCard}>
        <div className={styles.avatarIcon}>
          <FaUser />
        </div>
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          {error && <p className={styles.errorMessage}>{error}</p>}

          <button
            type="submit"
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.loadingContent}>
                Cargando
                <FaSpinner className={styles.spinner} />
              </span>
            ) : (
              'INGRESAR'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

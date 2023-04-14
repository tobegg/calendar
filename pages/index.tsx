/* import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { useEffect } from 'react';
import { fetchUsers } from '@/store/actions/userActions'; */
import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import UsersContainer from '@/components/TaskContainer';
import Calendar from '@/components/Calendar';

export default function Home() {
  /* const dispatch = useAppDispatch();
  const { users, isLoading, error } = useAppSelector(state => state.userReducer);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []); */


  return (
    <>
      <Head>
        <title>Calendar</title>
        <meta name="description" content="home work" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Calendar />
      </main>
    </>
  )
}

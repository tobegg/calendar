import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import dynamic from 'next/dynamic';

const CalendarWithNoSSR = dynamic(
  () => import('@/components/Calendar'),
  { ssr: false }
)

export default function Home() {
  return (
    <>
      <Head>
        <title>Calendar</title>
        <meta name="description" content="home work" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <CalendarWithNoSSR />
      </main>
    </>
  )
}

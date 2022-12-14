import '../styles/globals.css';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  const [bookList, setBookList] = useState([]);

  const displayBookCount = useCallback(async () => {
    const bookCountResponse = await fetch('../api/books');

    const bookCountResponseBody = await bookCountResponse.json();

    setBookList(bookCountResponseBody);
  }, []);

  useEffect(() => {
    displayBookCount().catch(() => console.log('fetch fails'));
    console.log('Use Effect try');
  }, [displayBookCount]);

  return (
    <Layout bookList={bookList} setBookList={setBookList}>


      <Component
        bookList={bookList}
        setBookList={setBookList}
        displayBookCount={displayBookCount}
        {...pageProps}
      />
    </Layout>
  );
}

export default MyApp;

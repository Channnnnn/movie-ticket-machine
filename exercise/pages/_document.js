import Document, { Head, Main, NextScript } from 'next/document';
import Navbar from '../components/Navbar';

export default class MyDocument extends Document {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <html>
        <Head>
          <title>Movie Ticket Machine - ระบบซื้อตั๋วหนังออนไลน์</title>
          <link rel="stylesheet" href="/_next/static/style.css"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Prompt:400,400i,600,600i" />
        </Head>
        <body>
          <Navbar />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
};
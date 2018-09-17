import Document, {Head,Main,NextScript} from 'next/document';
import Navbar from '../components/Navbar';
import {init as initFirebase} from '../javascript/firebase'

export default class MyDocument extends Document {
  constructor(props){
    super(props);
    initFirebase();
  }
  render() {
    return (
      <html>
        <Head>
          <title>Movie Ticket Machine - ระบบซื้อตั๋วหนังออนไลน์</title>
          <link rel="stylesheet" href="/_next/static/style.css"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Prompt:300,400,400i,700" />
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
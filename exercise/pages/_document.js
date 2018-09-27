import Document, { Head, Main, NextScript } from 'next/document';

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
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
};
import Document, { Head, Main, NextScript, Html } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="id">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className="antialiase bg-gray-200">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

import Document, { Head, Main, NextScript, Html } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="id">
        <Head />
        <body className="antialiase max-w-md mx-auto bg-gray-200">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

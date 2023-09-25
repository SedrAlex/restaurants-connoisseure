import  Document,{ Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
          rel="preload" 
           href="/fonts/Caveat-Bold.ttf"
           as="font"
           crossOrigin="anonymous"
           >
           </link>
          <link 
           rel="preload" 
           href="/fonts/Caveat-Regular.ttf"
           as="font"
           crossOrigin="anonymous"
          >
            </link>
          <link  
          rel="preload" 
           href="/fonts/Caveat-SemiBold.ttf"
           as="font"
           crossOrigin="anonymous"
          >
            </link>
          </Head>
        <body>
          <Main> </Main>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument
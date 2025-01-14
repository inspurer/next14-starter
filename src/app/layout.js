import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

const inter = Inter({ subsets: ['latin'] })

import { ProxyAgent, setGlobalDispatcher } from "undici";

if (process.env.http_proxy) {
  const dispatcher = new ProxyAgent({ uri: new URL(process.env.http_proxy).toString() });
  setGlobalDispatcher(dispatcher);
}


export const metadata = {
  title: {
    default: "Next App HomePage",
    template: "%s | Next App"
  },
  description: "Next.js starter app",

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6877569709040311"
          crossorigin="anonymous"></script>
      </head>
      <body className={inter.className}>
        <div className='container'>
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
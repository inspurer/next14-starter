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
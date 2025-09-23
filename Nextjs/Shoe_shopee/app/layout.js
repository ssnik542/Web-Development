import { Inter } from 'next/font/google'
import './globals.css'
import MainWrapper from '../components/MainWrapper'


const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: 'Shoe Shopee',
  description: 'shoes site where you can buy amazing shoes like nike puma ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainWrapper>
          {children}
        </MainWrapper>
      </body>
    </html>
  )
}

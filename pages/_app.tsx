import 'tailwindcss/tailwind.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from 'next-auth/client'
import React from 'react'
import SnipCart from '../components/SnipCart';

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <SnipCart>
        <Component {...pageProps} />
      </SnipCart>
    </Provider>
  )
}
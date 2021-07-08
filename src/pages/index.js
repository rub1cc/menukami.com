import HomeFooter from 'components/HomeFooter'
import HomeHeader from 'components/HomeHeader'
import DesktopLayout from 'layouts/DesktopLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'

function HeroTitle({ children, className }) {
  return (
    <h1 className={`text-3xl md:text-6xl leading-tight font-bold tracking-tight ${className}`}>
      {children}
    </h1>
  )
}

// function SectionTitle({ children, className }) {
//   return (
//     <h2
//       className={`text-2xl md:text-4xl leading-tight font-bold tracking-tight text-center ${className}`}
//     >
//       {children}
//     </h2>
//   )
// }

function SectionDescription({ children, className }) {
  return <h3 className={`text-sm md:text-xl text-gray-600 ${className}`}>{children}</h3>
}

function Hero() {
  const router = useRouter()
  return (
    <div className="bg-white">
      <DesktopLayout>
        <div className="md:flex py-12 md:max-h-screen">
          <div className="md:w-1/2 md:py-12 pr-16 md:pr-32 relative">
            <img src="/images/women-with-phone.jpeg" alt="" className="rounded-3xl" />
            <img
              src="/images/cacastore-screenshot.png"
              alt=""
              className="absolute top-0 right-0 w-32 md:w-48 mt-16 md:mt-32 transform shadow-xl rounded-xl"
            />
          </div>
          <div className="md:w-1/2 md:px-12 flex flex-col justify-center relative mt-12 md:mt-0">
            <HeroTitle>Kembangkan bisnis. Permudah pelanggan.</HeroTitle>
            <SectionDescription className="mt-8">
              Platform menu digital yang memungkinkan pelanggan memesan produkmu langsung melalui
              WhatsApp.
            </SectionDescription>
            <div className="flex items-center space-x-4 mt-8">
              <div>
                <button
                  className="flex items-center space-x-4 bg-gray-900 px-6 py-3 rounded-full text-white tracking-wider text-sm md:text-xl"
                  onClick={() => router.push('/admin')}
                >
                  <span>Buat Menu</span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </DesktopLayout>
    </div>
  )
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Menukami: Buat menu digital & terima pesanan via Whatsapp</title>
        <meta name="title" content="Menukami: Buat menu digital & terima pesanan via Whatsapp" />
        <meta
          name="description"
          content="Platform menu digital, mudah untuk disebarkan dan pelanggan dapat melakukan pesanan langsung yang akan dikirim via Whatsapp. Buat menu kamu sekarang!"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://menukami.com/" />
        <meta
          property="og:title"
          content="Menukami: Buat menu digital & terima pesanan via Whatsapp"
        />
        <meta
          property="og:description"
          content="Platform menu digital, mudah untuk disebarkan dan pelanggan dapat melakukan pesanan langsung yang akan dikirim via Whatsapp. Buat menu kamu sekarang!"
        />
        <meta property="og:image" content="https://i.imgur.com/6eYbLz2.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://menukami.com/" />
        <meta
          property="twitter:title"
          content="Menukami: Buat menu digital & terima pesanan via Whatsapp"
        />
        <meta
          property="twitter:description"
          content="Platform menu digital, mudah untuk disebarkan dan pelanggan dapat melakukan pesanan langsung yang akan dikirim via Whatsapp. Buat menu kamu sekarang!"
        />
        <meta property="twitter:image" content="https://i.imgur.com/6eYbLz2.png" />
      </Head>
      <div className="min-h-screen bg-white px-4 flex flex-col justify-between">
        <HomeHeader />
        <Hero />
        <HomeFooter />
      </div>
    </div>
  )
}

import MobileLayout from 'layouts/MobileLayout'

export default function FullScreenError() {
  return (
    <MobileLayout>
      <div className="flex flex-col w-full h-screen justify-center items-center">
        <p className="text-xl text-gray-600">Terjadi kesalahan</p>
        <a href="javacsript:history.back()" className="text-blue-500">
          ← Kembali
        </a>
      </div>
    </MobileLayout>
  )
}

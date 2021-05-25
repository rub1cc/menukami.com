import DesktopLayout from 'layouts/DesktopLayout'
import { useRouter } from 'next/router'
import React from 'react'

function HomeFooter() {
  const router = useRouter()
  return (
    <div className="py-6">
      <DesktopLayout>
        <div className="text-center">
          <small>
            <button className="underline" onClick={() => router.push('/privacy')}>
              Kebijakan Privasi
            </button>
          </small>
        </div>
        <div className="text-center">
          <small>
            &copy; 2020 <span className="font-bold">menukami.com</span>
          </small>
        </div>
      </DesktopLayout>
    </div>
  )
}

export default HomeFooter

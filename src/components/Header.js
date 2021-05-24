import MobileLayout from 'layouts/MobileLayout'

export default function Header({ title = null, leftComponent, rightComponent }) {
  return (
    <div className="flex flex-col">
      <div className="bg-white fixed inset-x-0 px-4 border z-10 h-16 items-center justify-center flex">
        <MobileLayout>
          <div className="flex justify-between py-4 items-center">
            <span className="w-1/4">{leftComponent ?? <span />}</span>
            <span>{title}</span>
            <span className="w-1/4">{rightComponent ?? <span />}</span>
          </div>
        </MobileLayout>
      </div>
      <div className="h-20">&nbsp;</div>
    </div>
  )
}

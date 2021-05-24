export default function MobileLayout({ children, className }) {
  return <div className={`max-w-md mx-auto w-full relative ${className}`}>{children}</div>
}

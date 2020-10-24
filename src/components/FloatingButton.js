export default function FloatingButton({ children, onClick }) {
  return (
    <button className="fixed bottom-0 inset-x-0 mb-4 max-w-md mx-auto" onClick={onClick}>
      <div className="flex rounded-lg text-white text-center bg-blue-500 p-4 justify-between mx-4">
        {children}
      </div>
    </button>
  )
}

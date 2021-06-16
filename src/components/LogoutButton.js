export default function LogoutButton() {
  return (
    <span className="inline-block w-full text-right">
      <a href="/api/auth/logout" className="px-2 rounded text-sm focus:outline-none">
        Logout
      </a>
    </span>
  )
}

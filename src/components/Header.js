import Link from "next/link"

function Header() {
  return (
    <Link href={"/"}>
      <h1 className="text-4xl flex font-extrabold my-5">RevoShop</h1>
    </Link>
  )
}

export default Header

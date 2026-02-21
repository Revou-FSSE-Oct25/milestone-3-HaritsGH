import Link from "next/link";

const LoginButton = () => {

  return (
    <Link 
      href={'/login'} 
      className="w-full mt-2 bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 active:bg-blue-800"
    >
      Login
    </Link>
  )
}

export default LoginButton

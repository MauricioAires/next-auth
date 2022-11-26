import { FormEvent, useState } from 'react'
import { SignInCredentials, useAuth } from '../../contexts/Auth'

export function LoginTemplate() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useAuth()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const data: SignInCredentials = {
      email,
      password
    }

    await signIn(data)
  }

  return (
    <div className="flex justify-center content-center">
      <div className="w-1/2 p-10">
        <h1 className="font-bold text-4xl font-sans">Next Auth</h1>
        <p className=" mt-1">
          Authentication and control of permissions with NextJs
        </p>

        <form onSubmit={handleSubmit} className="bg-green ">
          <h1 className="text-gray-800  font-bold text-2xl mb-1">
            Hello Again!
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
          <div className="flex items-center border-2 py-2 px-3  mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name=""
              id=""
              placeholder="Email Address"
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name=""
              id=""
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="block w-full bg-indigo-600 mt-4 py-2  text-white font-semibold mb-2"
          >
            Login
          </button>
          <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
            Forgot Password ?
          </span>
        </form>
      </div>
    </div>
  )
}

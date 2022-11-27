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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex items-center border-2 py-2 px-3  mb-4">
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
      </form>
    </div>
  )
}

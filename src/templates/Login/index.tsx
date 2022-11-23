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
    <form onClick={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Entrar</button>
    </form>
  )
}

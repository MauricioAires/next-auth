import { useEffect } from 'react'
import { useAuth } from '../../contexts/Auth'
import { api } from '../../services/api'

export function DashboardTemplate() {
  const { user } = useAuth()

  useEffect(() => {
    api.get('me').then((response) => {
      console.log(response)
    })
  }, [])

  return <h1>Dashboard : {user?.email} </h1>
}

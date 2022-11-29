import { useEffect } from 'react'
import { useAuth } from '../../contexts/Auth'
import { api } from '../../services/apiClient'

export function DashboardTemplate() {
  const { user } = useAuth()

  useEffect(() => {
    api
      .get('me')
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return <h1>Dashboard : {user?.email} </h1>
}

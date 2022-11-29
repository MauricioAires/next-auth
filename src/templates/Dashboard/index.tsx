import { useEffect } from 'react'
import { Can } from '../../components/Can'
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

  return (
    <>
      <h1>Dashboard : {user?.email} </h1>

      <Can permissions={['metrics.list']}>
        <div>Métricas</div>
      </Can>

      <Can roles={['administrator']}>
        <div>Faturamento</div>
      </Can>

      <Can roles={['super-administrator']}>
        <div>Rotas</div>
      </Can>
    </>
  )
}

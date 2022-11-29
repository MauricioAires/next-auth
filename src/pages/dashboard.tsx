import { setupAPIClient } from '../services/api'
import { DashboardTemplate } from '../templates/Dashboard'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function DashboardPage() {
  return <DashboardTemplate />
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const response = await setupAPIClient(ctx).get('/me')

  // console.log('server side', response.data)

  return {
    props: {}
  }
})

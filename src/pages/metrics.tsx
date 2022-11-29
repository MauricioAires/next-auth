import { MetricsTemplate } from '../templates/Metrics'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function DashboardPage() {
  return <MetricsTemplate />
}

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {}
    }
  },
  {
    permissions: ['metrics.list'],
    roles: ['administrator']
  }
)

import { LoginTemplate } from '../templates/Login'
import { withSSRGuest } from '../utils/withSSRGuest'

export default function LoginPage() {
  return <LoginTemplate />
}

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {}
  }
})

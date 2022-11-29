import { useAuth } from '../contexts/Auth'
import { validateUserPermissions } from '../utils/validateUserPermissions'

type UseCanParams = {
  permissions?: string[]
  roles?: string[]
}

export function useCan({ roles, permissions }: UseCanParams) {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return false
  }

  const userHasValidPermissions = validateUserPermissions({
    user,
    roles,
    permissions
  })

  return userHasValidPermissions
}

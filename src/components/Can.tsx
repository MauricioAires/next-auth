import { useCan } from '../hooks/useCan'

interface CanProps {
  children: React.ReactNode
  permissions?: string[]
  roles?: string[]
}

export function Can({ children, permissions, roles }: CanProps) {
  const userCanSeeComponent = useCan({
    roles,
    permissions
  })

  if (!userCanSeeComponent) {
    return null
  }

  return <>{children}</>
}

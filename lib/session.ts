import { cookies } from 'next/headers'
import { verifyTokenEdge } from './token'
import { prisma } from './prisma'

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('nvstudio_token')?.value
  if (!token) return null

  const payload = await verifyTokenEdge(token)
  if (!payload) return null

  return payload
}

export async function getCurrentUser() {
  const session = await getSession()
  if (!session) return null

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      subscriptions: {
        include: {
          service: true
        }
      }
    }
  })

  return user
}

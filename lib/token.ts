/**
 * Edge-compatible JWT utilities using the Web Crypto API.
 * Use this file in middleware.ts (Edge Runtime).
 * Use lib/auth.ts (jsonwebtoken) in API routes (Node.js Runtime).
 */

export interface JWTPayload {
  userId: string
  role: string
  meCode?: string
}

async function getKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder()
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  )
}

function base64UrlDecode(str: string): Uint8Array {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=')
  const binary = atob(padded)
  return Uint8Array.from(binary, c => c.charCodeAt(0))
}

export async function verifyTokenEdge(token: string): Promise<JWTPayload | null> {
  try {
    const secret = process.env.JWT_SECRET
    if (!secret) return null

    const parts = token.split('.')
    if (parts.length !== 3) return null

    const [headerB64, payloadB64, signatureB64] = parts
    const key = await getKey(secret)

    const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`)
    const signature = base64UrlDecode(signatureB64)

    const valid = await crypto.subtle.verify('HMAC', key, signature, data)
    if (!valid) return null

    const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')))

    // Check expiry
    if (payload.exp && Date.now() / 1000 > payload.exp) return null

    return { userId: payload.userId, role: payload.role, meCode: payload.meCode }
  } catch {
    return null
  }
}

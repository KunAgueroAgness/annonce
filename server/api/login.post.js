import { SignJWT } from 'jose'
import { setCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  

  if (body.login === 'admin' && body.password === 'secret') {

    const secret = new TextEncoder().encode('your-secret-key')
    const token = await new SignJWT({ userId: 1, login: body.login })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(secret)

    setCookie(event, 'auth_token', token, {
      httpOnly: true,
      maxAge: 3600, // 1 час
      path: '/',
      sameSite: 'strict'
    })
    
    return { 
      success: true,
      message: 'Авторизация успешна'
    }
  }
  
  throw createError({
    statusCode: 401,
    statusMessage: 'Неверные учетные данные'
  })
})
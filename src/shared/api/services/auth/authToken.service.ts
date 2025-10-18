import Cookies from 'js-cookie'

export const EnumTokens = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refreshToken',
}

export const getAccessToken = () => {
  const access_token = Cookies.get(EnumTokens.ACCESS_TOKEN)

  return access_token || null
}

export const saveTokenStorage = (access_token: string) => {
  Cookies.set(EnumTokens.ACCESS_TOKEN, access_token, {
    domain: import.meta.env.APP_DOMAIN,
    sameSite: 'strict',
    expires: 1
  })
}

export const removeFromStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN)
}
import Cookies from 'js-cookie'

export function setUserInfo(data) {
  Cookies.set('account', data.account)
  Cookies.set('name', data.name)
  Cookies.set('roles', data.roles)
  Cookies.set('UD', data)
}

export function getUserInfo(N) {
  return Cookies.get(N)
}
export function getUserName(M) {
  return Cookies.get(M)
}

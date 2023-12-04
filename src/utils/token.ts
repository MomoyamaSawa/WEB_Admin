// 封装本地 token 存取读取方法
import Cookies from 'js-cookie'

export const setToken = (token: string | null) => {
    Cookies.set('TOKEN', token)
}

export const getToken = (): string => {
    return Cookies.get('TOKEN')
}

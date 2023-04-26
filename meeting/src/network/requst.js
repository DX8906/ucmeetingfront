import axios from 'axios'
import router from '../router'

export function request(config) {

  const req = axios.create({
    // baseURL: 'http://101.43.149.252:8080',
    // baseURL: 'http://127.0.0.1:8080',
    baseURL: 'http://210.42.122.174:8080',
    timeout: 10000
  })

  // 将所有的网络请求头都带上本地存储的 Token
  req.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.token = token
    return config
  })

  req.interceptors.response.use(response => {
    // if(response.data.code===0){
    //     router.push('/login');
    // }
    if(response.headers['content-disposition']){
      return response;
    }
    if(response.data.code===0){
      if(response.data.msg==="NOT_LOGIN"){
        router.push('/login');
      }
      alert(response.data.msg);
    }
    // const token = response.headers.authorization
    // if (token) {
    //   localStorage.setItem('authorization', token)
    // } else {
    //   localStorage.removeItem('authorization')
    //   router.push('/login')
    // }
    return response
  })

  return req(config)
}
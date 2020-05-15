import axios from 'axios'

const baseURL = 'https://challenge.thef2e.com/api/thef2e2019/stage6';
const token = '1SROjHz7pTcLsiaAUwEJzAnfJU0XVvQ95Gy1R1QEDYWgL7Bm5AbNXtuZT3c4';
const instance = axios.create({
  baseURL,
  Accetp: 'application/json',
  'Content-type': 'application/json',
  headers: {
    Authorization: `Bearer ${ token }` 
  },
})
export default instance
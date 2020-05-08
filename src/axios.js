// axios
import axios from 'axios'

const domain = "http://demo.loc";

export default axios.create({
    baseURL: domain,
    timeout: 100000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
})

import axios from 'axios'

const apiCaller = async (method, url) => {
  console.log(method, url, 'apiCaller');
  try {
    const results = await axios({ method, url })
    return results
  } catch (e) {
    console.log(e, 'e');
  }
}
export default apiCaller

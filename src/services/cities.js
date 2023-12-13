import axios from 'axios'

/**
 * JSON Server
 * @type {string}
 */

const baseUrl = 'http://localhost:3001/cities'

const getAll = async () => {
  const result  = { data: false }

  try {
    const response = await axios.get(baseUrl)

    if (response.data) {
      result.data = response.data
    }
  } catch (e) {
    console.log(`Caught: ${e}`);
  }

  return result
}

export default { getAll }

import nodeFetch from 'node-fetch'

const fetchWrapper = async (url: string) => {
  let response
  if (process.env.NODE_ENV === 'development') response = await nodeFetch(url)
  else response = await nodeFetch(url)
  return await response.json()
}

export { fetchWrapper }

import nodeFetch from 'node-fetch'

const fetchWrapper = async (url: string) => {
  let response
  if (process.env.NODE_ENV === 'development') response = await nodeFetch(url)
  else response = await fetch(url)
  return await response.json()
}

const fetchPostWrapper = async (url: string, options: any) => {
  let response
  if (process.env.NODE_ENV === 'development')
    response = await nodeFetch(url, options)
  else response = await fetch(url, options)
  return await response.json()
}

export { fetchWrapper, fetchPostWrapper }

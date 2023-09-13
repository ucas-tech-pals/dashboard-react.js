// DONE REVIEWING: GITHUB COMMIT 🔓
/* eslint no-console: "off" */
export const localStorageTokenKey = "TOKEN"
export const localStorageUserKey = "USER"

export const client = async function client(url, options = {}) {
  const token = localStorage.getItem(localStorageTokenKey)
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }

  if (token) headers.Authorization = `Bearer ${token}`

  const config = {
    method: "GET",
    headers: {...headers}
  }

  if (options.method) config.method = options.method
  if (options.headers)
    if (options.formData) config.headers = options.headers
    else config.headers = {...config.headers, ...options.headers}
  if (options.body) config.body = options.body

  let response = null
  try {
    response = await fetch(
      !/^(https?:)?\/\//.test(url)
        ? `https://ucertified.5pal.com/api/${url}`
        : url,
      config
    )
  } catch (error) {
    // When Fetch API throws errors
    // e.g. TypeError: Failed to fetch API resource
    console.log("CATCH ERROR:", error)
  }

  // When response status code represents errors
  if (response)
    if (!response.ok) {
      console.log("RESPONSE ERROR:", response)
    } else {
      console.log("RESPONSE OKAY:", response)

      try {
        const json = await response.json()
        return json
      } catch (error) {
        // When response JSON throws errors
        console.log("RESPONSE JSON ERROR:", error)
      }
    }
}

export default client

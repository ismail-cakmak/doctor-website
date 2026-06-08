const baseUrl = import.meta.env.BASE_URL || "/"
const normalizedBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`
const absoluteUrlPattern = /^(?:[a-z][a-z\d+\-.]*:|\/\/)/i

export const publicAsset = (path) => {
  if (!path || absoluteUrlPattern.test(path) || path.startsWith("data:") || path.startsWith("blob:")) {
    return path
  }

  if (path.startsWith(normalizedBaseUrl)) {
    return path
  }

  return path.startsWith("/")
    ? `${normalizedBaseUrl}${path.slice(1)}`
    : `${normalizedBaseUrl}${path}`
}

export const appPath = (path = "/") => {
  if (!path || absoluteUrlPattern.test(path)) {
    return path
  }

  if (normalizedBaseUrl === "/") {
    return path.startsWith("/") ? path : `/${path}`
  }

  const baseWithoutTrailingSlash = normalizedBaseUrl.replace(/\/$/, "")
  return path.startsWith("/")
    ? `${baseWithoutTrailingSlash}${path}`
    : `${normalizedBaseUrl}${path}`
}

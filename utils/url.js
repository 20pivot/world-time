const setQueryParam = (name, value) => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  urlSearchParams.set(name, value)
  const queryParams = urlSearchParams.toString()
  window.history.replaceState( {} , '', window.location.origin + window.location.pathname + '?' + queryParams);
}

const getQueryParam = (name) => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  return urlSearchParams.get(name)
}

const setQueryParamAsArray = (name, ...values) => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  urlSearchParams.delete(name)
  values.forEach((value) => urlSearchParams.append(name, value))
  const queryParams = urlSearchParams.toString()
  window.history.replaceState( {} , '', window.location.origin + window.location.pathname + '?' + queryParams);
}

const getQueryParamAsArray = (name) => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  return urlSearchParams.getAll(name) || []
}
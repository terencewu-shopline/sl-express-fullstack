const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

export const fetch = (url = '', opts = {}) => {
  return async (body, callOpts = {}) => {
    let res;
    let payload;

    try {
      res = await window.fetch(callOpts?.url || url, {
        credentials: "include",
        body: callOpts?.body ? JSON.stringify(callOpts.body) : body ? JSON.stringify(body) : undefined,
        ...opts,
        ...callOpts,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', // so that express.js req.xhr will work
            'X-CSRF-Token': token,
            // 'X-Shopline-Session-Token': sessionToken,
            ...opts.headers,
            ...callOpts.headers,
        },
      })

      payload = await res.json()

      return {
        payload,
        status: res.status,
        res,
      }
    } catch (e) {
      throw e
    }
  }
}

import { appBridge } from "../lib/appBridge";

export const fetch = (url = '', opts = {}) => {
  return async (body, callOpts = {}) => {
    let res;
    let payload;

    try {
      const client = await appBridge.getClient()
      const sessionToken = await client.getSessionToken()

      res = await window.fetch(callOpts?.url || url, {
        credentials: "include",
        body: callOpts?.body ? JSON.stringify(callOpts.body) : body ? JSON.stringify(body) : undefined,
        ...opts,
        ...callOpts,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', // so that express.js req.xhr will work
            'X-Shopline-Session-Token': sessionToken,
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

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

const fetch = (url, opts = {}) => {
    return window.fetch(url, {
        credentials: "include",
        ...opts,
        headers: {
            ...opts.headers,
            'X-Requested-With': 'XMLHttpRequest', // so that express.js req.xhr will work
            'X-CSRF-Token': token,
        },
    })
}

export default fetch;

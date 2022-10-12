import { useCallback, useEffect, useState } from "react";
import fetch from "../utils/fetch";

const useRequest = (url, { manual = false, then, catch: _catch, ...opts } = {}) => {
    const [payload, setPayload] = useState({})
    const [loading, setLoading] = useState(false)

    const makeRequest = async (body) => {
        setLoading(true)
        try {
            const res = await fetch(url, {
                body: body ? JSON.stringify(body) : undefined,
                ...opts,
            })
            const payload = await res.json()
            setPayload(payload)
            then?.(res)
        } catch(e) {
            _catch?.(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        !manual ? makeRequest() : null
    }, [manual, url])

    return {
        payload,
        loading,
        reload: () => makeRequest(), // by default no body passed
        call: makeRequest,
    }
}

export default useRequest;

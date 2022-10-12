import { useEffect, useState } from "react";
import fetch from "../utils/fetch";

const useRequest = (url, opts = {}) => {
    const [payload, setPayload] = useState({})
    const [loading, setLoading] = useState(true)

    const makeRequest = async () => {
        setLoading(true)
        try {
            const res = await fetch(url, opts)
            const payload = await res.json()
            setPayload(payload)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        makeRequest()
    }, [url])

    return {
        payload,
        loading,
        reload: makeRequest,
    }
}

export default useRequest;

// import { Client } from "opennms";

// // Initialize the client once
// const client = new Client();

// // You can pre-configure the connection here
// // Since we're skipping the Login Page, we hardcode dev credentials
// const ONMS_URL = window.location.origin + "/opennms";

// export const getOnmsClient = async () => {
//   if (!client.server) {
//     await client.connect("PulseMonitor", ONMS_URL, "admin", "admin");
//   }
//   return client;
// };

// export { client };


// import {Client} from "opennms"
// const client = new Client()

// const CONN_URL = window.location.origin + "/opennms"

// export const getClient = async () => {
//     if(!client.server){
//         await client.connect("PulseMonitor", CONN_URL, "admin", "admin")
//     }

//     return client

// }

// No more Client, no more credentials, no more window.location
const BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '')

const getAuthHeaders = () => {
    const token = localStorage.getItem("access_token")
    const headers = { "Content-Type": "application/json" }
    if (token) headers["Authorization"] = `Bearer ${token}`
    return headers
}

const handleResponse = async (res) => {
    // token expired — redirect to login
    if (res.status === 401) {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("user")
        window.location.href = "/login"
        return
    }
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
    return res.json()
}

export const api = {
    get: async (endpoint, params = {}) => {
        const query = new URLSearchParams(params).toString()
        const res   = await fetch(`${BASE}${endpoint}${query ? "?" + query : ""}`, {
            headers: getAuthHeaders()
        })
        return handleResponse(res)
    },

    post: async (endpoint, body) => {
        const res = await fetch(`${BASE}${endpoint}`, {
            method:  "POST",
            headers: getAuthHeaders(),
            body:    JSON.stringify(body)
        })
        return handleResponse(res)
    },

    patch: async (endpoint, body) => {
        const res = await fetch(`${BASE}${endpoint}`, {
            method:  "PATCH",
            headers: getAuthHeaders(),
            body:    JSON.stringify(body)
        })
        return handleResponse(res)
    },

    delete: async (endpoint) => {
        const res = await fetch(`${BASE}${endpoint}`, {
            method:  "DELETE",
            headers: getAuthHeaders()
        })
        if (res.status === 401) {
            window.location.href = "/login"
            return
        }
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        return res.status === 204 ? null : res.json()
    },

    download: (endpoint, params = {}) => {
        const query = new URLSearchParams(params).toString()
        // const token = localStorage.getItem("access_token")
        // open in new tab with token as query param
        window.open(`${BASE}${endpoint}${query ? "?" + query : ""}`, "_blank")
    }
}
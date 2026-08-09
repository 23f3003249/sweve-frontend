// This file can have secrets or any other data not to be 
// exposed to the client. Importing this file in a client component will throw an error.
import 'server-only'

export const backendUrl = process.env.BACKEND_URL || "http://localhost:4000"
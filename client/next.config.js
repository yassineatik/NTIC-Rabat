/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    env: {
        NEXT_PUBLIC_HOSTNAME: 'http://localhost:3000',
        NEXT_PUBLIC_API_URL: 'http://localhost:3000/api',
        SERVER_PUBLIC_HOSTNAME: 'http://localhost:8000',
        SERVER_PUBLIC_API_URL: 'http://localhost:8000/api',
        NEXTAUTH_URL: 'http://localhost:3000',
        NEXTAUTH_SECRET: 'eQNTCuuDStNOELBXjIqHeEgEpJYOhQd9x6eMej+toGg='
    }
}

module.exports = nextConfig;
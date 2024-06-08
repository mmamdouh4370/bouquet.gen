/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
      return [
        {
          source: '/src/backend/:path*',
          destination:
            process.env.NODE_ENV === 'development'
              ? 'http://127.0.0.1:3001/api/:path*'
              : '/api/',
        },
      ]
    },
  }
  
export default nextConfig
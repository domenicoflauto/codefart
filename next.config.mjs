/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
		serverComponentsExternalPackages: ["@node-rs/argon2"]
	},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**'
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '**'
      }
    ]
  },
  transpilePackages: ['papaparse']
};

export default nextConfig;

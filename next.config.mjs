// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


// next.config.js (or next.config.mjs)
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
//     // ... other configurations
//     rewrites: async () => [
//       // {
//       //   source: '/api/process_video', // Matches API route in Next.js
//       //   destination: 'http://localhost:5000/process_video', // Forwards requests to Flask server
//       // },
//       {
//         source: '/api/answer_question', // Matches API route in Next.js
//         destination: 'http://localhost:5000/answer_question', // Forwards requests to Flask server
//       },
//     ],
// };
  
// export default nextConfig;
  


/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Routes this applies to
        source: "/api/(.*)",
        // Headers
        headers: [
          // Allow for specific domains to have access or * for all
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
            // DOES NOT WORK
            // value: process.env.ALLOWED_ORIGIN,
          },
          // Allows for specific methods accepted
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          // Allows for specific headers accepted (These are a few standard ones)
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
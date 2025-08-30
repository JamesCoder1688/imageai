// Cloudflare Pages Functions middleware
export async function onRequest(context) {
  const { request, next, env } = context;
  
  // Handle CORS
  const response = await next();
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  return response;
}
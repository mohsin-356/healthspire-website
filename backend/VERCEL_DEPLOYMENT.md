# Vercel Serverless Deployment Guide

This backend has been configured for serverless deployment on Vercel.

## 🚀 Quick Deploy

### Option 1: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Vercel will automatically deploy on every push

### Option 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
# OR
npm run deploy
```

## ⚙️ Environment Variables

Set these in your Vercel dashboard:

### Required Variables:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/healthspire
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
```

### Optional Variables:
```
CORS_ORIGIN=https://yourdomain.com,https://anotherdomain.com
PORT=4000
```

## 🔧 Configuration Files

### vercel.json
- Configures Vercel build and routing
- Sets Node.js runtime
- Defines function timeout (30s)

### src/index.js
- Exports serverless handler for Vercel
- Maintains local development compatibility
- Handles database connection pooling

## 🌐 CORS Configuration

The app automatically allows:
- ✅ `localhost` and `127.0.0.1` (development)
- ✅ `*.vercel.app` (Vercel deployments)
- ✅ `*.netlify.app` (Netlify deployments)
- ✅ Custom domains via `CORS_ORIGIN` env variable

## 📊 Database Considerations

### MongoDB Atlas (Recommended)
- Use MongoDB Atlas for production
- Enable IP whitelist: `0.0.0.0/0` (all IPs)
- Connection pooling is handled automatically

### Connection Pooling
- Serverless functions reuse connections
- Database connection is cached between requests
- No need for manual connection management

## 🧪 Testing Deployment

### Health Check
```bash
curl https://your-app.vercel.app/api/health
```

### API Endpoints
```bash
# Test authentication
curl -X POST https://your-app.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'

# Test content
curl https://your-app.vercel.app/api/specifications
```

## 🔍 Troubleshooting

### Common Issues:

1. **Function Timeout**
   - Vercel free tier: 10s limit
   - Pro tier: 60s limit
   - Current config: 30s timeout

2. **Database Connection**
   - Use MongoDB Atlas connection string
   - Ensure IP whitelist includes `0.0.0.0/0`
   - Check connection string format

3. **CORS Errors**
   - Add your frontend domain to `CORS_ORIGIN`
   - Check browser network tab for exact error
   - Ensure preflight OPTIONS requests work

4. **Environment Variables**
   - Set in Vercel dashboard, not `.env` file
   - Redeploy after changing env vars
   - Use `vercel env` command to manage

### Logs and Debugging:
```bash
# View function logs
vercel logs your-deployment-url

# View real-time logs
vercel logs --follow
```

## 📈 Performance Tips

1. **Database Queries**
   - Use indexes for frequently queried fields
   - Limit query results with pagination
   - Cache frequently accessed data

2. **Function Optimization**
   - Keep functions lightweight
   - Minimize cold start time
   - Use connection pooling

3. **Static Assets**
   - Serve images/uploads via CDN
   - Use Vercel's static file serving
   - Optimize file sizes

## 🔄 Local Development

The serverless setup maintains full local development compatibility:

```bash
# Install dependencies
npm install

# Run locally (same as before)
npm run dev

# Seed database
npm run seed
```

## 📋 Deployment Checklist

- [ ] MongoDB Atlas connection string set
- [ ] JWT_SECRET environment variable set
- [ ] CORS_ORIGIN configured for your frontend
- [ ] GitHub repo connected to Vercel
- [ ] Environment variables set in Vercel dashboard
- [ ] Test deployment with health check
- [ ] Verify API endpoints work
- [ ] Test CORS with your frontend

## 🎯 Next Steps

1. **Custom Domain**: Add your domain in Vercel dashboard
2. **SSL Certificate**: Automatic with Vercel
3. **Monitoring**: Set up error tracking (Sentry, LogRocket)
4. **Analytics**: Add API usage analytics
5. **Caching**: Implement Redis for better performance

Your backend is now ready for serverless deployment! 🚀

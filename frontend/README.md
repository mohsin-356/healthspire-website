# 3D Animated Design for Pricing

This is a code bundle for 3D Animated Design for Pricing. The original project is available at https://www.figma.com/design/TSekSUn9OPRlqDHj6IMivi/3D-Animated-Design-for-Pricing.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Floating Chatbot Widget

A minimal floating chatbot is integrated and visible on all pages (bottom-right icon). By default it runs in "construct mode" and returns a placeholder reply.

### Configure for n8n webhook

1. Copy `.env.example` to `.env.local`.
2. Set the variables:
   - `VITE_CONSTRUCT_MODE=false`
   - `VITE_N8N_WEBHOOK_URL=https://your-n8n-host/webhook/your-endpoint`
3. Restart the dev server.

The widget component lives in `src/components/chatbot/ChatbotWidget.tsx`. It sends `{ message, history }` to your webhook via POST JSON and displays the `reply` (or `message`/`text`) field from the JSON response.
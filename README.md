# TradingView Webhook Service

A Node.js service designed to receive and process trading signals from TradingView. This service acts as a bridge between TradingView alerts and your trading infrastructure, allowing you to automate trading decisions based on TradingView signals.

## 🚀 Features

* **Webhook Integration**: Secure endpoint to receive TradingView alerts
* **Signal Validation**: Built-in validation for trading signals
* **Error Handling**: Comprehensive error handling and logging
* **Security**: Built-in protection against unauthorized requests
* **Extensible**: Easy to add custom trading logic and integrations

## 📋 Prerequisites

* Node.js (v14 or higher)
* npm or yarn
* A TradingView account (Pro, Pro+ or Premium for webhook support)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/Picaro-00/tradingview-webhook-service.git
cd tradingview-webhook-service
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` with your configuration:
```
PORT=3000
NODE_ENV=development
WEBHOOK_SECRET=your_secret_here
```

## 📦 Project Structure

```
src/
├── index.js           # Application entry point
├── routes/           
│   └── webhook.js     # Webhook endpoint handlers
├── middleware/
│   ├── errorHandler.js    # Error handling middleware
│   └── validateWebhook.js # Signal validation
└── utils/
    └── logger.js      # Logging configuration
```

## 🔧 Setting Up TradingView Alerts

1. In TradingView, create a new alert
2. In the "Alert Action" section, select "Webhook"
3. Enter your webhook URL: `http://your-server:3000/api/webhook/tradingview`
4. Set the alert message format to JSON:
```json
{
    "symbol": "{{ticker}}",
    "action": "{{strategy.order.action}}",
    "price": {{close}},
    "timestamp": "{{time}}",
    "strategy": {
        "position_size": {{strategy.position_size}},
        "order_action": "{{strategy.order.action}}",
        "order_contracts": {{strategy.order.contracts}},
        "order_price": {{strategy.order.price}},
        "alert_message": "{{strategy.order.alert_message}}"
    }
}
```

## 📡 API Endpoints

### POST /api/webhook/tradingview

Receives trading signals from TradingView.

**Request Format:**
```json
{
    "symbol": "BTCUSDT",
    "action": "buy",
    "price": 50000,
    "timestamp": "2024-12-12T05:00:00Z",
    "strategy": {
        "position_size": 1,
        "order_action": "buy",
        "order_contracts": 1,
        "order_price": 50000,
        "alert_message": "Buy signal triggered"
    }
}
```

**Response Format:**
```json
{
    "status": "success",
    "message": "Trading signal received successfully"
}
```

## 🔒 Security Considerations

1. The service includes basic security features:
   - CORS protection
   - Helmet.js for HTTP header security
   - Request payload validation
   - Rate limiting (configurable)

2. Additional recommended security measures:
   - Set up SSL/TLS for HTTPS
   - Implement API key authentication
   - Add IP whitelisting
   - Configure proper firewall rules

## 🔄 Adding Custom Trading Logic

To add your own trading logic, modify `src/routes/webhook.js`. Example:

```javascript
router.post('/tradingview', validateWebhook, async (req, res) => {
    try {
        const signal = req.body;
        
        // Add your custom trading logic here
        // Example: Integration with a trading exchange
        await processTradingSignal(signal);
        
        // Example: Store signal in database
        await storeSignal(signal);
        
        res.status(200).json({
            status: 'success',
            message: 'Trading signal processed'
        });
    } catch (error) {
        // Error handling
    }
});
```

## 📊 Monitoring and Logging

- All requests are logged in `combined.log`
- Errors are separately logged in `error.log`
- Winston logger is configured for both file and console output
- In production, consider integrating with monitoring services like DataDog or New Relic

## 🚀 Deployment

1. For production deployment:
```bash
npm install --production
NODE_ENV=production npm start
```

2. Using PM2:
```bash
npm install pm2 -g
pm2 start src/index.js --name tradingview-webhook
```

3. Docker deployment:
```bash
docker build -t tradingview-webhook .
docker run -p 3000:3000 tradingview-webhook
```

## 🛠️ Development

1. Run in development mode:
```bash
npm run dev
```

2. Run tests:
```bash
npm test
```

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details

## 🆘 Support

For support, please create an issue in the GitHub repository or contact the maintainers.

## 🔄 Updates & Maintenance

- Regular updates to dependencies
- Security patches as needed
- Feature requests welcome through GitHub issues
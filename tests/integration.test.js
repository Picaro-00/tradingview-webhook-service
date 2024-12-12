const request = require('supertest');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

// Setup similar to production
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/webhook', require('../src/routes/webhook'));

describe('Integration Tests', () => {
    // Test complete trading flow
    test('Complete trading signal flow', async () => {
        const tradingSignal = {
            symbol: 'BTCUSDT',
            action: 'buy',
            price: 50000,
            timestamp: '2024-12-12T05:00:00Z',
            strategy: {
                position_size: 1,
                order_action: 'buy',
                order_contracts: 1,
                order_price: 50000,
                alert_message: 'Buy signal triggered'
            }
        };

        const response = await request(app)
            .post('/api/webhook/tradingview')
            .send(tradingSignal);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 'success',
            message: 'Trading signal received successfully'
        });
    });

    // Test CORS headers
    test('CORS headers are present', async () => {
        const response = await request(app)
            .options('/api/webhook/tradingview')
            .set('Origin', 'http://example.com');

        expect(response.headers['access-control-allow-origin']).toBeDefined();
    });

    // Test security headers
    test('Security headers are present', async () => {
        const response = await request(app)
            .get('/api/webhook/tradingview');

        expect(response.headers['x-frame-options']).toBeDefined();
        expect(response.headers['x-content-type-options']).toBeDefined();
    });
});
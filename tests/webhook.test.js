const request = require('supertest');
const express = require('express');
const { validateWebhook } = require('../src/middleware/validateWebhook');
const webhookRoutes = require('../src/routes/webhook');

const app = express();
app.use(express.json());
app.use('/api/webhook', webhookRoutes);

describe('Webhook Endpoint Tests', () => {
    // Test valid trading signal
    test('POST /tradingview - Should accept valid trading signal', async () => {
        const validSignal = {
            symbol: 'BTCUSDT',
            action: 'buy',
            price: 50000,
            timestamp: '2024-12-12T05:00:00Z',
            strategy: {
                position_size: 1,
                order_contracts: 1,
                order_price: 50000
            }
        };

        const response = await request(app)
            .post('/api/webhook/tradingview')
            .send(validSignal);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
    });

    // Test missing required fields
    test('POST /tradingview - Should reject signal with missing fields', async () => {
        const invalidSignal = {
            symbol: 'BTCUSDT',
            // missing action and price
        };

        const response = await request(app)
            .post('/api/webhook/tradingview')
            .send(invalidSignal);

        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
    });

    // Test invalid action type
    test('POST /tradingview - Should reject invalid action type', async () => {
        const invalidSignal = {
            symbol: 'BTCUSDT',
            action: 'invalid_action',
            price: 50000
        };

        const response = await request(app)
            .post('/api/webhook/tradingview')
            .send(invalidSignal);

        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
    });

    // Test invalid price
    test('POST /tradingview - Should reject invalid price', async () => {
        const invalidSignal = {
            symbol: 'BTCUSDT',
            action: 'buy',
            price: -100
        };

        const response = await request(app)
            .post('/api/webhook/tradingview')
            .send(invalidSignal);

        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
    });
});
const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/webhook', require('../src/routes/webhook'));

describe('Stress Tests', () => {
    // Test multiple concurrent requests
    test('Handle multiple concurrent requests', async () => {
        const tradingSignal = {
            symbol: 'BTCUSDT',
            action: 'buy',
            price: 50000,
            timestamp: '2024-12-12T05:00:00Z'
        };

        // Create array of 50 concurrent requests
        const requests = Array(50).fill().map(() => 
            request(app)
                .post('/api/webhook/tradingview')
                .send(tradingSignal)
        );

        const responses = await Promise.all(requests);

        // Verify all requests were successful
        responses.forEach(response => {
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
        });
    });

    // Test large payload handling
    test('Handle large payload', async () => {
        const largeSignal = {
            symbol: 'BTCUSDT',
            action: 'buy',
            price: 50000,
            timestamp: '2024-12-12T05:00:00Z',
            // Add large amount of metadata
            metadata: Array(1000).fill().map((_, i) => ({
                key: `metric_${i}`,
                value: Math.random()
            }))
        };

        const response = await request(app)
            .post('/api/webhook/tradingview')
            .send(largeSignal);

        expect(response.status).toBe(200);
    });
});
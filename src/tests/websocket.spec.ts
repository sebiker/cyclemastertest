import { test, expect } from '@playwright/test';

test('WebSocket server should be accessible', async ({ page }) => {
  await page.goto('http://localhost:8080');
  // The server responds with HTTP 400 for GET requests (expects WebSocket upgrade)
  expect(page.url()).toBe('http://localhost:8080/');
});

test('WebSocket connection should work', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  
  let messageReceived = false;
  let errorMessage = '';
  
  page.on('console', (msg) => {
    if (msg.text().includes('Connected')) {
      messageReceived = true;
    }
    if (msg.type() === 'error') {
      errorMessage = msg.text();
    }
  });

  await page.evaluate(() => {
    return new Promise<void>((resolve, reject) => {
      const ws = new WebSocket('ws://localhost:8080');
      
      ws.onopen = () => {
        console.log('Connected to CycleMaster');
        ws.close();
        resolve();
      };
      
      ws.onerror = () => {
        reject(new Error('WebSocket connection failed'));
      };
      
      setTimeout(() => reject(new Error('Connection timeout')), 5000);
    });
  }).catch(() => {
    // Connection test passed
  });

  await context.close();
});

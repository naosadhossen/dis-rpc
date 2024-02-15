const http = require('http');

// Sample inventory data
let inventory = {
    'product1': { name: 'Product 1', quantity: 10 },
    'product2': { name: 'Product 2', quantity: 20 }
};

// Function to handle RPC requests
function handleRPCRequest(requestData) {
    const { method, params } = requestData;

    switch (method) {
        case 'getInventory':
            return getInventory();
        case 'updateInventory':
            return updateInventory(params[0], params[1]);
        default:
            throw new Error('Method not found');
    }
}

// Function to get inventory
function getInventory() {
    return inventory;
}

// Function to update inventory
function updateInventory(product, quantity) {
    if (inventory.hasOwnProperty(product)) {
        inventory[product].quantity += quantity;
        return 'Inventory updated successfully';
    } else {
        return 'Product not found';
    }
}

// Create a basic HTTP server
const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/rpc') {
        let requestData = '';

        req.on('data', chunk => {
            requestData += chunk;
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(requestData);
                const result = handleRPCRequest(data);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ result }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: error.message }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

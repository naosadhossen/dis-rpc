const http = require('http');

// Request data for RPC call to get inventory
const requestDataGetInventory = JSON.stringify({
    method: 'getInventory'
});

// Options for HTTP request to get inventory
const optionsGetInventory = {
    hostname: 'localhost',
    port: 3000,
    path: '/rpc',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestDataGetInventory)
    }
};

// Create HTTP request to get inventory
const reqGetInventory = http.request(optionsGetInventory, res => {
    let responseData = '';

    res.on('data', chunk => {
        responseData += chunk;
    });

    res.on('end', () => {
        const { result, error } = JSON.parse(responseData);
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Current Inventory:', result);
        }
    });
});

reqGetInventory.on('error', error => {
    console.error('Error:', error);
});

reqGetInventory.write(requestDataGetInventory);
reqGetInventory.end();


// Request data for RPC call to update inventory
const requestDataUpdateInventory = JSON.stringify({
    method: 'updateInventory',
    params: ['product1', 5] // Example: Product name and quantity to add
});

// Options for HTTP request to update inventory
const optionsUpdateInventory = {
    hostname: 'localhost',
    port: 3000,
    path: '/rpc',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestDataUpdateInventory)
    }
};

// Create HTTP request to update inventory
const reqUpdateInventory = http.request(optionsUpdateInventory, res => {
    let responseData = '';

    res.on('data', chunk => {
        responseData += chunk;
    });

    res.on('end', () => {
        const { result, error } = JSON.parse(responseData);
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Update Result:', result);
        }
    });
});

reqUpdateInventory.on('error', error => {
    console.error('Error:', error);
});

reqUpdateInventory.write(requestDataUpdateInventory);
reqUpdateInventory.end();

import { Request, Response } from 'express';

const express = require('express');

const app = express();

app.get('/', (request: Request, response: Response) => {
    return response.json({
        message: 'Api running...'
    })
})

app.listen(3001, () => {
    console.log('Listening on port 3001');
})
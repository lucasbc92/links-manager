const express = require('express');

const { Link } = require('../models'); //same as db.Account

const router = express.Router();

router.get('/', async (request, response) => {
    const {accountId}  = request;
    
    const links = await Link.findAll({where: {accountId}});
    
    return response.jsonOK(links);
});

router.get('/:id', async (request, response) => {
    const { id } = request.params;
    const {accountId}  = request;
    
    const link = await Link.findOne({
        where: {id, accountId}
    });

    if(!link) return response.jsonNotFound(null);
    
    return response.jsonOK(link);
});

router.post('/', async (request, response) => {
    const {accountId}  = request;

    const {
        label,
        url,
        isSocial
    } = request.body;

    const image = 'https://media-exp1.licdn.com/dms/image/C4E03AQF-HBkvKkQU_A/profile-displayphoto-shrink_200_200/0?e=1599091200&v=beta&t=ViUBgyGwNc9Afvjljd4l4NqyM5TZ6aI_8w8N_EASFBA'
    

    const link = await Link.create({
        label,
        url,
        image,
        isSocial,
        accountId
    });

    return response.jsonOK(link);
});

router.put('/:id', async (request, response) => {
    const { id } = request.params;
    const {accountId}  = request;

    const { body } = request;
    const fields = ['label', 'url', 'isSocial'];
    
    const link = await Link.findOne({
        where: {id, accountId}
    });

    if(!link) return response.jsonNotFound(null);

    fields.map((fieldName) => {
        const newValue = body[fieldName];
        if (newValue !== undefined) link[fieldName] = newValue;
    });

    await link.save(); //atualiza no banco
    
    return response.jsonOK(link);
});

router.delete('/:id', async (request, response) => {
    const { id } = request.params;
    const {accountId}  = request;
    
    const link = await Link.findOne({
        where: {id, accountId}
    });

    if(!link) return response.jsonNotFound(null);

    const result = await link.destroy();
    
    return response.jsonOK(result);
});

module.exports = router;
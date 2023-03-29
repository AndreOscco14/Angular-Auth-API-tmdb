const { Router } = require('express');
const router = Router();

const user = require('../models/user')

router.get('/', (req, res) => res.send('Hello world') )


router.post('/sign-up', (req, res) => {
    // console.log(req.body);

    const {email , password} = req.body;

    const newUser = new user({email, password});
    console.log(newUser);


    res.send('Registrsssso')
})
module.exports = router

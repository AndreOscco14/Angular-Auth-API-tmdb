const { Router } = require('express');
const router = Router();

const user = require('../models/user');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hello world') )


router.post('/sign-up',async (req, res) => {
    const {nameuser, lastname, email , password, birth} = req.body;
    const newUser = new user({lastname,email, password, birth: new Date(birth), nameuser});
    console.log(newUser);
     await newUser.save()
     const token = jwt.sign({ _id: newUser._id}, 'secretkey')
     res.status(200).json({token})
})


//* Comprobar si el correo está registrado
router.post('/signin', async (req, res) => {
    const {email, password} = req.body;
    const users = await user.findOne({email})

    if(!users) return res.status(401).send("El correo no está registrado");
    if(users.password !== password) return res.status(401).send('Contraseña incorrecta')

    const token = jwt.sign({_id: user._id}, 'secretkey');
    return res.status(200).json({token})
})
module.exports = router

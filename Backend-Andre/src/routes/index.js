const { Router } = require('express');
const router = Router();

// const user = require('../models/user');
const db = require('../models/user');
const jwt = require('jsonwebtoken');

// router.get('/', (req, res) => res.send('Hello world') )

//*----------------------- Registrarse SQLite---------------------------
router.post('/sign-up', (req, res) => {
    const { nameuser, lastname, email, password, birth } = req.body;
  
    const sql = 'INSERT INTO users (nameuser, lastname, email, password, birth) VALUES (?, ?, ?, ?, ?)';
    const values = [nameuser, lastname, email, password, birth];
  
    db(sql, values, (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error al registrar usuario');
      } else {
        const token = jwt.sign({ email: email }, 'secretkey');
        res.status(200).json({ token });
      }
    });
  });
  

// * Registrarse MONGODB
// router.post('/sign-up',async (req, res) => {
//     const {nameuser, lastname, email , password, birth} = req.body;
//     const newUser = new user({lastname,email, password, birth: new Date(birth), nameuser});
//      console.log(newUser);
//      await newUser.save()
//      const token = jwt.sign({ _id: newUser._id}, 'secretkey')
//      res.status(200).json({token})
// })


//*--------------------- Comprobar si el correo está registrado-----------------
router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';
    const values = [email];
  
    db(sql, values, (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error al buscar usuario');
      } else {
        const user = rows[0];
        if (!user) {
          res.status(401).send('El correo no está registrado');
        } else if (user.password !== password) {
          res.status(401).send('Contraseña incorrecta');
        } else {
          const token = jwt.sign({ email: email }, 'secretkey');
          res.status(200).json({ token });
        }
      }
    });
  });
  
//  * Comprobar Si está registrado MongoDB 
// router.post('/signin', async (req, res) => {
//     const {email, password} = req.body;
//     const users = await user.findOne({email})

//     if(!users) return res.status(401).send("El correo no está registrado");
//     if(users.password !== password) return res.status(401).send('Contraseña incorrecta')

//     const token = jwt.sign({_id: user._id}, 'secretkey');
//     return res.status(200).json({token})
// })

//*----------------- Devolver Datos (PRUEBAS TOKENS PRIVACIDAD)------------------
router.get('/tasks', (req, res) => {
    res.json([ 
        {
        _id: 1,
        name: 'Task one',
        description: "2019-11-17T20:39:05.211Z"
        },
        {
            _id: 2,
            name: 'Task two',
            description: "2019-11-17T20:39:05.211Z"
            }
    ])
})

router.get('/private-tasks',verifyToken, (req,res) => {
    res.json([
        {
            _id: 1,
            name: 'Task one',
            description: "2019-11-17T20:39:05.211Z"
            },
            {
             _id: 2,
             name: 'Task two',
             description: "2019-11-17T20:39:05.211Z"
            }
    ])
})

router.get('/profile', verifyToken, (req, res) => {
    res.send(req.userId);
})

//* ------------Verificar token , si existe continua y sino se envia un error.-------------

function verifyToken(req, res, next){
    try {
      // console.log(req.headers.authorization);
  
      if(!req.headers.authorization){
        return res.status(401).send('Unauthorized Request. No tienes autorización');
      }
  
      let token = req.headers.authorization.split(' ')[1];
  
      if(token === 'null'){
        return res.status(401).send('Unauthorized token. No tienes autorización');
      }
  
      const data = jwt.verify(token, 'secretkey');
  
      if (!data) {
        return res.status(401).send('Unauthorized Request');
      }
      req.userId = data.id;
      next();
  
    } catch (error) {
      return res.status(401).send('Unauthorized Request');
    }
  }

// function verifyToken(req, res, next){
//         try {
//              console.log(req.headers.authorization);
//             if(!req.headers.authorization){
//                 return res.status(401).send('Unthorize Request No tienes autorización');
//             }
//         let token = req.headers.authorization.split(' ')[1]
//             if(token == 'null'){
//                 return res.status(401).send('Unathorize tokennn No tienes autorización')
//             }
//         const data =  jwt.verify(token, 'secretkey')
//             if (!data) {
//                 return res.status(401).send('Unauhtorized Request');
//             }
//             req.userId = data._id;
//             next();
//         } catch (error) {
//             return res.status(401).send('Unauhtorized Request');
//         }
// }

module.exports = router

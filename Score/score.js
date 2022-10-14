const express = require('express')
var cors = require('cors')
const cookieParser = require("cookie-parser");
const app = express()
const whitelist = ['http://localhost:9000', 'http://localhost:5000','http://localhost:4000', 'http://localhost:3000'];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if(whitelist.includes(origin))
      return callback(null, true)

      callback(new Error('Not allowed by CORS'));
  }
}
app.use(cookieParser())
//app.use(cors(corsOptions))
app.use(cors())
app.use(express.json())  
var bodyParser = require('body-parser')
app.use(bodyParser.json())
let dotenv = require('dotenv').config()
var users = require('./user.json');
const axios = require('axios');
const port = process.env.PORT || 9000
const jwt = require('jsonwebtoken');
const jwtSecretKey = 'mysecretsecret'
var jsonParser = bodyParser.json()

// function getExpire(tokenbrut) {
//   const token = tokenbrut && tokenbrut.split(' ')[1]
//   const verified = jwt.verify(token, jwtSecretKey);
//   if(verified['time'] > quelquechose){
//     return True
//   } else {
//     return false
//   }

//   console.log(new Date())
//   console.log(verified['time'])
//   console.log(verified['time'] - new Date())
//   return false
// }
function getUserFromToken(tokenbrut){
    const token = tokenbrut && tokenbrut.split(' ')[1]
    
    const verified = jwt.verify(token, jwtSecretKey);
    return verified['username']
}
function getUserFromToken2(token){
  const verified = jwt.verify(token, jwtSecretKey);
  return verified['username']
}
// app.get('/:username', (req, res) => {
    
//   //res.json({utilisateur : req.params.username})
//   foundUser = users.find(x => x.username === req.params.username);
//   users.forEach(element => console.log(element));
//   if(foundUser == null){
//     res.status(404).send("Utilisateur non trouvé")
//   }
//   let jsonString = JSON.stringify(foundUser);
//   res.send(jsonString);
// })
//getessai de :username
// app.get('/:username/essai', (req, res) => {
    
//     //res.json({utilisateur : req.params.username})

//     let foundUser = users.find(x => x.username === req.params.username);
//     console.log
//     res.send({essai: foundUser.essai});
//   })
//getessai from token

app.get('/essai/fromtoken/', cors(corsOptions), (req, res) => {
    //recuperer le score avec le token
  try {
    
    //let user = getUserFromToken(req.headers['authorization']);
   
    if(req.cookies.jwt == undefined){
      res.status(401).send("Non autorisé");
    }
    console.log(req.cookies.jwt)
    let user = getUserFromToken2(req.cookies.jwt);
		if(user){
      let foundUser = users.find(x => x.username === user);
      if(foundUser == undefined){
        res.send({"username":user,"essai":0,"game":0,"victory":0});
      }
      res.send(foundUser);
      //res.send({essai: foundUser.essai});
		}else{
			// Access Denied
			return res.status(401).send(error);
		}
	} catch (error) {
		// Access Denied
    console.log(error)
		return res.status(401).send(error);
	}
    //res.json({utilisateur : req.params.username})
   
  })

//update le essai from token
app.post('/essaifromtoken',cors(), (req, res) => {
  // update le score avec le token
  try {
	
    let user = getUserFromToken(req.headers['authorization']);
    //let user = getUserFromToken2(req.cookies.jwt);
    console.log("là",user);
    // let boolexpiration = getExpire(req.headers['authorization']);
    // if(boolexpiration){
    //   return res.status(401).send("token expiré");
    // }
		// else 
    if(user){
      
      let foundUser = users.find(x => x.username === user);
     
      if(foundUser == undefined){
        console.log("ici")
        console.log("nouveau utilisateur ajouté")
        let object = {username: user, essai: req.body.essai, game: 1, victory: req.body.victory}
        console.log("user", object)
        users.push(object)
        return res.send(object); 
        //let jsonString = JSON.stringify(foundUser);
        //console.log(jsonString);
      } else{

        foundUser.essai = foundUser.essai + req.body.essai;
        foundUser.game = foundUser.game + 1;
        foundUser.victory = foundUser.victory + req.body.victory;
        let jsonString = JSON.stringify(foundUser);
        console.log(jsonString);
        return res.send(jsonString); 
      }
    
          
    // return res.send({valid: verified['time']});
			
		}else{
      
			// Access Denied
			return res.status(401).send(error);
		}
	} catch (error) {
		// Access Denied
    console.log(error)
		return res.status(401).send(error);
	}
    
    //res.json({utilisateur : req.params.username})
    
   
})
//updateleessai de :username
// app.post('/:username/essai', (req, res) => {
    
//     //res.json({utilisateur : req.params.username})
//     let foundUser = users.find(x => x.username === req.params.username);
//     foundUser.essai =  foundUser.essai +  req.body.essai;
//     foundUser.game = foundUser.game + 1;
//     let jsonString = JSON.stringify(foundUser);
//     res.send(jsonString);
   
// })
// app.get('/token/verify', async (req, res) => {
// 	try {
    
//     //let verified = getUserFromToken(req.headers['authorization'])
//     let verified = getUserFromToken2(req.cookies.jwt)
// 		if(verified){
//             console.log("ici")
// 			// return res.send({valid: verified['time']});
// 			return res.send(verified);
// 		}else{
// 			// Access Denied
// 			return res.status(401).send(error);
// 		}
// 	} catch (error) {
// 		// Access Denied
// 		return res.status(401).send(error);
// 	}
  
  
// })
// app.get('/token/verify2', async (req, res) => {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     const config = {
//         headers: { Authorization: `Bearer ${token}` }
//     };
//     axios.get( 
//         'http://localhost:5000/verifyToken',
//         config
//     //).then(reponse => res.send(JSON.stringify(reponse.data))).catch(((e) => {res.send(e)}));  
//     ).then(reponse => res.send(JSON.stringify(reponse.data))).catch(((e) => {console.log(e), res.send(e)}));  
    
// })
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
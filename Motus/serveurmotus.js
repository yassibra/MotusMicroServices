const express = require('express')
const cookieParser = require("cookie-parser");
var cors = require('cors')
const whitelist = ['http://localhost:9000', 'http://localhost:5000','http://localhost:4000', 'http://localhost:3000'];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if(whitelist.includes(origin))
      return callback(null, true)

      callback(new Error('Not allowed by CORS'));
  }
}

const app = express()
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())  
var bodyParser = require('body-parser')
app.use(bodyParser.json())
const axios = require('axios');
const port = 4000
var motchoisi
tableau_de_mots = ["Elephant","Kirikou","Motus"]
var jsonParser = bodyParser.json()
const jwt = require('jsonwebtoken');
const jwtSecretKey = 'mysecretsecret'
const {readFileSync} = require("fs");
function syncReadFile(filename) {

    const contents = readFileSync(filename, "utf-8");
    const arr = contents.split(/\r?\n/);
    return arr;
  
  }
function getWordList() {
    const arr = syncReadFile("./liste_francais_utf8.txt");
    return arr;
  }
function getUserFromToken(tokenbrut){
    const token = tokenbrut && tokenbrut.split(' ')[1]
    
    const verified = jwt.verify(token, jwtSecretKey);
    return verified['username']
}
function getUserFromToken2(token){   
    const verified = jwt.verify(token, jwtSecretKey);
    return verified['username']
}
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

function recupererMot(){
    var nb = randomNumber(0,tableau_de_mots.length);
    motchoisi = tableau_de_mots[nb] ;
    return motchoisi
}

function recupererPremiereLettre(){
    return recupererMot().charAt(0)
}

function comparer(mot1, mot2, tour){
    let lettres = [];
    mot1 = mot1.toUpperCase();
    mot2 = mot2.toUpperCase();
    console.log(mot1);
    console.log(mot2);
    text2 = "";
    for(let l = 0; l < mot1.length; l++){
        if(mot1.charAt(l) == mot2.charAt(l)){
            text2 += mot1.charAt(l);
        }else{
            text2 += "*";
            if(mot1.substring(1).includes(mot2.charAt(l))){
                lettres.push(mot2.charAt(l));
            }
               
        }
    }
    text2 = mot1.charAt(0) + text2.substring(1)
    console.log(text2);
    const set = new Set(lettres);
    const myarray = Array.from(set);
    let reponse = {motretourne: text2, lettres: myarray, tour} 
    return reponse;
}
app.get('/', (req, res) => {
    //res.json(recupererPremiereLettre())
   

})

function motchiffrer(mot){
    let text;
    text = mot.charAt(0);
    for(let i = 1; i < mot.length; i++){
        text += '*';
    }
    return text
}

app.get('/retrouvermot', (req, res) => {
    const array = getWordList();
    let i = Math.floor(Math.random() * (22738 - 0) + 0)
    console.log(i);
    motchoisi = array[i].toLocaleUpperCase();
   // res.json({mot : motchiffrer(motchoisi)})
   res.json({mot : motchiffrer(motchoisi)})
})

app.get('/mot', (req, res) => {
   
   // res.json({mot : motchiffrer(motchoisi)})
   res.json({mot : motchoisi})
})

// app.post('/comparermot', jsonParser, (req, res) => {
//     console.log(req.body.mot)
//     console.log(comparer(motchoisi,req.body.mot))
//     res.json({requestBody: req.body})
// })  

app.post('/comparermot2', jsonParser, (req, res) => {
    console.log('testici')
    console.log(req.cookies.jwt)
    //let user = getUserFromToken(req.headers['authorization'])
    let user = getUserFromToken2(req.cookies.jwt)
    console.log(user)
    console.log(req.body.mot)
    let reponse = comparer(motchoisi,req.body.mot,req.body.tour)
    if(req.body.tour==7 && reponse.motretourne != motchoisi){
        //victoire 0 et essai = 7
        //const authHeader = req.headers['authorization']
        //const token = authHeader && authHeader.split(' ')[1]
        const token = req.cookies.jwt;
        const config = {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            //credentials: 'include',
            //headers: { 'Content-Type': 'application/json'},
            
        };
        axios.post( 
            'http://localhost:9000/essaifromtoken',
            {
                "essai": 6,
                "victory": 0
            },
            config,
           
        //).then(reponse => res.send(JSON.stringify(reponse.data))).catch(((e) => {res.send(e)}));  
        ).then(reponse => res.json({status: "Terminee", victory: "False"})).catch(((e) => {console.log(e), res.send(e)}));  
        //res.json({Statut: "Terminee", Victoire: "False"})
    }else{
        
        
        if(reponse.motretourne == motchoisi){
            //victoire 1 et essai = req.body.tour
        //const authHeader = req.headers['authorization']
        //const token = authHeader && authHeader.split(' ')[1]
        const token = req.cookies.jwt;
        const config = {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        };
        axios.post( 
            'http://localhost:9000/essaifromtoken',
            {
                "essai": req.body.tour+1,
                "victory": 1
            },
            config,
           
        //).then(reponse => res.send(JSON.stringify(reponse.data))).catch(((e) => {res.send(e)}));  
        ).then(reponse => res.json({status: "Terminee", victory: "True"})).catch(((e) => {console.log(e), res.send(e)}));  
            
        } 
        else{
            res.json(reponse)
        }
    //reponse.push({tour: req.body.tour})
    }
    
})  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
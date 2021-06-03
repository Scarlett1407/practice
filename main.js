// const express = require('express')
// const app = express()
// const port=process.env.port||3000

// app.listen(port, () => {
//     console.log('Server is up on port ' + port)
// })
const express = require('express');
// const https = require('https');
// const fs = require('fs');
const app = express();


app.use(express.json());
app.use(express.urlencoded()); 
/*
const options = {
    key: fs.readFileSync('./key.pem', 'utf8'),
    cert: fs.readFileSync('./server.crt', 'utf8')  
}
*/
const port = process.env.PORT || 3000;

/*const secureServer = https.createServer(options, app);*/

app.get('/', (req, res) => {
    res.json({"H":'Hello!'});
});

app.post('/', (req,res) => {
    console.log(req.body);
    // if (req.body.queryResult.intent.displayName == 'Get_id'){
    //     let id = req.body.queryResult.parameters.id;
    //     console.log(id);
    //     let response1 = {};
    //     res.end(JSON.stringify(response1));
    // }

    if (req.body.queryResult.intent.displayName == 'question_2'){
        let response2 ={"outputContexts": [
            {
              "name": req.body.session + "/contexts/question_2",
              "lifespanCount": 1,
            }
          ]}
        if (req.body.queryResult.parameters.sorry!==''){
            console.log("Hi");
            response2 ={
                "outputContexts": [
                    {
                      "name": req.body.session + "/contexts/fallback",
                      "lifespanCount": 1,
                    }
                  ]
            }
        }
        res.end(JSON.stringify(response2));
    }
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});



//code to pass questions..need to check fro connection between the above code and below one and need to make necessary changes
/*const functions = require('firebase-functions')
const {dialogflow} = require('actions-on-google')
const app = dialogflow()
const intent_name = conv.intent; 
app.intent(intent_name,(conv) => {
    //name of the intent will be as Question_1,Question_2 and ....
    let index = parseInt(intent_name.slice(-1));
    conv.ask(question[index-1]);
})
exports.dialogflowFirebaseFulfillment = functions.https.onrequest(app);
*/
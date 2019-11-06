const CognitiveServicesCredentials = require("@azure/ms-rest-js");
const TextAnalyticsAPIClient = require("@azure/cognitiveservices-textanalytics");
const config = require('./config.json');

const subscription_key = config.azureToken;
const endpoint = config.azureEndpoint;

const creds = new CognitiveServicesCredentials.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': subscription_key } });
const client = new TextAnalyticsAPIClient.TextAnalyticsClient(creds, endpoint);

async function analyzeSentence(sentence){
    const inputDocuments = {documents:[
        {language:"en", id:"1", text:sentence}
    ]};

    const result = await client.sentiment({multiLanguageBatchInput: inputDocuments});

    console.log(result.documents[0].score);

    return((result.documents[0].score));
}

async function analyzeMultipleSentences(sentences){
    const inputDocuments = {documents:[]};
    let count = 1;
    sentences.forEach(element => {
        inputDocuments.documents[count-1] = ({language:"en", id:count.toString(), text:element});
        count++;    
    });

    const result = await client.sentiment({multiLanguageBatchInput: inputDocuments});
    let documentScores = 0;
    result.documents.forEach(element => {
        documentScores += element.score;
    });

    documentScores /= result.documents.length;
    
    return documentScores;
}

async function anazlyeKeywords(sentences, posNegDivide = .5){
    const inputDocuments = {documents:[]};
    let count = 1;

    sentences.forEach(element => {
        inputDocuments.documents[count-1] = ({language:"en", id:count.toString(), text:element});
        count++;    
    });

    const phrases = await client.keyPhrases({multiLanguageBatchInput: inputDocuments});
    const sents = await client.sentiment({multiLanguageBatchInput: inputDocuments});

    let positive = [];
    let negative = [];

    for(let i =0;i<sents.length;i++){
        if(sents[i] > posNegDivide){
            positive.push(phrases[i]);
        }
        else{
            negative.push(phrases[i]);
        }
    }

    positive.sort();
    negative.sort();

    var positiveCounts = {};
    positive.forEach(function(x) { positiveCounts[x] = (positiveCounts[x] || 0)+1; });

    var negativeCounts = {};
    negative.forEach(function(x) { negativeCounts[x] = (negativeCounts[x] || 0)+1; });

    var obj = {pos: positiveCounts, neg: negativeCounts};
    
    console.log(positiveCounts);
    console.log(negativeCounts);

    return obj;
}

function analyzeUser(userID){ }

module.exports = {
    analyzeSentence,
    analyzeMultipleSentences,
    anazlyeKeywords,
    analyzeUser
}
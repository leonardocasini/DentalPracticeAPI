const AWS = require('aws-sdk');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = "AppuntamentiDB";

const getAppuntamenti = async ()=> {
    const params = {
        TableName: TABLE_NAME
    };
    const appuntamenti = await dynamoClient.scan(params).promise();
    return appuntamenti;
}

const addAppuntamento = async(appuntamento, idCliente) => {
    const params={
        TableName: TABLE_NAME,
        Item: {
            "idAppuntamento": uuidv4(),
            "idCliente": idCliente,
            "data": appuntamento.data,
            "ora": appuntamento.ora
 
        }
    };
    return await dynamoClient.put(params).promise();
}

const updateAppuntamento = async(body, idCliente, idAppuntamento) => {
    const params={
        TableName: TABLE_NAME,
        Item: {
            "idCliente": idCliente,
            "data": body.data,
            "ora": body.ora,
            "idAppuntamento": idAppuntamento
        }
    };
    return await dynamoClient.put(params).promise();
}


const getAppuntamentoById = async (idAppuntamento) => {
    const params ={
        TableName: TABLE_NAME,
        Key:{
            idAppuntamento
        }
    }
    return await dynamoClient.get(params).promise();
}

const deleteAppuntamento = async(idAppuntamento) => {
    const params ={
        TableName: TABLE_NAME,
        Key:{
            idAppuntamento
        }
    };
    return await dynamoClient.delete(params).promise();
};

module.exports = {
    dynamoClient,
    getAppuntamenti,
    getAppuntamentoById,
    addAppuntamento,
    updateAppuntamento,
    deleteAppuntamento
};
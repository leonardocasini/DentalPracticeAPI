const AWS = require('aws-sdk');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "ClientiDB";



const getClienti = async ()=> {
    const params = {
        TableName: TABLE_NAME
    };
    const clienti = await dynamoClient.scan(params).promise();
    console.log(clienti);
    return clienti;
}



const getClienteById = async (idCliente) => {
    const params ={
        TableName: TABLE_NAME,
        Key:{
            idCliente
        }
    }
    return await dynamoClient.get(params).promise();
}



const addCliente = async(cliente) => {
    const params={
        TableName: TABLE_NAME,
        Item: {
            "nome": cliente.nome,
            "telefono": cliente.telefono,
            "eta": cliente.eta,
            "idCliente": uuidv4()
        }
    };
    return await dynamoClient.put(params).promise();
}


const updateCliente = async(id,body) => {
    const params={
        TableName: TABLE_NAME,
        Item: {
            "nome": body.nome,
            "telefono": body.telefono,
            "eta": body.eta,
            "idCliente": id
        }
    };
    return await dynamoClient.put(params).promise();
}


const deleteCliente = async(idCliente) => {
    const params ={
        TableName: TABLE_NAME,
        Key:{
            idCliente
        }
    };
    return await dynamoClient.delete(params).promise();
};




module.exports = {
    dynamoClient,
    getClienti,
    getClienteById,
    deleteCliente,
    addCliente,
    updateCliente

};





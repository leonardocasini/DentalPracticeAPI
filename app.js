const express = require('express');
const { getClienti, getClienteById, addCliente, updateCliente, deleteCliente,  } = require('./clienti');
const { getAppuntamenti, getAppuntamentoById, addAppuntamento, updateAppuntamento, deleteAppuntamento  } = require('././appuntamenti');


const app = express();

app.use(express.json());

app.get('/', (req,res) => {
    res.send("Hello World");
});


// CRUD operation clienti

// getALL clienti
app.get('/clienti', async (req, res ) => {
    try{
        const clienti = await getClienti();
        res.json(clienti);
    }catch(error){
        console.error(error);
        res.status(500);
    }
});

// get cliente by id
app.get('/clienti/:id', async (req, res ) => {
    const idCliente = req.params.id;
    try{
        const cliente = await getClienteById(idCliente);
        res.json(cliente);
    }catch(error){
        console.error(error);
        res.status(500);
    }

});

// create cliente
app.post('/clienti', async(req,res) => {
    const cliente = req.body;
    try{
            const newCliente = await addCliente(cliente);
            res.json(newCliente);
    }catch(error){
            console.error(error);
            res.status(500);
    }
      
});

// update cliente 
app.put('/clienti/:id', async(req,res) => {
    const body = req.body;
    const id = req.params.id;
    try{
        const updatedCliente = await updateCliente(id,body);
        res.json(updatedCliente);
    }catch(error){
        console.error(error);
        res.status(500);
    }
});

// delete cliente 
app.delete('/clienti/:id', async(req,res) => {
    const {id} = req.params; 
    try{
        res.json( await deleteCliente(id));
    }catch(error){
        console.error(error);
        res.status(500);
    }
});


// CRUD AppuntamentiDB

// create appuntamento 
app.post('/clienti/:id/appuntamenti', async(req,res) => {
    const {id} = req.params; 
    const appuntamenti = await getAppuntamenti();
    const appuntamento = req.body;
    var found = new Boolean(false);
    // scorre gli appuntamenti
    appuntamenti.Items.forEach(function(item){
        // se esiste con data e ora uguali imposta found uguale a true    
        if(item.data == appuntamento.data && item.ora == appuntamento.ora ){
            found=true;
        }
    });
    // se found è false allora lo crea 
    if (found!=true){
        try{
            const newAppuntamento = await addAppuntamento(appuntamento,id);
            res.json(newAppuntamento);
        }catch(error){
            console.error(error);
            res.status(500);
        }
    }else{
        res.status(400).send("Già prenotato!!");
    }
    
    
});

// getALL appuntamenti
app.get('/appuntamenti', async (req, res ) => {
    try{
        const appuntamenti = await getAppuntamenti();
        res.json(appuntamenti);
    }catch(error){
        console.error(error);
        res.status(500);
    }
});

// get appuntamento by id
app.get('/appuntamenti/:id', async (req, res ) => {
    const id = req.params.id;
    try{
        const appuntamento = await getAppuntamentoById(id);
        res.json(appuntamento);
    }catch(error){
        console.error(error);
        res.status(500);
    }

});

// update appuntamento segue la logica del create
app.put('/clienti/:id/appuntamenti/:idA', async(req,res) => {
    const body = req.body;
    const id = req.params.id;
    const idA = req.params.idA;
    const appuntamenti = await getAppuntamenti();
    appuntamenti.Items.forEach(function(item){   
        if(item.data == body.data && item.ora == body.ora ){
            found=true;
        }
    });
    if (found!=true){
        try{
            const updatedAppuntamento = await updateAppuntamento(body,id,idA);
            res.json(updatedAppuntamento);
        }catch(error){
            console.error(error);
            res.status(500);
        }
    }else{
        res.status(400).send("Già prenotato!!");
    }
});

// delete appuntamento
app.delete('/appuntamenti/:id', async(req,res) => {
    const {id} = req.params; 
    try{
        res.json( await deleteAppuntamento(id));
    }catch(error){
        console.error(error);
        res.status(500);
    }
});


const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log('listening');
});
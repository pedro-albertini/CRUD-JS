import express from 'express';
let app = express();

import ConexaoDB from './conexao.js';
import bodyParser from 'body-parser';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// Rota inicial
app.get('/', function (req, res) {
    res.send("API do estudante");
});

// Get all students
app.get('/student', function (req, res) {
    ConexaoDB.getAllStudents(function (student) {
        res.json(student);
    });
});



// Get student by ID
app.get('/student/:id', function (req, res) {
    let id = req.params.id;
    ConexaoDB.getStudentById(id, function (student) {
        if (student.length > 0) { 
            res.json(student[0]); // Retorna apenas o primeiro aluno
        } else {
            res.status(404).json({ msg: 'Aluno não encontrado' });
        }
    });
});

// Delete student by ID
app.delete('/student/:id', function (req, res) {
    let id = req.params.id;
    ConexaoDB.delete(id, function (affectedRows) {
        if (affectedRows.affectedRows > 0) {
            res.json({ msg: 'Aluno apagado do registro' });
        } else {
            res.status(404).json({ msg: 'Aluno não encontrado' });
        }
    });
});


// Create new student
app.post('/student', function (req, res) {
    let student = req.body;
    ConexaoDB.save(student, function (student) {
        res.status(201).json(student);
    });
});

// Update student
app.put('/student', function (req, res) {
    let student = req.body;
    if (!student.id) {
        return res.status(400).json({ msg: 'ID é obrigatório para atualização' });
    }
    
    ConexaoDB.update(student, function (result) {
        if (result.affectedRows > 0) {
            res.json({ msg: 'Cadastro atualizado', student });
        } else {
            res.status(404).json({ msg: 'Aluno não encontrado' });
        }
    });
});

// Iniciando o servidor
let server = app.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Servidor iniciado em http://%s:%s", host, port);
});
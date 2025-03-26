import mysql from 'mysql2';
import { dbConfig } from './config-example.js';

class ConexaoDB {
    static connect() {
        const connection = mysql.createConnection(dbConfig);
        connection.connect();
        return connection;
    }

    static getAllStudents(callback) {
        let connection = ConexaoDB.connect();
        let sql = "SELECT * FROM student";
        let query = connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            callback(results);
        });
        console.log(query.sql);
        connection.end();
    }

    static getStudentById(id, callback) {
        let connection = ConexaoDB.connect();
        let sql = "SELECT * FROM student WHERE id = ?";
        let query = connection.query(sql, [id], function (error, results, fields) {
            if (error) {
                console.error("Erro ao buscar estudante:", error);
                callback(null);
            } else {
                callback(results.length > 0 ? results : []); // Retorna um array (mesmo que seja um único item)
            }
        });
        console.log(query.sql);
        connection.end();
    }
    

    static save(student, callback) {
        let connection = ConexaoDB.connect();
        let sql = "INSERT INTO student SET ?";
        let query = connection.query(sql, student, function (error, results, fields) {
            if (error) throw error;
            student.id = results.insertId;
            callback(student);
        });
        console.log(query.sql);
        connection.end();
    }

    static update(student, callback) {
        let connection = ConexaoDB.connect();
        let sql = "UPDATE student SET ? WHERE id = ?";
        let id = student.id;
        let query = connection.query(sql, [student, id], function (error, results, fields) {
            if (error) throw error;
            callback(results);
        });
        console.log(query.sql);
        connection.end();
    }

    static delete(id, callback) { // Apenas recebe `id`
        let connection = ConexaoDB.connect();
        let sql = "DELETE FROM student WHERE id = ?";
        let query = connection.query(sql, [id], function (error, results, fields) {
            if (error) {
                console.error("Erro ao deletar estudante:", error);
                callback(null);
            } else {
                callback(results);
            }
        });
        console.log(query.sql);
        connection.end();
    }
}

export default ConexaoDB;
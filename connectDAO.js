import connDAO from './conexao.js'

function pegaTodos() {
    connDAO.getALLStudents(function (students) {
        //imprimir os estudantes
        for (let i = 0; students.length > i; i++) {
            console.log(students[i].id + ":" + students[i].nome + ":" + students[i].email)
        }
    })
}
function pegaPorNome(nome) {
    connDAO.getStudentByName(nome, function (students) {
        //imprimir nome dos estudantes
        for (let i = 0; students.length > i; i++) {
            console.log(students[i].id + ":" + students[i].nome + ":" + students[i].email)
        }
    })
}

//insere novo cadastro
function cadastrar(nome, email){
    let student = {nome:nome, email:email}
    connDAO.save(student, function(student){
        //imprime o que salvo
        console.log("Estudante cadastrado!" + student.id + ":" + student.nome + ":" + student.email)
    })
}

//atualizar
function atualizar(id, nome, email){
    let student = {id:id, nome:nome, email:email}
    connDAO.update(student, function(student){
        //imprime os dados atualizando
        console.log("Dados atualizados!" + student.id + ":" + student.nome + ":" + student.email)
    })
}

//apagar
function apagar(id){
    let student = {id:id}
    connDAO.delete(student, function(student){
        //imprime confirmação
        console.log("Deletado! " + student.id)
    })
}


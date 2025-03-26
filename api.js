
document.getElementById('salvar').addEventListener('click', () => clienteDados('POST'));
document.getElementById('buscar').addEventListener('click', () => clienteDados('GET'));
document.getElementById('alterar').addEventListener('click', () => clienteDados('PUT'));
document.getElementById('apagar').addEventListener('click', () => clienteDados('DELETE'));

function formatarJSON(dados) {
  return JSON.stringify(dados, null, 2);
}

function atualizarJSONView(dados) {
  const jsonArea = document.getElementById("jsonArea");
  jsonArea.value = formatarJSON(dados);
}

function criaLinha(usuario) {
  if (usuario) {
      document.getElementById("id").value = usuario.id || '';
      document.getElementById("nome").value = usuario.nome || '';
      document.getElementById("email").value = usuario.email || '';
      
      atualizarJSONView(usuario);
  }
}

async function clienteDados(metodo) {
  const id = document.getElementById("id").value;
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  const baseUrl = "http://localhost:3000/student";
  let url = baseUrl;

  if (metodo === "GET" && id) {
    url = `${baseUrl}/${id}`;
    }
  if (metodo === "DELETE" && id) {
    url = `${baseUrl}/${id}`;
    }
  
  const config = {
      method: metodo,
      headers: {
          "Content-Type": "application/json",
      },
  };

  if (metodo === "POST" || metodo === "PUT") {
      if (!nome || !email) {
          exibeResultado("Nome e e-mail são obrigatórios!", true);
          return;
      }
      
      const dados = { 
          id: id || null, 
          nome, 
          email 
      };
      
      config.body = JSON.stringify(dados);

      atualizarJSONView(dados);
  }

  try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      atualizarJSONView(data);
      
      if (metodo === "GET") {
        if (Array.isArray(data) && data.length > 0) {
            criaLinha(data[0]); // Se for array, pega o primeiro
            exibeResultado("Registro encontrado com sucesso!");
        } else if (data.id) { 
            criaLinha(data); // Se já for um objeto único, usa direto
            exibeResultado("Registro encontrado com sucesso!");
        } else {
            exibeResultado("Nenhum registro encontrado com este ID.", true);
        }
    }else {
          exibeResultado(`Operação ${metodo} realizada com sucesso!`);
          console.log("Resposta do servidor:", data);
          
          if (metodo === "DELETE" || metodo === "POST") {
              document.getElementById("id").value = "";
              document.getElementById("nome").value = "";
              document.getElementById("email").value = "";
          }
      }
  } catch (error) {
      console.error("Erro na requisição:", error);
      exibeResultado(`Erro: ${error.message}`, true);
      
      document.getElementById("jsonArea").value = `Erro: ${error.message}`;
  }
}


//button animation

document.getElementById("btn-comoFunciona").addEventListener("click", function() {
    const section = document.getElementById("passos");
    section.scrollIntoView({ behavior: "smooth" });
});

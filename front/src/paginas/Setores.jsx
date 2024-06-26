import "./componentes.css";
import axios from "axios";
import { useState, useEffect } from "react";

function Setores() {
  // Entidades e listas utilizadas na página
  const [setor, setSetor] = useState(null);
  const [setores, setSetores] = useState([]);

  // Funções de carregamento de dados do backend
  function getSetores() {
    axios.get("http://localhost:3005/setores").then((resposta) => {
      setSetores(resposta.data);
    });
  }

  useEffect(() => {
    getSetores();
  }, []);

  // Funções para manipulação da entidade principal
  function novoSetor() {
    setSetor({
      codigo: "",
      nome: "",
    });
  }

  function editarSetor(setor) {
    setSetor({
      _id: setor._id,
      codigo: setor.codigo,
      nome: setor.nome,
    });
  }

  function alterarSetor(campo, valor) {
    setSetor((prevSetor) => ({
      ...prevSetor,
      [campo]: valor,
    }));
  }

  function excluirSetor(id) {
    axios.delete(`http://localhost:3005/setores/${id}`).then(() => {
      reiniciarEstadoDosObjetos();
    });
  }

  function salvarSetor() {
    if (setor._id) {
      axios
        .put(`http://localhost:3005/setores/${setor._id}`, setor)
        .then(() => {
          reiniciarEstadoDosObjetos();
        });
    } else {
      axios.post("http://localhost:3005/setores", setor).then(() => {
        reiniciarEstadoDosObjetos();
      });
    }
  }

  function reiniciarEstadoDosObjetos() {
    setSetor(null);
    getSetores();
  }

  // Função para geração do formulário
  function getFormulario() {
    return (
      <form>
        <label>Código</label>
        <input
          type="text"
          name="codigo"
          value={setor.codigo}
          onChange={(e) => {
            alterarSetor(e.target.name, e.target.value);
          }}
        />
        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={setor.nome}
          onChange={(e) => {
            alterarSetor(e.target.name, e.target.value);
          }}
        />
        <button
          type="button"
          onClick={() => {
            salvarSetor();
          }}
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={() => {
            setSetor(null);
          }}
        >
          Cancelar
        </button>
      </form>
    );
  }

  // Funções para geração da tabela
  function getLinhaDaTabela(setor) {
    return (
      <tr key={setor._id}>
        <td>{setor._id}</td>
        <td>{setor.codigo}</td>
        <td>{setor.nome}</td>
        <td>
          <button
            type="button"
            onClick={() => {
              if (window.confirm(`Confirmar a exclusão do setor ${setor.nome}?`)) {
                excluirSetor(setor._id);
              }
            }}
          >
            Excluir
          </button>
          <button
            type="button"
            onClick={() => {
              editarSetor(setor);
            }}
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }

  function getLinhasDaTabela() {
    return setores.map((setor) => getLinhaDaTabela(setor));
  }

  function getTabela() {
    return (
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
          {getLinhasDaTabela()}
        </tbody>
      </table>
    );
  }

  // Função do conteúdo principal
  function getConteudo() {
    if (setor == null) {
      return (
        <>
          <button
            type="button"
            onClick={() => {
              novoSetor();
            }}
          >
            Novo setor
          </button>
          {getTabela()}
        </>
      );
    } else {
      return getFormulario();
    }
  }

  return (
    <div className="cadastros">
      <div className="conteudo">{getConteudo()}</div>
    </div>
  );
}

export default Setores;



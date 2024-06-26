import "./componentes.css";
import axios from "axios";
import Select from "react-select";
import { useState, useEffect } from "react";

//npm install react-select
//Estilos do componente react-select
const selectStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    margin: 0,
    borderRadius: 3,
    borderColor: "gray",
    boxShadow: state.isFocused ? "0 0 0 2px black" : 0,
    ":hover": { borderColor: "black" },
  }),
};

function Sequencias() {
  //Entidades e listas utilizadas na página
  const [sequencia, setSequencia] = useState(null);
  const [sequencias, setSequencias] = useState([]);
  let [individuo, setIndividuo] = useState(null);
  const [individuos, setIndividuos] = useState([]);

  //Funções de carregamento de dados do backend
  function getSequencias() {
    axios.get("http://localhost:3005/sequencias").then((resposta) => {
      setSequencias(resposta.data);
    });
  }

  function getIndividuos() {
    axios.get("http://localhost:3005/individuos").then((resposta) => {
      setIndividuos(resposta.data);
    });
  }

  useEffect(() => {
    getIndividuos();
    getSequencias();
  }, []);

  //Funções para manipulação da entidade principal
  function novaSequencia() {
    setSequencia({
      sequencia: "",
      individuo: null,
    });
  }

  function editarSequencia(sequencia) {
    setSequencia(sequencia);
    setIndividuo({
      value: sequencia.individuo._id,
      label: sequencia.individuo.codigo + ", " + sequencia.individuo.nome,
    });
  }

  function alterarSequencia(campo, valor, id) {
    sequencia[campo] = valor;
    setSequencia({
      _id: id,
      sequencia: sequencia.sequencia,
      individuo: sequencia.individuo,
    });
  }

  function excluirSequencia(id) {
    axios.delete("http://localhost:3005/sequencias/" + id).then(() => {
      reiniciarEstadoDosObjetos();
    });
  }

  function salvarSequencia() {
    if (sequencia._id) {
      axios
        .put("http://localhost:3005/sequencias/" + sequencia._id, sequencia)
        .then(() => {
          reiniciarEstadoDosObjetos();
        });
    } else {
      axios.post("http://localhost:3005/sequencias", sequencia).then(() => {
        reiniciarEstadoDosObjetos();
      });
    }
  }

  function reiniciarEstadoDosObjetos() {
    setIndividuo(null);
    setSequencia(null);
    getSequencias();
  }

  //Caixa de seleção de INDIVÍDUOS
  function getSelectIndividuos() {
    const vetIndividuos = [];
    for (let i = 0; i < individuos.length; i++) {
      const individuo = individuos[i];
      vetIndividuos[i] = {
        value: individuo._id,
        label: individuo.codigo + ", " + individuo.nome,
      };
    }

    return (
      <Select
        isClearable={false}
        value={individuo}
        onChange={onChangeSelectIndividuo}
        options={vetIndividuos}
        styles={selectStyles}
      />
    );
  }

  function onChangeSelectIndividuo(individuo) {
    setIndividuo(individuo);
    setSequencia({
      _id: sequencia._id,
      sequencia: sequencia.sequencia,
      individuo: individuo.value,
    });
  }

  //Função para geração do formulário
  function getFormulario() {
    return (
      <form>
        <label>Indivíduo</label>
        {getSelectIndividuos()}
        <label>Sequência</label>
        <input
          type="text"
          name="sequencia"
          value={sequencia.sequencia}
          onChange={(e) => {
            alterarSequencia(e.target.name, e.target.value, sequencia._id);
          }}
        />
        <button
          type="button"
          onClick={() => {
            salvarSequencia();
          }}
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={() => {
            reiniciarEstadoDosObjetos();
          }}
        >
          Cancelar
        </button>
      </form>
    );
  }

  //Funções para geração da tabela
  function getLinhaDaTabela(sequencia) {
    const individuoSeq = sequencia.individuo;
    return (
      <tr key={sequencia._id}>
        <td>{sequencia._id}</td>
        <td>{individuoSeq.codigo + ", " + individuoSeq.nome}</td>
        <td>{sequencia.sequencia}</td>
        <td>
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "Confirmar a exclusão da sequência " +
                    sequencia.sequencia +
                    "?"
                )
              ) {
                excluirSequencia(sequencia._id);
              }
            }}
          >
            Excluir
          </button>
          <button
            type="button"
            onClick={() => {
              editarSequencia(sequencia);
            }}
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }

  function getLinhasDaTabela() {
    const linhasDaTabela = [];
    for (let i = 0; i < sequencias.length; i++) {
      const sequencia = sequencias[i];
      if (sequencia.individuo) {
        linhasDaTabela[i] = getLinhaDaTabela(sequencia);
      }
    }
    return linhasDaTabela;
  }

  function getTabela() {
    return (
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Indivíduo</th>
            <th>Sequência</th>
            <th>Ações</th>
          </tr>
          {getLinhasDaTabela()}
        </tbody>
      </table>
    );
  }

  //Função do conteúdo principal
  function getConteudo() {
    if (sequencia == null) {
      return (
        <>
          <button
            type="button"
            onClick={() => {
              novaSequencia();
            }}
          >
            Nova sequência
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

export default Sequencias;

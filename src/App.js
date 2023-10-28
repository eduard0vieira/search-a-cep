import { FiSearch } from "react-icons/fi";
import "./styles.css";
import { useState } from "react";
import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (!input) {
      alert("Preencha com um CEP");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch (error) {
      alert("Insira um CEP válido.");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Search a CEP</h1>

      <div className="containerInput">
        <input type="text" placeholder="Type your cep..." value={input} onChange={(e) => setInput(e.target.value)} />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={30} color="#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep} </h2>
          <span>{cep.logradouro}</span>
          <span>{cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;

import { useState } from "react";
import { TextInput, Button, Alert, Title, Container, Stack } from "@mantine/core";
import { useNavigate, Link } from "react-router-dom";
import { cadastrarUsuario } from "../services/api"; // Usando o Axios que criamos

export function CadastroSecretarioPage() {
  const navigate = useNavigate();
  
  // Estados do formulário (removemos cpf e telefone pois não existem no banco)
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  
  // Estados de erro
  const [erroNome, setErroNome] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [erroGeral, setErroGeral] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function cadastrar(e: React.FormEvent) {
    e.preventDefault();
    setErroGeral(""); 
    setSucesso("");
    
    // 1. Limpar erros antigos
    setErroNome(""); setErroEmail(""); setErroSenha("");

    let temErro = false;

    // 2. Validações na mão
    if (nome.trim().length < 3) {
      setErroNome("O nome deve ter pelo menos 3 letras.");
      temErro = true;
    }
    if (!email.includes("@")) {
      setErroEmail("Digite um e-mail válido.");
      temErro = true;
    }
    if (senha.length < 6) {
      setErroSenha("A senha deve ter pelo menos 6 caracteres.");
      temErro = true;
    }

    if (temErro) return; 

    // 3. Chama a API (Axios)
    setCarregando(true);
    try {
      await cadastrarUsuario({ nome, email, senha });
      setSucesso("Secretário cadastrado com sucesso!");
      setTimeout(() => navigate("/home"), 2000); 
    } catch (error: any) {
      // Mostra o erro real da API
      const msg = error.response?.data?.error || "Erro ao cadastrar secretário.";
      const detalhes = error.response?.data?.detalhes?.[0]?.mensagem;
      setErroGeral(detalhes || msg);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <Container size="xs" mt="xl">
      <Title order={2} mb="lg">Cadastrar Secretário</Title>
      
      {erroGeral && <Alert color="red" mb="md">{erroGeral}</Alert>}
      {sucesso && <Alert color="green" mb="md">{sucesso}</Alert>}

      <form onSubmit={cadastrar}>
        <Stack>
          <TextInput 
            label="Nome" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            error={erroNome} 
          />
          <TextInput 
            label="E-mail" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            error={erroEmail} 
          />
          <TextInput 
            label="Senha" 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            error={erroSenha} 
          />
          <Button type="submit" fullWidth loading={carregando}>
            Cadastrar
          </Button>
        </Stack>
      </form>

      <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13 }}>
        <Link to="/" style={{ color: '#008080', textDecoration: 'none', fontWeight: 600 }}>
          Voltar para o Login
        </Link>
      </div>
    </Container>
  );
}
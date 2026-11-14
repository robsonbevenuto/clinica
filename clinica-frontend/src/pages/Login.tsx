import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../services/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [carregando, setCarregando] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    setErro('')
    setCarregando(true)
    try {
      // Chama a API de login (que criamos no api.ts)
      await login({ email, senha })
      navigate('/home')
    } catch (error: any) {
      // Se der erro (ex: senha errada), mostra a mensagem
      setErro(error.response?.data?.error || 'E-mail ou senha incorretos!')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#e0f2f1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif"
    }}>
      <div style={{
        background: '#fff',
        padding: '40px',
        borderRadius: 14,
        boxShadow: '0 4px 16px rgba(0,128,128,0.1)',
        width: '100%',
        maxWidth: 400
      }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>🏥</div>
          <h1 style={{ fontSize: 22, fontWeight: 600, color: '#008080', margin: 0 }}>Clínica API</h1>
          <p style={{ fontSize: 13, color: '#666', marginTop: 4 }}>Faça login para acessar o sistema</p>
        </div>

        {erro && (
          <div style={{ background: '#ffebee', color: '#c62828', padding: 10, borderRadius: 8, fontSize: 13, marginBottom: 20, textAlign: 'center' }}>
            {erro}
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#333' }}>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@clinica.com"
            style={{ width: '100%', padding: '10px 12px', border: '1px solid #cce8e8', borderRadius: 8, marginTop: 4, outline: 'none' }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#333' }}>Senha</label>
          <div style={{ position: 'relative' }}>
            <input
              type={mostrarSenha ? 'text' : 'password'}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Sua senha"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #cce8e8', borderRadius: 8, marginTop: 4, outline: 'none' }}
            />
            <span
              onClick={() => setMostrarSenha(!mostrarSenha)}
              style={{ position: 'absolute', right: 12, top: 14, cursor: 'pointer', fontSize: 16 }}
            >
              {mostrarSenha ? '🙈' : '👁️'}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogin}
          disabled={carregando}
          style={{
            width: '100%',
            padding: '12px',
            background: '#008080',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: carregando ? 'not-allowed' : 'pointer',
            opacity: carregando ? 0.7 : 1
          }}
        >
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13 }}>
          <Link to="/cadastro" style={{ color: '#008080', textDecoration: 'none', fontWeight: 600 }}>
            Criar nova conta de secretário
          </Link>
        </div>
      </div>
    </div>
  )
}
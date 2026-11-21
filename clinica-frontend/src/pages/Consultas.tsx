/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, NativeSelect, TextInput, Textarea, Button, Table } from '@mantine/core'
import { getConsultas, getPacientes, getMedicos, createConsulta, deleteConsulta } from '../services/api'

interface Paciente { id: number; nome: string }
interface Medico { id: number; nome: string }
interface Consulta { id: number; data: string; turno: string; paciente: Paciente; medico: Medico; }

export default function Consultas() {
  const navigate = useNavigate()
  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [medicos, setMedicos] = useState<Medico[]>([])
  const [modalAberto, setModalAberto] = useState(false)
  const [form, setForm] = useState({ pacienteId: '', medicoId: '', data: '', turno: 'M', observacoes: '' })

  const carregarDados = useCallback(async () => {
    try {
      const [dadosConsultas, dadosPacientes, dadosMedicos] = await Promise.all([
        getConsultas(), getPacientes(), getMedicos()
      ])
      setConsultas(dadosConsultas)
      setPacientes(dadosPacientes)
      setMedicos(dadosMedicos)
    } catch (error) {
      console.error("Erro ao buscar dados:", error)
    }
  }, [])

  useEffect(() => { carregarDados() }, [carregarDados])

  const salvarConsulta = async () => {
    if (!form.pacienteId || !form.medicoId || !form.data) {
      alert("ERRO: Preencha o Paciente, o Médico e a Data.");
      return;
    }

    try {
      // AQUI ESTÁ A CORREÇÃO: Converte para UTC só na hora de enviar
      const dataIso = new Date(form.data).toISOString();

      const payload = {
        pacienteId: Number(form.pacienteId),
        medicoId: Number(form.medicoId),
        data: dataIso,
        turno: form.turno,
        observacoes: form.observacoes
      }
      
      await createConsulta(payload)
      setModalAberto(false)
      setForm({ pacienteId: '', medicoId: '', data: '', turno: 'M', observacoes: '' })
      carregarDados()
      alert("Consulta agendada com sucesso!");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string; detalhes?: { mensagem: string }[] } } };
      const detalhes = err.response?.data?.detalhes?.[0]?.mensagem;
      const msg = err.response?.data?.error || "Erro de rede";
      alert(`FALHOU: ${detalhes || msg}`);
      console.error(error);
    }
  }

  const handleDeletar = async (id: number) => {
    if (confirm('Deseja deletar esta consulta?')) {
      try {
        await deleteConsulta(id)
        carregarDados()
      } catch (error) {
        console.error("Erro ao deletar", error)
        alert('Não foi possível deletar.');
      }
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#e0f2f1', fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 28px', background: '#008080' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontSize: 17, fontWeight: 600 }}>
          <div style={{ width: 28, height: 28, background: 'rgba(255,255,255,0.18)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>✚</div>
          Clínica API
        </div>
        <div style={{ display: 'flex', gap: 2 }}>
          {[{ label: 'Home', path: '/home' }, { label: 'Médicos', path: '/medicos' }, { label: 'Pacientes', path: '/pacientes' }, { label: 'Consultas', path: '/consultas' }].map((item) => (
            <span key={item.label} onClick={() => navigate(item.path)} style={{ color: item.path === '/consultas' ? '#fff' : 'rgba(255,255,255,0.75)', fontSize: 12, padding: '5px 11px', borderRadius: 6, background: item.path === '/consultas' ? 'rgba(255,255,255,0.2)' : 'transparent', fontWeight: item.path === '/consultas' ? 500 : 400, cursor: 'pointer' }}>
              {item.label}
            </span>
          ))}
        </div>
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', color: '#008080', border: 'none', borderRadius: 8, padding: '7px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
          ↩ Sair
        </button>
      </nav>

      <div style={{ padding: '32px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 600, color: '#008080', margin: 0 }}>Consultas</h1>
            <p style={{ fontSize: 13, color: '#666', margin: '4px 0 0' }}>Gerencie as consultas da clínica</p>
          </div>
          <Button color="teal" onClick={() => setModalAberto(true)}>+ Nova Consulta</Button>
        </div>

        <div style={{ background: '#fff', padding: 20, borderRadius: 14, boxShadow: '0 4px 16px rgba(0,128,128,0.08)' }}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Paciente</Table.Th>
                <Table.Th>Médico</Table.Th>
                <Table.Th>Data</Table.Th>
                <Table.Th>Turno</Table.Th>
                <Table.Th>Ações</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {consultas.map((c: Consulta) => (
                <Table.Tr key={c.id}>
                  <Table.Td>{c.paciente?.nome || 'N/A'}</Table.Td>
                  <Table.Td>{c.medico?.nome || 'N/A'}</Table.Td>
                  <Table.Td>{new Date(c.data).toLocaleDateString('pt-BR')}</Table.Td>
                  <Table.Td>{c.turno === 'M' ? 'Manhã' : 'Tarde'}</Table.Td>
                  <Table.Td>
                    <Button size="xs" color="red" variant="subtle" onClick={() => handleDeletar(c.id)}>Excluir</Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </div>

      <Modal opened={modalAberto} onClose={() => setModalAberto(false)} title="Nova Consulta">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          <NativeSelect
            label="Paciente"
            data={[{ value: '', label: 'Selecione um paciente' }, ...pacientes.map((p: Paciente) => ({ value: String(p.id), label: p.nome }))]}
            value={form.pacienteId}
            onChange={(e) => setForm({ ...form, pacienteId: e.currentTarget.value })}
          />

          <NativeSelect
            label="Médico"
            data={[{ value: '', label: 'Selecione um médico' }, ...medicos.map((m: Medico) => ({ value: String(m.id), label: m.nome }))]}
            value={form.medicoId}
            onChange={(e) => setForm({ ...form, medicoId: e.currentTarget.value })}
          />

          {/* AQUI ESTÁ A CORREÇÃO DO RELÓGIO */}
          <TextInput
            label="Data e Hora"
            type="datetime-local"
            value={form.data}
            onChange={(e) => setForm({ ...form, data: e.currentTarget.value })}
          />

          <NativeSelect
            label="Turno"
            data={[{ value: 'M', label: 'Manhã' }, { value: 'T', label: 'Tarde' }]}
            value={form.turno}
            onChange={(e) => setForm({ ...form, turno: e.currentTarget.value })}
          />

          <Textarea
            label="Observações"
            value={form.observacoes}
            onChange={(e) => setForm({ ...form, observacoes: e.currentTarget.value })}
            minRows={2}
          />

          <Button type="button" color="teal" fullWidth onClick={salvarConsulta}>
            Salvar
          </Button>
        </div>
      </Modal>
    </div>
  )
}
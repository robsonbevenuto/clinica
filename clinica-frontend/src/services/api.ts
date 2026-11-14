import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// ========== MÉDICOS ==========
export const getMedicos = async () => (await api.get('/medicos')).data;
export const getMedico = async (id: number) => (await api.get(`/medicos/${id}`)).data;
export const createMedico = async (data: any) => (await api.post('/medicos', data)).data;
export const updateMedico = async (id: number, data: any) => (await api.put(`/medicos/${id}`, data)).data;
export const deleteMedico = async (id: number) => await api.delete(`/medicos/${id}`);

// ========== PACIENTES ==========
export const getPacientes = async () => (await api.get('/pacientes')).data;
export const getPaciente = async (id: number) => (await api.get(`/pacientes/${id}`)).data;
export const createPaciente = async (data: any) => (await api.post('/pacientes', data)).data;
export const updatePaciente = async (id: number, data: any) => (await api.put(`/pacientes/${id}`, data)).data;
export const deletePaciente = async (id: number) => await api.delete(`/pacientes/${id}`);

// ========== CONSULTAS ==========
export const getConsultas = async () => (await api.get('/consultas')).data;
export const createConsulta = async (data: any) => (await api.post('/consultas', data)).data;
export const deleteConsulta = async (id: number) => await api.delete(`/consultas/${id}`);

// ========== USUÁRIOS (LOGIN E CADASTRO) ==========
export const login = async (data: any) => (await api.post('/usuarios/login', data)).data;
export const cadastrarUsuario = async (data: any) => (await api.post('/usuarios/cadastro', data)).data;
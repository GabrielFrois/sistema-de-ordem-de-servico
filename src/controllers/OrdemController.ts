import { Request, Response } from 'express';
import Ordem from '../models/Ordem';

export const OrdemController = {
    // Create
    async create(req: Request, res: Response) {
        try {
            const novaOrdem = await Ordem.create(req.body);
            res.status(201).json(novaOrdem);
        } catch (error) {
            res.status(400).json({ error: 'Erro ao criar ordem' });
        }
    },

    // Read
    async getAll(req: Request, res: Response) {
        try {
            const { status, prioridade, setor, busca } = req.query;
            const filtro: any = {};

            // Filtros exatos
            if (status) filtro.status = status;
            if (prioridade) filtro.prioridade = prioridade;
            
            // Filtros parciais
            if (setor) filtro.setor = { $regex: setor, $options: 'i' };
            if (busca) filtro.titulo = { $regex: busca, $options: 'i' };

            const ordens = await Ordem.find(filtro).sort({ dataAbertura: -1 });
            res.json(ordens);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar ordens' });
        }
    },

    // Read One
    async getById(req: Request, res: Response) {
        try {
            const ordem = await Ordem.findById(req.params.id);
            if (!ordem) return res.status(404).json({ error: 'Ordem não encontrada' });
            res.json(ordem);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar ordem' });
        }
    },

    // Update
    async update(req: Request, res: Response) {
        try {
            const ordem = await Ordem.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!ordem) return res.status(404).json({ error: 'Ordem não encontrada' });
            res.json(ordem);
        } catch (error) {
            res.status(400).json({ error: 'Erro ao atualizar ordem' });
        }
    },

    // Delete
    async delete(req: Request, res: Response) {
        try {
            const ordem = await Ordem.findByIdAndDelete(req.params.id);
            if (!ordem) return res.status(404).json({ error: 'Ordem não encontrada' });
            res.json({ message: 'Ordem excluída com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao excluir ordem' });
        }
    }
};
import mongoose, { Schema, Document } from 'mongoose';

export interface IOrdem extends Document {
    titulo: string;
    descricao: string;
    dataAbertura: Date;
    status: 'aberta' | 'em andamento' | 'concluída';
    prioridade: 'baixa' | 'média' | 'alta';
    responsavel?: string;
    setor: string;
    prazo?: Date;
    valor: number;
}

const OrdemSchema: Schema = new Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    dataAbertura: { type: Date, default: Date.now },
    status: { 
        type: String, 
        required: true, 
        enum: ['aberta', 'em andamento', 'concluída'],
        default: 'aberta'
    },
    prioridade: { 
        type: String, 
        required: true, 
        enum: ['baixa', 'média', 'alta'] 
    },
    responsavel: { type: String },
    setor: { type: String, required: true },
    prazo: { type: Date },
    valor: { type: Number, required: true }
});

export default mongoose.model<IOrdem>('Ordem', OrdemSchema);
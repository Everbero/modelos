// models/Anuncio.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IAnuncio extends Document {
  nome: string;
  idade: number;
  telefone: string;
  foto: string;
  descricao: string;
  cache: string;
}

const AnuncioSchema: Schema = new Schema(
  {
    nome: { type: String, required: true },
    idade: { type: Number, required: true },
    telefone: { type: String, required: true },
    foto: { type: String, required: true },
    descricao: { type: String, required: true },
    cache: { type: String, required: true },
  },
  {
    timestamps: true, // Adiciona campos createdAt e updatedAt automaticamente
  }
);

const Anuncio: Model<IAnuncio> =
  mongoose.models.Anuncio || mongoose.model<IAnuncio>("Anuncio", AnuncioSchema);

export default Anuncio;

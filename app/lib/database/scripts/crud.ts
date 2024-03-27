"use server";
import dbConnect from "../mongodb";
import Anuncio from "../models/Anuncio";
import type AnuncioData from "@/app/types/Anuncio";

const getAds = async () => {
  await dbConnect();
  try {
    const anuncios = await Anuncio.find({});
    return JSON.stringify(anuncios);
  } catch (error) {
    throw new Error("Erro ao buscar anúncios");
  }
};
// get ad by id
const getAd = async (id: string) => {
  await dbConnect();
  try {
    const anuncio = await Anuncio.findById(id);
    if (!anuncio) {
      throw new Error("Anúncio não encontrado");
    }
    return JSON.stringify(anuncio);
  } catch (error) {
    throw new Error("Erro ao buscar anúncio");
  }
};

const createAd = async (data: AnuncioData) => {
  await dbConnect();
  try {
    const anuncio = await Anuncio.create(data);
    if(!anuncio){
      throw new Error("Não foi criar anúncio");
    }
    return true;
  } catch (error) {
    throw new Error("Erro ao criar anúncio");
  }
};
// put ad
const updateAd = async (data: AnuncioData) => {
  await dbConnect();
  console.log( data._id, data.nome, data.idade, data.telefone, data.descricao, data.cache)
  try {
    const anuncio = await Anuncio.findByIdAndUpdate(data._id, data, {
      new: true,
      runValidators: true,
    });
    if(!anuncio){
      throw new Error("Não foi possível atualizar");
    }
    return true
  } catch (error) {
    throw new Error("Erro ao atualizar anúncio");
  }
};
// delete ad
const deleteAd = async (id: string) => {
  await dbConnect();
  try {
    const deletedAnuncio = await Anuncio.findByIdAndDelete(id);
    if(!deletedAnuncio){
      throw new Error("Anúncio não encontrado");
    }
    return true
  } catch (error) {
    throw new Error("Erro ao deletar anúncio");
  }
};

export { getAds, getAd, createAd, updateAd, deleteAd };

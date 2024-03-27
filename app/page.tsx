"use client";
import { useEffect, useState } from "react";
import type AnuncioData from "./types/Anuncio"; // Ajuste o caminho conforme necessário
import { getAds, deleteAd } from "./lib/database/scripts/crud";
import Link from "next/link";

export default function Home() {
  const [anuncios, setAnuncios] = useState<AnuncioData[]>([]);

  const fetchAnuncios = async () => {
    const ads = await getAds();
    const data: AnuncioData[] = JSON.parse(ads);
    setAnuncios(data);
  };

  useEffect(() => {
    fetchAnuncios();
  }, []);

  const HandleDelete = async (id: string) => {
    const deleted = await deleteAd(id);
    if (deleted !== undefined) {
      alert("Anúncio deletado com sucesso!");
      fetchAnuncios();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900 my-6">
        {anuncios.length ? "Modelos Disponíveis" : "Nenhum anúncio ainda..."}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {anuncios && anuncios.map((modelo) => (
          <div
            key={modelo._id}
            className="bg-white shadow overflow-hidden rounded-lg"
          >
            <img
              src={modelo.foto}
              alt={`Foto de ${modelo.nome}`}
              className="w-full h-48 object-cover object-center"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {modelo.nome}
              </h2>
              <p className="text-gray-600">Idade: {modelo.idade}</p>
              <p className="text-gray-600">Telefone: {modelo.telefone}</p>
              <p className="text-gray-600">Descrição: {modelo.descricao}</p>
              <p className="font-semibold text-gray-800">
                Cachê:{" "}
                {Number(modelo.cache).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              {/* edit & delete buttons div*/}
              <div className="flex justify-end">
                <Link
                  href={`/anuncios/${modelo._id}/editar`}
                  className="text-blue-600 hover:text-blue-800 mr-2"
                >
                  Editar
                </Link>
                <Link
                  href={`/`}
                  className="text-red-600 hover:text-red-800"
                  onClick={() => HandleDelete(modelo._id as string)}
                >
                  Deletar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

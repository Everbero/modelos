// formulario de criação de anuncio
"use client";
import { useEffect, useState } from "react";
import { updateAd } from "@/app/lib/database/scripts/crud";

const EditForm: React.FC<{ ad: any }> = ({ ad }) => {
  const [formData, setFormData] = useState(JSON.parse(ad));

  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "foto") {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const maxSize = 1 * 1024 * 1024; // 1MB em bytes
        if (file.size > maxSize) {
          alert("O arquivo deve ser menor que 5MB.");
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prevState: any) => ({
            ...prevState,
            foto: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Supondo que createAd pode lidar com a string base64 para 'foto'
      const ad = await updateAd(formData);
      console.log("Anúncio criado:", ad);
      alert("Anúncio criado com sucesso!");
      // Limpar o formulário ou redirecionar o usuário
    } catch (error) {
      console.error("Erro ao criar anúncio:", error);
      alert("Erro ao criar anúncio. Por favor, tente novamente.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow"
      >
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 text-black rounded-md"
        />
        <input
          type="number"
          name="idade"
          min={18}
          placeholder="Idade"
          value={formData.idade}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 text-black rounded-md"
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={formData.telefone}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 text-black rounded-md"
        />
        {/* file input */}
        <label htmlFor="foto" className="text-sm text-gray-600">
          Foto
        </label>
        <img src={formData.foto} alt="foto" />
        <input
          type="file"
          name="foto"
          id="foto"
          accept="image/*"
        //   onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-black rounded-md file:cursor-pointer"
        />
        <textarea
          name="descricao"
          placeholder="Descrição"
          value={formData.descricao}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 text-black rounded-md"
        />
        <input
          type="number"
          step={0.01}
          name="cache"
          placeholder="Cachê"
          value={formData.cache}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 text-black rounded-md"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Atualizar Anúncio
        </button>
      </form>
    </div>
  );
};
export default EditForm;

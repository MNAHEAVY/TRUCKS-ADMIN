import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Crear() {
  const initialFormState = {
    code: "",
    name: "",
    description: "",
    brand: "",
    group: "",
    image: ""
  };

  const [loading, setLoading] = useState(false);
  const [inputForm, setInputForm] = useState(initialFormState);

  function handleChange(e) {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value,
    });
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "w7o6rpzj");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dxsl6lphv/image/upload",
        formData
      );

      setInputForm(prev => ({
        ...prev,
        image: res.data.secure_url
      }));
    } catch (error) {
      toast.error("Error al subir la imagen");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputForm.image) {
      toast.error("Debe subir una imagen");
      return;
    }

    try {
      await axios.post("http://localhost:3001/products", inputForm);
      toast.success("Producto creado correctamente");
      setInputForm(initialFormState);
    } catch (error) {
      toast.error(error.response?.data?.error || "Producto duplicado o inválido");
    }
  };

  return (
    <div className="relative isolate overflow-hidden bg-white px-6 pb-6">
      <h2 className="text-center font-semibold">Agregar producto nuevo</h2>

      <div className="flex px-6 pt-6 gap-3 justify-center">
        <span> Sube una imagen</span>
        <input type="file" onChange={handleImageUpload} />
        {loading && <span>Subiendo...</span>}
      </div>

      {inputForm.image && (
        <div className="flex justify-center mt-4">
          <img
            src={inputForm.image}
            className="w-[120px] h-[150px] object-cover border rounded-lg"
          />
        </div>
      )}

      <ToastContainer />

      <form className="px-24 mt-6 py-4" onSubmit={handleSubmit}>
        <input className="border rounded my-2 mx-2  py-1" name="code" placeholder="Código" onChange={handleChange} required />
        <input className="border rounded my-2 mx-2  py-1" name="name" placeholder="Nombre" onChange={handleChange} required />
    <textarea
  name="description"
  placeholder="Descripción" 
  onChange={handleChange}
  required
  rows={5}
  className="w-full border rounded px-3 py-2 resize-y"
/>
        <input className="border rounded my-2 mx-2  py-1" name="brand" placeholder="Marca" onChange={handleChange} required />
        <input className="border rounded my-2 mx-2  py-1" name="group" placeholder="Grupo" onChange={handleChange} required />

        <button type="submit" className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded">
          Crear Producto
        </button>
      </form>
    </div>
  );
}

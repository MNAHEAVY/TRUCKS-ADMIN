import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BorrarSimple() {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://trucks-admin-production.up.railway.app/products");
      const data = await res.json();
      setProductos(data);
    } catch {
      toast.error("Error al obtener productos");
    }
  };

  useEffect(() => {
    const result = productos
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));
    setFilteredProductos(result);
  }, [searchTerm, productos]);

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`https://trucks-admin-production.up.railway.app/product/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error();
      toast.success("Producto eliminado");
      setProductos(prev => prev.filter(p => p._id !== id));
    } catch {
      toast.error("Error al borrar el producto");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="mb-4 flex justify-center">
        <input
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full max-w-sm"
        />
      </div>

      <table className="w-full text-sm table-fixed border-collapse">

    <thead className="bg-gray-100">
  <tr>
    <th className="w-20 px-2 py-2 text-left">Imagen</th>
    <th className="w-28 px-2 py-2 text-left">Código</th>
    <th className="w-56 px-2 py-2 text-left">Nombre</th>
    <th className="w-40 px-2 py-2 text-left">Marca</th>
    <th className="w-32 px-2 py-2 text-left">Borrar</th>
  </tr>
</thead>

       <tbody>
  {filteredProductos.map(p => (
    <tr key={p._id} className="border-t">
      <td className="w-20 px-2 py-1">
        <img src={p.image} className="h-10 w-10 object-cover" />
      </td>

      <td className="w-28 px-2 py-1 truncate">{p.code}</td>
      <td className="w-56 px-2 py-1 truncate">{p.name}</td>
      <td className="w-40 px-2 py-1 truncate">{p.brand}</td>

      <td className="w-32 px-2 py-1">
        <button
          onClick={() => deleteProduct(p._id)}
          className="bg-red-500 text-white px-2 py-1 text-xs rounded">
          Borrar
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
}

import { useState, useEffect, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductosSimple() {
  const [productos, setProductos] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3001/products");
      const data = await res.json();
      setProductos(data);
    } catch {
      toast.error("Error al obtener productos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const filteredProductos = useMemo(() => {
    return productos
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [productos, searchTerm]);

  const handleInputChange = (e, id, field) => {
    setProductos(prev =>
      prev.map(p => p._id === id ? { ...p, [field]: e.target.value } : p)
    );
  };

  const updateProduct = async (id, product) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`http://localhost:3001/product/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
      });

      if (!res.ok) throw new Error();
      toast.success("Producto actualizado");
    } catch {
      toast.error("Error al actualizar");
    } finally {
      setIsUpdating(false);
      setEditingProductId(null);
      fetchProducts();
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-center mb-4">
        <input
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full max-w-sm"
        />
      </div>

      {isLoading ? <p>Cargando...</p> : (
       <table className="w-full text-sm table-fixed border-collapse">

      <thead className="bg-gray-100">
  <tr>
    <th className="w-20 px-2 py-2 text-left">Imagen</th>
    <th className="w-24 px-2 py-2 text-left">Código</th>
    <th className="w-48 px-2 py-2 text-left">Nombre</th>
    <th className="w-32 px-2 py-2 text-left">Marca</th>
    <th className="w-32 px-2 py-2 text-left">Grupo</th>
    <th className="w-40 px-2 py-2 text-left">Acción</th>
  </tr>
</thead>

          <tbody>
  {filteredProductos.map(p => (
    <tr key={p._id} className="border-t">
      <td className="w-20 px-2 py-1">
        <img src={p.image} className="h-10 w-10 object-cover" />
      </td>

      {["code","name","brand","group"].map(field => (
        <td key={field} className="px-2 py-1 truncate">
          {editingProductId === p._id ? (
            <input
              value={p[field]}
              onChange={e => handleInputChange(e, p._id, field)}
              className="w-full border px-2 py-1 text-sm"
            />
          ) : (
            <span className="block truncate">{p[field]}</span>
          )}
        </td>
      ))}

      <td className="w-40 px-2 py-1">
        {editingProductId === p._id ? (
          <>
            <button
              onClick={() => updateProduct(p._id, p)}
              className="bg-green-500 text-white px-2 py-1 mr-1 text-xs"
            >
              Guardar
            </button>
            <button
              onClick={() => setEditingProductId(null)}
              className="bg-gray-400 text-white px-2 py-1 text-xs"
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditingProductId(p._id)}
            className="bg-blue-500 text-white px-2 py-1 text-xs"
          >
            Editar
          </button>
        )}
      </td>
    </tr>
  ))}
</tbody>

        </table>
      )}
    </div>
  );
}

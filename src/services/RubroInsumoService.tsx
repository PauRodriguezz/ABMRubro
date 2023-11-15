import { DTOInsumoRubro } from '../types/DTOInsumoRubro';

const BASE_URL = 'http://localhost:8080/api/v1/articulosinsumos';

export const RubroInsumoService = {
  
  getRubroInsumos: async (): Promise<DTOInsumoRubro[]> => {
    const response = await fetch(`${BASE_URL}/insumosConRubrosYEstados`);
    const data= await response.json();
    return data;
  },

  createRubroInsumo: async (articuloRubro: DTOInsumoRubro): Promise<DTOInsumoRubro> => {
    const response = await fetch(`${BASE_URL}/insumosConRubrosYEstados`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articuloRubro),
    });
    if (!response.ok) {
      console.error('Error al crear el empleado:', response.statusText);
      throw new Error('No se pudo crear el empleado');
  }
  
  const data = await response.json();
  console.log('Empleado creado con éxito:', data);
  return data;
},

  updateRubroInsumo: async ( id: number, articuloRubro: DTOInsumoRubro): Promise<DTOInsumoRubro> => {
    const response = await fetch(`${BASE_URL}/insumosConRubrosYEstados/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articuloRubro),
    });
    const data = await response.json();
    return data;
  },

  deleteRubroInsumo: async (id: number): Promise<void> => {
    await fetch(`${BASE_URL}/insumosConRubrosYEstados/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        
      }
    })
    .then(response => {
      if (response.ok) {
        console.log('El empleado se eliminó correctamente');
      } else {
        console.error('No se pudo eliminar el empleado');
      }
    })
    .catch(error => {
      console.error('Error al realizar la solicitud DELETE', error);
      });
  }
}
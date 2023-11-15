import { useState, useEffect } from 'react';
import { DTOInsumoRubro, EstadoAB } from "../../types/DTOInsumoRubro";
import { RubroInsumoService } from "../../services/RubroInsumoService";
import { Button, Table } from "react-bootstrap";
import Loader from "../Loader/Loader";
import { ModalType } from "../../types/ModalType";
import { PlusCircle } from "react-bootstrap-icons";
import { EditButton } from "../EditButton/EditButton";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import RubroInsumoModal from "../IngredienteRubroModal/RubroInsumoModal";

const RubroInsumoTable = () => {
  const [rubroInsumos, setRubroInsumos] = useState<DTOInsumoRubro[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRubroInsumos = async () => {
      try {
        const rubroInsumos = await RubroInsumoService.getRubroInsumos();
        console.log("RubroInsumos:", rubroInsumos);
        setRubroInsumos(rubroInsumos);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRubroInsumos();
  }, []);

  const initializeNewRubroInsumo = (): DTOInsumoRubro => {
    return {
      id: 0,
      insumoDenominacion: "",
      rubroDenominacion: "",
      rubroPadreDenominacion: "",
      rubroEstado: EstadoAB.ALTA, // O 'BAJA' según lo que necesites
    };
  };
  

  const [selectedRubroInsumo, setSelectedRubroInsumo] = useState<DTOInsumoRubro>(
    initializeNewRubroInsumo()
  );

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [title, setTitle] = useState("");

  const handleClick = (newTitle: string, rubro: DTOInsumoRubro, modal: ModalType) => {
    setTitle(newTitle);
    setModalType(modal);
    setSelectedRubroInsumo(rubro);
    setShowModal(true);
  };

  const handleDeleteRubroInsumo = async (rubroInsumo: DTOInsumoRubro) => {
    try {
      await RubroInsumoService.deleteRubroInsumo(rubroInsumo.id);
      const updatedRubroInsumos = rubroInsumos.filter((r) => r.id !== rubroInsumo.id);
      setRubroInsumos(updatedRubroInsumos);
    } catch (error) {
      console.error(error);
    }
    setShowModal(false);
  };

  const handleUpdateRubroInsumo = (updatedRubroInsumo: DTOInsumoRubro) => {
    try {
      const updatedRubroInsumos = rubroInsumos.map((r) =>
        r.id === updatedRubroInsumo.id ? updatedRubroInsumo : r
      );
      setRubroInsumos(updatedRubroInsumos);
    } catch (error) {
      console.error(error);
    }
    setShowModal(false);
  };

  return (
    <>
      <Button
        onClick={() =>
          handleClick("Nuevo Rubro Insumo", initializeNewRubroInsumo(), ModalType.CREATE)
        }
      >
        <PlusCircle/>
        Nuevo Rubro Insumo
      </Button>

      {isLoading ? (
        <Loader />
      ) : (
        <Table hover>
          <thead>
            <tr>
              <th>Insumo Denominacion</th>
              <th>Rubro</th>
              <th>Rubro Padre</th>
              <th>Rubro Estado</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {rubroInsumos.map((rubroInsumo) => (
              <tr key={rubroInsumo.id}>
                <td>{rubroInsumo.insumoDenominacion}</td>
                <td>{rubroInsumo.rubroDenominacion}</td>
                <td>{rubroInsumo.rubroPadreDenominacion}</td>
                <td>{rubroInsumo.rubroEstado}</td>
                <td>
                  <EditButton
                    onClick={() =>
                      handleClick("Editar Rubro Insumo", rubroInsumo, ModalType.UPDATE)
                    }
                  />
                </td>
                <td>
                  <DeleteButton
                    onClick={() =>
                      handleClick("Borrar Rubro Insumo", rubroInsumo, ModalType.DELETE)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {showModal && (
        <RubroInsumoModal
          show={showModal}
          onHide={() => setShowModal(false)}
          title={title}
          modalType={modalType}
          rubroInsumo={selectedRubroInsumo}
          onDelete={handleDeleteRubroInsumo}
          onSaveUpdate={handleUpdateRubroInsumo}
        />
      )}
    </>
  );
};

export default RubroInsumoTable;

import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ModalType } from '../../types/ModalType';
import { DTOInsumoRubro } from '../../types/DTOInsumoRubro';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

type RubroInsumoModalProps = {
  show: boolean;
  onHide: () => void;
  title: string;
  modalType: ModalType;
  rubroInsumo: DTOInsumoRubro;
  onDelete: (rubroInsumo: DTOInsumoRubro) => void;
  onSaveUpdate: (rubroInsumo: DTOInsumoRubro) => void;
};

const RubroInsumoModal: React.FC<RubroInsumoModalProps> = ({
  show,
  onHide,
  title,
  modalType,
  rubroInsumo,
  onDelete,
  onSaveUpdate,
}: RubroInsumoModalProps) => {


  const validationSchema = Yup.object().shape({
    id: Yup.number().integer().min(0),
    insumoDenominacion: Yup.string().required('La denominación de insumo es requerida'),
    rubroDenominacion: Yup.string().required('La denominación de rubro es requerida'),
    rubroPadreDenominacion: Yup.string().required('La denominación del rubro padre es requerida'),
    rubroEstado: Yup.string().required('El estado del rubro es requerido'),
  });
  const handleSaveUpdate = async (rubroInsumo: DTOInsumoRubro) => {
    try {
      const isNew = rubroInsumo.id === 0;
      await onSaveUpdate(rubroInsumo);
      toast.success(isNew ? 'Rubro de Insumo Creado' : 'Rubro de Insumo Actualizado', {
        position: 'top-center',
      });
      onHide();
    } catch (error) {
      console.error('Ha ocurrido un Error');
    }
  };

  const handleDelete = async () => {
    try {
      const isNew = rubroInsumo.id === 0;
      await onDelete(rubroInsumo);
      toast.success(isNew ? 'Rubro de Insumo creado' : 'Rubro de Insumo eliminado', {
        position: 'top-center',
      });
      onHide();
    } catch (error) {
      console.error('Ha ocurrido un Error');
    }
  };
  const formik = useFormik({
    initialValues: rubroInsumo,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (obj: DTOInsumoRubro) => handleSaveUpdate(obj),
  });

  return (
    <>
      {modalType === ModalType.DELETE ? (
        <Modal show={show} onHide={onHide} centered backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              ¿Está seguro que desea eliminar el Rubro de Insumo?
              <br /> <strong>{rubroInsumo.insumoDenominacion}</strong>?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Borrar
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal show={show} onHide={onHide} centered backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={formik.handleSubmit}>
              <Form.Group controlId="formInsumoDenominacion">
                <Form.Label>Denominación de Insumo</Form.Label>
                <Form.Control
                  name="insumoDenominacion"
                  type="text"
                  value={formik.values.insumoDenominacion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={Boolean(formik.errors.insumoDenominacion && formik.touched.insumoDenominacion)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.insumoDenominacion}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formRubroDenominacion">
                <Form.Label>Denominación de Rubro</Form.Label>
                <Form.Control
                  name="rubroDenominacion"
                  type="text"
                  value={formik.values.rubroDenominacion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={Boolean(formik.errors.rubroDenominacion && formik.touched.rubroDenominacion)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.rubroDenominacion}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formRubroPadreDenominacion">
                <Form.Label>Denominación de Rubro Padre</Form.Label>
                <Form.Control
                  name="rubroPadreDenominacion"
                  type="text"
                  value={formik.values.rubroPadreDenominacion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={Boolean(formik.errors.rubroPadreDenominacion && formik.touched.rubroPadreDenominacion)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.rubroPadreDenominacion}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formRubroEstado">
                <Form.Label>Estado del Rubro</Form.Label>
                <Form.Control
                  name="rubroEstado"
                  type="text"
                  value={formik.values.rubroEstado}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={Boolean(formik.errors.rubroEstado && formik.touched.rubroEstado)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.rubroEstado}
                </Form.Control.Feedback>
              </Form.Group>
              <Modal.Footer className="mt-4">
                <Button variant="secondary" onClick={onHide}>
                  Cancelar
                </Button>
                <Button variant="primary" type="submit" disabled={!formik.isValid}>
                  Guardar
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default RubroInsumoModal;

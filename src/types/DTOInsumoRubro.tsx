export enum EstadoAB {
        ALTA = 'ALTA',
        BAJA = 'BAJA',
      
      
}
export interface DTOInsumoRubro{
        id: number;
        insumoDenominacion: string;
        rubroDenominacion: string;
        rubroPadreDenominacion: string;
        rubroEstado: EstadoAB;
}


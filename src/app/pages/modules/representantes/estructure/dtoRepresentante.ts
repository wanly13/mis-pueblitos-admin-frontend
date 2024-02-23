export class DtoEventos {
  id: string;
  nombre: string;
  descripcion: string;
  foto: string;
  ubicacionExacta: string;
  fechaInicio: string;
  fechaFin: string;
  lugarId: string;
  lugar: {
    id: string;
    nombre: string;
    descripcion: string;
    foto: string;
    video: string;
    masDestacado: boolean;
    departamentoId: string;
  };
  subEventos: [
    {
      id: string;
      nombre: string;
      descripcion: string;
      foto: string;
      dia: string;
      horaInicio: string;
      horaFin: string;
      eventoId: string;
    }
  ];
}
export class DtoEvento {
  id: string;
  nombre: string;
  descripcion: string;
  foto: string;
  ubicacionExacta: string;
  fechaInicio: string;
  fechaFin: string;
  lugarId: string;
  lugarNombre: string;
  subEventosPorDia: {
    fecha: [
      {
        id: string;
        detalle: string;
        organizador: string;
        foto: string;
        recomendaciones: string;
        horaInicio: string;
        horaFin: string;
        subEventoId: string;
      }
    ];
  };
}

export class DtoRepresenante {
  documentoIdentidad: string;
  celular: number;
  correoElectronico: string;
  created_at: string;
  idEstadoLaboral: string;
  idCargo: string;
  idPais: string;
  nombres: string;
  apellidoMaterno: string;
  apellidoPaterno: string;
  estadoLaboralDesc: string;
  cargoDesc: string;
  paisDesc: string;
  areaDesc: string;
  relacionPoderRepresentante: DtoRelacionPoderRepresentante[] = [];
}
export class DtoRelacionPoderRepresentante {
  nota: string;
  archivo: string;
  idPoder: string;
  created_at: string;
  taxIdEmpresa: string;
  taxIdEntidad: string;
  idEstadoPoder: string;
  idRelacionPoder: string;
  documentoIdentidad: string;
  idTipoRepresentante: string;
}

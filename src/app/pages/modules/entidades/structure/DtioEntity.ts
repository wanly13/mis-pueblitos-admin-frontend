export class DtoCreateLugar {
  nombre: string;
  descripcion: string;
  foto: string;
  video: string;
  masDestacado: boolean;
  departamentoId: string;
}

export class DtoCreateMotivosVisita {
  nombre: string;
  descripcion: string;
  foto: string;
  lugarId: string;
}

export class DtoMotivosVisita {
  id: string;
  nombre: string;
  descripcion: string;
  foto: string;
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
}

export class DtoLugar {
  id: string;
  nombre: string;
  descripcion: string;
  foto: string;
  video: string;
  masDestacado: boolean;
  departamentoId: string;
  eventos: [
    {
      id: string;
      nombre: string;
      descripcion: string;
      foto: string;
      ubicacionExacta: string;
      fechaInicio: string;
      fechaFin: string;
      lugarId: string;
    }
  ];
  motivosVisita: [
    {
      id: string;
      nombre: string;
      descripcion: string;
      foto: string;
      lugarId: string;
    }
  ];
  vistasdelmundo: [
    {
      id: string;
      titulo: string;
      descripcion: string;
      foto: string;
      lugarId: string;
    }
  ];
}

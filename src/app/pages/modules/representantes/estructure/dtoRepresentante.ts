export class ServerResponseRepresentante {
    response: DtoRepresenante[] = [];
    status: number;
    message: string;
    name: string;
}

export class DtoRepresenante {
    documentoIdentidad: string;
    celular: number;
    correoElectronico: string;
    created_at: string;
    idEstadoLaboral: string;
    idArea: string;
    idPais: string;
    taxId: string;
}

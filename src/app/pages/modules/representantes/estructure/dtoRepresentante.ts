
export class DtoRepresenante {

        documentoIdentidad: string
        celular: number
        correoElectronico: string
        created_at: string
        idEstadoLaboral: string
        idCargo: string
        idPais: string
        nombres: string
        apellidoMaterno: string
        apellidoPaterno: string
        estadoLaboralDesc: string
        cargoDesc: string
        paisDesc: string
        areaDesc: string
        relacionPoderRepresentante: DtoRelacionPoderRepresentante[] = []

}
export class DtoRelacionPoderRepresentante {

        nota: string
        archivo: string
        idPoder: string
        created_at: string
        taxIdEmpresa: string
        taxIdEntidad: string
        idEstadoPoder: string
        idRelacionPoder: string
        documentoIdentidad: string
        idTipoRepresentante: string

}
import { NotFoundException } from "@nestjs/common";

export class ApiResponse<T> {
    constructor(
        public success: boolean,
        public message: string,
        public data?: T,
        public error?: string
    ) {}

    static success<T>(data: T, message: string = 'Operación exitosa'): ApiResponse<T> {
        return new ApiResponse(true, message, data);
    }

    static error<T = null>(message: string, error?: string): ApiResponse<T | null> {
        return new ApiResponse<T | null>(false, message, null as T | null, error);
    }

    static notFound<T = null>(message: string = 'Recurso no encontrado'): ApiResponse<T | null> {
        throw new NotFoundException(message);
    }
}

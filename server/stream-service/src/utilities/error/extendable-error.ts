export default class ExtendableError extends Error {
    errors: string;
    status: number;
    isPublic: boolean;
    isOperational: boolean;
    constructor({message, stack, status, errors, isPublic}: any){
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.errors = errors;
        this.status = status;
        this.isPublic = isPublic;
        this.isOperational = true;
        this.stack = stack
    }
}
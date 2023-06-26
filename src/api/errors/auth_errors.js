export class AccessDeniedError extends Error {
    constructor() {
        super("Access denied");
        this.name = "AccessDeniedError"
        this.status = 401;

        this.body = {
            status: this.status,
            message: this.message
        };
    }
}
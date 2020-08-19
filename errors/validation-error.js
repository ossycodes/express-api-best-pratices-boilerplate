exports.ValidationError = class ValidationError {
    constructor(message, model) {
        this.message = message;
        this.model = model;
    }   
}
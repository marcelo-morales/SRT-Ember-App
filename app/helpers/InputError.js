class InputError extends Error {
    constructor(element_id, message) {
        super(message);
        this.element_id = element_id;
    }
}

export default InputError;
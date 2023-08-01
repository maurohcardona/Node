// export default class customError {
//     static createError({name="Error", cause, message, code=1}) {
//         const error = new Error(message, {cause});
//         error.name = name;
//         error.code = code;
//         throw error;
//     }
// } 

export class errorProduct extends Error {
    constructor(message, code = 1) {
        super(message);
        this.name = 'Error Product'
        this.code = code;
    }
};
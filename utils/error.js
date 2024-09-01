export const errorHandler = (statusCode, message) => {
    const error = new Error() // using Error constructor of JS
    error.statusCode = statusCode
    console.log(error.statusCode)
    error.message = message;
    console.log(error.message)
    return error;
}
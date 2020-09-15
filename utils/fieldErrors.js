export const toErrorMap = (errors) => {
    console.log(errors, ':::::::')
    const errorMap= {};
    errors.forEach(({ field, message }) => {
      errorMap[field] = message;
    });
}

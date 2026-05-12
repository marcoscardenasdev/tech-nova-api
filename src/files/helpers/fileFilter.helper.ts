export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
    
    if (!file) {
        return callback(new Error('File is required'), false);
    }
    
    const fileExtension = file.mimetype.split('/')[1];
    console.log(fileExtension);
    console.log(file.mimetype);
    // TODO: Agregar las extensiones validas para las imagenes
    const validExtensions: string[] = ['jpeg'];

    if (validExtensions.includes(fileExtension)) {
        callback(null, true);
    }

    callback(null, false);
}
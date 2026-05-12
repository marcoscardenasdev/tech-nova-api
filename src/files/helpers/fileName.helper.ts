import { v4 as Uuid } from "uuid";

export const fileName = (req: Express.Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {


    if (!file) {
        return callback(new Error('No file provided'), '');
    }

    const fileExtension = file.originalname.split('.')[1];

    const fileName = `${ Uuid() }.${ fileExtension }`;
    
    callback(null, fileName);
}
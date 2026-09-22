import express, { type Express} from "express";

export function createServer(){
    const app = express();
    return app;
}

export function listen(app: Express) {
    app.listen(3000, () => {
        console.log(`Server is running on Port: ${3000}`);
    });
}

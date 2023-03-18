import * as dotenv from "dotenv";
dotenv.config();

const firebase = JSON.parse(process.env.FIREBASE!);

module.exports = {
    name: 'OmuApp',
    version: '0.0.1',
    extra: {
        firebase: firebase
    }
}
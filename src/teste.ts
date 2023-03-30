import * as dotenv from "dotenv";
import { PubSubLogging } from './index';
dotenv.config();


async function test() {

    const pubsub = new PubSubLogging({
        projectId: process.env.BIGQUERY_PROJECT_ID as string,
        privateKey: process.env.BIGQUERY_PRIVATE_KEY as string,
        clientEmail: process.env.BIGQUERY_CLIENT_EMAIL as string,
    });

    await pubsub.securityLogging({
        ip: "121.121.121.00",
        context: "auth",
        group: "auth",
        user_id: "12345-ahhahaha-12121",
        data: {
            dog_name: "auau",
            pet: "dog"
        },
        action: "login"
    });


    await pubsub.debugLogging({
        project: "project-dev",
        namespace: "local",
        module: "pub-sub",
        data: {
            function: "teste"
        },
        action: "logging"
    });

}

test();
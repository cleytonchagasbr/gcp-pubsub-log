## gcp-pubsub-log

# Install

https://www.npmjs.com/package/gcp-pubsub-log

```
npm i --save gcp-pubsub-log
```
## usage
```
import * as dotenv  from "dotenv";
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
```
### Create topics on pub/sub

https://console.cloud.google.com/cloudpubsub/topic/list

with names:
- debugTopicLog
- securityTopicLog

(OPTIONAL) - If you want to save on bigquery create this tables and create a subscription for each topic
https://console.cloud.google.com/cloudpubsub/subscription/list


Create a logging table (schema/loggings.sql)
```
CREATE TABLE `PROJECT-NAME.DATABASE-NAME.securityLog` (ip string,
    user_id string,
    context string,
    `group` string,
    action string,
    `data` string, 
    `date` string);

CREATE TABLE `PROJECT-NAME.DATABASE-NAME.debugLog` (
    `project` string,
    `namespace` string,
    `module` string,
    `action` string,
    `data` string, 
    `date` string);
```

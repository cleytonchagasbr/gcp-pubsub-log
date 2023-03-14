import { SecurityLog, DebugLog } from './@types/types';
import { PubSub } from "@google-cloud/pubsub";

export type ConfigPublishLog = {
    projectId: string;
    privateKey: string;
    clientEmail: string;
    securityTopicName?: string;
    debugTopicName?: string;
}

export class PubSubLogging {
    
    projectId: string;
    pubsub: PubSub;
    securityTopicName: string = "securityTopic";
    debugTopicName: string = "debugTopic";

    constructor({ projectId, privateKey, clientEmail, securityTopicName, debugTopicName}: ConfigPublishLog) {
        this.projectId = projectId;
        this.securityTopicName = securityTopicName || "securityTopicLog";
        this.debugTopicName = debugTopicName || "debugTopicLog";

        this.pubsub = new PubSub({
            projectId: projectId,
            credentials: {
                private_key: privateKey,
                client_email: clientEmail,
            }
        });

    }

    async sendLogging(topic_name: string, data: any) {
        const topic = this.pubsub.topic(topic_name);
        const response = await topic.publishMessage({ json: data});
        return response;
    }

    async securityLogging(data: SecurityLog) {
        
        const d: SecurityLog = {...data};
        d.date = new Date().toISOString();
        d.data = JSON.stringify(d.data);
    
        const topic = this.pubsub.topic(this.securityTopicName);
        const response = await topic.publishMessage({data: Buffer.from(JSON.stringify(d))});
        return response;
   
    }

    async debugLogging(data: DebugLog) {

        const d: DebugLog = {...data};
        d.date = new Date().toISOString();
        d.data = JSON.stringify(d.data);
    
        const topic = this.pubsub.topic(this.debugTopicName);
        const response = await topic.publishMessage({data: Buffer.from(JSON.stringify(d))});
        return response;
    }
}






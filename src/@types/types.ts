export type SecurityLog = {
    ip: string;
    user_id: string;
    context: string;
    group: string;
    action: string;
    data: any;
    date?: string;
} 

export type DebugLog = {
    project: string;
    namespace: string;
    module: string;
    action: string;
    data: any;
    date?: string;
}
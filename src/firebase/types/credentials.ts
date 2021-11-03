interface Config {
    apiKey: string;
    authDomain: string;
    storageBucket: string;
    projectId: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}

export interface Credentials {
    config: Config;
}

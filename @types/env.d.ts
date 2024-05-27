declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      SECRET_KEY: string;
      PORT: number;
      NODE_ENV: string;
    }
  }
}

export {}
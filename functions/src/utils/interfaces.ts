import * as express from "express";

export interface ButtonTexts {
  [key: string]: string;
}

export interface Request extends express.Request {
  rawBody: Buffer;
}

// tslint:disable-next-line:no-empty-interface
export interface HttpsResponse extends express.Response {}

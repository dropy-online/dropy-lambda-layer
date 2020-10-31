import { Handler } from 'aws-lambda';

export interface Options {
  type: string;
  size: number;
  quality: number;
  prefix?: string,
}

export enum AvailableType {
  pdf = 'pdf',
}

export enum AvailableOutputType {
  jpg = 'jpg',
  png = 'png',
}

export enum RequestErrors {
  UNDIFINED_PATH_PARAM = 'UNDIFINED_PATH_PARAM',
  UNDEFINED_FILE_TYPE = 'UNDEFINED_FILE_TYPE',
  UNSUPPORTED_FILE_TYPE = 'UNSUPPORTED_FILE_TYPE',
}

export enum S3Errors {
  FAILED_S3_GET_OBJECT = 'FAILED_S3_GET_OBJECT',
  FAILED_S3_PUT_OBJECT = 'FAILED_S3_PUT_OBJECT',
  FAILED_S3_DELETE_OBJECT = 'FAILED_S3_DELETE_OBJECT',
}

export enum ConvertErrors {
  UNDEFINED_PAYLOAD = 'UNDEFINED_PAYLOAD',
  PDF_PARSING_FAIL = 'PDF_PARSING_FAIL',
}

export type Error = {
  status: 'error',
  error: RequestErrors | S3Errors
}

export type APIResponse = {
  headers: { [key: string]: string | boolean | number };
  statusCode: number;
  body: string;
};

export type ConvertResult = {
  page: number,
  body : Buffer,
}

export interface ConvertEvent {
  item: number[],
  params: Options,
  buffer: Buffer
}

export type ConvertHandler = Handler<ConvertEvent, void | ConvertResult[]>;

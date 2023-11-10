import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class NestedQueryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const query = request.query;

    // Função para converter campos aninhados em objetos
    const convertToNestedObject = (queryObject: any) => {
      const result: any = {};

      for (const key in queryObject) {
        if (queryObject.hasOwnProperty(key)) {
          const keys = key.split("."); // Divide o campo por "." para criar a estrutura aninhada
          const lastKey = keys.pop();
          let currentObject = result;

          for (const nestedKey of keys) {
            currentObject[nestedKey] = currentObject[nestedKey] || {};
            currentObject = currentObject[nestedKey];
          }

          currentObject[lastKey] = queryObject[key];
        }
      }

      return result;
    };

    // Aplica a função de conversão aos campos da consulta
    request.query = convertToNestedObject(query);

    return next.handle();
  }
}

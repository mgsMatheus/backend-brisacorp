/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "cpf", async: false })
export class CPFValidator implements ValidatorConstraintInterface {
  public defaultMessage(validationArguments?: ValidationArguments): string {
    return "CPF não é válido.";
  }

  public validate(
    cpf: string,
    validationArguments?: ValidationArguments,
  ): boolean {
    cpf = (cpf || "").replace(/\D/g, "");
    if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let result = true;
    [9, 10].forEach(function (j) {
      let soma = 0,
        factor: number;
      cpf
        .split(/(?=)/)
        .splice(0, j)
        .forEach(function (e, i) {
          soma += parseInt(e) * (j + 2 - (i + 1));
        });
      factor = soma % 11;
      factor = factor < 2 ? 0 : 11 - factor;
      if (factor != +cpf.substring(j, j + 1)) result = false;
    });
    return result;
  }
}

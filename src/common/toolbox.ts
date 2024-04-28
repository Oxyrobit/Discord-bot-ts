import moment from "moment";

export function print(msg: any) {
  // print dans la console avec l'heure
  console.log(`[${moment().format("HH:mm:ss")}] ${msg}`);
}
export function printError(msg: string) {
  console.error(`[${moment().format("HH:mm:ss")}] ${msg}`);
}

export function convertNumberToReadableString(param: { number: number }) {
  // Convertit un nombre en string lisible avec K M B T
  const thresholds = [1000, 1000000, 1000000000, 1000000000000];
  const suffixes = ["K", "M", "B", "T"];
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (param.number >= thresholds[i]) {
      return (param.number / thresholds[i]).toFixed(1) + suffixes[i];
    }
  }
  return param.number.toString();
}

export async function waitCooldown(coolDown: number) {
  // Permet d'attendre un certain temps avant d'executer une fonction.
  return await new Promise((resolve) => setTimeout(resolve, coolDown * 1000));
}

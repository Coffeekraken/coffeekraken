import __SSugarCli from "@coffeekraken/cli";

export default async function () {
  const availableCli = await __SSugarCli.getAvailableCli();
  return {
    availableCli,
  };
}

import trimLines from "trim-lines";

export default function params(params) {
  return (
    `\n${Array(this._titleLevel() + 2).join("#")} Parameters` +
    trimLines(`
		Name  |  Type  |  Description  |  Status  |  Default
		------------  |  ------------  |  ------------  |  ------------  |  ------------
		${params
      .map(param => {
        let optional = !param.optional ? "required" : "optional";
        let def = param.default || "";
        return `${param.name}  |  **${this._renderTypes(param.types)}**  |  ${
          param.description
        }  |  ${optional}  |  ${def}`;
      })
      .join("\n")}
	`)
  );
}

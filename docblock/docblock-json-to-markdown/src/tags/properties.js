import trimLines from "trim-lines";

export default function properties(properties) {
  return (
    `\n${Array(this._titleLevel() + 2).join("#")} Properties` +
    trimLines(`
		Name  |  Type  |  Description  |  Default
		------------  |  ------------  |  ------------  |  ------------
		${properties
      .map(property => {
        let def = property.default || "";
        return `${property.name}  |  **${this._renderTypes(
          property.types
        )}**  |  ${property.description}  |  ${def}`;
      })
      .join("\n")}
	`)
  );
}

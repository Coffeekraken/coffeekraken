module.exports = (__typeDefinitionArrayObjectToString) => {
  describe("sugar.js.value.typeDefinitionArrayObjectToString", () => {
    it("Should return the correct typeDefinitionArrayObjectToString of the passed values", () => {
      expect(__typeDefinitionArrayObjectToString([
        {
          type: "Array",
          of: [
            {
              type: "Boolean"
            },
            {
              type: "String"
            }
          ]
        }
      ])).toEqual("Array<Boolean|String>");
      expect(__typeDefinitionArrayObjectToString([
        {
          type: "Array",
          of: [
            {
              type: "Boolean"
            },
            {
              type: "String"
            }
          ]
        },
        {
          type: "Object",
          of: [
            {
              type: "Number"
            },
            {
              type: "String"
            }
          ]
        }
      ])).toEqual("Array<Boolean|String>|Object<Number|String>");
    });
  });
};

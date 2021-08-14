export default function (env, config) {
    if (env.platform !== 'node')
        return;
    return {
        html: {
            /**
             * @name        classPrefix
             * @namespace   config.docblockRenderer.html
             * @type        String
             * @default     s-
             *
             * This define the class prefix applied when rendering a docblock in html
             *
             * @since       2.0.0
             * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            classPrefix: 's-',
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jYmxvY2tSZW5kZXJlci5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb2NibG9ja1JlbmRlcmVyLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUVwQyxPQUFPO1FBQ0gsSUFBSSxFQUFFO1lBQ0Y7Ozs7Ozs7Ozs7ZUFVRztZQUNILFdBQVcsRUFBRSxJQUFJO1NBQ3BCO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==
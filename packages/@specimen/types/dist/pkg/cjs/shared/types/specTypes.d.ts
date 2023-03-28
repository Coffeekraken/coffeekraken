export interface ISSpec {
    type: 'Boolean' | 'Checkbox' | 'Color' | 'Datetime' | 'Image' | 'Integer' | 'Number' | 'Select' | 'String' | 'Switch' | 'Video' | 'Wysiwyg';
    title: string;
    description: string;
    default?: any;
    required?: boolean;
}

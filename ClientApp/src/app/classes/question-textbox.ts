import { QuestionBase } from './question-base';

export class TextboxQuestion extends QuestionBase<string> {
    constructor(options: {
        value?: string;
        key?: string;
        label?: string;
        required?: boolean;
        order?: number;
        controlType?: string;
        type?: string;
        options?: {key: string, value: string}[];
      } = {}) {
      options.controlType = 'textbox';
      super(options);
    }
}

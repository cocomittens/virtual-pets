import { BaseOutput, Output, OutputTemplate } from '@jovotech/framework';

@Output()
export class MenuOutput extends BaseOutput {
  /*
  |--------------------------------------------------------------------------
  | Output Template
  |--------------------------------------------------------------------------
  |
  | This structured output is later turned into a native response
  | Learn more here: www.jovo.tech/docs/output
  |
  */
  build(): OutputTemplate | OutputTemplate[] {
    return {
      quickReplies: ['play game', 'go shopping', 'customize pet', 'feed pet'],
      listen: true,
    };
  }
}

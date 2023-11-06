import { BaseOutput, Output, OutputTemplate } from '@jovotech/framework';

@Output()
export class ChoosePetOutput extends BaseOutput {
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
      quickReplies: ['dog', 'cat', 'bunny'],
      listen: true,
      platforms: {
        alexa: {
          nativeResponse: {
            response: {
              directives: [
                {
                  type: 'Alexa.Presentation.APL.RenderDocument',
                  token: '',
                  document: {
                    
                  },
                  datasources: {
                    
                  },
                },
            ],
          }
        }
      }
    };
  }
}

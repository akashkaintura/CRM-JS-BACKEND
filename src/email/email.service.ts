// import { Injectable } from '@nestjs/common';
// import * as AWS from 'aws-sdk';

// @Injectable()
// export class EmailService {
//   private ses = new AWS.SES({ region: process.env.AWS_REGION });

//   async sendEmail(to: string, subject: string, body: string): Promise<void> {
//     const params = {
//       Destination: {
//         ToAddresses: [to],
//       },
//       Message: {
//         Body: {
//           Text: { Data: body },
//         },
//         Subject: { Data: subject },
//       },
//       Source: process.env.SOURCE_EMAIL,
//     };

//     await this.ses.sendEmail(params).promise();
//   }
// }

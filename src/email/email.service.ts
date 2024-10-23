import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class EmailService {
  private ses = new AWS.SES({ region: process.env.AWS_REGION });

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const params = {
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Text: { Data: body },
        },
        Subject: { Data: subject },
      },
      Source: process.env.EMAIL_SOURCE,
    };

    try {
      await this.ses.sendEmail(params).promise();
    } catch (error: any) {
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log(`Email sent to ${to}: ${subject}`);
  }
}

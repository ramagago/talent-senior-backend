import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CommunicationService {
  async sendEmail(email: string, name: string, surname: string): Promise<void> {
    const serviceID = 'service_bf0nv76';
    const templateID = 'template_cdog6gp';
    const userID = 'pF3U48UNWJxuoR0y5';
    const emailParams = {
      email_to: email,
      person_name: name,
      person_surname: surname,
    };

    const requestBody = {
      service_id: serviceID,
      template_id: templateID,
      user_id: userID,
      template_params: emailParams,
    };

    try {
      const response = await axios.post(
        'https://api.emailjs.com/api/v1.0/email/send',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status !== 200) {
        console.log(`Error sending email: ${response.statusText}`);
        throw new Error(`Error sending email: ${response.statusText}`);
      }

      console.log('Email sent successfully');
    } catch (error) {
      console.log(error);
      console.log(`Error sending email: ${error.message}`);
      throw error;
    }
  }
}

// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class CommunicationService {
//     emailjs: any
//     constructor() {
//     this.emailjs = emailjs.init('pF3U48UNWJxuoR0y5');
//   }
//   async sendEmail(email, name, surname) {
//     post /https://api.emailjs.com/api/v1.0/email/send

//     const serviceID = 'service_bf0nv76';
//     const templateID = 'template_cdog6gp';
//     const emailParams = {
//       email_to: email,
//       person_name: name,
//       person_surname: surname,
//     };
//     try {
//       await emailjs.send(serviceID, templateID, emailParams);
//     } catch (error) {
//       console.log(`Error creating person: ${error.message}`);
//       throw error;
//     }
//   }
// }

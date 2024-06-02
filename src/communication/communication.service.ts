import { Injectable } from '@nestjs/common';
import emailjs from '@emailjs/browser';

@Injectable()
export class CommunicationService {
  async sendEmail(email, name, surname) {
    const serviceID = 'service_bf0nv76';
    const templateID = 'template_cdog6gp';
    const emailParams = {
      email_to: email,
      person_name: name,
      person_surname: surname,
    };
    try {
      await emailjs.send(serviceID, templateID, emailParams);
    } catch (error) {
      console.log(`Error creating person: ${error.message}`);
      throw error;
    }
  }
}

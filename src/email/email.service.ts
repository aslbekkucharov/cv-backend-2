import * as fs from 'fs'
import * as path from 'path'
import Handlebars from 'handlebars'
import * as NodeMailer from 'nodemailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { User } from '@/users/entities/user.entity'

interface ConfirmationEmailPayload {
  otp: number
  expiryTime: string
  companyName: string
  companyLogo: string
  user: Pick<User, 'name' | 'email'>
}

@Injectable()
export class EmailService {
  private transporter: NodeMailer.Transporter
  private confirmationTemplate: Handlebars.TemplateDelegate

  constructor(private configService: ConfigService) {
    this.transporter = NodeMailer.createTransport(
      {
        host: this.configService.get('MAILER_HOST'),
        port: this.configService.get('MAILER_PORT'),
        auth: {
          user: this.configService.get('MAILER_USER'),
          pass: this.configService.get('MAILER_PASSWORD')
        }
      },
      {
        name: 'CV Generator',
        from: this.configService.get('MAILER_FROM')
      }
    )

    this.confirmationTemplate = this.loadTemplate('confirmation.hbs')
  }

  private loadTemplate(templateName: string): Handlebars.TemplateDelegate {
    const templatesFolderPath = path.join(__dirname, '../../email-templates/')
    const templatePath = path.join(templatesFolderPath, templateName)

    const templateSource = fs.readFileSync(templatePath, 'utf8')

    return Handlebars.compile(templateSource)
  }

  async sendEmailConfirmation(payload: ConfirmationEmailPayload) {
    const year = new Date().getFullYear()

    const html = this.confirmationTemplate({
      currentYear: year,
      otpCode: payload.otp,
      userName: payload.user.name,
      expiryTime: payload.expiryTime,
      companyLogo: payload.companyLogo,
      companyName: payload.companyName
    })

    await this.transporter.sendMail({
      html,
      to: payload.user.email,
      subject: 'Подтвердите электронную почту',
      from: this.configService.get('MAILER_FROM')
    })
  }
}

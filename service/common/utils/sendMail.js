import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export function sendMail(event) {
  const { emailType } = event;

  let msg;
  switch (emailType) {
    case 'companyInvitaton':
      msg = {
        from: 'no-reply@skilltransfers.com',
        to: event.email,
        templateId: 'd-494604d83c12484aa9192d95b5aa4b26',
        subject: 'Company Invitation',
        dynamic_template_data: {
          studentname: event.studentname,
          companyname: event.companyname,
          url_token: event.url,
        },
      };
      break;
    default:
      return;
  }

  return sgMail.send(msg);
}

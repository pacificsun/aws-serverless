import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export function sendBulkMail(event) {
  const { bulkMsg } = event;

  return sgMail.send(bulkMsg);
}

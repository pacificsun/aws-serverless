export function mailTemplate(event) {
  const { from, to, templateId, data } = event;
  return {
    from: from ?? 'no-reply@skilltransfers.com',
    to,
    templateId: templateId,
    dynamic_template_data: data,
  };
}

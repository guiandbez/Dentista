const whatsappNumber = "5511948437467";
const defaultWhatsappMessage = "Olá! Dra. Bruna Andrade, Vim pelo site e gostaria de saber mais sobre os atendimentos.";
const appointmentMessage = "Olá! Gostaria de agendar uma consulta com a Dra. Bruna. Poderia me informar os horários disponíveis?";
const conversationMessage = "Olá, doutora Bruna! Gostaria de conversar sobre os tratamentos e o agendamento de consulta.";
const schedulingMessage = "Olá! Vim pelo site. Gostaria de agendar uma conversa com a Dra. Bruna";

export function whatsappUrl(message = defaultWhatsappMessage) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function schedulingWhatsappUrl() {
  return whatsappUrl(schedulingMessage);
}

export function appointmentWhatsappUrl() {
  return whatsappUrl(appointmentMessage);
}

export function conversationWhatsappUrl() {
  return whatsappUrl(conversationMessage);
}

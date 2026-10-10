const whatsappNumber = "5511948437467";
const defaultWhatsappMessage = "Olá! Dra. Bruna Andrade, Vim pelo site e gostaria de saber mais sobre os atendimentos.";
const appointmentMessage = "Olá! Dra. Bruna Andrade, Vim pelo site e gostaria de agendar um atendimento.";
const conversationMessage = "Olá, doutora Bruna! Gostaria de conversar um pouco sobre os procedimentos e agendamento de consulta com você.";

export function whatsappUrl(message = defaultWhatsappMessage) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function appointmentWhatsappUrl() {
  return whatsappUrl(appointmentMessage);
}

export function conversationWhatsappUrl() {
  return whatsappUrl(conversationMessage);
}

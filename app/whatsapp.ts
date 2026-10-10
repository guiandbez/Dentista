const whatsappNumber = "5511948437467";
const whatsappMessage = "Olá! Vim pelo site. Gostaria de agendar uma conversa com a Dra. Bruna";

export function whatsappUrl() {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
}

export function schedulingWhatsappUrl() {
  return whatsappUrl();
}

export function appointmentWhatsappUrl() {
  return whatsappUrl();
}

export function conversationWhatsappUrl() {
  return whatsappUrl();
}

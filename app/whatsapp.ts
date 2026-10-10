const whatsappNumber = "5511948437467";
const defaultWhatsappMessage = "Olá! Dra. Bruna Andrade, Vim pelo site e gostaria de saber mais sobre os atendimentos.";

export function whatsappUrl() {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultWhatsappMessage)}`;
}

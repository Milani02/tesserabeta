const TESSERA_WHATSAPP_NUMBER = "5543998370005";

export function buildWhatsAppLink(message: string) {
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${TESSERA_WHATSAPP_NUMBER}?${params.toString()}`;
}

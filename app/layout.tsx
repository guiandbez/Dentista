import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { schedulingWhatsappUrl } from "./whatsapp";

export const metadata: Metadata = {
  title: "Dra. Bruna Andrade | Cirurgiã-dentista",
  description: "Cuidado odontológico personalizado, com atenção à saúde e à naturalidade do seu sorriso.",
  openGraph: { title: "Dra. Bruna Andrade | Cirurgiã-dentista", description: "Cuidado personalizado para o seu sorriso.", type: "website", locale: "pt_BR" },
};

const links = [["Início", "#inicio"], ["Sobre", "#sobre"], ["Atendimentos", "#tratamentos"], ["Contato", "#contato"]];
const schedulingWhatsapp = schedulingWhatsappUrl();

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR" suppressHydrationWarning><body><header className="nav"><div className="nav-inner"><Link className="brand" href="/#inicio"><span className="brand-line"><span className="brand-icon" aria-hidden="true">BA</span>Dra. Bruna Andrade</span><small>Cirurgiã-dentista</small></Link><nav className="navlinks" aria-label="Navegação principal">{links.map(([label, href]) => <Link href={`/${href}`} key={label}>{label}</Link>)}<a className="btn btn-primary" href={schedulingWhatsapp} target="_blank" rel="noreferrer">Agendar Atendimento</a></nav><details className="mobile-menu"><summary aria-label="Abrir menu">☰</summary><nav className="mobile-panel" aria-label="Navegação mobile">{links.map(([label, href]) => <Link href={`/${href}`} key={label}>{label}</Link>)}<a className="btn btn-primary" href={schedulingWhatsapp} target="_blank" rel="noreferrer">Agendar pelo WhatsApp</a><a className="mobile-instagram" href="https://instagram.com/Dra.bruandrade" target="_blank" rel="noreferrer">Instagram @Dra.bruandrade</a></nav></details></div></header>{children}</body></html>;
}

import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";
import ThemeSwitcher from "./theme-switcher";

export const metadata: Metadata = {
  title: "Dra. Bruna Andrade | Cirurgiã-dentista",
  description: "Cuidado odontológico personalizado, com atenção à saúde e à naturalidade do seu sorriso.",
  openGraph: { title: "Dra. Bruna Andrade | Cirurgiã-dentista", description: "Cuidado personalizado para o seu sorriso.", type: "website", locale: "pt_BR" },
};

const links = [["Início", "#inicio"], ["Sobre", "#sobre"], ["Atendimentos", "#tratamentos"], ["Contato", "#contato"]];
const appointmentMessage = "Olá! Vim pelo site da Dra. Bruna Andrade e gostaria de saber mais sobre os atendimentos. Olá, Dra. Bruna! Gostaria de conversar e agendar uma avaliação.";
const appointment = `https://wa.me/5511948437467?text=${encodeURIComponent(appointmentMessage)}`;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR" suppressHydrationWarning><body><Script id="theme-preference-init" strategy="beforeInteractive">{`try { const theme = localStorage.getItem("dentista-theme"); if (theme === "rose" || theme === "mono") document.documentElement.dataset.theme = theme; } catch {}`}</Script><header className="nav"><div className="nav-inner"><Link className="brand" href="/#inicio"><span className="brand-line"><span className="brand-icon" aria-hidden="true">BA</span>Dra. Bruna Andrade</span><small>Cirurgiã-dentista</small></Link><nav className="navlinks" aria-label="Navegação principal">{links.map(([label, href]) => <Link href={`/${href}`} key={label}>{label}</Link>)}<a className="btn btn-primary" href={appointment} target="_blank" rel="noreferrer">Agendar atendimento <span aria-hidden="true">↗</span></a></nav><ThemeSwitcher /><details className="mobile-menu"><summary aria-label="Abrir menu">☰</summary><nav className="mobile-panel" aria-label="Navegação mobile">{links.map(([label, href]) => <Link href={`/${href}`} key={label}>{label}</Link>)}<a className="btn btn-primary" href={appointment} target="_blank" rel="noreferrer">Agendar pelo WhatsApp ↗</a><a className="mobile-instagram" href="https://instagram.com/Dra.bruandrade" target="_blank" rel="noreferrer">Instagram @Dra.bruandrade ↗</a></nav></details></div></header>{children}</body></html>;
}

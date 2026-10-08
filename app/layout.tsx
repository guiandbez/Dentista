import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";
import ThemeSwitcher from "./theme-switcher";

export const metadata: Metadata = {
  title: "Dra. Bruna Andrade | Odontologia e Estética",
  description: "Cuidado odontológico personalizado, com atenção à saúde, à naturalidade e à beleza do seu sorriso. Conheça os tratamentos da Dra. Bruna Andrade.",
  openGraph: { title: "Dra. Bruna Andrade | Odontologia e Estética", description: "Cuidado personalizado para valorizar a beleza e a naturalidade do seu sorriso.", type: "website", locale: "pt_BR" },
};

const links = [["Início", "#inicio"], ["Sobre", "#sobre"], ["Tratamentos", "#tratamentos"], ["Resultados", "#resultados"], ["Contato", "#contato"]];
const appointment = "https://wa.me/5511948437467?text=Ol%C3%A1%2C%20Dra.%20Bruna!%20Gostaria%20de%20conversar%20e%20agendar%20uma%20avalia%C3%A7%C3%A3o.";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR" suppressHydrationWarning><body><Script id="theme-preference-init" strategy="beforeInteractive">{`try { const theme = localStorage.getItem("dentista-theme"); if (theme === "rose" || theme === "mono") document.documentElement.dataset.theme = theme; } catch {}`}</Script><header className="nav"><div className="nav-inner"><Link className="brand" href="/#inicio"><span className="brand-line"><span className="brand-icon" aria-hidden="true">✳</span>Dra. Bruna Andrade</span><small>Odontologia e Estética</small></Link><nav className="navlinks" aria-label="Navegação principal">{links.map(([label, href]) => <Link href={`/${href}`} key={label}>{label}</Link>)}<a className="btn btn-primary" href={appointment} target="_blank" rel="noreferrer">Agendar atendimento <span aria-hidden="true">↗</span></a></nav><ThemeSwitcher /><details className="mobile-menu"><summary aria-label="Abrir menu">☰</summary><nav className="mobile-panel" aria-label="Navegação mobile">{links.map(([label, href]) => <Link href={`/${href}`} key={label}>{label}</Link>)}<a className="btn btn-primary" href={appointment} target="_blank" rel="noreferrer">Agendar pelo WhatsApp ↗</a><a className="mobile-instagram" href="https://instagram.com/Dra.bruandrade" target="_blank" rel="noreferrer">Instagram @Dra.bruandrade ↗</a></nav></details></div></header>{children}</body></html>;
}

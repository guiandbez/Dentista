import Link from "next/link";
import { createClient } from "../lib/supabase-server";
import ScrollReveal from "./scroll-reveal";

const whatsapp = "https://wa.me/5511948437467";
const instagram = "https://instagram.com/Dra.bruandrade";
const clinicMaps = "https://www.google.com/maps/dir/?api=1&destination=Consult%C3%B3rio%20Dra.%20Bruna%20Andrade%20-%20Odontologia%20%26%20Est%C3%A9tica%2C%20R.%20Inga%C3%AD%2C%20156%20-%20Vila%20Prudente%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003132-080";
const wa = (message: string) => `${whatsapp}?text=${encodeURIComponent(message)}`;

const treatments = [
  {
    name: "Clareamento Dental",
    image: "/images/tratamentos/ref-clareamento-1200.webp",
    description: "Técnica segura que remove manchas e devolve o brilho natural do seu sorriso.",
    benefits: ["Clarear o branco dos dentes", "Reduzir manchas e pigmentações", "Deixar o sorriso mais claro", "Realçar a beleza de forma natural"],
  },
  {
    name: "Harmonização Facial",
    image: "/images/tratamentos/caso-labial-1169.webp",
    description: "Procedimentos personalizados que ajudam a equilibrar e valorizar os contornos do rosto, respeitando as características naturais de cada pessoa.",
    benefits: ["Valorizar os contornos faciais", "Promover mais equilíbrio e harmonia", "Realçar características naturais", "Planejamento personalizado para cada rosto"],
  },
  {
    name: "Implantes Dentários",
    image: "/images/tratamentos/caso-lentes-1170.webp",
    description: "Repõe dentes perdidos com segurança, funcionalidade e estética.",
    benefits: ["Restaurar a função mastigatória", "Preservar o osso da região", "Devolver a confiança ao sorrir", "Melhorar a qualidade de vida"],
  },
];

async function getProcedures() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("procedures").select("id").eq("active", true).limit(1);
    if (error) console.error("Não foi possível consultar os tratamentos:", error.message);
  } catch { /* A página pública continua disponível mesmo sem configuração do banco. */ }
}

export default async function Home() {
  await getProcedures();
  return <ScrollReveal><main>
    <section className="hero" id="inicio">
      <div className="container hero-grid">
        <div className="hero-content">
          <span className="eyebrow">Odontologia estética com cuidado</span>
          <h1>Seu sorriso,<br /><em>sua melhor versão.</em></h1>
          <p className="hero-subtitle">Cuidado personalizado para valorizar sua beleza com naturalidade, confiança e atenção.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={wa("Olá, Dra. Bruna! Gostaria de conversar e agendar uma avaliação.")} target="_blank" rel="noreferrer">Agendar pelo WhatsApp <span aria-hidden="true">↗</span></a>
            <Link className="btn btn-outline hero-treatments-button" href="#tratamentos">Conhecer tratamentos</Link>
          </div>
        </div>
        <div className="hero-portrait"><span className="portrait-halo" /><img src="/images/dra-bruna/bruna-transparente-2160.webp" alt="Dra. Bruna Andrade" fetchPriority="high" /></div>
      </div>
    </section>

    <section className="about section" id="sobre">
      <div className="container about-grid about-copy-only">
        <div className="about-copy">
          <span className="eyebrow">Conheça a Dra. Bruna</span>
          <h2>Dra. Bruna Andrade</h2>
          <h3 className="about-subtitle">Odontologia e Estética</h3>
          <p>Um atendimento próximo começa com escuta e confiança. Cada sorriso recebe um olhar cuidadoso, com planejamento individual e respeito à saúde, à beleza e à história de cada pessoa.</p>
          <div className="about-points">
            <article><span aria-hidden="true">✳</span><div><h3>Atendimento personalizado</h3><p>Cada sorriso é único e merece um cuidado exclusivo.</p></div></article>
            <article><span aria-hidden="true">◇</span><div><h3>Planejamento cuidadoso</h3><p>Cada etapa é pensada com atenção às necessidades de cada pessoa.</p></div></article>
            <article><span aria-hidden="true">♡</span><div><h3>Naturalidade e segurança</h3><p>Cuidado atento para valorizar sua beleza com equilíbrio.</p></div></article>
          </div>
        </div>
      </div>
    </section>

    <section className="clinic-section section" id="clinica">
      <div className="container">
        <div className="center-heading clinic-heading">
          <h2 className="clinic-title">O consultório</h2>
          <p className="clinic-copy-line">Cuidado que acolhe, confian&#xE7;a em cada detalhe e bem-estar em cada encontro.</p>
        </div>
        <div className="clinic-showcase" aria-label="Imagens do consultório">
          <figure className="photo-frame clinic-photo clinic-feature"><img src="/images/clinica/recepcao-896.webp" alt="Recepção do consultório" loading="lazy" /></figure>
          <div className="clinic-mosaic">
            <figure className="photo-frame clinic-photo"><img src="/images/clinica/espera-896.webp" alt="Sala de espera do consultório" loading="lazy" /></figure>
            <figure className="photo-frame clinic-photo"><img src="/images/clinica/corredor-1170.webp" alt="Corredor do consultório" loading="lazy" /></figure>
            <figure className="photo-frame clinic-photo clinic-sign"><img src="/images/clinica/placa-896.webp" alt="Placa do consultório" loading="lazy" /></figure>
          </div>
        </div>
        <div className="clinic-actions"><a className="btn btn-outline" href={clinicMaps} target="_blank" rel="noopener noreferrer">Ver localização no Maps <span aria-hidden="true">↗</span></a></div>
      </div>
    </section>

    <section className="treatments section section-soft" id="tratamentos">
      <div className="container">
        <div className="center-heading"><span className="eyebrow">Tratamentos</span><h2>Cuidados pensados para valorizar<br />a beleza e a saúde do seu sorriso.</h2></div>
        <div className="treatment-cards">{treatments.map((item) => <article className="treatment-card" key={item.name}>
          <div className="treatment-card-image"><img src={item.image} alt={item.name} loading="lazy" /></div>
          <div className="treatment-card-content"><h3>{item.name}</h3><p className="treatment-lead">{item.description}</p><h4>Como pode ajudar:</h4><ul>{item.benefits.map(b => <li key={b}>{b}</li>)}</ul><div className="treatment-actions"><a className="btn btn-outline" href={wa(`Olá, Dra. Bruna! Quero saber mais sobre ${item.name}.`)} target="_blank" rel="noreferrer">Quero saber mais</a><a className="btn btn-primary" href={wa(`Olá, Dra. Bruna! Gostaria de agendar atendimento para conversar sobre ${item.name}.`)} target="_blank" rel="noreferrer">Agendar pelo WhatsApp</a></div></div>
        </article>)}</div>
      </div>
    </section>

    <section className="contact section" id="contato"><div className="contact-content"><span className="eyebrow">Um convite para cuidar de você</span><h2>Seu sorriso merece<br /><em>um cuidado especial.</em></h2><p>Vamos conversar e encontrar o melhor tratamento para você?</p><div className="hero-actions"><a className="btn btn-primary" href={wa("Olá, Dra. Bruna! Gostaria de conversar e agendar uma avaliação.")} target="_blank" rel="noreferrer">Agendar pelo WhatsApp <span aria-hidden="true">↗</span></a><a className="btn btn-outline" href={instagram} target="_blank" rel="noreferrer">@Dra.bruandrade</a></div></div></section>

    <footer className="footer"><div className="container footer-main"><div className="footer-brand"><Link href="#inicio">Dra. Bruna Andrade</Link><span>Odontologia e Estética</span></div><nav aria-label="Links do rodapé"><Link href="#inicio">Início</Link><Link href="#sobre">Sobre</Link><Link href="#tratamentos">Tratamentos</Link><Link href="#contato">Contato</Link></nav><div className="footer-contact"><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp<br /><span>+55 11 94843-7467</span></a><a href={instagram} target="_blank" rel="noreferrer">Instagram<br /><span>@Dra.bruandrade</span></a></div></div><div className="container footer-bottom"><span>© 2025 Dra. Bruna Andrade. Todos os direitos reservados.</span></div></footer>
  </main></ScrollReveal>;
}

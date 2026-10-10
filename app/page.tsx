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
    title: "Devolvendo o brilho para o seu sorriso.",
    image: "/images/tratamentos/ref-clareamento-1200.webp",
    description: "",
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
    if (error) console.error("Não foi possível consultar os atendimentos:", error.message);
  } catch { /* A página pública continua disponível mesmo sem configuração do banco. */ }
}

export default async function Home() {
  await getProcedures();
  return <ScrollReveal><main>
    <section className="hero" id="inicio">
      <img className="hero-background" src="/images/dra-bruna/bruna-transparente-2160.webp" alt="" fetchPriority="high" />
      <div className="hero-shade" />
      <div className="container hero-grid">
        <div className="hero-content">
          <span className="eyebrow">Cirurgiã-dentista</span>
          <h1>Devolvo a liberdade de sorrir <em>sem esconder os dentes</em></h1>
          <p className="hero-subtitle">Um cuidado próximo, pensado para que você se sinta acolhido, confiante e à vontade para sorrir.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={wa("Olá, Dra. Bruna! Gostaria de conversar e agendar uma avaliação.")} target="_blank" rel="noreferrer">Agendar pelo WhatsApp <span aria-hidden="true">↗</span></a>
            <Link className="btn btn-outline hero-treatments-button" href="#tratamentos">Conhecer atendimentos</Link>
          </div>
        </div>
      </div>
    </section>

    <section className="about section" id="sobre">
      <div className="container about-grid about-copy-only">
        <div className="about-copy">
          <span className="eyebrow">Um pouco sobre mim</span>
          <h2>Prazer, sou a Bruna!</h2>
          <h3 className="about-subtitle">Cirurgiã-dentista</h3>
          <div className="about-story">
            <p>Mais do que cuidar de sorrisos, eu cuido de pessoas. Quero que cada paciente que sente na minha cadeira se sinta à vontade para falar, dividir suas inseguranças e ser ouvido de verdade. Porque, antes de qualquer procedimento, existe uma história, um sentimento e um motivo por trás de cada sorriso.</p>
            <p>Meu propósito é que você se sinta acolhido, compreendido e seguro em cada etapa. Que suas vontades sejam respeitadas, suas dúvidas tenham espaço e que você se sinta parte de todo o processo.</p>
            <p>Quero que você saia daqui com a confiança renovada e a liberdade de sorrir sem esconder os dentes. Porque, no fim, meu propósito vai muito além da odontologia: transformar sorrisos e ajudar pessoas a se enxergarem de um jeito novo.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="treatments section section-soft" id="tratamentos">
      <div className="container">
        <div className="center-heading"><span className="eyebrow">Atendimentos</span><h2>Cuidados pensados para valorizar<br />a beleza e a saúde do seu sorriso.</h2></div>
        <div className="treatment-cards">{treatments.map((item) => <article className="treatment-card" key={item.name}>
          <div className={`treatment-card-image ${item.name === "Clareamento Dental" ? "treatment-whitening-image" : ""}`}><img src={item.image} alt={item.name} loading="lazy" /></div>
          <div className="treatment-card-content">{item.title && <h2 className="treatment-feature-title">{item.title}</h2>}<h3>{item.name}</h3>{item.description && <p className="treatment-lead">{item.description}</p>}<h4>Como pode ajudar:</h4><ul>{item.benefits.map(b => <li key={b}>{b}</li>)}</ul><div className="treatment-actions"><a className="btn btn-outline" href={wa(`Olá, Dra. Bruna! Quero saber mais sobre ${item.name}.`)} target="_blank" rel="noreferrer">Quero saber mais</a></div></div>
        </article>)}</div>
      </div>
    </section>

    <section className="clinic-section section" id="clinica">
      <div className="container">
        <div className="center-heading clinic-heading">
          <h2 className="clinic-title">Mais que um consultório</h2>
          <p className="clinic-copy-line"><span>Um espaço para ouvir, acolher e transformar.</span><span>Onde cada conversa é o primeiro passo para o seu novo sorriso.</span></p>
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

    <section className="contact section" id="contato"><div className="contact-content"><span className="eyebrow">Um convite para cuidar de você</span><h2>Vamos conversar?</h2><p>Estou aqui para ouvir você e ajudar a encontrar o cuidado que faz sentido para o seu sorriso.</p><div className="hero-actions"><a className="btn btn-primary" href={wa("Olá, Dra. Bruna! Gostaria de conversar.")} target="_blank" rel="noreferrer">Fale comigo pelo WhatsApp <span aria-hidden="true">↗</span></a><a className="btn btn-outline" href={instagram} target="_blank" rel="noreferrer">@Dra.bruandrade</a></div></div></section>

    <footer className="footer"><div className="container footer-main"><div className="footer-brand"><Link href="#inicio">Dra. Bruna Andrade</Link><span>Cirurgiã-dentista</span></div><nav aria-label="Links do rodapé"><Link href="#inicio">Início</Link><Link href="#sobre">Sobre</Link><Link href="#tratamentos">Atendimentos</Link><Link href="#contato">Contato</Link></nav><div className="footer-contact"><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp<br /><span>+55 11 94843-7467</span></a><a href={instagram} target="_blank" rel="noreferrer">Instagram<br /><span>@Dra.bruandrade</span></a></div></div><div className="container footer-bottom"><span>© 2025 Dra. Bruna Andrade. Todos os direitos reservados.</span></div></footer>
  </main></ScrollReveal>;
}

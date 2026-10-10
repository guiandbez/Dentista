import Link from "next/link";
import { createClient } from "../lib/supabase-server";
import ScrollReveal from "./scroll-reveal";

import { appointmentWhatsappUrl, conversationWhatsappUrl, whatsappUrl } from "./whatsapp";
const instagram = "https://instagram.com/Dra.bruandrade";
const clinicMaps = "https://www.google.com/maps/dir/?api=1&destination=Consult%C3%B3rio%20Dra.%20Bruna%20Andrade%20-%20Odontologia%20%26%20Est%C3%A9tica%2C%20R.%20Inga%C3%AD%2C%20156%20-%20Vila%20Prudente%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003132-080";

type Treatment = {
  name: string;
  image: string;
  description: string;
  benefits: string[];
  procedures?: string[];
};

const treatments: Treatment[] = [
  {
    name: "Facetas / Lentes",
    image: "/images/tratamentos/facetas-lente.jpeg",
    description: "Um sorriso escolhido por você.",
    benefits: ["Corrigir formatos dentários que incomodam.", "Disfarçar espaços entre os dentes.", "Harmonizar tamanho e proporção dos dentes.", "Melhorar a aparência de manchas e alterações de cor."],
  },
  {
    name: "Harmonização facial",
    image: "/images/tratamentos/harmonizacao-facial.jpeg",
    description: "Realçar sua beleza sem perder aquilo que faz você ser você.",
    benefits: ["Suavizar linhas de expressão que incomodam.", "Amenizar o aspecto de cansaço na face.", "Valorizar os contornos e traços naturais.", "Melhorar a harmonia facial respeitando sua individualidade."],
    procedures: ["Toxina botulínica", "Preenchimento labial", "Preenchimento de mento (queixo)", "Preenchimento de bigode chinês"],
  },
  {
    name: "Clareamento dental",
    image: "/images/tratamentos/clareamento-dental.jpeg",
    description: "Um sorriso mais claro para você sorrir com mais confiança.",
    benefits: ["Reduzir o aspecto amarelado dos dentes.", "Clarear manchas que comprometem a aparência do sorriso.", "Recuperar a luminosidade dos dentes.", "Sentir mais segurança ao sorrir em fotos."],
  },
  {
    name: "Implantes / Reabilitação",
    image: "/images/tratamentos/implantes.jpeg",
    description: "Recupere a segurança para sorrir, mastigar e viver sem se preocupar com a falta de um ou mais dentes.",
    benefits: ["Substituir dentes perdidos.", "Recuperar a segurança ao mastigar.", "Melhorar a estética e a harmonia do sorriso.", "Recuperar a confiança para sorrir sem esconder os dentes."],
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
      <img className="hero-background" src="/images/dra-bruna/bruna-transparente-2160.jpeg" alt="" fetchPriority="high" />
      <div className="hero-shade" />
      <div className="container hero-grid">
        <div className="hero-content">
          <span className="eyebrow">Odontologia e Estética</span>
          <h1><span className="hero-title-line">Devolvo a liberdade de</span> <span className="hero-title-line"><em>sorrir</em> sem esconder os dentes</span></h1>
          <p className="hero-subtitle">Uma odontologia que começa pela escuta e se transforma em cuidado.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={appointmentWhatsappUrl()} target="_blank" rel="noreferrer">Agendar uma conversa</a>
            <Link className="btn btn-outline hero-treatments-button" href="#tratamentos">Conhecer atendimentos</Link>
          </div>
        </div>
      </div>
    </section>

    <section className="about section" id="sobre">
      <div className="container about-grid about-copy-only about-with-photo">
        <div className="about-copy">
          <h2>Prazer, Bruna</h2>
          <h3 className="about-subtitle">Cirurgiã-dentista</h3>
          <p className="about-intro">Mais do que cuidar de sorrisos, eu cuido de pessoas.</p>
          <div className="about-story">
            <p>Quero que cada paciente que sente na minha cadeira se sinta à vontade para falar, dividir suas inseguranças e ser ouvido de verdade. Porque, antes de qualquer procedimento, existe uma história, um sentimento e um motivo por trás de cada sorriso.</p>
            <p>Meu propósito é que você se sinta acolhido, compreendido e seguro em cada etapa. Que suas vontades sejam respeitadas, suas dúvidas tenham espaço e que você se sinta parte de todo o processo.</p>
            <p>Quero que você saia daqui com a confiança renovada e a liberdade de sorrir sem esconder os dentes. Porque, no fim, meu propósito vai muito além da odontologia: transformar sorrisos e ajudar pessoas a se enxergarem de um jeito novo.</p>
          </div>
        </div>
        <figure className="photo-frame about-photo"><img src="/images/dra-bruna/sobre-mim-TROCAR.jpeg" alt="Imagem provisória da recepção; substituir por foto da Dra. Bruna" loading="lazy" /></figure>
      </div>
    </section>

    <section className="treatments section section-soft" id="tratamentos">
      <div className="container">
        <div className="center-heading"><span className="eyebrow">Atendimentos</span><h2 className="treatments-heading">É aqui que o cuidado se transforma em possibilidades</h2></div>
        <div className="treatment-cards">{treatments.map((item) => <article className="treatment-card" key={item.name}>
          <div className="treatment-card-image"><img src={item.image} alt={item.name} loading="lazy" /></div>
          <div className="treatment-card-content"><h3>{item.name}</h3><p className="treatment-lead">{item.description}</p><h4>Como pode ajudar:</h4><ul>{item.benefits.map(b => <li key={b}>{b}</li>)}</ul>{item.procedures && <><h4>Procedimentos disponíveis:</h4><ul className="treatment-procedures">{item.procedures.map(procedure => <li key={procedure}>{procedure}</li>)}</ul></>}<div className="treatment-actions"><a className="btn btn-outline" href="#contato">Quero saber mais</a></div></div>
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
          </div>
        </div>
        <div className="clinic-actions"><a className="btn btn-outline" href={clinicMaps} target="_blank" rel="noopener noreferrer">Ver localização</a></div>
      </div>
    </section>

    <section className="contact section" id="contato"><div className="contact-content"><h2>Vamos conversar?</h2><p className="contact-highlight">O próximo passo pode ser só uma boa conversa.</p><p className="contact-copy">Para agendamentos e dúvidas, fale comigo pelo Instagram ou WhatsApp.</p><div className="hero-actions contact-actions"><a className="btn btn-primary" href={conversationWhatsappUrl()} target="_blank" rel="noreferrer">Falar pelo WhatsApp</a><a className="btn btn-outline" href={instagram} target="_blank" rel="noreferrer">Falar pelo Instagram</a></div></div></section>

    <footer className="footer"><div className="container footer-main"><div className="footer-brand"><Link href="#inicio">Dra. Bruna Andrade</Link><span>Cirurgiã-dentista</span></div><nav aria-label="Links do rodapé"><Link href="#inicio">Início</Link><Link href="#sobre">Sobre</Link><Link href="#tratamentos">Atendimentos</Link><Link href="#contato">Contato</Link></nav><div className="footer-contact"><a href={whatsappUrl()} target="_blank" rel="noreferrer">WhatsApp<br /><span>+55 11 94843-7467</span></a><a href={instagram} target="_blank" rel="noreferrer">Instagram<br /><span>@Dra.bruandrade</span></a></div></div><div className="container footer-bottom"><span>© 2025 Dra. Bruna Andrade. Todos os direitos reservados.</span></div></footer>
  </main></ScrollReveal>;
}

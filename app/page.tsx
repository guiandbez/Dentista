import Link from "next/link";
import { createClient } from "../lib/supabase-server";

const whatsapp = "https://wa.me/5511948437467";
const instagram = "https://instagram.com/Dra.bruandrade";
const wa = (message: string) => `${whatsapp}?text=${encodeURIComponent(message)}`;
const treatments = [
  { name: "Facetas Dentárias", image: "/images/tratamentos/facetas.jpg", description: "São lâminas finas que podem melhorar a forma, cor e harmonia dos dentes, com aparência natural.", benefits: ["Harmonizar o formato dos dentes", "Melhorar a cor do sorriso", "Corrigir pequenas imperfeições", "Criar um sorriso mais uniforme"] },
  { name: "Clareamento Dental", image: "/images/tratamentos/clareamento.jpg", description: "Técnica segura que remove manchas e devolve o brilho natural do seu sorriso.", benefits: ["Clarear o branco dos dentes", "Reduzir manchas e pigmentações", "Deixar o sorriso mais claro", "Realçar a beleza de forma natural"] },
  { name: "Harmonização Orofacial", image: "/images/tratamentos/harmonizacao.jpg", description: "Equilibra os contornos do rosto e valoriza a sua expressão, de forma natural e personalizada.", benefits: ["Melhorar o contorno facial", "Suavizar linhas de expressão", "Realçar sua beleza natural", "Proporcionar mais harmonia ao rosto"] },
  { name: "Implantes Dentários", image: "/images/tratamentos/implantes.jpg", description: "Repõe dentes perdidos com segurança, funcionalidade e estética.", benefits: ["Restaurar a função mastigatória", "Preservar o osso da região", "Devolver a confiança ao sorrir", "Melhorar a qualidade de vida"] },
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
  return <main>
    <section className="hero" id="inicio">
      <div className="hero-photo" role="img" aria-label="Retrato profissional sorridente da Dra. Bruna" />
      <div className="hero-shade" />
      <div className="container hero-content"><span className="eyebrow eyebrow-light">Sorrisos que valorizam você</span><h1>Dra. Bruna<br />Andrade</h1><p className="hero-subtitle">Odontologia e Estética</p><p className="hero-description">Cuidar do seu sorriso é mais do que estética,<br className="desktop-break" /> é sobre bem-estar, autoestima e confiança.</p><div className="hero-actions"><a className="btn btn-gold" href={wa("Olá, Dra. Bruna! Gostaria de conversar e agendar uma avaliação.")} target="_blank" rel="noreferrer">Agendar pelo WhatsApp <span aria-hidden="true">↗</span></a><Link className="text-link light-link" href="#tratamentos">Conhecer tratamentos <span aria-hidden="true">↓</span></Link></div><a className="hero-instagram" href={instagram} target="_blank" rel="noreferrer">◎ @Dra.bruandrade</a><small className="hero-caption">Retrato ilustrativo</small></div>
    </section>

    <section className="about section" id="sobre"><div className="container about-grid"><div className="about-photo" role="img" aria-label="Retrato profissional da Dra. Bruna"/><div className="about-copy"><span className="eyebrow">Sobre a Dra. Bruna</span><h2>Cuidado, planejamento<br /><em>e resultados naturais</em></h2><p>Um atendimento próximo começa com escuta e confiança. Cada sorriso recebe um olhar cuidadoso, com planejamento individual e respeito à saúde, à beleza e à história de cada pessoa.</p><div className="about-points"><article><span>✳</span><div><h3>Atendimento personalizado</h3><p>Cada sorriso é único e merece um cuidado exclusivo.</p></div></article><article><span>◇</span><div><h3>Planejamento individual</h3><p>Tudo é pensado de forma cuidadosa, do primeiro contato ao resultado final.</p></div></article><article><span>♡</span><div><h3>Resultados naturais</h3><p>Realçando o que te torna única, com harmonia e equilíbrio.</p></div></article></div></div></div></section>

    <section className="treatments section section-soft" id="tratamentos"><div className="container"><div className="center-heading"><span className="eyebrow">Tratamentos</span><h2>Cuidados pensados para valorizar<br />a beleza e a saúde do seu sorriso.</h2></div><div className="treatment-cards">{treatments.map((item, i) => <article className="treatment-card" key={item.name}><div className="treatment-card-image" role="img" aria-label={`${item.name}, imagem a adicionar em public${item.image}` } style={{ backgroundImage: `url("${item.image}")` }}/><div className="treatment-card-content"><span className="eyebrow">0{i + 1}</span><h3>{item.name}</h3><p className="treatment-lead">{item.description}</p><h4>Como pode ajudar:</h4><ul>{item.benefits.map(b => <li key={b}>{b}</li>)}</ul><div className="treatment-actions"><a className="btn btn-outline" href={wa(`Olá, Dra. Bruna! Quero saber mais sobre ${item.name}.`)} target="_blank" rel="noreferrer">Quero saber mais</a><a className="btn btn-primary" href={wa(`Olá, Dra. Bruna! Gostaria de agendar atendimento para conversar sobre ${item.name}.`)} target="_blank" rel="noreferrer">Agendar pelo WhatsApp</a></div></div></article>)}</div><p className="gallery-note">A indicação depende de avaliação individual. Os resultados podem variar de acordo com cada caso.</p></div></section>

    <section className="results section" id="resultados"><div className="container"><div className="center-heading"><span className="eyebrow">Resultados</span><h2>Beleza nos detalhes</h2><p>Imagens de referência para inspirar uma conversa cuidadosa.</p></div><div className="gallery">{[1,2,3].map((n)=><div className="gallery-image" key={n} role="img" aria-label={`Resultado ilustrativo ${n}, imagem a adicionar em public/images/resultados/resultado-0${n}.jpg`} style={{backgroundImage:`url("/images/resultados/resultado-0${n}.jpg")`}}/>)}</div><p className="gallery-note">Imagens ilustrativas. Os resultados podem variar de acordo com cada caso. As fotos não representam necessariamente pacientes da clínica.</p></div></section>

    <section className="journey section section-soft"><div className="container"><div className="center-heading"><span className="eyebrow">Sua experiência</span><h2>Um processo pensado<br />para o seu bem-estar.</h2></div><div className="journey-steps">{[["01","Conversa inicial","Entendemos suas necessidades e expectativas."],["02","Avaliação","Analisamos seu sorriso e sua saúde bucal."],["03","Planejamento","Criamos um plano personalizado para você."],["04","Tratamento","Cuidamos de cada detalhe com segurança e conforto."],["05","Acompanhamento","Seguimos com você em cada etapa."]].map(([n,title,desc])=><article className="journey-step" key={n}><span>{n}</span><h3>{title}</h3><p>{desc}</p></article>)}</div></div></section>

    <section className="contact section" id="contato"><div className="contact-flower flower-left">✿</div><div className="contact-content"><span className="eyebrow">Um convite para cuidar de você</span><h2>Seu sorriso merece<br /><em>um cuidado especial.</em></h2><p>Vamos conversar e encontrar o melhor tratamento para você?</p><div className="hero-actions"><a className="btn btn-primary" href={wa("Olá, Dra. Bruna! Gostaria de conversar e agendar uma avaliação.")} target="_blank" rel="noreferrer">Agendar pelo WhatsApp <span>↗</span></a><a className="btn btn-outline" href={instagram} target="_blank" rel="noreferrer">@Dra.bruandrade</a></div></div><div className="contact-flower flower-right">✿</div></section>

    <footer className="footer"><div className="container footer-main"><div className="footer-brand"><Link href="#inicio">Dra. Bruna Andrade</Link><span>Odontologia e Estética</span></div><nav aria-label="Links do rodapé"><Link href="#inicio">Início</Link><Link href="#sobre">Sobre</Link><Link href="#tratamentos">Tratamentos</Link><Link href="#resultados">Resultados</Link><Link href="#contato">Contato</Link></nav><div className="footer-contact"><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp<br/><span>+55 11 94843-7467</span></a><a href={instagram} target="_blank" rel="noreferrer">Instagram<br/><span>@Dra.bruandrade</span></a></div></div><div className="container footer-bottom"><span>© 2025 Dra. Bruna Andrade. Todos os direitos reservados.</span></div></footer>
  </main>;
}

# Site da clínica odontológica — Vercel + Supabase

## O que já está incluído
- Landing page responsiva com identidade elegante.
- Cadastro/login de clientes.
- Confirmação de e-mail pelo Supabase Auth.
- Área do cliente.
- Orçamento online por seleção de procedimentos.
- Agendamento sem pagamento antecipado.
- Histórico/status dos agendamentos.
- Painel administrativo da dentista.
- Calendário mensal: dias com pacientes ficam rosa.
- Clique no dia para ver horário, nome, contato, procedimentos e orçamento.
- Confirmação ou cancelamento por imprevisto com mensagem ao cliente.
- Banco PostgreSQL + Row Level Security no Supabase.
- Estrutura pronta para deploy na Vercel.

## 1. Supabase
1. Crie um projeto no Supabase.
2. Abra SQL Editor e execute `supabase/schema.sql`.
3. Em Authentication > URL Configuration, coloque:
   - Site URL: `https://dentista-bruna.vercel.app`
   - Redirect URLs: `https://dentista-bruna.vercel.app/auth/callback`
4. Em Authentication > Email, mantenha a confirmação de e-mail ativada.
5. Copie URL e anon key para as variáveis da Vercel.

## 2. Criar a conta da dentista
Cadastre a dentista normalmente pela tela `/cadastro`.
Depois, no SQL Editor:
`update public.profiles set role='admin' where email='EMAIL_DA_DENTISTA';`
Ela passa a acessar `/admin`.

## 3. Vercel
Suba este projeto para um repositório GitHub e importe-o na Vercel.
Configure (use `https://dentista-bruna.vercel.app` for `NEXT_PUBLIC_APP_URL` in production):
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_APP_URL

O projeto usa Next.js e funciona diretamente como aplicação Vercel.

## 4. E-mail
A confirmação de cadastro é feita pelo Supabase Auth. O sistema não envia e-mail de imprevisto por padrão: a mensagem fica imediatamente visível na área do cliente.
Para e-mails transacionais próprios, adicione Resend e uma rota API usando RESEND_API_KEY/RESEND_FROM_EMAIL.

## Segurança
Nunca coloque `service_role` do Supabase no navegador. Este projeto usa a chave anon/public com RLS.

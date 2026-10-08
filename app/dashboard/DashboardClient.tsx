"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase-browser";

type Proc = { id: string; name: string; price: number };
type Apt = {
  id: string;
  date: string;
  time: string;
  status: string;
  total: number;
  procedures: string[];
  clinic_message?: string;
};

export default function Dashboard() {
  const [procs, setProcs] = useState<Proc[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [apts, setApts] = useState<Apt[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [proceduresLoading, setProceduresLoading] = useState(true);
  const [user, setUser] = useState<any>();
  const router = useRouter();
  const sb = createClient();

  useEffect(() => {
    void (async () => {
      const { data: { user: currentUser } } = await sb.auth.getUser();
      if (!currentUser) {
        router.push("/login");
        return;
      }

      setUser(currentUser);
      const { data, error: proceduresError } = await sb
        .from("procedures")
        .select("id,name,price")
        .eq("active", true)
        .order("name");

      if (proceduresError) {
        setError(`Não foi possível carregar os procedimentos: ${proceduresError.message}`);
      } else {
        setProcs((data || []) as Proc[]);
      }
      setProceduresLoading(false);
      await refresh(currentUser.id);
    })();
  }, []);

  async function refresh(userId: string) {
    const { data } = await sb
      .from("appointments")
      .select("id,date,time,status,total,clinic_message,appointment_items(procedure_name)")
      .eq("user_id", userId)
      .order("date", { ascending: false });
    setApts((data || []).map((appointment: any) => ({
      ...appointment,
      procedures: (appointment.appointment_items || []).map((item: any) => item.procedure_name),
    })));
  }

  function toggle(id: string) {
    setSelected((current) => current.includes(id)
      ? current.filter((selectedId) => selectedId !== id)
      : [...current, id]);
  }

  const total = selected.reduce(
    (sum, id) => sum + Number(procs.find((procedure) => procedure.id === id)?.price || 0),
    0,
  );

  async function book(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!date || !time || !selected.length) {
      setError("Escolha pelo menos um procedimento, data e horário.");
      return;
    }
    if (!user) {
      setError("Sua sessão expirou. Entre novamente para continuar.");
      return;
    }

    const { data, error: appointmentError } = await sb
      .from("appointments")
      .insert({ user_id: user.id, date, time, status: "pending", total })
      .select()
      .single();
    if (appointmentError) {
      setError(appointmentError.message);
      return;
    }

    const { error: itemsError } = await sb.from("appointment_items").insert(
      selected.map((id) => {
        const procedure = procs.find((item) => item.id === id)!;
        return {
          appointment_id: data.id,
          procedure_id: id,
          procedure_name: procedure.name,
          price: procedure.price,
        };
      }),
    );
    if (itemsError) {
      setError(`A consulta foi criada, mas não foi possível salvar os procedimentos: ${itemsError.message}`);
      return;
    }

    setSelected([]);
    setDate("");
    setTime("");
    setMessage("Solicitação enviada para o consultório.");
    await refresh(user.id);
  }

  async function logout() {
    await sb.auth.signOut();
    router.push("/");
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dash-head">
          <div>
            <div className="eyebrow">Área do cliente</div>
            <h1>Olá, {user?.user_metadata?.full_name?.split(" ")[0] || "cliente"}.</h1>
          </div>
          <button className="btn btn-secondary" onClick={logout}>Sair</button>
        </div>
        <div className="dash-grid">
          <div className="panel">
            <h2>Solicite seu atendimento</h2>
            <p className="muted small">Escolha os tratamentos sobre os quais deseja conversar com o consultório.</p>
            {error && <div className="error">{error}</div>}
            {message && <div className="success">{message}</div>}
            <div className="tabs">
              {proceduresLoading ? <p className="muted small">Carregando procedimentos...</p>
                : procs.length === 0 ? <p className="muted small">Nenhum procedimento ativo disponível.</p>
                  : procs.filter((procedure) => !/\b(botox|facetas?)\b/i.test(procedure.name)).map((procedure) => {
                    const isSelected = selected.includes(procedure.id);
                    return (
                      <button
                        type="button"
                        key={procedure.id}
                        aria-pressed={isSelected}
                        className={`tab ${isSelected ? "active" : ""}`}
                        onClick={() => toggle(procedure.id)}
                      >
                        {isSelected && <span aria-hidden="true">✓ </span>}
                        {procedure.name}
                      </button>
                    );
                  })}
            </div>
            <form onSubmit={book} style={{ marginTop: 18 }}>
              <div className="field">
                <label>Data desejada</label>
                <input className="input" type="date" value={date} onChange={(event) => setDate(event.target.value)} min={new Date().toISOString().slice(0, 10)} required />
              </div>
              <div className="field">
                <label>Horário desejado</label>
                <input className="input" type="time" value={time} onChange={(event) => setTime(event.target.value)} required />
              </div>
              <button className="btn btn-primary" style={{ width: "100%" }}>Confirmar solicitação</button>
            </form>
          </div>
          <div className="panel">
            <h2>Minhas consultas</h2>
            {apts.length === 0 && <p className="muted">Você ainda não possui solicitações.</p>}
            {apts.map((appointment) => (
              <div className="appointment" key={appointment.id}>
                <div className="appointment-top">
                  <b>{appointment.date} · {appointment.time}</b>
                  <span className={`badge ${appointment.status === "confirmed" ? "confirmed" : "pending"}`}>
                    {appointment.status === "confirmed" ? "Confirmada" : "Em análise"}
                  </span>
                </div>
                <p className="small muted">{appointment.procedures.join(" · ")}</p>
                {appointment.clinic_message && <div className="notice">{appointment.clinic_message}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

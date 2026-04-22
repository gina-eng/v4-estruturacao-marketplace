#!/usr/bin/env python3
"""Gera consolidated.md a partir do client.json + outputs/*.json.

Uso:
    python3 render_consolidated.py <path_cliente>

Ex:
    python3 render_consolidated.py clientes/clinica-veterinaria-zenvet
"""
import json
import os
import re
import sys
from datetime import datetime

PORTAL_TEMPLATE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "portal.html")


SECTIONS = [
    ("1. Identidade do Cliente", "identity"),
    ("2. Produto, Oferta & Unidade Econômica", "product"),
    ("3. ICP & Persona", "icp"),
    ("4. Mercado & Concorrência", "market"),
    ("5. Maturidade Digital & SWOT", "maturity_swot"),
    ("6. Posicionamento Estratégico", "positioning"),
    ("7. Comunicação & Auditoria de Canais", "comms"),
    ("8. Orgânico Instagram", "organic"),
    ("9. Mídia Paga", "paid"),
    ("10. CRO & Landing Page", "cro"),
    ("11. Marca & Identidade Visual", "brand"),
    ("12. Roadmap de Evolução", "roadmap"),
]


def safe(v, default="—"):
    if v is None or v == "" or v == []:
        return default
    return v


def bullets(items, fmt=lambda x: x):
    if not items:
        return "—"
    return "\n".join(f"- {fmt(i)}" for i in items)


def fmt_brl(v):
    if v is None:
        return "—"
    try:
        v = float(v)
    except Exception:
        return str(v)
    if v >= 1_000_000_000:
        return f"R$ {v/1_000_000_000:.1f} bi"
    if v >= 1_000_000:
        return f"R$ {v/1_000_000:.1f} M"
    if v >= 1_000:
        return f"R$ {v/1_000:.0f} mil"
    return f"R$ {v:.2f}"


def load_outputs(base):
    outputs = {}
    outdir = os.path.join(base, "outputs")
    if not os.path.isdir(outdir):
        return outputs
    for f in sorted(os.listdir(outdir)):
        if f.endswith(".json"):
            key = f.replace(".json", "")
            with open(os.path.join(outdir, f), encoding="utf-8") as fp:
                outputs[key] = json.load(fp)
    return outputs


def section_identity(client, outputs):
    b = client.get("briefing", {})
    ident = b.get("identification", {})
    team = ident.get("v4_team", {}) or {}
    md = []
    md.append(f"**Cliente:** {safe(ident.get('name'))}")
    md.append(f"**Segmento:** {safe(ident.get('segment'))}")
    md.append(f"**Localização:** {safe(ident.get('location'))}")
    if ident.get("address"):
        md.append(f"**Endereço:** {ident['address']}")
    md.append(f"**Cidades atendidas:** {', '.join(ident.get('coverage_cities') or []) or '—'}")
    md.append("")
    md.append("### Contato")
    md.append(f"- **Responsável:** {safe(ident.get('contact_name'))} — {safe(ident.get('contact_role'))}")
    if ident.get("contact_financial"):
        md.append(f"- **Financeiro:** {ident['contact_financial']}")
    md.append(f"- **WhatsApp:** {safe(ident.get('whatsapp'))}")
    md.append(f"- **Instagram:** {safe(ident.get('instagram'))}")
    md.append(f"- **Site:** {safe(ident.get('website'))}")
    md.append("")
    md.append("### Contrato")
    md.append(f"- **Valor:** {safe(ident.get('contract_value'))}")
    md.append(f"- **Início:** {safe(ident.get('contract_start'))}")
    md.append(f"- **Faturamento anual:** {safe(ident.get('annual_revenue'))}")
    md.append(f"- **Faturamento mês atual:** {safe(ident.get('monthly_revenue_last'))} · **Meta:** {safe(ident.get('monthly_revenue_goal'))}")
    md.append("")
    md.append("### Equipe V4")
    md.append(f"- **Closer:** {safe(team.get('closer'))}")
    md.append(f"- **Executor:** {safe(team.get('executor'))}")
    md.append(f"- **Diagnóstico:** {safe(team.get('diagnostico'))}")
    return "\n".join(md)


def section_product(client, outputs):
    b = client.get("briefing", {})
    p = b.get("product", {})
    md = []
    md.append(f"**Produto principal:** {safe(p.get('main_product'))}")
    md.append("")
    md.append(f"- **Ticket médio:** {safe(p.get('ticket'))}")
    md.append(f"- **Modelo:** {safe(p.get('billing_model'))}")
    md.append(f"- **Ciclo de venda:** {safe(p.get('sales_cycle'))}")
    md.append(f"- **Base de clientes ativos:** {safe(p.get('active_customers'))}")
    md.append(f"- **Mix atual:** {safe(p.get('mix_atual'))}")
    md.append(f"- **Mais rentável:** {safe(p.get('most_profitable'))}")
    md.append(f"- **Potencial de crescimento:** {safe(p.get('growth_potential'))}")
    md.append("")
    if p.get("services"):
        md.append("### Serviços oferecidos")
        md.append(bullets(p["services"]))
    # Unit economics do diagnóstico de mídia se existir
    media = outputs.get("ee-s2-diagnostico-midia", {})
    cm = media.get("current_metrics") or {}
    if cm:
        md.append("")
        md.append("### Unidade econômica atual (últimos 90d) *[refinado em Semana 2]*")
        if cm.get("leads_per_month"):
            md.append(f"- **Leads/mês:** {cm['leads_per_month']}")
        if cm.get("cpl_estimated"):
            md.append(f"- **CPL estimado:** R$ {cm['cpl_estimated']}")
        if cm.get("conversion_rate"):
            md.append(f"- **Taxa de conversão (lead→agendamento):** {cm['conversion_rate']}")
        if cm.get("cac"):
            md.append(f"- **CAC atual:** R$ {cm['cac']}")
    return "\n".join(md)


def section_icp(client, outputs):
    o = outputs.get("ee-s1-persona-icp", {})
    if not o:
        return "*ICP ainda não definido.*"
    icp = o.get("icp", {}) or {}
    persona = o.get("persona", {}) or {}
    secondary = o.get("icp_secondary", {}) or {}
    anti = o.get("anti_persona", {}) or {}
    km = o.get("key_message", {}) or {}
    md = []
    md.append(f"> **Resumo:** {o.get('summary', '—')}")
    md.append("")
    md.append("### ICP principal")
    md.append(f"**Segmento:** {safe(icp.get('segment_label'))}")
    dem = icp.get("demographics", {}) or {}
    if dem:
        md.append(f"- **Faixa etária:** {safe(dem.get('age_range'))}")
        md.append(f"- **Renda:** {safe(dem.get('income_or_revenue'))}")
        md.append(f"- **Localização:** {safe(dem.get('location'))}")
        md.append(f"- **Relação com o pet:** {safe(dem.get('pet_relationship'))}")
    md.append("")
    md.append("### Persona — Mariana")
    md.append(f"**{safe(persona.get('name'))}, {safe(persona.get('age'))}** — {safe(persona.get('occupation'))} em {safe(persona.get('location'))}")
    if persona.get("story"):
        md.append("")
        md.append(persona["story"])
    md.append("")
    if km.get("chosen_message"):
        md.append("### Mensagem-chave aprovada")
        md.append(f"> **\"{km['chosen_message']}\"**")
        if km.get("usage_context"):
            md.append(f"*Uso:* {km['usage_context']}")
        if km.get("rationale"):
            md.append(f"*Justificativa:* {km['rationale']}")
    md.append("")
    if secondary:
        md.append("### ICP secundário")
        md.append(f"**{safe(secondary.get('segment_label'))}**")
        sdem = secondary.get("demographics", {}) or {}
        if sdem:
            md.append(f"- {safe(sdem.get('age_range'))} · {safe(sdem.get('income_or_revenue'))} · {safe(sdem.get('location'))}")
        pains = secondary.get("pains") or []
        if pains:
            first = pains[0] if isinstance(pains[0], str) else (pains[0].get("pain") or pains[0].get("description"))
            md.append(f"*Dor principal:* {first}")
    md.append("")
    if anti:
        md.append("### Anti-persona")
        md.append(f"{safe(anti.get('description'))}")
        profiles = anti.get("profiles") or []
        for p in profiles[:3]:
            if isinstance(p, dict):
                md.append(f"- **{safe(p.get('label'))}** — {safe(p.get('who'))}")
    return "\n".join(md)


def section_market(client, outputs):
    o = outputs.get("ee-s2-pesquisa-mercado", {})
    if not o:
        return "*Pesquisa de mercado ainda não realizada.*"
    md = []
    md.append(f"> **Headline:** {o.get('summary_headline', o.get('summary', '—'))}")
    md.append("")
    md.append("### Tamanho de mercado")
    ts = o.get("tam_sam_som", {}) or {}
    for lvl in ("tam", "sam", "som"):
        v = ts.get(lvl, {}) or {}
        if v:
            val = v.get("value_brl") or v.get("value")
            val_str = fmt_brl(val) if isinstance(val, (int, float)) else safe(val)
            md.append(f"- **{lvl.upper()}:** {val_str} — {safe(v.get('description'))}")
            if v.get("source"):
                md.append(f"  *Fonte:* {v['source']}")
    ms = o.get("market_share")
    if ms and isinstance(ms, dict):
        md.append("")
        cur = ms.get("current_share_of_sam_pct")
        tgt = ms.get("target_share_of_sam_pct")
        if cur is not None:
            md.append(f"**Market share atual:** {cur}% do SAM · **Meta 3 anos:** {tgt}% do SAM")
        if ms.get("commentary"):
            md.append(f"*{ms['commentary']}*")
    md.append("")
    md.append("### Concorrentes mapeados")
    comps = o.get("competitors", []) or []
    for c in comps[:6]:
        md.append(f"**{safe(c.get('name'))}**")
        md.append(f"- Posicionamento: {safe(c.get('positioning'))}")
        md.append(f"- Pontos fortes: {', '.join(c.get('strengths') or []) or '—'}")
        md.append(f"- Pontos fracos: {', '.join(c.get('weaknesses') or []) or '—'}")
        md.append("")
    md.append("### Tendências e ameaças")
    for t in (o.get("trends") or [])[:3]:
        md.append(f"- **Tendência:** {safe(t.get('trend') or t.get('title'))} — {safe(t.get('evidence') or t.get('description'))}")
    for t in (o.get("threats") or [])[:3]:
        md.append(f"- **Ameaça:** {safe(t.get('threat') or t.get('title'))} — {safe(t.get('potential_impact') or t.get('impact') or t.get('description'))}")
    md.append("")
    op = o.get("unexploited_opportunity")
    if op:
        md.append("### Oportunidade não explorada")
        if isinstance(op, dict):
            md.append(f"{safe(op.get('description'))}")
        else:
            md.append(str(op))
    diffs = o.get("real_differentials")
    if diffs:
        md.append("")
        md.append("### Diferenciais reais")
        if isinstance(diffs, dict):
            has = diffs.get("has_today") or []
        elif isinstance(diffs, list):
            has = diffs
        else:
            has = []
        for d in has:
            if isinstance(d, dict):
                lbl = d.get("differential") or d.get("title") or d.get("item")
                jus = d.get("icp_relevance") or d.get("rationale") or d.get("description") or d.get("action_needed") or ""
                status = d.get("status")
            else:
                lbl, jus, status = d, "", None
            status_tag = f" *[{status}]*" if status else ""
            md.append(f"- **{safe(lbl)}**{status_tag} — {safe(jus)}")
    return "\n".join(md)


def section_maturity_swot(client, outputs):
    m = outputs.get("ee-s1-diagnostico-maturidade", {})
    s = outputs.get("ee-s1-swot", {})
    md = []
    if m:
        md.append("### Maturidade Digital")
        md.append(f"- **Score geral:** {safe(m.get('overall_score'))}/100 ({safe(m.get('overall_classification'))})")
        bench = m.get("sector_benchmark", {}) or {}
        if bench:
            md.append(f"- **Benchmark setorial:** {safe(bench.get('average_score'))}/100 ({safe(bench.get('sector'))})")
        md.append("")
        md.append("**Scores por pilar:**")
        for p in (m.get("pillar_scores") or []):
            md.append(f"- {safe(p.get('pillar'))}: **{safe(p.get('score'))}/100** ({safe(p.get('classification'))})")
        md.append("")
        if m.get("priorities"):
            md.append("**Prioridades (top 3):**")
            for p in m["priorities"][:3]:
                md.append(f"{p.get('rank', '•')}. {safe(p.get('action'))} — *Esforço: {safe(p.get('effort'))} / Pilar: {safe(p.get('pillar'))}*")
    md.append("")
    if s:
        md.append("### SWOT")
        md.append(f"> {s.get('summary', '—')}")
        md.append("")
        for label, key in [("Forças", "strengths"), ("Fraquezas", "weaknesses"),
                           ("Oportunidades", "opportunities"), ("Ameaças", "threats")]:
            items = s.get(key, []) or []
            md.append(f"**{label}:**")
            for i in items[:4]:
                if isinstance(i, dict):
                    md.append(f"- {safe(i.get('item') or i.get('title') or i.get('description'))}")
                else:
                    md.append(f"- {i}")
            md.append("")
        fin = s.get("financial_summary_90d") or {}
        if fin:
            md.append("### Projeção financeira 90d")
            if fin.get("description"):
                md.append(f"*{fin['description']}*")
                md.append("")
            simple_fields = [
                ("total_monthly_investment_incremental", "Investimento mensal incremental", "brl"),
                ("total_monthly_return_incremental", "Retorno mensal incremental", "brl"),
                ("net_monthly_return", "Retorno líquido mensal", "brl"),
                ("roi_multiplier", "ROI (multiplicador)", "x"),
                ("payback_days_blended", "Payback", "dias"),
            ]
            for key, label, unit in simple_fields:
                v = fin.get(key)
                if v is None:
                    continue
                if unit == "brl":
                    md.append(f"- **{label}:** {fmt_brl(v)}")
                elif unit == "x":
                    md.append(f"- **{label}:** {v}x")
                elif unit == "dias":
                    md.append(f"- **{label}:** {v} dias")
                else:
                    md.append(f"- **{label}:** {v}")
            caveats = fin.get("caveats") or []
            if caveats:
                md.append("")
                md.append("*Ressalvas:*")
                for c in caveats:
                    md.append(f"  - {c}")
    return "\n".join(md)


def section_positioning(client, outputs):
    o = outputs.get("ee-s2-posicionamento", {})
    if not o:
        return "*Posicionamento ainda não definido.*"
    md = []
    md.append(f"> **Headline:** {o.get('summary_headline', o.get('summary', '—'))}")
    md.append("")
    territory = o.get("brand_territory") or {}
    if isinstance(territory, dict) and territory:
        md.append("### Território de marca")
        three = territory.get("three_words") or []
        if three:
            md.append(f"**{' · '.join(three)}**")
        elif territory.get("name"):
            md.append(f"**{territory['name']}**")
        if territory.get("description"):
            md.append(territory["description"])
    md.append("")
    puv = o.get("puv")
    if puv:
        md.append("### PUV — Proposta Única de Valor")
        if isinstance(puv, dict):
            md.append(f"> **{safe(puv.get('statement') or puv.get('text'))}**")
            if puv.get("rationale"):
                md.append(f"*{puv['rationale']}*")
        else:
            md.append(f"> **{puv}**")
    md.append("")
    tag = o.get("recommended_tagline")
    if tag:
        if isinstance(tag, dict):
            tagstr = tag.get("text") or tag.get("tagline")
        else:
            tagstr = tag
        md.append("### Tagline recomendada")
        md.append(f"> *\"{safe(tagstr)}\"*")
    md.append("")
    canvas = o.get("canvas_4p") or {}
    if isinstance(canvas, dict) and canvas:
        md.append("### Canvas 4P")
        for p in ("product", "price", "place", "promotion"):
            v = canvas.get(p)
            if v:
                label = {"product": "Produto", "price": "Preço", "place": "Praça", "promotion": "Promoção"}[p]
                if isinstance(v, dict):
                    if p == "product":
                        desc = v.get("delivers") or v.get("description") or ""
                    elif p == "price":
                        desc = v.get("justification") or v.get("description") or ""
                        if v.get("positioning"):
                            desc = f"Posicionamento **{v['positioning']}**. {desc}"
                    elif p == "place":
                        main = v.get("main_channel") or ""
                        just = v.get("main_channel_justification") or ""
                        desc = f"{main}. {just}"
                    elif p == "promotion":
                        tone = v.get("tone") or ""
                        top = v.get("top_funnel_message") or ""
                        desc = tone
                        if top:
                            desc = f"{tone}\n  - *Topo de funil:* {top}"
                    else:
                        desc = v.get("description") or ""
                    md.append(f"- **{label}:** {safe(desc)}")
                else:
                    md.append(f"- **{label}:** {v}")
    insight = o.get("key_insight")
    if insight:
        md.append("")
        md.append("### Insight estratégico")
        if isinstance(insight, dict):
            if insight.get("headline"):
                md.append(f"**{insight['headline']}**")
            if insight.get("context"):
                md.append("")
                md.append(insight["context"])
            reasons = insight.get("numbered_reasons") or []
            if reasons:
                md.append("")
                for i, r in enumerate(reasons, 1):
                    md.append(f"{i}. {r}")
        else:
            md.append(str(insight))
    op_dir = o.get("operator_direction")
    if op_dir and isinstance(op_dir, dict):
        md.append("")
        md.append("### Direção estratégica")
        if op_dir.get("strongest_differential"):
            md.append(f"- **Diferencial mais forte:** {op_dir['strongest_differential']}")
        if op_dir.get("desired_position"):
            md.append(f"- **Posição desejada:** {op_dir['desired_position']}")
        if op_dir.get("desired_tone"):
            md.append(f"- **Tom desejado:** {op_dir['desired_tone']}")
        restr = op_dir.get("positioning_restrictions") or []
        if restr:
            md.append("- **Restrições:**")
            for r in restr:
                md.append(f"  - {r}")
    return "\n".join(md)


def section_comms(client, outputs):
    o = outputs.get("ee-s1-auditoria-comunicacao", {})
    if not o:
        return "*Auditoria de comunicação ainda não realizada.*"
    md = []
    md.append(f"> **Resumo:** {o.get('summary', '—')}")
    md.append("")
    md.append(f"**Score médio:** {safe(o.get('overall_score'))}/100 ({safe(o.get('overall_classification'))})")
    md.append("")
    md.append("### Scores por canal")
    for c in (o.get("channel_scores") or []):
        md.append(f"- {safe(c.get('channel'))}: **{safe(c.get('score'))}/100** — {safe(c.get('summary') or c.get('classification'))}")
    md.append("")
    tp = o.get("top_problems") or []
    if tp:
        md.append("### Problemas críticos")
        for p in tp[:5]:
            if isinstance(p, dict):
                md.append(f"- **{safe(p.get('title') or p.get('problem'))}** — {safe(p.get('description') or p.get('impact'))}")
            else:
                md.append(f"- {p}")
    md.append("")
    qw = o.get("quick_wins") or []
    if qw:
        md.append("### Quick Wins")
        for q in qw[:5]:
            if isinstance(q, dict):
                md.append(f"- {safe(q.get('action') or q.get('title'))} *(Impacto: {safe(q.get('impact'))})*")
            else:
                md.append(f"- {q}")
    return "\n".join(md)


def section_organic(client, outputs):
    o = outputs.get("ee-s2-diagnostico-organico-ig", {})
    if not o:
        return "*Diagnóstico de Instagram ainda não realizado.*"
    md = []
    md.append(f"> **Resumo:** {o.get('summary', '—')}")
    md.append("")
    bench = o.get("engagement_benchmark", {}) or {}
    if bench:
        md.append("### Engagement vs concorrência")
        accounts = bench.get("by_account") or []
        for a in accounts:
            if isinstance(a, dict):
                md.append(f"- **@{safe(a.get('username'))}** — engagement proxy: {safe(a.get('avg_engagement_proxy'))}% · formato forte: {safe(a.get('best_format_by_engagement'))}")
        if bench.get("insight"):
            md.append("")
            md.append(f"*{bench['insight']}*")
    md.append("")
    wp = o.get("client_winning_patterns") or []
    if wp:
        md.append("### O que já funciona")
        for p in wp[:4]:
            if isinstance(p, dict):
                md.append(f"- {safe(p.get('pattern') or p.get('description'))}")
            else:
                md.append(f"- {p}")
    md.append("")
    gaps = o.get("competitor_patterns_missing") or []
    if gaps:
        md.append("### Lacunas vs concorrência")
        for g in gaps[:4]:
            if isinstance(g, dict):
                md.append(f"- {safe(g.get('pattern') or g.get('description'))}")
            else:
                md.append(f"- {g}")
    md.append("")
    na = o.get("next_actions") or []
    if na:
        md.append("### Próximas ações")
        for a in na[:5]:
            if isinstance(a, dict):
                md.append(f"- {safe(a.get('action') or a.get('title'))}")
            else:
                md.append(f"- {a}")
    return "\n".join(md)


def section_paid(client, outputs):
    o = outputs.get("ee-s2-diagnostico-midia", {})
    if not o:
        return "*Diagnóstico de mídia ainda não realizado.*"
    md = []
    md.append(f"> **Headline:** {o.get('summary_headline', o.get('summary', '—'))}")
    md.append("")
    md.append(f"- **Período analisado:** {safe(o.get('data_period'))}")
    md.append(f"- **Budget contratado:** {safe(o.get('monthly_budget'))}/mês")
    md.append(f"- **Google Ads:** {safe(o.get('monthly_budget_google'))}/mês")
    md.append(f"- **Meta Ads:** {safe(o.get('monthly_budget_meta'))}/mês")
    md.append("")
    cm = o.get("current_metrics") or {}
    if cm:
        md.append("### Métricas atuais (90d)")
        label_map = {
            "cpl": "CPL", "ctr": "CTR", "cpc": "CPC", "cpa": "CPA", "cpm": "CPM",
            "conversion_rate": "Taxa de conversão",
            "total_investment": "Investimento total",
            "total_leads": "Total de leads",
            "total_clicks": "Total de clicks",
            "impressions": "Impressões",
            "frequency": "Frequência",
        }
        for k, v in cm.items():
            if isinstance(v, (str, int, float)):
                label = label_map.get(k, k.replace("_", " ").capitalize())
                md.append(f"- **{label}:** {v}")
    md.append("")
    highlights = o.get("summary_highlights") or []
    if highlights:
        md.append("### Principais achados")
        for h in highlights[:6]:
            if isinstance(h, dict):
                label = h.get("label") or h.get("title") or ""
                value = h.get("value") or ""
                subtext = h.get("subtext") or h.get("description") or ""
                md.append(f"- **{label}:** {value} — {subtext}")
            else:
                md.append(f"- {h}")
    md.append("")
    diag = o.get("diagnosis_by_dimension") or {}
    if diag:
        md.append("### Diagnóstico por dimensão")
        for dim, content in diag.items():
            dim_label = dim.replace("_", " ").capitalize()
            if isinstance(content, dict):
                # Pega primeiro campo textual relevante
                text_keys = ["segmentation", "summary", "description", "analysis", "diagnostic", "issue"]
                text = ""
                for k in text_keys:
                    if content.get(k):
                        text = content[k]
                        break
                if not text:
                    # pega primeiro valor string
                    for k, v in content.items():
                        if isinstance(v, str) and v.strip():
                            text = v
                            break
                md.append(f"- **{dim_label}:** {text or '—'}")
            elif isinstance(content, str):
                md.append(f"- **{dim_label}:** {content or '—'}")
    return "\n".join(md)


def section_cro(client, outputs):
    o = outputs.get("ee-s2-diagnostico-cro", {})
    if not o:
        return "*Diagnóstico de CRO ainda não realizado.*"
    md = []
    md.append(f"> **Resumo:** {o.get('summary', '—')}")
    md.append("")
    md.append(f"- **URL analisada:** {safe(o.get('url'))}")
    conv = o.get("current_conversion_rate")
    bounce = o.get("current_bounce_rate")
    time_p = o.get("avg_time_on_page")
    md.append(f"- **Taxa de conversão atual:** {safe(conv)+'%' if conv is not None else 'Não disponível — GA4 não instalado'}")
    md.append(f"- **Bounce rate:** {safe(bounce)+'%' if bounce is not None else 'Não disponível — GA4 não instalado'}")
    md.append(f"- **Tempo médio na página:** {safe(time_p)+'s' if time_p is not None else 'Não disponível — GA4 não instalado'}")
    ta = o.get("technical_audit") or {}
    if ta:
        md.append("")
        md.append("### Auditoria técnica")
        ps = ta.get("pagespeed") or {}
        if ps:
            ms = ps.get("mobile_scores", {}) or {}
            ds = ps.get("desktop_scores", {}) or {}
            md.append(f"- **PageSpeed Mobile:** Performance {safe(ms.get('performance'))}/100 · SEO {safe(ms.get('seo'))}/100 · A11y {safe(ms.get('accessibility'))}/100")
            md.append(f"- **PageSpeed Desktop:** Performance {safe(ds.get('performance'))}/100 · SEO {safe(ds.get('seo'))}/100 · A11y {safe(ds.get('accessibility'))}/100")
        cwv = ta.get("pagespeed", {}).get("mobile_cwv_lab", {}) or {}
        if cwv:
            lcp = cwv.get("lcp_ms")
            md.append(f"- **LCP mobile:** {round(lcp)}ms · **CLS:** {cwv.get('cls')} · **TBT:** {round(cwv.get('tbt_ms', 0))}ms" if lcp else "")
    md.append("")
    ca = o.get("copy_audit") or {}
    if ca and isinstance(ca, dict):
        af = ca.get("above_fold") or {}
        if af:
            md.append("### Hero (above the fold)")
            md.append(f"- **Headline atual:** {safe(af.get('current_headline'))}")
            md.append(f"- **Headline sugerida:** {safe(af.get('suggested_headline'))}")
            md.append(f"- **CTA atual:** {safe(af.get('current_cta'))}")
            md.append(f"- **CTA sugerido:** {safe(af.get('suggested_cta'))}")
            if af.get("value_prop_detail"):
                md.append("")
                md.append(f"*{af['value_prop_detail']}*")
    trust = o.get("trust_analysis") or {}
    if trust:
        md.append("")
        md.append(f"**Score de confiança:** {safe(trust.get('trust_score'))}/10")
        if trust.get("biggest_trust_gap"):
            md.append(f"*Maior gap:* {trust['biggest_trust_gap']}")
    md.append("")
    th = o.get("test_hypotheses") or []
    if th:
        md.append("### Hipóteses de teste (P1)")
        p1s = [t for t in th if isinstance(t, dict) and (t.get("priority") == "P1" or not t.get("priority"))][:3]
        for t in p1s:
            md.append(f"- **{safe(t.get('hypothesis'))}**")
            if t.get("element"):
                md.append(f"  *Elemento:* {t['element']}")
    return "\n".join(md)


def section_brand(client, outputs):
    b = client.get("briefing", {}).get("brand", {}) or {}
    md = []
    md.append("### Atributos de marca")
    md.append(f"- **Adjetivos:** {', '.join(b.get('adjectives') or []) or '—'}")
    md.append(f"- **Tom de voz:** {safe(b.get('voice_tone'))}")
    md.append(f"- **Marcas admiradas:** {', '.join(b.get('admired_brands') or []) or '—'}")
    md.append("")
    cc = b.get("current_colors") or {}
    if cc:
        md.append("### Paleta atual (HEX)")
        for k, v in cc.items():
            md.append(f"- **{k.replace('_', ' ').capitalize()}:** `{v}`")
    md.append("")
    if b.get("typography"):
        md.append(f"**Tipografia:** {b['typography']}")
    if b.get("graphic_elements"):
        md.append("")
        md.append("### Elementos gráficos")
        md.append(bullets(b["graphic_elements"]))
    if b.get("brand_rules"):
        md.append("")
        md.append(f"**Regras de uso:** {b['brand_rules']}")
    ai = b.get("assets_inventory") or {}
    if ai:
        md.append("")
        md.append("### Inventário de assets *[Semana 1]*")
        if ai.get("campaigns"):
            md.append("**Campanhas:**")
            md.append(bullets(ai["campaigns"]))
        if ai.get("photos"):
            md.append(f"**Fotos:** {ai['photos']}")
        if ai.get("videos"):
            md.append(f"**Vídeos:** {ai['videos']}")
        if ai.get("status"):
            md.append(f"*Status:* {ai['status']}")
    return "\n".join(md)


def section_roadmap(client, outputs):
    progress = client.get("progress", {}) or {}
    skills = progress.get("skills", {}) or {}
    history = client.get("history", []) or []
    md = []
    md.append("### Skills concluídas")
    for name, info in skills.items():
        if info.get("status") == "completed":
            md.append(f"- ✅ **{name}** — concluída em {safe(info.get('completed_at'))}")
        elif info.get("status") == "in_progress":
            md.append(f"- 🟡 **{name}** — em andamento")
    md.append("")
    md.append(f"**Semana atual:** {safe(progress.get('current_week'))}")
    md.append("")
    if history:
        md.append("### Histórico de refinamentos")
        for h in history[-8:]:
            note = h.get("note", "")
            md.append(f"- *{safe(h.get('ts'))}* — **{safe(h.get('skill'))}** ({safe(h.get('action'))}): {note}")
    return "\n".join(md)


RENDERERS = {
    "identity": section_identity,
    "product": section_product,
    "icp": section_icp,
    "market": section_market,
    "maturity_swot": section_maturity_swot,
    "positioning": section_positioning,
    "comms": section_comms,
    "organic": section_organic,
    "paid": section_paid,
    "cro": section_cro,
    "brand": section_brand,
    "roadmap": section_roadmap,
}


def render(client_path):
    client_path = os.path.abspath(client_path)
    with open(os.path.join(client_path, "client.json"), encoding="utf-8") as f:
        client = json.load(f)
    outputs = load_outputs(client_path)
    ident = client.get("briefing", {}).get("identification", {}) or {}
    slug = client.get("meta", {}).get("slug", "cliente")
    generated = datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC")
    current_week = client.get("progress", {}).get("current_week", "—")

    parts = [
        f"# Visão Consolidada — {safe(ident.get('name'))}",
        "",
        f"*Gerado em {generated} · Ciclo atual: Semana {current_week} · Cliente: `{slug}`*",
        "",
        "> Este documento consolida tudo que foi produzido para o cliente ao longo do projeto.",
        "> Cada seção referencia o output estruturado original em `outputs/` para auditabilidade.",
        "> Informações refinadas ao longo das semanas estão marcadas entre colchetes.",
        "",
        "---",
        "",
        "## Sumário",
        "",
    ]
    for title, _ in SECTIONS:
        anchor = title.lower().replace(" ", "-").replace(".", "").replace("ç", "c").replace("ã", "a").replace("é", "e").replace("&", "").replace("--", "-")
        parts.append(f"- [{title}](#{anchor})")
    parts.append("")
    parts.append("---")

    for title, key in SECTIONS:
        parts.append("")
        parts.append(f"## {title}")
        parts.append("")
        parts.append(RENDERERS[key](client, outputs))
        parts.append("")
    parts.append("---")
    parts.append("")
    parts.append(f"*Documento gerado automaticamente a partir de `client.json` + `outputs/*.json`. Re-execute `render_consolidated.py {slug}` após cada revisão para atualizar.*")

    out = "\n".join(parts)
    with open(os.path.join(client_path, "consolidated.md"), "w", encoding="utf-8") as f:
        f.write(out)
    print(f"OK — consolidated.md gerado em {client_path}/consolidated.md ({len(out)} chars)")

    # Gera consolidated.html (portal linear + aprofundamento)
    try:
        html = build_consolidated_html(client, outputs, ident, generated, current_week)
        with open(os.path.join(client_path, "consolidated.html"), "w", encoding="utf-8") as f:
            f.write(html)
        print(f"OK — consolidated.html gerado em {client_path}/consolidated.html ({len(html)} chars)")
    except Exception as e:
        print(f"WARN — falha ao gerar consolidated.html: {e}")
        import traceback
        traceback.print_exc()


# =============================================================================
# Geração de consolidated.html
# Herda CSS + helpers + renderers (objeto R) do portal.html, envelopa em layout
# linear (TOC + sessões empilhadas) e adiciona uma camada "Aprofundamento" por
# skill com dados que o portal não mostra.
# =============================================================================


LINEAR_LAYOUT_CSS = r"""
/* Consolidated linear layout overrides — OVERRIDE portal defaults */
html, body { overflow: auto !important; height: auto !important; }
body.consolidated { background: #F2F2F2 !important; min-height: 100vh; overflow: auto !important; }
body.consolidated .gate, body.consolidated .pres-overlay, body.consolidated .pres-bar,
body.consolidated .logout, body.consolidated .consolidated-btn,
body.consolidated #presOverlay, body.consolidated #presBar, body.consolidated #passwordGate,
body.consolidated #progress-bar { display: none !important; }

.cs-hero {
  background: linear-gradient(135deg, #560303 0%, #7A0A02 40%, #FB2E0A 100%);
  color: #fff; padding: 56px 32px 48px; text-align: center;
}
.cs-hero__eyebrow {
  font-size: 11px; font-weight: 600; text-transform: uppercase;
  letter-spacing: 0.18em; opacity: 0.8; margin-bottom: 12px;
}
.cs-hero h1 { font-size: 34px; font-weight: 600; letter-spacing: -0.015em; margin-bottom: 10px; color: #fff; }
.cs-hero__meta { font-size: 13px; opacity: 0.85; font-weight: 300; }
.cs-hero__note { font-size: 12px; opacity: 0.7; font-weight: 300; margin-top: 14px; max-width: 640px; margin-left:auto; margin-right:auto; }

.cs-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 40px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 32px 80px;
  align-items: start;
}
.cs-toc {
  position: sticky; top: 20px; align-self: start;
  background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 12px;
  padding: 20px 14px; max-height: calc(100vh - 40px); overflow-y: auto;
  font-size: 13px;
}
.cs-toc__title {
  font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em;
  color: #909090; margin-bottom: 14px; font-weight: 700; padding: 0 8px;
}
.cs-toc a {
  display: block; padding: 8px 10px; color: #606060; text-decoration: none;
  border-radius: 6px; border-left: 2px solid transparent; transition: all .15s;
  font-size: 13px; line-height: 1.4; margin-bottom: 2px;
}
.cs-toc a:hover, .cs-toc a.active {
  background: rgba(251,46,10,0.08); color: #FB2E0A; border-left-color: #FB2E0A;
}

.cs-main {
  min-width: 0;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 14px;
  padding: 48px 56px;
}

.cs-skill {
  padding: 0; margin-bottom: 56px; scroll-margin-top: 20px;
}
.cs-skill:last-child { margin-bottom: 0; }
.cs-skill + .cs-skill { padding-top: 48px; border-top: 1px solid rgba(0,0,0,0.08); }
.cs-skill__h { margin-bottom: 22px; }
.cs-skill__h h2 {
  font-size: 26px; font-weight: 600; color: #1E2124; letter-spacing: -0.015em;
  margin-bottom: 4px;
}
.cs-skill__meta { font-size: 11px; color: #909090; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; }
.cs-skill__meta .cs-status--completed { color: #16a34a; }
.cs-skill__meta .cs-status--in_progress { color: #F59E0B; }
.cs-skill__meta .cs-status--pending { color: #909090; }
.cs-skill__pending { color: #909090; font-style: italic; padding: 20px 0; font-size: 13px; }
.cs-skill__error { color: #DC2626; font-size: 13px; padding: 12px; background: rgba(220,38,38,0.04); border-radius: 8px; }

.cs-exec { }
.cs-exec .sc { margin-bottom: 20px; }

.cs-deep {
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px dashed rgba(0,0,0,0.12);
}
.cs-deep__label {
  display: inline-block;
  font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em;
  color: #fff; background: linear-gradient(135deg, #560303, #FB2E0A);
  padding: 4px 10px; border-radius: 6px; font-weight: 700;
  margin-bottom: 14px;
}
.cs-deep h4 {
  font-size: 15px; font-weight: 600; color: #1E2124;
  margin-top: 18px; margin-bottom: 8px;
}
.cs-deep h5 {
  font-size: 13px; font-weight: 600; color: #560303;
  margin-top: 14px; margin-bottom: 6px;
  text-transform: uppercase; letter-spacing: 0.06em;
}
.cs-deep p { font-size: 13.5px; color: #3a3f44; line-height: 1.7; margin-bottom: 10px; }
.cs-deep ul, .cs-deep ol { margin-left: 20px; margin-bottom: 12px; }
.cs-deep li { font-size: 13.5px; color: #3a3f44; margin-bottom: 5px; line-height: 1.55; }
.cs-deep li strong { color: #1E2124; }
.cs-deep table {
  width: 100%; border-collapse: collapse; margin: 10px 0 16px;
  font-size: 12.5px;
}
.cs-deep thead th {
  background: #F7F6F5; padding: 8px 10px; text-align: left; font-weight: 600;
  color: #1E2124; border-bottom: 2px solid rgba(0,0,0,0.08); font-size: 11.5px;
  text-transform: uppercase; letter-spacing: 0.04em;
}
.cs-deep tbody td {
  padding: 8px 10px; border-bottom: 1px solid rgba(0,0,0,0.06);
  color: #3a3f44; vertical-align: top;
}
.cs-deep tbody tr:hover td { background: rgba(251,46,10,0.02); }
.cs-deep .cs-callout {
  background: linear-gradient(135deg, rgba(86,3,3,0.04), rgba(251,46,10,0.03));
  border-left: 3px solid #FB2E0A;
  padding: 14px 18px; border-radius: 8px; margin: 14px 0;
  font-size: 13.5px; color: #1E2124;
}
.cs-deep .cs-callout strong { color: #560303; }
.cs-deep .cs-alert {
  background: rgba(220,38,38,0.04);
  border-left: 3px solid #DC2626;
  padding: 12px 16px; border-radius: 8px; margin: 14px 0;
  font-size: 13px; color: #1E2124;
}
.cs-deep .cs-alert strong { color: #DC2626; }
.cs-deep pre.cs-raw {
  background: #0F1014; color: #D5D7DC; font-family: 'SF Mono', Menlo, monospace;
  font-size: 11px; padding: 16px; border-radius: 8px; overflow-x: auto;
  max-height: 420px; overflow-y: auto; line-height: 1.5;
}
.cs-deep .cs-kv { display: grid; grid-template-columns: 160px 1fr; gap: 8px 16px; margin: 8px 0; }
.cs-deep .cs-kv dt { font-size: 11.5px; color: #909090; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
.cs-deep .cs-kv dd { font-size: 13px; color: #1E2124; }

.cs-footer {
  text-align: center; padding: 40px 24px; font-size: 12px; color: #909090;
  border-top: 1px solid rgba(0,0,0,0.06); margin-top: 40px;
}
.cs-footer a { color: #FB2E0A; text-decoration: none; }

@media (max-width: 960px) {
  .cs-layout { grid-template-columns: 1fr; }
  .cs-toc { position: relative; top: 0; max-height: none; }
  .cs-skill { padding: 20px; }
  .cs-hero h1 { font-size: 26px; }
}
"""


DRIVER_AND_DEEP_JS = r"""
/* ============================================================================
   Consolidated driver + deep-dive renderers
   ============================================================================ */

// Utilitários do deep-dive (usam helpers globais do portal quando possível).
const CSE = (typeof E === 'function') ? E : function(s){ return s == null ? '' : String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); };
const CSBRL = (typeof BRL === 'function') ? BRL : function(v){ return v == null ? '—' : 'R$ ' + Number(v).toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2}); };
const CSN = (typeof N === 'function') ? N : function(v){ return v == null ? '—' : Number(v).toLocaleString('pt-BR'); };
const CSPCT = (typeof PCT === 'function') ? PCT : function(v){ return v == null ? '—' : Number(v).toFixed(1).replace('.',',') + '%'; };

function cs_para(label, value) {
  if (value == null || value === '') return '';
  return '<p><strong>' + CSE(label) + ':</strong> ' + CSE(String(value)) + '</p>';
}
function cs_kv(pairs) {
  if (!pairs || !pairs.length) return '';
  let out = '<dl class="cs-kv">';
  pairs.forEach(function(p){
    if (p[1] == null || p[1] === '') return;
    out += '<dt>' + CSE(p[0]) + '</dt><dd>' + CSE(String(p[1])) + '</dd>';
  });
  return out + '</dl>';
}
function cs_list(items, fmt) {
  if (!items || !items.length) return '';
  fmt = fmt || function(x){ return CSE(String(x)); };
  return '<ul>' + items.map(function(i){ return '<li>' + fmt(i) + '</li>'; }).join('') + '</ul>';
}
function cs_table(heads, rows) {
  let out = '<table><thead><tr>';
  heads.forEach(function(h){ out += '<th>' + CSE(h) + '</th>'; });
  out += '</tr></thead><tbody>';
  rows.forEach(function(r){
    out += '<tr>' + r.map(function(c){ return '<td>' + (c == null ? '—' : String(c)) + '</td>'; }).join('') + '</tr>';
  });
  return out + '</tbody></table>';
}
function cs_section(title, html) {
  if (!html) return '';
  return '<h4>' + CSE(title) + '</h4>' + html;
}
function cs_callout(content) {
  return '<div class="cs-callout">' + content + '</div>';
}
function cs_alert(content) {
  return '<div class="cs-alert">' + content + '</div>';
}
function cs_keyInsight(ki) {
  if (!ki) return '';
  if (typeof ki === 'string') return cs_callout('<strong>Insight-chave:</strong> ' + CSE(ki));
  let out = '<strong>' + CSE(ki.headline || 'Insight-chave') + '</strong>';
  if (ki.context) out += '<p style="margin-top:6px">' + CSE(ki.context) + '</p>';
  if (ki.numbered_reasons && ki.numbered_reasons.length) {
    out += '<ol style="margin-top:6px">' + ki.numbered_reasons.map(function(r){
      return '<li>' + CSE(String(r)) + '</li>';
    }).join('') + '</ol>';
  }
  return cs_callout(out);
}
function cs_honestyAlert(ha) {
  if (!ha) return '';
  if (typeof ha === 'string') return cs_alert('<strong>Alerta de honestidade:</strong> ' + CSE(ha));
  let out = '<strong>' + CSE(ha.headline || 'Alerta de honestidade') + '</strong>';
  if (ha.message || ha.context) out += '<p style="margin-top:6px">' + CSE(ha.message || ha.context) + '</p>';
  return cs_alert(out);
}
function cs_rawDump(data) {
  return '<h4>Dump completo do output</h4>' +
         '<p style="font-size:12px;color:#909090">Campos não cobertos pelos renderers específicos — visualize o JSON completo abaixo.</p>' +
         '<pre class="cs-raw">' + CSE(JSON.stringify(data, null, 2)) + '</pre>';
}

// ----------------------------------------------------------------------------
// DEEP: renderers de aprofundamento por skill
// ----------------------------------------------------------------------------
const DEEP = {};

DEEP['ee-s1-diagnostico-maturidade'] = function(d){
  let out = '';
  out += cs_keyInsight(d.key_insight);
  out += cs_honestyAlert(d.honesty_alert);
  if (d.pillar_scores && d.pillar_scores.length) {
    out += cs_section('Pilares detalhados',
      cs_table(['Pilar','Score','Status','Destaque'],
        d.pillar_scores.map(function(p){
          const scoreTxt = p.score != null ? (p.score + '/100' + (p.estimated ? ' [E]' : '')) : '—';
          return [CSE(p.name || p.pillar), scoreTxt,
                  CSE(p.classification || '—'),
                  CSE(p.highlight || p.diagnosis || p.commentary || p.note || '—')];
        })
      ));
  }
  if (d.priorities && d.priorities.length) {
    out += cs_section('Todas as prioridades',
      cs_table(['#','Ação','Impacto','Esforço','Prazo','Justificativa'],
        d.priorities.map(function(p,i){
          return [i+1, CSE(p.action||p.title||'—'),
                  CSE(p.impact||'—'), CSE(p.effort||'—'),
                  CSE(p.timeframe||p.deadline||'—'),
                  CSE(p.rationale||p.justification||'—')];
        })
      ));
  }
  return out;
};

DEEP['ee-s1-swot'] = function(d){
  let out = '';
  out += cs_keyInsight(d.key_insight);
  if (d.tows_matrix) {
    const t = d.tows_matrix;
    out += cs_section('Matriz TOWS completa', '');
    const quads = [
      ['SO — Forças + Oportunidades','so_strategies'],
      ['ST — Forças + Ameaças','st_strategies'],
      ['WO — Fraquezas + Oportunidades','wo_strategies'],
      ['WT — Fraquezas + Ameaças','wt_strategies']
    ];
    quads.forEach(function(q){
      const items = t[q[1]];
      if (items && items.length) {
        out += '<h5>' + CSE(q[0]) + '</h5>';
        out += '<ul>' + items.map(function(i){
          if (typeof i === 'string') return '<li>' + CSE(i) + '</li>';
          let s = '<li><strong>' + CSE(i.strategy||i.title||'—') + '</strong>';
          if (i.rationale||i.justification) s += '<br><span style="color:#606060;font-size:12.5px">' + CSE(i.rationale||i.justification) + '</span>';
          return s + '</li>';
        }).join('') + '</ul>';
      }
    });
  }
  const priActs = d.priority_actions || d.priorities;
  if (priActs && priActs.length) {
    out += cs_section('Ações prioritárias detalhadas',
      cs_table(['#','Ação','Base SWOT','Impacto','Prazo','Track','Investimento','Retorno/mês','Score ajustado'],
        priActs.map(function(a,i){
          const fi = a.financial_impact || {};
          const ras = a.risk_adjusted_score || {};
          return [i+1,
                  CSE(a.action||a.title||'—'),
                  CSE(a.swot_basis||'—'),
                  CSE(a.impact||'—'),
                  CSE(a.suggested_timeline||a.timeframe||'—'),
                  CSE(a.track||'—'),
                  fi.investment_brl != null ? CSBRL(fi.investment_brl) : '—',
                  fi.monthly_return_brl != null ? CSBRL(fi.monthly_return_brl) : '—',
                  ras.score != null ? ras.score : '—'];
        })
      ));
  }
  return out;
};

DEEP['ee-s1-persona-icp'] = function(d){
  let out = '';
  const ob = d.objection_library || d.objections;
  if (ob && ob.objections && ob.objections.length) {
    out += cs_section('Biblioteca completa de objeções',
      cs_table(['Objeção','Subtexto (o que o tutor pensa)','Resposta recomendada','Quando usar'],
        ob.objections.map(function(o){
          return [CSE(o.objection||o.name||'—'),
                  CSE(o.subtext||o.trigger||o.context||'—'),
                  CSE(o.good_response||o.response||o.recommended_response||'—'),
                  CSE(o.when_to_use||o.tone||'—')];
        })
      ));
  }
  const bj = d.buyer_journey;
  if (bj && bj.stages && bj.stages.length) {
    out += cs_section('Jornada de compra — detalhamento por estágio', '');
    bj.stages.forEach(function(s){
      out += '<h5>' + CSE(s.stage||s.name||'Estágio') + '</h5>';
      out += cs_kv([
        ['Gatilho', s.trigger],
        ['Estado mental', s.mental_state||s.behavior],
        ['Canal principal', s.primary_channel||s.main_channel||s.channel],
        ['Pergunta dominante', s.dominant_question||s.dominant_pain||s.pain],
        ['Intervenção Zenvet', s.zenvet_intervention||s.ideal_content||s.content],
        ['Fricção atual', s.friction_today],
        ['Duração estimada', s.duration_estimate||s.avg_time||s.duration]
      ]);
    });
  }
  const ap = d.anti_persona;
  if (ap && ap.profiles && ap.profiles.length) {
    out += cs_section('Anti-personas (quem NÃO atender)', '');
    ap.profiles.forEach(function(p){
      out += '<h5>' + CSE(p.label||p.name||p.profile||'—') + '</h5>';
      out += cs_kv([
        ['Quem é', p.who],
        ['Sinais', Array.isArray(p.signals) ? p.signals.join(' · ') : p.signals],
        ['Por que não', p.why_not],
        ['Redirecionar para', p.redirect]
      ]);
    });
  }
  const wtp = d.willingness_to_pay;
  if (wtp && wtp.services && wtp.services.length) {
    out += cs_section('Disposição a pagar — precificação estratégica',
      cs_table(['Serviço','Ticket atual','Faixa percebida justa','Teto premium','Elasticidade','Alavanca de preço'],
        wtp.services.map(function(s){
          return [CSE(s.service||s.name||'—'),
                  CSE(s.current_ticket_range||s.min_price||'—'),
                  CSE(s.perceived_fair_range||s.max_price||'—'),
                  CSE(s.premium_ceiling||s.recommended_price||'—'),
                  CSE(s.elasticity||'—'),
                  CSE(s.pricing_lever||s.rationale||s.justification||'—')];
        })
      ));
    if (wtp.strategic_implication) {
      out += '<div style="margin-top:.75rem;padding:.75rem 1rem;background:#fafafa;border-left:3px solid #909090"><strong>Implicação estratégica:</strong> ' + CSE(wtp.strategic_implication) + '</div>';
    }
  }
  return out || cs_rawDump(d);
};

DEEP['ee-s1-auditoria-comunicacao'] = function(d){
  let out = '';
  out += cs_keyInsight(d.key_insight);
  if (d.gaps_by_channel && d.gaps_by_channel.length) {
    out += cs_section('Todos os gaps por canal',
      cs_table(['Canal','Gap','Alinhamento','Impacto','Esforço','Recomendação'],
        d.gaps_by_channel.map(function(g){
          return [CSE(g.channel||'—'),
                  CSE(g.gap||g.issue||'—'),
                  CSE(String(g.alignment||g.alignment_score||'—')),
                  CSE(g.impact||'—'),
                  CSE(g.effort||'—'),
                  CSE(g.recommendation||'—')];
        })
      ));
  }
  if (d.quick_wins && d.quick_wins.length) {
    out += cs_section('Quick wins priorizados',
      cs_table(['#','Quick win','Canal','Prazo','Impacto esperado'],
        d.quick_wins.map(function(q,i){
          return [i+1, CSE(q.action||q.title||'—'),
                  CSE(q.channel||'—'), CSE(q.timeframe||'—'),
                  CSE(q.expected_impact||q.impact||'—')];
        })
      ));
  }
  return out || cs_rawDump(d);
};

DEEP['ee-s2-pesquisa-mercado'] = function(d){
  let out = '';
  if (d.competitors && d.competitors.length) {
    out += cs_section('Análise profunda por concorrente', '');
    d.competitors.forEach(function(c){
      out += '<h5>' + CSE(c.name||'Concorrente') + '</h5>';
      out += cs_kv([
        ['Posicionamento', c.positioning||c.puv],
        ['Mensagem principal', c.main_message],
        ['Canais de aquisição', Array.isArray(c.acquisition_channels) ? c.acquisition_channels.join(', ') : c.acquisition_channels],
        ['Estimativa de preço/ticket', c.pricing||c.ticket_estimate],
        ['Pontos fortes', Array.isArray(c.strengths) ? c.strengths.join(' · ') : c.strengths],
        ['Pontos fracos', Array.isArray(c.weaknesses) ? c.weaknesses.join(' · ') : c.weaknesses],
        ['Score digital', c.digital_score != null ? c.digital_score + '/10' : '—'],
        ['Anúncios observados', c.ads_observed||c.active_ads]
      ]);
      if (c.commentary || c.analysis) {
        out += '<p style="margin-top:8px;color:#3a3f44;font-size:13px">' + CSE(c.commentary||c.analysis) + '</p>';
      }
    });
  }
  if (d.trends && d.trends.length) {
    out += cs_section('Tendências com evidência',
      '<ul>' + d.trends.map(function(t){
        let s = '<li><strong>' + CSE(t.trend||t.title||'—') + '</strong>';
        if (t.evidence) s += '<br><span style="color:#606060">Evidência: ' + CSE(t.evidence) + '</span>';
        if (t.source) s += '<br><em style="color:#909090;font-size:12px">Fonte: ' + CSE(t.source) + '</em>';
        return s + '</li>';
      }).join('') + '</ul>');
  }
  if (d.unexploited_opportunity) {
    const uo = d.unexploited_opportunity;
    out += cs_section('Oportunidade não explorada',
      cs_callout(
        '<strong>' + CSE(uo.headline||'Oportunidade') + '</strong>' +
        (uo.context ? '<p style="margin-top:6px">' + CSE(uo.context) + '</p>' : '') +
        (uo.why_uncompeted ? '<p style="margin-top:6px"><em>Por que ninguém ataca:</em> ' + CSE(uo.why_uncompeted) + '</p>' : '')
      ));
  }
  if (d.real_differentials) {
    const rd = d.real_differentials;
    if (Array.isArray(rd) && rd.length) {
      out += cs_section('Diferenciais reais (detalhado)',
        '<ul>' + rd.map(function(dif){
          if (typeof dif === 'string') return '<li>' + CSE(dif) + '</li>';
          const body = dif.icp_relevance || dif.rationale || dif.why || dif.description || '';
          const action = dif.action_needed || dif.action_required || '';
          const status = dif.status ? ' <span style="color:#909090;font-size:12px">['+CSE(dif.status)+']</span>' : '';
          return '<li><strong>' + CSE(dif.differential||dif.title||'—') + '</strong>' + status +
                 (body ? '<br><span style="color:#606060">' + CSE(body) + '</span>' : '') +
                 (action ? '<br><em style="color:#909090;font-size:12px">Ação: ' + CSE(action) + '</em>' : '') +
                 '</li>';
        }).join('') + '</ul>');
    } else if (rd && typeof rd === 'object') {
      if (rd.current && rd.current.length) {
        out += '<h5>Já tem hoje</h5><ul>' + rd.current.map(function(x){
          return '<li><strong>' + CSE(x.differential||x.title||'—') + '</strong>' +
                 (x.rationale ? ' — ' + CSE(x.rationale) : '') + '</li>';
        }).join('') + '</ul>';
      }
      if (rd.potential && rd.potential.length) {
        out += '<h5>Poderia ter</h5><ul>' + rd.potential.map(function(x){
          return '<li><strong>' + CSE(x.differential||x.title||'—') + '</strong>' +
                 (x.action_required ? ' — ' + CSE(x.action_required) : '') + '</li>';
        }).join('') + '</ul>';
      }
      if (rd.honesty_alert) out += cs_honestyAlert(rd.honesty_alert);
    }
  }
  return out || cs_rawDump(d);
};

DEEP['ee-s2-posicionamento'] = function(d){
  let out = '';
  const od = d.operator_direction;
  if (od) {
    out += cs_section('Direcionamento do operador',
      cs_kv([
        ['Diferencial mais forte', od.strongest_differential],
        ['Posição desejada', od.desired_position],
        ['Tom desejado', od.desired_tone],
        ['Restrições de posicionamento', Array.isArray(od.positioning_restrictions) ? od.positioning_restrictions.join(' · ') : od.positioning_restrictions]
      ]));
  }
  const puv = d.puv;
  if (puv && typeof puv === 'object') {
    out += cs_section('PUV — detalhamento',
      cs_kv([
        ['Headline', puv.headline||puv.main],
        ['Explicação', puv.explanation||puv.rationale],
        ['Versão curta', puv.short||puv.short_version],
        ['Versão expandida', puv.expanded||puv.long_version],
        ['Para quem', puv.for_whom||puv.target],
        ['Qual problema resolve', puv.problem_solved],
        ['Como diferente', puv.how_different]
      ]));
  }
  const canvas = d.canvas_4p || d.canvas;
  if (canvas && typeof canvas === 'object') {
    out += cs_section('Canvas 4P — justificativas completas', '');
    const pMap = { product:'Produto', price:'Preço', place:'Praça', promotion:'Promoção' };
    Object.keys(pMap).forEach(function(k){
      const p = canvas[k];
      if (!p) return;
      out += '<h5>' + pMap[k] + '</h5>';
      if (typeof p === 'string') { out += '<p>' + CSE(p) + '</p>'; return; }
      const pairs = [];
      Object.keys(p).forEach(function(sk){
        const v = p[sk];
        if (v == null || v === '') return;
        pairs.push([sk.replace(/_/g,' '), Array.isArray(v) ? v.join(' · ') : v]);
      });
      out += cs_kv(pairs);
    });
  }
  if (d.territory_of_brand || d.brand_territory) {
    const t = d.territory_of_brand || d.brand_territory;
    out += cs_section('Território de marca',
      typeof t === 'string' ? '<p>' + CSE(t) + '</p>' :
      cs_kv([
        ['Território', t.territory||t.name],
        ['Arquétipo', t.archetype],
        ['Narrativa', t.narrative||t.story],
        ['Atributos', Array.isArray(t.attributes) ? t.attributes.join(', ') : t.attributes]
      ]));
  }
  return out || cs_rawDump(d);
};

DEEP['ee-s2-diagnostico-midia'] = function(d){
  let out = '';
  // Cada plataforma
  ['google_ads','meta_ads','facebook_ads'].forEach(function(pk){
    const p = d[pk];
    if (!p) return;
    const label = pk === 'google_ads' ? 'Google Ads' : 'Meta Ads';
    out += '<h5>' + label + ' — campanhas completas</h5>';
    if (p.campaigns && p.campaigns.length) {
      out += cs_table(['Campanha','Status','Impressões','Cliques','CTR','Custo','Conversões','CPA/CPL'],
        p.campaigns.map(function(c){
          return [CSE(c.name||'—'), CSE(c.status||'—'),
                  c.impressions != null ? CSN(c.impressions) : '—',
                  c.clicks != null ? CSN(c.clicks) : '—',
                  c.ctr != null ? CSPCT(c.ctr*100) : '—',
                  c.cost != null ? CSBRL(c.cost) : (c.spend != null ? CSBRL(c.spend) : '—'),
                  c.conversions != null ? CSN(c.conversions) : '—',
                  c.cpa != null ? CSBRL(c.cpa) : (c.cpl != null ? CSBRL(c.cpl) : '—')];
        }));
    }
    if (p.monthly_evolution && p.monthly_evolution.length) {
      out += '<h5>Evolução mensal — ' + label + '</h5>';
      out += cs_table(['Mês','Custo','Conversões','CPA','CTR'],
        p.monthly_evolution.map(function(m){
          return [CSE(m.month||m.period||'—'),
                  m.cost != null ? CSBRL(m.cost) : (m.spend != null ? CSBRL(m.spend) : '—'),
                  m.conversions != null ? CSN(m.conversions) : '—',
                  m.cpa != null ? CSBRL(m.cpa) : '—',
                  m.ctr != null ? CSPCT(m.ctr*100) : '—'];
        }));
    }
    if (p.top_keywords && p.top_keywords.length) {
      out += '<h5>Todas as palavras-chave</h5>';
      out += cs_table(['Palavra-chave','Impressões','Cliques','CTR','CPC','Conv.','Veredicto'],
        p.top_keywords.map(function(k){
          return [CSE(k.keyword||'—'),
                  k.impressions != null ? CSN(k.impressions) : '—',
                  k.clicks != null ? CSN(k.clicks) : '—',
                  k.ctr != null ? CSPCT(k.ctr*100) : '—',
                  k.cpc != null ? CSBRL(k.cpc) : '—',
                  k.conversions != null ? CSN(k.conversions) : '—',
                  CSE(k.verdict||'—')];
        }));
    }
  });
  if (d.insights_cross_platform || d.cross_platform_insights) {
    out += cs_section('Insights cross-platform',
      cs_list(d.insights_cross_platform||d.cross_platform_insights));
  }
  return out || cs_rawDump(d);
};

DEEP['ee-s2-diagnostico-organico-ig'] = function(d){
  let out = '';
  if (d.posts_analyzed && d.posts_analyzed.length) {
    out += cs_section('Posts analisados em detalhe',
      cs_table(['Data','Formato','Tema','Curtidas','Comentários','Salvos','Alcance','Engajamento'],
        d.posts_analyzed.map(function(p){
          return [CSE(p.date||'—'), CSE(p.format||p.type||'—'),
                  CSE(p.theme||p.topic||'—'),
                  p.likes != null ? CSN(p.likes) : '—',
                  p.comments != null ? CSN(p.comments) : '—',
                  p.saves != null ? CSN(p.saves) : '—',
                  p.reach != null ? CSN(p.reach) : '—',
                  p.engagement_rate != null ? CSPCT(p.engagement_rate*100) : '—'];
        })
      ));
  }
  if (d.format_performance) {
    out += cs_section('Performance por formato',
      cs_kv(Object.keys(d.format_performance).map(function(k){
        const v = d.format_performance[k];
        return [k, typeof v === 'object' ? JSON.stringify(v) : v];
      })));
  }
  if (d.engagement_benchmark && d.engagement_benchmark.by_account) {
    const byAcc = d.engagement_benchmark.by_account;
    const hasNote = byAcc.some(a => a.note);
    const headers = hasNote
      ? ['Conta','Likes méd.','Comentários méd.','Engajamento proxy','Melhor formato','Observação']
      : ['Conta','Likes méd.','Comentários méd.','Engajamento proxy','Melhor formato'];
    out += cs_section('Benchmark de engajamento — todas as contas',
      cs_table(headers,
        byAcc.map(function(a){
          const row = [CSE(a.username||a.handle||'—'),
                  a.avg_likes != null ? a.avg_likes.toFixed(1) : '—',
                  a.avg_comments != null ? a.avg_comments.toFixed(1) : '—',
                  a.avg_engagement_proxy != null ? CSPCT(a.avg_engagement_proxy) : '—',
                  CSE(a.best_format_by_engagement||'—')];
          if (hasNote) row.push(CSE(a.note||'—'));
          return row;
        })
      ) + (d.engagement_benchmark.insight ? '<div style="margin-top:.75rem;padding:.75rem 1rem;background:#fafafa;border-left:3px solid #909090"><em>' + CSE(d.engagement_benchmark.insight) + '</em></div>' : ''));
  }
  if (d.content_recommendations && d.content_recommendations.length) {
    out += cs_section('Recomendações de conteúdo',
      '<ul>' + d.content_recommendations.map(function(r){
        if (typeof r === 'string') return '<li>' + CSE(r) + '</li>';
        return '<li><strong>' + CSE(r.title||r.theme||'—') + '</strong>' +
               (r.description ? '<br>' + CSE(r.description) : '') + '</li>';
      }).join('') + '</ul>');
  }
  return out || cs_rawDump(d);
};

DEEP['ee-s2-diagnostico-cro'] = function(d){
  let out = '';
  if (d.technical_audit && d.technical_audit.pagespeed) {
    const ps = d.technical_audit.pagespeed;
    const scoreLabels = {performance:'Performance', accessibility:'Acessibilidade', best_practices:'Boas práticas', seo:'SEO'};
    const cwvLabels = {
      lcp_ms:['LCP (Largest Contentful Paint)','ms'],
      fcp_ms:['FCP (First Contentful Paint)','ms'],
      tbt_ms:['TBT (Total Blocking Time)','ms'],
      cls:['CLS (Cumulative Layout Shift)',''],
      speed_index_ms:['Speed Index','ms'],
      tti_ms:['TTI (Time to Interactive)','ms'],
      ttfb_ms:['TTFB (Time to First Byte)','ms']
    };
    const fmtScore = v => v == null ? '—' : Math.round(v) + '/100';
    const fmtCwv = (k,v) => {
      if (v == null) return '—';
      const lbl = cwvLabels[k];
      if (!lbl) return v;
      const unit = lbl[1];
      if (unit === 'ms') return Math.round(v).toLocaleString('pt-BR') + ' ms';
      if (k === 'cls') return Number(v).toFixed(3);
      return v;
    };
    out += cs_section('PageSpeed — resultados completos', '');
    if (ps.mobile_scores) {
      out += '<h5>Mobile</h5>' +
        cs_kv(Object.keys(ps.mobile_scores).map(function(k){ return [scoreLabels[k]||k, fmtScore(ps.mobile_scores[k])]; }));
    }
    if (ps.desktop_scores) {
      out += '<h5>Desktop</h5>' +
        cs_kv(Object.keys(ps.desktop_scores).map(function(k){ return [scoreLabels[k]||k, fmtScore(ps.desktop_scores[k])]; }));
    }
    if (ps.mobile_cwv_lab || ps.cwv) {
      const cwv = ps.mobile_cwv_lab || ps.cwv;
      out += '<h5>Core Web Vitals (mobile lab)</h5>' +
        cs_kv(Object.keys(cwv).map(function(k){ return [cwvLabels[k] ? cwvLabels[k][0] : k, fmtCwv(k, cwv[k])]; }));
    }
    if (ps.critical_issues && ps.critical_issues.length) {
      out += '<h5>Problemas críticos</h5>' + cs_list(ps.critical_issues);
    }
  }
  if (d.copy_audit && d.copy_audit.above_fold) {
    const af = d.copy_audit.above_fold;
    out += cs_section('Above the fold — auditoria',
      cs_kv([
        ['Headline atual', af.current_headline],
        ['Headline sugerida', af.suggested_headline],
        ['CTA atual', af.current_cta],
        ['CTA sugerido', af.suggested_cta],
        ['Detalhe da proposta de valor', af.value_prop_detail],
        ['O que visitante do ICP pensa', af.icp_visitor_thought||af.first_impression]
      ]));
  }
  if (d.copy_audit && d.copy_audit.section_by_section) {
    out += cs_section('Estrutura da página — seção por seção',
      cs_table(['Seção','Existe?','Score','Problema principal','Recomendação'],
        d.copy_audit.section_by_section.map(function(s){
          return [CSE(s.section||s.name||'—'),
                  s.exists === true ? 'Sim' : (s.exists === false ? 'Não' : '—'),
                  s.score != null ? s.score + '/5' : '—',
                  CSE(s.main_problem||s.issue||'—'),
                  CSE(s.recommendation||'—')];
        })
      ));
  }
  if (d.trust_analysis) {
    const ta = d.trust_analysis;
    out += cs_section('Análise de confiança',
      cs_kv([
        ['Score de confiança', ta.trust_score != null ? ta.trust_score + '/10' : '—'],
        ['Maior gap', ta.biggest_trust_gap||ta.biggest_gap]
      ]));
    if (ta.signals_checklist) {
      out += '<h5>Checklist de sinais de confiança</h5>';
      out += cs_table(['Sinal','Status','Observação'],
        Object.keys(ta.signals_checklist).map(function(k){
          const v = ta.signals_checklist[k];
          if (typeof v === 'object' && v !== null) return [CSE(k), v.present ? '✓' : '✗', CSE(v.note||'—')];
          return [CSE(k), v ? '✓' : '✗', '—'];
        }));
    }
  }
  if (d.hypotheses && d.hypotheses.length) {
    out += cs_section('Todas as hipóteses de teste',
      cs_table(['#','Hipótese','Elemento','Impacto','Dificuldade','Prioridade'],
        d.hypotheses.map(function(h,i){
          return [i+1, CSE(h.hypothesis||h.title||'—'),
                  CSE(h.element||'—'),
                  CSE(h.impact||'—'), CSE(h.difficulty||h.effort||'—'),
                  CSE(h.priority||'—')];
        })
      ));
  }
  if (d.wireframe && d.wireframe.sections) {
    out += cs_section('Wireframe detalhado', '');
    d.wireframe.sections.forEach(function(s){
      out += '<h5>' + CSE(s.section||s.name||'Seção') + '</h5>';
      out += cs_kv([
        ['Conteúdo', s.content],
        ['Copy sugerida', s.copy||s.suggested_copy],
        ['Formato', s.format]
      ]);
    });
  }
  return out || cs_rawDump(d);
};

DEEP['ee-s2-diagnostico-criativos'] = function(d){
  let out = '';
  if (d.summary_highlights && d.summary_highlights.length) {
    out += cs_section('Destaques',
      '<div class="gr gr--3" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.75rem">' +
      d.summary_highlights.map(function(h){
        const color = h.tone==='red'?'#b00020':h.tone==='yellow'?'#a87a00':h.tone==='green'?'#1f7a3a':'#333';
        return '<div style="padding:.75rem;border-left:3px solid '+color+';background:#fafafa">' +
               '<div style="font-size:11px;color:#909090;text-transform:uppercase;letter-spacing:.5px">' + CSE(h.category||'') + '</div>' +
               '<div style="font-weight:600;margin:.25rem 0">' + CSE(h.label||'—') + '</div>' +
               '<div style="font-size:20px;font-weight:700;color:'+color+'">' + CSE(h.value||'—') + '</div>' +
               (h.subtext ? '<div style="font-size:12px;color:#606060;margin-top:.25rem">' + CSE(h.subtext) + '</div>' : '') +
               '</div>';
      }).join('') + '</div>');
  }
  if (d.summary_key_findings && d.summary_key_findings.length) {
    out += cs_section('Principais achados',
      '<ul>' + d.summary_key_findings.map(function(f){
        const tag = f.category ? '<span style="display:inline-block;padding:.1rem .5rem;background:#eaeaea;border-radius:3px;font-size:11px;margin-right:.5rem;text-transform:uppercase">'+CSE(f.category)+'</span>' : '';
        return '<li style="margin-bottom:.5rem">' + tag + CSE(f.text||'—') + '</li>';
      }).join('') + '</ul>');
  }
  if (d.counts) {
    const c = d.counts;
    out += cs_section('Veredito dos criativos',
      cs_kv([
        ['Total analisado', d.total_creatives_analyzed],
        ['Score médio', d.average_score != null ? d.average_score + ' / 25' : '—'],
        ['Manter', c.keep_count],
        ['Otimizar', c.optimize_count],
        ['Eliminar', c.eliminate_count]
      ]));
  }
  if (d.creative_matrix && d.creative_matrix.length) {
    out += cs_section('Matriz de criativos — scores por dimensão',
      cs_table(['#','Tipo','Descrição','Hook','Clareza','ICP','CTA','Total'],
        d.creative_matrix.map(function(c){
          const total = (c.hook_score||0)+(c.clarity_score||0)+(c.icp_coherence_score||0)+(c.cta_score||0)+(c.production_score||0);
          return [c.number||'—', CSE(c.type||'—'), CSE(c.description||'—'),
                  c.hook_score!=null?c.hook_score:'—',
                  c.clarity_score!=null?c.clarity_score:'—',
                  c.icp_coherence_score!=null?c.icp_coherence_score:'—',
                  c.cta_score!=null?c.cta_score:'—',
                  total||'—'];
        })
      ));
  }
  if (d.patterns_identified && d.patterns_identified.length) {
    out += cs_section('Padrões identificados',
      '<ul>' + d.patterns_identified.map(function(p){
        const aff = (p.affected_creatives||[]).join(', ');
        return '<li><strong>' + CSE(p.pattern||'—') + '</strong>' +
               (aff ? ' <span style="color:#909090">(criativos: '+CSE(aff)+')</span>' : '') +
               (p.example ? '<br><span style="color:#606060;font-size:12.5px">' + CSE(p.example) + '</span>' : '') +
               '</li>';
      }).join('') + '</ul>');
  }
  if (d.what_works && d.what_works.length) {
    out += cs_section('O que já funciona',
      '<ul>' + d.what_works.map(function(w){
        return '<li><strong>' + CSE(w.element||'—') + '</strong>' +
               (w.reason ? '<br><span style="color:#606060;font-size:12.5px">' + CSE(w.reason) + '</span>' : '') +
               '</li>';
      }).join('') + '</ul>');
  }
  if (d.competitor_patterns_missing && d.competitor_patterns_missing.length) {
    out += cs_section('Padrões de concorrência não explorados',
      '<ul>' + d.competitor_patterns_missing.map(function(p){
        return '<li><strong>' + CSE(p.pattern||'—') + '</strong>' +
               (p.why_it_works ? '<br><span style="color:#606060;font-size:12.5px"><em>Por que funciona:</em> ' + CSE(p.why_it_works) + '</span>' : '') +
               (p.how_client_could_implement ? '<br><span style="color:#606060;font-size:12.5px"><em>Como implementar:</em> ' + CSE(p.how_client_could_implement) + '</span>' : '') +
               '</li>';
      }).join('') + '</ul>');
  }
  if (d.production_briefing) {
    const pb = d.production_briefing;
    out += cs_section('Briefing de produção', '');
    if (pb.hook_direction) out += '<p><strong>Direção de hook:</strong> ' + CSE(pb.hook_direction) + '</p>';
    if (pb.hook_examples && pb.hook_examples.length) {
      out += '<p><strong>Exemplos de hook:</strong></p><ul>' + pb.hook_examples.map(h => '<li>' + CSE(h) + '</li>').join('') + '</ul>';
    }
    const others = ['cta_direction','visual_direction','copy_direction','format_mix'];
    others.forEach(function(k){
      if (pb[k]) out += '<p><strong>' + k.replace(/_/g,' ').replace(/^./,c=>c.toUpperCase()) + ':</strong> ' + CSE(pb[k]) + '</p>';
    });
  }
  if (d.key_insight) {
    const ki = d.key_insight;
    out += cs_section('Insight estratégico',
      cs_callout(
        (ki.headline ? '<strong>' + CSE(ki.headline) + '</strong>' : '') +
        (ki.context ? '<p style="margin-top:.5rem">' + CSE(ki.context) + '</p>' : '') +
        (ki.numbered_reasons && ki.numbered_reasons.length ? '<ol>' + ki.numbered_reasons.map(r => '<li>' + CSE(r) + '</li>').join('') + '</ol>' : '')
      ));
  }
  if (d.honesty_alert) {
    out += cs_honestyAlert(d.honesty_alert);
  }
  return out || cs_rawDump(d);
};

// Fallback para skills sem DEEP renderer específico
function DEEP_fallback(d) {
  return cs_rawDump(d);
}

// ----------------------------------------------------------------------------
// Driver
// ----------------------------------------------------------------------------
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    document.body.classList.add('consolidated');

    const data = PORTAL_DATA;
    if (!data || !data.client) {
      document.getElementById('cs-main').innerHTML =
        '<div class="cs-skill"><p class="cs-skill__pending">Nenhum dado disponível. Execute render_portal.sh primeiro.</p></div>';
      return;
    }

    const client = data.client;
    const progress = data.progress || {};
    const outputs = data.outputs || {};
    const hasSales = client.modulo_vendas !== false;

    document.title = 'Visão Consolidada — ' + (client.name || 'Cliente');
    const hN = document.getElementById('cs-client-name');
    if (hN) hN.textContent = client.name || 'Cliente';

    const activeWeeks = WEEKS.filter(function(w){ return !w.sales || hasSales; });

    // Lista flat de skills completadas (ignora pendentes no documento consolidado)
    const completedSkills = [];
    activeWeeks.forEach(function(w){
      w.skills.forEach(function(sk){
        const status = (progress.skills && progress.skills[sk.id] && progress.skills[sk.id].status) || 'pending';
        if (status === 'completed' && outputs[sk.id]) {
          completedSkills.push({ id: sk.id, name: sk.name, data: outputs[sk.id] });
        }
      });
    });

    // TOC flat — apenas título de cada seção
    const tocEl = document.getElementById('cs-toc');
    if (tocEl) {
      let tocHtml = '<div class="cs-toc__title">Sumário</div>';
      completedSkills.forEach(function(sk){
        tocHtml += '<a href="#' + sk.id + '">' + CSE(sk.name) + '</a>';
      });
      tocEl.innerHTML = tocHtml;
    }

    // Main: documento único fluido (sem cards/boxes por entrega)
    const mainEl = document.getElementById('cs-main');
    const parts = [];

    completedSkills.forEach(function(sk){
      parts.push('<section class="cs-skill" id="' + sk.id + '">');
      parts.push('<header class="cs-skill__h"><h2>' + CSE(sk.name) + '</h2></header>');

      // Executive render (reutiliza renderer do portal)
      parts.push('<div class="cs-exec">');
      if (R[sk.id]) {
        try { parts.push(R[sk.id](sk.data)); }
        catch(e) { parts.push('<div class="cs-skill__error">Erro na renderização executiva: ' + CSE(e.message) + '</div>'); }
      } else {
        parts.push('<p style="color:#909090;font-size:13px">Renderer executivo não disponível para esta skill.</p>');
      }
      parts.push('</div>');

      // Deep dive
      parts.push('<div class="cs-deep">');
      parts.push('<div class="cs-deep__label">Aprofundamento</div>');
      const deepFn = DEEP[sk.id] || DEEP_fallback;
      try { parts.push(deepFn(sk.data)); }
      catch(e) { parts.push('<div class="cs-skill__error">Erro no aprofundamento: ' + CSE(e.message) + '</div>'); }
      parts.push('</div>');

      parts.push('</section>');
    });

    if (completedSkills.length === 0) {
      parts.push('<p class="cs-skill__pending">Nenhuma entrega finalizada ainda.</p>');
    }

    mainEl.innerHTML = parts.join('');

    // TOC active state on scroll
    const links = tocEl ? tocEl.querySelectorAll('a') : [];
    const sections = document.querySelectorAll('.cs-skill');
    function updateActive(){
      let active = null;
      sections.forEach(function(s){
        const r = s.getBoundingClientRect();
        if (r.top < 120) active = s.id;
      });
      links.forEach(function(l){
        l.classList.toggle('active', l.getAttribute('href') === '#' + active);
      });
    }
    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
  });
})();
"""


def _extract_portal_assets():
    """Lê portal.html e extrai o bloco <style> e o script principal (o que contém PORTAL_DATA)."""
    with open(PORTAL_TEMPLATE_PATH, encoding="utf-8") as f:
        portal = f.read()

    # Extract CSS
    css_match = re.search(r"<style>(.*?)</style>", portal, re.DOTALL)
    css_block = css_match.group(1) if css_match else ""

    # Encontra o <script> que contém PORTAL_DATA (ignora o pre-gate script inline de ~13 linhas)
    script_blocks = re.findall(r"<script>(.*?)</script>", portal, re.DOTALL)
    main_script = ""
    for blk in script_blocks:
        if "PORTAL_DATA" in blk and "const WEEKS" in blk:
            main_script = blk
            break

    if not main_script:
        raise RuntimeError("Não foi possível localizar o bloco <script> principal do portal.")

    # Neutraliza o bootstrap (init do portal tradicional) — driver novo assume o DOMContentLoaded
    main_script = re.sub(
        r"document\.addEventListener\(\s*['\"]DOMContentLoaded['\"]\s*,\s*init\s*\)\s*;",
        "/* portal init skipped in consolidated mode */",
        main_script,
    )

    return css_block, main_script


def build_consolidated_html(client, outputs, ident, generated_at, current_week):
    """Gera consolidated.html herdando CSS + renderers do portal.html + camada de aprofundamento."""
    portal_css, portal_js = _extract_portal_assets()

    # Monta PORTAL_DATA como o portal faz
    portal_data = {
        "client": client.get("meta", {}),
        "progress": client.get("progress", {}),
        "outputs": outputs,
        "briefing": client.get("briefing", {}),
    }
    data_json = json.dumps(portal_data, ensure_ascii=False, separators=(",", ":"))

    # Substitui o marcador de dados no script do portal
    portal_js = portal_js.replace("/*%%DATA%%*/ {}", data_json)

    client_name = ident.get("name", "Cliente")
    client_name_html = re.sub(r"[<>&\"]", "", client_name)

    html = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visão Consolidada — {client_name_html}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
  <style>
{portal_css}
{LINEAR_LAYOUT_CSS}
  </style>
</head>
<body>
  <header class="cs-hero">
    <div class="cs-hero__eyebrow">V4 Company · Estruturação Estratégica</div>
    <h1 id="cs-client-name">{client_name_html}</h1>
    <div class="cs-hero__meta">Visão Consolidada · Gerado em {generated_at} · Semana atual: {current_week}</div>
    <div class="cs-hero__note">Este documento reúne tudo que foi produzido para o cliente — visualizações do portal + aprofundamento com todos os dados estruturados, para entrega e auditabilidade completa.</div>
  </header>

  <div class="cs-layout">
    <aside class="cs-toc" id="cs-toc"></aside>
    <main class="cs-main" id="cs-main"></main>
  </div>

  <footer class="cs-footer">
    Documento gerado a partir de <code>client.json</code> + <code>outputs/*.json</code> · <a href="./portal.html">← Voltar ao portal</a>
  </footer>

<script>
{portal_js}
</script>
<script>
{DRIVER_AND_DEEP_JS}
</script>
</body>
</html>
"""
    return html


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python3 render_consolidated.py <path_cliente>")
        sys.exit(1)
    render(sys.argv[1])

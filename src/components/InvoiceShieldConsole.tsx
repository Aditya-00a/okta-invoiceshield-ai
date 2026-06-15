"use client";

import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Ban,
  CircleDollarSign,
  ExternalLink,
  FileClock,
  FileText,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  Power,
  RefreshCcw,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  agentSignals,
  approvalRules,
  controlPath,
  responseActions,
  scenarios,
  shadowFindings,
  type Decision,
  type InvoiceScenario,
} from "@/lib/demoData";

const decisionCopy: Record<
  Decision,
  { label: string; detail: string; className: string; bar: string }
> = {
  allow: {
    label: "Allow",
    detail: "Issue scoped token and prepare payment in hold state.",
    className: "border-emerald-200 bg-emerald-50 text-emerald-900",
    bar: "bg-emerald-500",
  },
  challenge: {
    label: "Challenge",
    detail: "Require step-up authentication before tool access.",
    className: "border-amber-200 bg-amber-50 text-amber-950",
    bar: "bg-amber-500",
  },
  hold: {
    label: "Hold",
    detail: "Block execution and route approval to finance control.",
    className: "border-orange-200 bg-orange-50 text-orange-950",
    bar: "bg-orange-500",
  },
  revoke: {
    label: "Revoke",
    detail: "Invalidate access, deactivate agent, and open incident review.",
    className: "border-red-200 bg-red-50 text-red-900",
    bar: "bg-red-500",
  },
};

const signalTone = {
  good: "border-emerald-200 bg-emerald-50 text-emerald-900",
  warn: "border-amber-200 bg-amber-50 text-amber-950",
  danger: "border-red-200 bg-red-50 text-red-900",
  neutral: "border-[#d8cdb7] bg-[#fffdfa] text-[#151515]",
};

const actionTone = {
  allow: "border-emerald-200 bg-emerald-50 text-emerald-900 hover:bg-emerald-100",
  challenge: "border-amber-200 bg-amber-50 text-amber-950 hover:bg-amber-100",
  hold: "border-orange-200 bg-orange-50 text-orange-950 hover:bg-orange-100",
  revoke: "border-red-200 bg-red-50 text-red-900 hover:bg-red-100",
};

function OktaWordmark() {
  return (
    <div className="flex items-center gap-3" aria-label="Okta style demo">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#00297a] text-[17px] font-semibold text-white">
        o
      </div>
      <div>
        <div className="text-[28px] font-semibold leading-none text-[#151515]">
          okta
        </div>
        <div className="mt-1 text-xs font-medium text-[#5f5a50]">
          identity firewall concept
        </div>
      </div>
    </div>
  );
}

function decisionFor(scenario: InvoiceScenario, override: Decision | null) {
  return override ?? scenario.decision;
}

export function InvoiceShieldConsole() {
  const [activeId, setActiveId] = useState(scenarios[1].id);
  const [manualDecision, setManualDecision] = useState<Decision | null>(null);
  const [agentLocked, setAgentLocked] = useState(false);

  const activeScenario = useMemo(
    () => scenarios.find((scenario) => scenario.id === activeId) ?? scenarios[0],
    [activeId],
  );
  const decision = agentLocked ? "revoke" : decisionFor(activeScenario, manualDecision);
  const decisionState = decisionCopy[decision];

  function selectScenario(id: string) {
    setActiveId(id);
    setManualDecision(null);
    setAgentLocked(false);
  }

  return (
    <div className="min-h-screen bg-[#f7f2e8] text-[#151515]">
      <header className="sticky top-0 z-30 border-b border-[#d8cdb7] bg-[#fffdfa]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-4 px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <OktaWordmark />
          <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-[#5f5a50]">
            <span className="rounded-full border border-[#d8cdb7] bg-[#f7f2e8] px-3 py-2">
              InvoiceShield AI
            </span>
            <span className="rounded-full border border-[#c7e9e3] bg-[#dff4ef] px-3 py-2 text-[#006f8f]">
              Finance approval agent
            </span>
            <a
              href="https://www.okta.com/products/govern-ai-agent-identity/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#d8cdb7] bg-white px-3 py-2 text-[#151515] hover:border-[#00297a]"
            >
              Okta AI Agents
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-[1480px] flex-col gap-6 px-5 py-6 sm:px-6 lg:px-8">
        <section className="grid gap-6 xl:grid-cols-[330px_minmax(0,1fr)_360px]">
          <aside className="order-2 rounded-[24px] border border-[#d8cdb7] bg-[#fffdfa] p-5 shadow-[0_24px_80px_rgba(21,21,21,0.08)] xl:order-none">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#006f8f]">
                  Agent identity card
                </p>
                <h1 className="mt-2 text-2xl font-semibold leading-tight">
                  InvoiceShield AI
                </h1>
              </div>
              <div className="rounded-2xl bg-[#00297a] p-3 text-white">
                <ShieldCheck className="h-6 w-6" aria-hidden />
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-[#d8cdb7] bg-[#f7f2e8] p-4">
              <p className="text-sm font-medium text-[#5f5a50]">
                Business purpose
              </p>
              <p className="mt-2 text-base font-semibold">
                Review invoices, request least-privilege ERP access, and prepare
                payment records only after firewall authorization.
              </p>
            </div>

            <div className="mt-5 grid gap-3">
              {agentSignals.map((signal) => {
                const Icon = signal.icon;
                return (
                  <div
                    key={signal.label}
                    className={`rounded-2xl border p-4 ${signalTone[signal.tone]}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold">{signal.label}</p>
                        <p className="mt-1 text-sm font-bold">{signal.value}</p>
                      </div>
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-2xl border border-[#d8cdb7] bg-white p-4">
              <div className="flex items-center gap-3">
                <Fingerprint className="h-5 w-5 text-[#00297a]" aria-hidden />
                <div>
                  <p className="text-xs font-semibold text-[#5f5a50]">
                    Human owner
                  </p>
                  <p className="text-sm font-bold">Maya Chen, Finance Ops</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <KeyRound className="h-5 w-5 text-[#006f8f]" aria-hidden />
                <div>
                  <p className="text-xs font-semibold text-[#5f5a50]">
                    Granted scopes
                  </p>
                  <p className="text-sm font-bold">
                    invoice.read, vendor.read, prepare_payment
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setAgentLocked((current) => !current)}
              className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-bold ${
                agentLocked
                  ? "border-red-200 bg-red-50 text-red-900"
                  : "border-[#151515] bg-[#151515] text-white hover:bg-[#00297a]"
              }`}
            >
              <Power className="h-4 w-4" aria-hidden />
              {agentLocked ? "Kill switch active" : "Trigger kill switch"}
            </button>
          </aside>

          <section className="order-1 rounded-[24px] border border-[#d8cdb7] bg-[#fffdfa] p-5 shadow-[0_24px_80px_rgba(21,21,21,0.08)] xl:order-none">
            <div className="flex flex-col gap-5 2xl:flex-row 2xl:items-start 2xl:justify-between">
              <div className="max-w-4xl">
                <p className="inline-flex items-center gap-2 rounded-full border border-[#c7e9e3] bg-[#dff4ef] px-3 py-2 text-sm font-bold text-[#006f8f]">
                  <Sparkles className="h-4 w-4" aria-hidden />
                  Agent Identity Firewall
                </p>
                <h2 className="mt-4 text-[42px] font-semibold leading-[1.08] md:text-[48px]">
                  Govern invoice agents before money moves.
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-[#5f5a50]">
                  Every agent action is bound to an owner, delegated user,
                  purpose, scoped token, policy decision, and audit event. The
                  model proposes; the firewall decides.
                </p>
              </div>
              <div
                className={`rounded-3xl border p-5 2xl:max-w-[230px] ${decisionState.className}`}
              >
                <p className="text-sm font-semibold">Current decision</p>
                <div className="mt-2 flex items-center gap-3">
                  <div
                    className="text-4xl font-semibold"
                    data-testid="current-decision-label"
                  >
                    {decisionState.label}
                  </div>
                  {decision === "revoke" ? (
                    <Ban className="h-8 w-8" aria-hidden />
                  ) : (
                    <ShieldCheck className="h-8 w-8" aria-hidden />
                  )}
                </div>
                <p className="mt-2 max-w-xs text-sm font-medium">
                  {decisionState.detail}
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
              {scenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => selectScenario(scenario.id)}
                  className={`min-h-[148px] rounded-3xl border p-4 text-left ${
                    activeScenario.id === scenario.id
                      ? "border-[#00297a] bg-[#eef6ff] shadow-[0_18px_50px_rgba(0,41,122,0.15)]"
                      : "border-[#d8cdb7] bg-white hover:border-[#006f8f]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-[#5f5a50]">
                      {scenario.invoice}
                    </span>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-bold ${
                        decisionCopy[scenario.decision].className
                      }`}
                    >
                      {decisionCopy[scenario.decision].label}
                    </span>
                  </div>
                  <p className="mt-4 text-lg font-bold">{scenario.vendor}</p>
                  <p className="mt-2 text-2xl font-semibold">{scenario.amount}</p>
                  <p className="mt-2 text-sm text-[#5f5a50]">
                    Risk score {scenario.risk}
                  </p>
                </button>
              ))}
            </div>

            <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1fr)_330px]">
              <div className="rounded-3xl border border-[#d8cdb7] bg-white p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#006f8f]">
                      Requested action
                    </p>
                    <h3 className="mt-1 text-2xl font-semibold">
                      {activeScenario.requestedAction}
                    </h3>
                  </div>
                  <div className="rounded-2xl border border-[#d8cdb7] bg-[#f7f2e8] px-4 py-3 text-right">
                    <p className="text-xs font-semibold text-[#5f5a50]">
                      Risk score
                    </p>
                    <p className="text-3xl font-semibold">{activeScenario.risk}</p>
                  </div>
                </div>
                <p className="mt-4 text-base leading-7 text-[#5f5a50]">
                  {activeScenario.summary}
                </p>
                <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#e9dcc4]">
                  <div
                    className={`h-full rounded-full ${decisionState.bar}`}
                    style={{ width: `${activeScenario.risk}%` }}
                  />
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {activeScenario.context.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-[#d8cdb7] bg-[#fffdfa] p-4"
                    >
                      <ShieldAlert
                        className="mt-0.5 h-5 w-5 text-[#006f8f]"
                        aria-hidden
                      />
                      <p className="text-sm font-semibold">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[#d8cdb7] bg-[#151515] p-5 text-white">
                <p className="text-sm font-semibold text-[#dff4ef]">
                  Scoped credential
                </p>
                <div className="mt-5 space-y-4">
                  <div>
                    <p className="text-xs text-[#c9c5b9]">Delegated user</p>
                    <p className="mt-1 text-sm font-bold">
                      {activeScenario.delegatedUser}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#c9c5b9]">Issued scope</p>
                    <p className="mt-1 font-mono text-sm">
                      {activeScenario.scope}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#c9c5b9]">Token lifetime</p>
                    <p className="mt-1 text-sm font-bold">
                      {activeScenario.tokenTtl}
                    </p>
                  </div>
                </div>
                <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <LockKeyhole className="h-5 w-5 text-[#19c4ad]" aria-hidden />
                    <p className="text-sm font-semibold">
                      No long-lived ERP credential reaches the agent runtime.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="order-3 rounded-[24px] border border-[#d8cdb7] bg-[#fffdfa] p-5 shadow-[0_24px_80px_rgba(21,21,21,0.08)] xl:order-none">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#006f8f]">
                  Response surface
                </p>
                <h3 className="mt-1 text-2xl font-semibold">Firewall actions</h3>
              </div>
              <Activity className="h-6 w-6 text-[#00297a]" aria-hidden />
            </div>
            <div className="mt-5 grid gap-3">
              {responseActions.map((action) => {
                const Icon = action.icon;
                const actionDecision =
                  action.tone === "challenge" ? "challenge" : action.tone;
                return (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() => {
                      setAgentLocked(false);
                      setManualDecision(actionDecision);
                    }}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-bold ${
                      actionTone[action.tone]
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4" aria-hidden />
                      {action.label}
                    </span>
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  setManualDecision(null);
                  setAgentLocked(false);
                }}
                className="flex items-center justify-center gap-2 rounded-2xl border border-[#d8cdb7] bg-white px-4 py-3 text-sm font-bold hover:border-[#00297a]"
              >
                <RefreshCcw className="h-4 w-4" aria-hidden />
                Reset policy decision
              </button>
            </div>

            <div className="mt-6 rounded-3xl border border-[#d8cdb7] bg-[#f7f2e8] p-5">
              <p className="text-sm font-semibold text-[#006f8f]">
                Policy reasons
              </p>
              <div className="mt-4 space-y-3">
                {activeScenario.policyReasons.map((reason) => (
                  <div key={reason} className="flex items-start gap-3">
                    <BadgeCheck
                      className="mt-0.5 h-4 w-4 text-[#19c4ad]"
                      aria-hidden
                    />
                    <p className="text-sm font-medium text-[#34302a]">
                      {reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          {controlPath.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-3xl border border-[#d8cdb7] bg-[#fffdfa] p-5"
              >
                <Icon className="h-6 w-6 text-[#00297a]" aria-hidden />
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5f5a50]">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="rounded-[24px] border border-[#d8cdb7] bg-[#fffdfa] p-5 shadow-[0_24px_80px_rgba(21,21,21,0.06)]">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#006f8f]">
                  Approval matrix
                </p>
                <h2 className="mt-1 text-2xl font-semibold">
                  Business-readable runtime policy
                </h2>
              </div>
              <Workflow className="h-7 w-7 text-[#00297a]" aria-hidden />
            </div>
            <div className="mt-5 overflow-hidden rounded-3xl border border-[#d8cdb7]">
              <div className="grid grid-cols-[1.25fr_0.8fr_0.9fr_0.9fr] bg-[#151515] text-sm font-bold text-white">
                <div className="p-4">Condition</div>
                <div className="p-4">Firewall action</div>
                <div className="p-4">Approver</div>
                <div className="p-4">Outcome</div>
              </div>
              {approvalRules.map((rule) => (
                <div
                  key={rule.rule}
                  className="grid grid-cols-1 border-t border-[#d8cdb7] bg-white text-sm md:grid-cols-[1.25fr_0.8fr_0.9fr_0.9fr]"
                >
                  <div className="p-4 font-semibold">{rule.rule}</div>
                  <div className="p-4 text-[#00297a]">{rule.action}</div>
                  <div className="p-4 text-[#5f5a50]">{rule.approver}</div>
                  <div className="p-4 text-[#5f5a50]">{rule.outcome}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-[#d8cdb7] bg-[#fffdfa] p-5 shadow-[0_24px_80px_rgba(21,21,21,0.06)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#006f8f]">
                  Shadow detection
                </p>
                <h2 className="mt-1 text-2xl font-semibold">
                  Unknown agent access
                </h2>
              </div>
              <Siren className="h-7 w-7 text-[#b42318]" aria-hidden />
            </div>
            <div className="mt-5 grid gap-3">
              {shadowFindings.map((finding) => (
                <div
                  key={finding.agent}
                  className="rounded-3xl border border-[#d8cdb7] bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-sm font-bold">
                        {finding.agent}
                      </p>
                      <p className="mt-1 text-sm text-[#5f5a50]">
                        {finding.owner}
                      </p>
                    </div>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-bold ${
                        finding.risk === "Critical"
                          ? "border-red-200 bg-red-50 text-red-900"
                          : finding.risk === "Review"
                            ? "border-amber-200 bg-amber-50 text-amber-950"
                            : "border-emerald-200 bg-emerald-50 text-emerald-900"
                      }`}
                    >
                      {finding.risk}
                    </span>
                  </div>
                  <p className="mt-3 font-mono text-xs text-[#34302a]">
                    {finding.access}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[24px] border border-[#d8cdb7] bg-[#151515] p-5 text-white shadow-[0_24px_80px_rgba(21,21,21,0.12)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#19c4ad]">
                Audit timeline
              </p>
              <h2 className="mt-1 text-2xl font-semibold">
                Exportable evidence for SIEM, auditors, and incident response
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">
              <FileText className="h-4 w-4" aria-hidden />
              correlation_id: aif-{activeScenario.invoice.toLowerCase()}
            </div>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {activeScenario.timeline.map((event, index) => (
              <div
                key={event}
                className="min-h-[138px] rounded-3xl border border-white/15 bg-white/10 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#19c4ad] text-sm font-bold text-[#151515]">
                    {index + 1}
                  </span>
                  {index === activeScenario.timeline.length - 1 ? (
                    <FileClock className="h-5 w-5 text-[#19c4ad]" aria-hidden />
                  ) : (
                    <CircleDollarSign
                      className="h-5 w-5 text-[#dff4ef]"
                      aria-hidden
                    />
                  )}
                </div>
                <p className="mt-4 text-sm font-semibold leading-6">{event}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="pb-6 text-sm text-[#5f5a50]">
          Unofficial Asion concept demo inspired by Okta-style AI agent identity
          governance. Not affiliated with Okta.
        </footer>
      </main>
    </div>
  );
}

"use client";

import Image from "next/image";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Ban,
  Bell,
  Bot,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  ClipboardCheck,
  Command,
  Database,
  EyeOff,
  FileText,
  Grid2X2,
  History,
  LockKeyhole,
  MoreHorizontal,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  UserRound,
  Users,
  XCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState, type ChangeEvent } from "react";

type MetricTone = "green" | "red" | "orange" | "blue";
type AuditStatus = "Success" | "Pending" | "Blocked";
type AuditRisk = "Low" | "Medium" | "High";
type MatrixState = "allow" | "review" | "block";
type NavLabel =
  | "Overview"
  | "Agents"
  | "Access"
  | "Policies"
  | "Approvals"
  | "Audit Trail"
  | "Settings";

const navItems: Array<{
  label: NavLabel;
  icon: LucideIcon;
  badge?: string;
}> = [
  { label: "Overview", icon: Grid2X2 },
  { label: "Agents", icon: UserRound },
  { label: "Access", icon: Shield },
  { label: "Policies", icon: ClipboardCheck },
  { label: "Approvals", icon: CheckCircle2, badge: "3" },
  { label: "Audit Trail", icon: History },
  { label: "Settings", icon: Settings },
];

const metrics: Array<{
  label: string;
  value: string;
  delta: string;
  helper: string;
  tone: MetricTone;
  icon: LucideIcon;
}> = [
  {
    label: "Total Agents",
    value: "128",
    delta: "+18%",
    helper: "vs yesterday",
    tone: "green",
    icon: Users,
  },
  {
    label: "High Risk Actions",
    value: "24",
    delta: "+35%",
    helper: "vs yesterday",
    tone: "red",
    icon: ShieldCheck,
  },
  {
    label: "Pending Approvals",
    value: "3",
    delta: "-25%",
    helper: "vs yesterday",
    tone: "orange",
    icon: UserRound,
  },
  {
    label: "Shadow Agents",
    value: "2",
    delta: "+100%",
    helper: "vs yesterday",
    tone: "red",
    icon: EyeOff,
  },
];

const identityRows = [
  ["ID", "agt_7f3a9c2e"],
  ["Owner", "Research Team"],
  ["Environment", "Production"],
  ["Last Seen", "2m ago"],
];

const auditRows: Array<{
  time: string;
  agent: string;
  event: string;
  resource: string;
  status: AuditStatus;
  risk: AuditRisk;
  icon: LucideIcon;
}> = [
  {
    time: "May 13, 2025 10:24 AM",
    agent: "ResearchAgent-01",
    event: "Accessed Confluence",
    resource: "Confluence",
    status: "Success",
    risk: "Low",
    icon: Bot,
  },
  {
    time: "May 13, 2025 10:21 AM",
    agent: "MarketingAgent-02",
    event: "Requested Salesforce access",
    resource: "Salesforce",
    status: "Pending",
    risk: "Medium",
    icon: UserRound,
  },
  {
    time: "May 13, 2025 10:18 AM",
    agent: "DataAgent-03",
    event: "Accessed Snowflake",
    resource: "Snowflake",
    status: "Success",
    risk: "Low",
    icon: Database,
  },
  {
    time: "May 13, 2025 10:11 AM",
    agent: "Unknown Agent",
    event: "Accessed HR Database",
    resource: "HR DB",
    status: "Blocked",
    risk: "High",
    icon: EyeOff,
  },
  {
    time: "May 13, 2025 10:07 AM",
    agent: "ResearchAgent-01",
    event: "Downloaded report.csv",
    resource: "S3 Bucket",
    status: "Success",
    risk: "Low",
    icon: FileText,
  },
];

const policyRows: Array<{
  policy: string;
  strict: MatrixState;
  standard: MatrixState;
  permissive: MatrixState;
}> = [
  {
    policy: "Data Access",
    strict: "allow",
    standard: "allow",
    permissive: "review",
  },
  {
    policy: "External Apps",
    strict: "allow",
    standard: "review",
    permissive: "block",
  },
  {
    policy: "Write / Modify",
    strict: "block",
    standard: "review",
    permissive: "block",
  },
  {
    policy: "Admin Actions",
    strict: "block",
    standard: "block",
    permissive: "review",
  },
];

const insights: Array<{
  title: string;
  body: string;
  time: string;
  tone: "blue" | "orange" | "green";
  icon: LucideIcon;
}> = [
  {
    title: "Unusual access pattern",
    body: "ResearchAgent-01 accessed Snowflake Warehouse outside business hours.",
    time: "2m ago",
    tone: "blue",
    icon: ShieldCheck,
  },
  {
    title: "New app connection",
    body: "DataAgent-03 connected to Google Drive for the first time.",
    time: "12m ago",
    tone: "orange",
    icon: LockKeyhole,
  },
  {
    title: "Policy updated",
    body: "Data Access policy was updated by Security Team.",
    time: "45m ago",
    tone: "green",
    icon: BadgeCheck,
  },
];

const toneStyles: Record<MetricTone, string> = {
  green: "text-[#009f5d]",
  red: "text-[#e31937]",
  orange: "text-[#ff7a1a]",
  blue: "text-[#245cff]",
};

function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div>
        <div className="flex items-baseline gap-1 leading-none">
          <Image
            src="/brand/okta-logo-carbon.svg"
            alt="Okta"
            width={96}
            height={24}
            priority
            className="h-8 w-auto"
          />
          <span className="text-[26px] font-medium leading-none text-[#0b57ff]">
            .asion.ai
          </span>
        </div>
        <p className="mt-1 text-sm font-semibold text-[#061044]">
          Agent Identity Firewall
        </p>
      </div>
    </div>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-[#dfe7f5] bg-white shadow-[0_18px_55px_rgba(31,45,92,0.08)] ${className}`}
    >
      {children}
    </section>
  );
}

function IconBadge({
  icon: Icon,
  tone = "blue",
}: {
  icon: LucideIcon;
  tone?: "blue" | "red" | "orange" | "green" | "gray";
}) {
  const classes = {
    blue: "bg-[#eef3ff] text-[#0b57ff]",
    red: "bg-[#fff0f2] text-[#e31937]",
    orange: "bg-[#fff4ea] text-[#ff7a1a]",
    green: "bg-[#eafaf3] text-[#009f5d]",
    gray: "bg-[#f2f5fb] text-[#061044]",
  };

  return (
    <span
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${classes[tone]}`}
    >
      <Icon className="h-6 w-6" aria-hidden />
    </span>
  );
}

function MatrixIcon({ state }: { state: MatrixState }) {
  if (state === "allow") {
    return (
      <CheckCircle2
        className="mx-auto h-5 w-5 fill-[#13a463] text-white"
        aria-label="Allowed"
      />
    );
  }

  if (state === "block") {
    return (
      <XCircle
        className="mx-auto h-5 w-5 fill-[#e31937] text-white"
        aria-label="Blocked"
      />
    );
  }

  return (
    <Ban className="mx-auto h-5 w-5 text-[#ff7a1a]" aria-label="Review" />
  );
}

function RiskGauge() {
  return (
    <div className="relative mx-auto mt-4 h-[168px] w-[230px]">
      <svg
        viewBox="0 0 230 150"
        role="img"
        aria-label="Access risk score 87, high risk"
        className="h-full w-full"
      >
        <path
          d="M 34 126 A 82 82 0 0 1 196 126"
          fill="none"
          pathLength="100"
          stroke="#f7c3ca"
          strokeLinecap="round"
          strokeWidth="16"
        />
        <path
          d="M 34 126 A 82 82 0 0 1 196 126"
          fill="none"
          pathLength="100"
          stroke="#e31937"
          strokeDasharray="87 100"
          strokeLinecap="round"
          strokeWidth="16"
        />
      </svg>
      <div className="absolute inset-x-0 top-[62px] text-center">
        <p className="text-5xl font-semibold leading-none text-[#061044]">87</p>
        <p className="mt-2 text-lg font-semibold text-[#e31937]">High Risk</p>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: AuditStatus }) {
  const classes: Record<AuditStatus, string> = {
    Success: "bg-[#eafaf3] text-[#00874e]",
    Pending: "bg-[#fff4ea] text-[#d65f00]",
    Blocked: "bg-[#fff0f2] text-[#d71936]",
  };

  return (
    <span
      className={`inline-flex min-w-[78px] justify-center rounded-full px-3 py-1 text-xs font-semibold ${classes[status]}`}
    >
      {status}
    </span>
  );
}

function RiskDot({ risk }: { risk: AuditRisk }) {
  const classes: Record<AuditRisk, string> = {
    Low: "bg-[#13a463]",
    Medium: "bg-[#ff9f1a]",
    High: "bg-[#e31937]",
  };

  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${classes[risk]}`} />
      {risk}
    </span>
  );
}

export function InvoiceShieldConsole() {
  const [activeNav, setActiveNav] = useState<NavLabel>("Overview");
  const [approvalState, setApprovalState] = useState("Review");
  const [searchTerm, setSearchTerm] = useState("");
  const [timeRange, setTimeRange] = useState("Last 24 hours");
  const [eventFilter, setEventFilter] = useState("All Events");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notice, setNotice] = useState(
    "Overview selected. Agent posture is stable with 3 approvals requiring review.",
  );

  const visibleAuditRows = auditRows.filter((row) => {
    if (eventFilter === "All Events") {
      return true;
    }

    if (eventFilter === "High Risk") {
      return row.risk === "High";
    }

    return row.status === eventFilter;
  });

  function announceAction(label: string, detail: string) {
    setNotice(`${label}: ${detail}`);
  }

  function handleOverviewNav() {
    setActiveNav("Overview");
    setEventFilter("All Events");
    announceAction(
      "Overview",
      "Agent posture is stable with 3 approvals requiring review.",
    );
  }

  function handleAgentsNav() {
    setActiveNav("Agents");
    announceAction(
      "Agents",
      "Showing registered agents, owners, scopes, and certification state.",
    );
  }

  function handleAccessNav() {
    setActiveNav("Access");
    announceAction(
      "Access",
      "Showing delegated access posture and scoped credential activity.",
    );
  }

  function handlePoliciesNav() {
    setActiveNav("Policies");
    announceAction(
      "Policies",
      "Policy matrix is ready for strict, standard, and permissive mode review.",
    );
  }

  function handleApprovalsNav() {
    setActiveNav("Approvals");
    announceAction(
      "Approvals",
      "3 access requests are queued for review by the security team.",
    );
  }

  function handleAuditTrailNav() {
    setActiveNav("Audit Trail");
    setEventFilter("All Events");
    announceAction(
      "Audit Trail",
      "Full evidence trail loaded for SIEM, audit, and incident response.",
    );
  }

  function handleSettingsNav() {
    setActiveNav("Settings");
    setProfileMenuOpen(true);
    announceAction(
      "Settings",
      "Profile and session settings are available for Alex Smith.",
    );
  }

  const navActions: Record<NavLabel, () => void> = {
    Overview: handleOverviewNav,
    Agents: handleAgentsNav,
    Access: handleAccessNav,
    Policies: handlePoliciesNav,
    Approvals: handleApprovalsNav,
    "Audit Trail": handleAuditTrailNav,
    Settings: handleSettingsNav,
  };

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearchTerm(value);
    setActiveNav("Overview");
    setNotice(
      value.trim()
        ? `Search active: ${value}`
        : "Search cleared. Showing the full agent ecosystem.",
    );
  }

  function handleTimeRangeChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    setTimeRange(value);
    announceAction("Time range", `Dashboard metrics filtered to ${value}.`);
  }

  function handleAuditFilterChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    setEventFilter(value);
    setActiveNav("Audit Trail");
    announceAction("Audit filter", `Audit trail filtered to ${value}.`);
  }

  function handleNotificationsClick() {
    setActiveNav("Approvals");
    announceAction(
      "Notifications",
      "3 pending approvals and 2 shadow agent alerts are waiting.",
    );
  }

  function handleHelpClick() {
    announceAction(
      "Help",
      "Use approvals to decide agent access, investigate shadow agents, and export the audit trail.",
    );
  }

  function handleProfileClick() {
    const nextOpen = !profileMenuOpen;
    setProfileMenuOpen(nextOpen);
    announceAction(
      "Profile",
      nextOpen
        ? "Profile menu opened for Alex Smith."
        : "Profile menu closed.",
    );
  }

  function handleViewFullProfileClick() {
    setActiveNav("Agents");
    announceAction(
      "Agent profile",
      "ResearchAgent-01 profile loaded with owner, scopes, and certification state.",
    );
  }

  function handleViewRiskDetailsClick() {
    setActiveNav("Access");
    setEventFilter("High Risk");
    announceAction(
      "Risk details",
      "High risk is driven by after-hours Snowflake access, new app connection, and permissive policy mode.",
    );
  }

  function handleDenyApprovalClick() {
    setActiveNav("Approvals");
    setApprovalState("Denied");
    announceAction(
      "Approval denied",
      "MarketingAgent-02 access request was denied and logged.",
    );
  }

  function handleReviewApprovalClick() {
    setActiveNav("Approvals");
    setApprovalState("Under Review");
    announceAction(
      "Approval review",
      "MarketingAgent-02 has been routed to a human reviewer.",
    );
  }

  function handleInvestigateShadowAgentClick() {
    setActiveNav("Audit Trail");
    setEventFilter("High Risk");
    announceAction(
      "Shadow investigation",
      "Unknown access source 203.0.113.42 was added to the investigation queue.",
    );
  }

  function handleManagePoliciesClick() {
    setActiveNav("Policies");
    announceAction(
      "Policy matrix",
      "Policy editor opened for Data Access, External Apps, Write / Modify, and Admin Actions.",
    );
  }

  function handleViewAllInsightsClick() {
    setActiveNav("Overview");
    announceAction(
      "Security insights",
      "All insights view opened with unusual access, app connection, and policy update events.",
    );
  }

  function handleViewFullAuditTrailClick() {
    setActiveNav("Audit Trail");
    setEventFilter("All Events");
    announceAction(
      "Audit trail",
      `${auditRows.length} events are ready for export or SIEM handoff.`,
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f9ff] text-[#061044]">
      <div className="grid min-h-screen lg:grid-cols-[264px_minmax(0,1fr)]">
        <aside className="hidden border-r border-[#dfe7f5] bg-white px-4 py-6 lg:sticky lg:top-0 lg:block lg:h-screen">
          <BrandMark />

          <nav className="mt-9 grid gap-2" aria-label="Primary navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = item.label === activeNav;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={navActions[item.label]}
                  aria-label={item.label}
                  className={`flex h-14 w-full items-center justify-between rounded-xl px-4 text-sm font-semibold ${
                    active
                      ? "bg-[#eef3ff] text-[#0b57ff]"
                      : "text-[#53617f] hover:bg-[#f5f7fc] hover:text-[#061044]"
                  }`}
                >
                  <span className="flex items-center gap-4">
                    <Icon className="h-5 w-5" aria-hidden />
                    {item.label}
                  </span>
                  {item.badge ? (
                    <span
                      aria-hidden
                      className="flex h-7 min-w-7 items-center justify-center rounded-full bg-[#e6ecff] px-2 text-[#0b57ff]"
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[#dfe7f5] bg-white shadow-[0_18px_55px_rgba(31,45,92,0.08)] lg:absolute lg:bottom-6 lg:left-5 lg:right-5 lg:mt-0">
            <div className="relative h-24">
              <Image
                src="/brand/okta-images/secure-ai-hero.jpg"
                alt=""
                fill
                priority
                sizes="224px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-white/40" />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3">
                <IconBadge icon={ShieldCheck} tone="blue" />
                <div>
                  <p className="text-sm font-bold text-[#0b57ff]">
                    Trust is earned.
                  </p>
                  <p className="text-xs leading-5 text-[#53617f]">
                    Access is governed. Every action is verified.
                  </p>
                </div>
              </div>
              <a
                href="https://www.okta.com/products/govern-ai-agent-identity/"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0b57ff]"
              >
                Learn more
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="sticky top-0 z-30 flex min-h-[82px] flex-col gap-4 border-b border-[#dfe7f5] bg-white/90 px-5 py-4 backdrop-blur xl:flex-row xl:items-center xl:justify-between xl:px-8">
            <div className="lg:hidden">
              <BrandMark />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex h-10 items-center gap-2 rounded-full border border-[#dfe7f5] bg-white px-4 text-sm font-semibold text-[#061044]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#13a463]" />
                All systems secure
              </span>
              <div className="flex h-11 min-w-[280px] flex-1 items-center gap-3 rounded-xl border border-[#dfe7f5] bg-[#fbfcff] px-4 text-[#7a86a3] xl:min-w-[380px]">
                <Search className="h-5 w-5" aria-hidden />
                <input
                  value={searchTerm}
                  onChange={handleSearchChange}
                  aria-label="Search agents, apps, policies"
                  placeholder="Search agents, apps, policies..."
                  className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#061044] outline-none placeholder:text-[#7a86a3]"
                />
                <span className="ml-auto inline-flex items-center gap-1 rounded-md border border-[#dfe7f5] bg-white px-2 py-1 text-xs font-semibold">
                  <Command className="h-3 w-3" aria-hidden /> K
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 xl:justify-end">
              <button
                type="button"
                onClick={handleNotificationsClick}
                aria-label="Open notifications"
                className="rounded-full p-2 text-[#53617f] hover:bg-[#eef3ff] hover:text-[#0b57ff]"
              >
                <Bell className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={handleHelpClick}
                aria-label="Open help"
                className="rounded-full p-2 text-[#53617f] hover:bg-[#eef3ff] hover:text-[#0b57ff]"
              >
                <CircleHelp className="h-5 w-5" aria-hidden />
              </button>
              <div className="relative">
                <button
                  type="button"
                  onClick={handleProfileClick}
                  aria-label="Toggle Alex Smith profile menu"
                  className="flex items-center gap-3"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#102a83] text-sm font-bold text-white">
                    AS
                  </span>
                  <ChevronDown className="h-4 w-4 text-[#53617f]" aria-hidden />
                </button>
                {profileMenuOpen ? (
                  <div className="absolute right-0 top-14 z-40 w-56 rounded-xl border border-[#dfe7f5] bg-white p-3 text-sm font-semibold shadow-[0_18px_55px_rgba(31,45,92,0.14)]">
                    <p className="text-[#061044]">Alex Smith</p>
                    <p className="mt-1 text-xs text-[#7a86a3]">
                      Security operations lead
                    </p>
                    <div className="mt-3 rounded-lg bg-[#f7f9ff] px-3 py-2 text-xs text-[#53617f]">
                      Session protected by Okta.
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </header>

          <div className="px-5 py-7 xl:px-8">
            <section className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-[#061044]">
                  Welcome back, Alex
                </h1>
                <p className="mt-2 text-sm font-medium text-[#53617f]">
                  Here&apos;s what&apos;s happening across your agent ecosystem.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-[#061044]">
                <span className="inline-flex h-11 items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-[#53617f]" aria-hidden />
                  May 13, 2025
                </span>
                <label className="relative inline-flex h-11 items-center rounded-xl border border-[#dfe7f5] bg-white px-4 shadow-sm">
                  <span className="sr-only">Time range</span>
                  <select
                    value={timeRange}
                    onChange={handleTimeRangeChange}
                    className="appearance-none bg-transparent pr-7 text-sm font-semibold outline-none"
                  >
                    <option>Last 24 hours</option>
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 h-4 w-4"
                    aria-hidden
                  />
                </label>
              </div>
            </section>

            <section className="mt-5 rounded-2xl border border-[#dfe7f5] bg-white px-5 py-4 shadow-[0_18px_55px_rgba(31,45,92,0.06)]">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase text-[#7a86a3]">
                    Active console action
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#061044]">
                    {notice}
                  </p>
                </div>
                <span className="inline-flex h-9 items-center rounded-full bg-[#eef3ff] px-4 text-sm font-semibold text-[#0b57ff]">
                  {activeNav}
                </span>
              </div>
            </section>

            <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric) => {
                const Icon = metric.icon;
                const tone =
                  metric.tone === "green"
                    ? "green"
                    : metric.tone === "orange"
                      ? "orange"
                      : metric.tone === "red"
                        ? "red"
                        : "blue";
                return (
                  <Card key={metric.label} className="p-5">
                    <div className="flex items-center gap-5">
                      <IconBadge icon={Icon} tone={tone} />
                      <div>
                        <p className="text-sm font-semibold text-[#293552]">
                          {metric.label}
                        </p>
                        <p className="mt-2 text-2xl font-semibold">
                          {metric.value}
                        </p>
                        <p className="mt-2 text-xs font-semibold">
                          <span className={toneStyles[metric.tone]}>
                            {metric.delta}
                          </span>
                          <span className="ml-3 text-[#53617f]">
                            {metric.helper}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </section>

            <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.82fr)_minmax(330px,0.8fr)]">
              <Card className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-lg font-semibold">Agent Identity Card</h2>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#eafaf3] px-3 py-1 text-xs font-semibold text-[#00874e]">
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                      Trusted Agent
                    </span>
                    <MoreHorizontal className="h-5 w-5 text-[#53617f]" />
                  </div>
                </div>

                <div className="mt-7 grid gap-6 md:grid-cols-[160px_minmax(0,1fr)]">
                  <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full bg-[#eef3ff]">
                    <Image
                      src="/brand/okta-images/home-hero-alt.jpg"
                      alt=""
                      fill
                      priority
                      sizes="160px"
                      className="object-cover opacity-85"
                    />
                    <div className="absolute inset-0 bg-white/25" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#061044] shadow-[0_20px_50px_rgba(11,87,255,0.28)]">
                        <Bot className="h-14 w-14 text-[#8fb2ff]" aria-hidden />
                      </div>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-semibold">
                        ResearchAgent-01
                      </h3>
                      <span className="inline-flex items-center gap-1 rounded-md bg-[#e6ecff] px-2 py-1 text-xs font-semibold text-[#0b57ff]">
                        <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
                        Verified
                      </span>
                    </div>

                    <dl className="mt-5 grid gap-3 text-sm">
                      {identityRows.map(([label, value]) => (
                        <div key={label} className="grid grid-cols-[92px_1fr]">
                          <dt className="font-medium text-[#53617f]">{label}</dt>
                          <dd className="font-semibold text-[#293552]">
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  {["LLM", "Data Access", "RAG", "Automation"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#dfe7f5] bg-[#f7f9ff] px-5 py-2 text-xs font-semibold text-[#53617f]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 border-t border-[#dfe7f5] pt-4">
                  <button
                    type="button"
                    onClick={handleViewFullProfileClick}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b57ff]"
                  >
                    View full profile
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </Card>

              <Card className="p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Access Risk Score</h2>
                  <MoreHorizontal className="h-5 w-5 text-[#53617f]" />
                </div>
                <RiskGauge />
                <p className="mx-auto mt-2 max-w-[220px] text-center text-sm font-medium leading-6 text-[#53617f]">
                  Unusual behavior detected across 3 systems
                </p>
                <div className="mt-7 border-t border-[#dfe7f5] pt-4">
                  <button
                    type="button"
                    onClick={handleViewRiskDetailsClick}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b57ff]"
                  >
                    View risk details
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </Card>

              <Card className="p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Pending Approval</h2>
                  <MoreHorizontal className="h-5 w-5 text-[#53617f]" />
                </div>

                <div className="mt-7 flex items-start gap-4">
                  <IconBadge icon={UserRound} tone="blue" />
                  <div>
                    <h3 className="text-lg font-semibold">MarketingAgent-02</h3>
                    <p className="mt-1 text-sm font-medium text-[#53617f]">
                      is requesting access to
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-sm font-semibold">
                      <Database className="h-4 w-4 text-[#0b57ff]" aria-hidden />
                      Salesforce Production
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 text-sm">
                  <div>
                    <p className="font-medium text-[#7a86a3]">Reason</p>
                    <p className="mt-1 font-semibold">
                      Lead enrichment workflow
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-[#7a86a3]">Requested by</p>
                    <p className="mt-1 font-semibold">Marketing Team</p>
                  </div>
                  <div>
                    <p className="font-medium text-[#7a86a3]">Decision</p>
                    <p className="mt-1 font-semibold text-[#0b57ff]">
                      {approvalState}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleDenyApprovalClick}
                    className="h-11 rounded-lg border border-[#b8c4dc] bg-white text-sm font-semibold text-[#061044] hover:border-[#e31937] hover:text-[#e31937]"
                  >
                    Deny
                  </button>
                  <button
                    type="button"
                    onClick={handleReviewApprovalClick}
                    className="h-11 rounded-lg bg-[#0b57ff] text-sm font-semibold text-white shadow-[0_12px_24px_rgba(11,87,255,0.28)] hover:bg-[#003fcc]"
                  >
                    Review
                  </button>
                </div>
              </Card>
            </section>

            <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.82fr)_minmax(330px,0.8fr)]">
              <Card className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <IconBadge icon={AlertTriangle} tone="red" />
                    <div>
                      <h2 className="text-lg font-semibold">
                        Shadow Agent Detected
                      </h2>
                      <p className="mt-1 text-sm font-medium text-[#53617f]">
                        Unknown access into sensitive data.
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-md bg-[#fff0f2] px-3 py-1 text-xs font-semibold text-[#e31937]">
                    <AlertTriangle className="h-3.5 w-3.5" aria-hidden />
                    High Risk
                  </span>
                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-[136px_minmax(0,1fr)]">
                  <div className="relative mx-auto flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-[#fff0f2]">
                    <Image
                      src="/brand/okta-images/secure-ai-hero.jpg"
                      alt=""
                      fill
                      priority
                      sizes="128px"
                      className="object-cover opacity-60"
                    />
                    <EyeOff className="relative h-12 w-12 text-[#061044]" />
                  </div>

                  <dl className="grid content-center gap-3 text-sm">
                    <div className="grid grid-cols-[108px_1fr]">
                      <dt className="font-medium text-[#53617f]">First Seen</dt>
                      <dd className="font-semibold">5m ago</dd>
                    </div>
                    <div className="grid grid-cols-[108px_1fr]">
                      <dt className="font-medium text-[#53617f]">Source IP</dt>
                      <dd className="font-semibold">203.0.113.42</dd>
                    </div>
                    <div className="grid grid-cols-[108px_1fr]">
                      <dt className="font-medium text-[#53617f]">Risk Level</dt>
                      <dd>
                        <span className="rounded-full bg-[#fff0f2] px-5 py-1 text-sm font-semibold text-[#e31937]">
                          High
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-5 border-t border-[#dfe7f5] pt-4">
                  <button
                    type="button"
                    onClick={handleInvestigateShadowAgentClick}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b57ff]"
                  >
                    Investigate
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </Card>

              <Card className="p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    Policy & Approval Matrix
                  </h2>
                  <MoreHorizontal className="h-5 w-5 text-[#53617f]" />
                </div>
                <div className="mt-5 overflow-x-auto">
                  <table
                    aria-label="Policy approval matrix"
                    className="w-full min-w-[360px] border-separate border-spacing-0 text-sm"
                  >
                    <thead>
                      <tr className="text-left text-xs font-semibold text-[#53617f]">
                        <th className="pb-3">Policy</th>
                        <th className="pb-3 text-center">Strict</th>
                        <th className="pb-3 text-center">Standard</th>
                        <th className="pb-3 text-center">Permissive</th>
                      </tr>
                    </thead>
                    <tbody>
                      {policyRows.map((row) => (
                        <tr key={row.policy} className="border-t border-[#dfe7f5]">
                          <td className="border-t border-[#dfe7f5] py-3 font-semibold">
                            {row.policy}
                          </td>
                          <td className="border-t border-[#dfe7f5] py-3 text-center">
                            <MatrixIcon state={row.strict} />
                          </td>
                          <td className="border-t border-[#dfe7f5] py-3 text-center">
                            <MatrixIcon state={row.standard} />
                          </td>
                          <td className="border-t border-[#dfe7f5] py-3 text-center">
                            <MatrixIcon state={row.permissive} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={handleManagePoliciesClick}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b57ff]"
                  >
                    Manage policies
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </Card>

              <Card className="row-span-2 p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Security Insights</h2>
                  <MoreHorizontal className="h-5 w-5 text-[#53617f]" />
                </div>
                <div className="mt-5 divide-y divide-[#dfe7f5]">
                  {insights.map((insight) => {
                    const Icon = insight.icon;
                    return (
                      <article key={insight.title} className="flex gap-4 py-5 first:pt-0">
                        <IconBadge icon={Icon} tone={insight.tone} />
                        <div>
                          <h3 className="text-sm font-semibold">
                            {insight.title}
                          </h3>
                          <p className="mt-2 text-sm font-medium leading-6 text-[#293552]">
                            {insight.body}
                          </p>
                          <p className="mt-2 text-xs font-medium text-[#7a86a3]">
                            {insight.time}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
                <div className="mt-4 border-t border-[#dfe7f5] pt-5">
                  <button
                    type="button"
                    onClick={handleViewAllInsightsClick}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b57ff]"
                  >
                    View all insights
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </Card>

              <Card className="xl:col-span-2">
                <div className="flex flex-col gap-3 border-b border-[#dfe7f5] p-5 md:flex-row md:items-center md:justify-between">
                  <h2 className="text-lg font-semibold">Audit Trail</h2>
                  <label className="relative inline-flex h-9 items-center rounded-lg border border-[#dfe7f5] bg-white px-3 text-sm font-semibold text-[#53617f]">
                    <span className="sr-only">Audit event filter</span>
                    <select
                      value={eventFilter}
                      onChange={handleAuditFilterChange}
                      className="appearance-none bg-transparent pr-7 outline-none"
                    >
                      <option>All Events</option>
                      <option>Success</option>
                      <option>Pending</option>
                      <option>Blocked</option>
                      <option>High Risk</option>
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-2 h-4 w-4"
                      aria-hidden
                    />
                  </label>
                </div>
                <div className="overflow-x-auto">
                  <table
                    aria-label="Audit trail events"
                    className="w-full min-w-[820px] border-separate border-spacing-0 text-sm"
                  >
                    <thead className="text-left text-xs font-semibold text-[#061044]">
                      <tr>
                        <th className="px-5 py-3">Time</th>
                        <th className="px-5 py-3">Agent</th>
                        <th className="px-5 py-3">Event</th>
                        <th className="px-5 py-3">Resource</th>
                        <th className="px-5 py-3">Status</th>
                        <th className="px-5 py-3">Risk</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleAuditRows.map((row) => {
                        const Icon = row.icon;
                        return (
                          <tr key={`${row.time}-${row.event}`}>
                            <td className="border-t border-[#dfe7f5] px-5 py-3 font-medium text-[#293552]">
                              {row.time}
                            </td>
                            <td className="border-t border-[#dfe7f5] px-5 py-3">
                              <span className="inline-flex items-center gap-2 font-semibold">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eef3ff] text-[#0b57ff]">
                                  <Icon className="h-4 w-4" aria-hidden />
                                </span>
                                {row.agent}
                              </span>
                            </td>
                            <td className="border-t border-[#dfe7f5] px-5 py-3 font-medium text-[#293552]">
                              {row.event}
                            </td>
                            <td className="border-t border-[#dfe7f5] px-5 py-3 font-semibold text-[#293552]">
                              {row.resource}
                            </td>
                            <td className="border-t border-[#dfe7f5] px-5 py-3">
                              <StatusPill status={row.status} />
                            </td>
                            <td className="border-t border-[#dfe7f5] px-5 py-3 font-medium text-[#293552]">
                              <RiskDot risk={row.risk} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="border-t border-[#dfe7f5] p-5">
                  <button
                    type="button"
                    onClick={handleViewFullAuditTrailClick}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b57ff]"
                  >
                    View full audit trail
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </Card>
            </section>

            <footer className="pb-3 pt-6 text-xs font-medium text-[#7a86a3]">
              Unofficial Asion concept demo inspired by Okta-style AI agent
              identity governance. Not affiliated with Okta.
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}

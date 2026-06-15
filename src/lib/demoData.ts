import {
  AlertTriangle,
  BadgeCheck,
  Ban,
  Bot,
  CheckCircle2,
  Clock3,
  FileWarning,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  RadioTower,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Decision = "allow" | "challenge" | "hold" | "revoke";

export type InvoiceScenario = {
  id: string;
  vendor: string;
  invoice: string;
  amount: string;
  requestedAction: string;
  risk: number;
  decision: Decision;
  owner: string;
  delegatedUser: string;
  scope: string;
  tokenTtl: string;
  summary: string;
  context: string[];
  policyReasons: string[];
  timeline: string[];
};

export type AgentSignal = {
  label: string;
  value: string;
  tone: "good" | "warn" | "danger" | "neutral";
  icon: LucideIcon;
};

export const agentSignals: AgentSignal[] = [
  {
    label: "Agent identity",
    value: "Registered",
    tone: "good",
    icon: BadgeCheck,
  },
  {
    label: "Human owner",
    value: "Maya Chen",
    tone: "good",
    icon: Fingerprint,
  },
  {
    label: "Connector scope",
    value: "AP prepare only",
    tone: "neutral",
    icon: KeyRound,
  },
  {
    label: "Credential state",
    value: "Short lived",
    tone: "good",
    icon: Clock3,
  },
];

export const scenarios: InvoiceScenario[] = [
  {
    id: "low-risk",
    vendor: "Northstar Facilities",
    invoice: "INV-20481",
    amount: "$18,420",
    requestedAction: "Prepare payment hold",
    risk: 24,
    decision: "allow",
    owner: "Maya Chen, AP automation lead",
    delegatedUser: "Carlos Vega, AP analyst",
    scope: "erp.invoice.prepare_payment",
    tokenTtl: "9 minutes",
    summary:
      "Known vendor, matched purchase order, normal amount band, and no bank detail change. Firewall can allow the agent to prepare a payment in hold state.",
    context: [
      "Vendor certified 18 days ago",
      "Purchase order matched",
      "Amount within 30-day pattern",
      "No new OAuth grant detected",
    ],
    policyReasons: [
      "Agent is registered with active owner",
      "Requested scope is limited to prepare_payment",
      "Action stays below step-up threshold",
    ],
    timeline: [
      "Agent asserted identity invoiceshield.ap-01",
      "Okta context resolved delegated user and owner",
      "Scoped token issued for ERP prepare_payment",
      "Policy decision allow with audit export",
    ],
  },
  {
    id: "high-risk",
    vendor: "HelioGrid Components",
    invoice: "INV-77802",
    amount: "$248,900",
    requestedAction: "Prepare urgent payment",
    risk: 86,
    decision: "hold",
    owner: "Maya Chen, AP automation lead",
    delegatedUser: "Priya Shah, treasury analyst",
    scope: "erp.invoice.prepare_payment",
    tokenTtl: "Denied until approval",
    summary:
      "Large amount, new bank hash, weekend execution, and urgency language in the attachment. Firewall holds the action and creates a finance approval request.",
    context: [
      "Bank account hash changed",
      "Amount is 4.8x vendor average",
      "Attachment contains urgency instruction",
      "Requested outside business hours",
    ],
    policyReasons: [
      "Separation of duties requires treasury approval",
      "Step-up authentication required before payment prep",
      "Agent cannot act on vendor bank changes alone",
    ],
    timeline: [
      "Agent requested prepare_payment on high-value invoice",
      "Attachment risk flag raised for abnormal instruction",
      "Policy decision hold and challenge",
      "Approval ticket opened for finance controller",
    ],
  },
  {
    id: "shadow-agent",
    vendor: "Cedarline Logistics",
    invoice: "INV-88012",
    amount: "$64,110",
    requestedAction: "Read AP mailbox and vendor file",
    risk: 93,
    decision: "revoke",
    owner: "Unassigned",
    delegatedUser: "Unknown OAuth grant",
    scope: "mail.read ap.vendor.write",
    tokenTtl: "Revoked",
    summary:
      "Unknown invoice bot has an unmanaged OAuth grant to finance resources. Firewall blocks access, revokes the token, and routes the agent into registration.",
    context: [
      "No registered agent identity",
      "Owner missing from directory",
      "Broad read/write scopes",
      "Connector never certified",
    ],
    policyReasons: [
      "Shadow agents cannot access ERP or AP mailbox",
      "Broad OAuth grant violates least privilege",
      "Kill switch triggered for unmanaged finance access",
    ],
    timeline: [
      "OAuth grant discovered from AP mailbox",
      "No Universal Directory match found",
      "Policy decision revoke",
      "Incident ticket and SIEM event generated",
    ],
  },
];

export const approvalRules = [
  {
    rule: "Known vendor, matched PO, amount under $25k",
    action: "Allow prepare_payment",
    approver: "None",
    outcome: "Autonomous hold-state prep",
  },
  {
    rule: "Amount over $100k or vendor bank hash changed",
    action: "Challenge",
    approver: "Controller + step-up auth",
    outcome: "Payment held",
  },
  {
    rule: "Unknown agent, stale certification, or broad OAuth grant",
    action: "Revoke",
    approver: "IAM review",
    outcome: "Token invalidated",
  },
];

export const shadowFindings = [
  {
    agent: "ap-mailbot-temp",
    owner: "No owner",
    access: "mail.read, vendor.write",
    risk: "Critical",
  },
  {
    agent: "invoice-copilot-lab",
    owner: "Finance ops",
    access: "erp.invoice.read",
    risk: "Review",
  },
  {
    agent: "expense-helper-qa",
    owner: "Dev sandbox",
    access: "sandbox.ap.read",
    risk: "Low",
  },
];

export const controlPath = [
  {
    title: "Identity binding",
    detail: "Agent, owner, delegated user, and purpose are resolved before tool access.",
    icon: Bot,
  },
  {
    title: "Scoped token",
    detail: "The firewall brokers a short-lived credential for one task and one connector.",
    icon: LockKeyhole,
  },
  {
    title: "Policy decision",
    detail: "Amount, vendor state, attachment risk, and OAuth posture decide the action.",
    icon: ShieldCheck,
  },
  {
    title: "Audit export",
    detail: "Every identity assertion, token, decision, and tool call is written to evidence.",
    icon: RadioTower,
  },
];

export const responseActions = [
  { label: "Allow", icon: CheckCircle2, tone: "allow" },
  { label: "Challenge", icon: AlertTriangle, tone: "challenge" },
  { label: "Hold", icon: FileWarning, tone: "hold" },
  { label: "Revoke", icon: Ban, tone: "revoke" },
] as const;

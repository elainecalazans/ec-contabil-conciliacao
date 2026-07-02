/* ============================================================
   cockpit-core.js — Shell compartilhado para todos os protótipos de fluxo DP
   Cada fluxo define window.FLOW_CONFIG antes de incluir este script.
   ============================================================ */

/* ---- CSS injection ---- */
(function () {
  const style = document.createElement('style');
  style.textContent = `
  :root {
    --brand-pink: #f25461;
    --brand-pink-hover: #e83d4d;
    --brand-pink-soft: #fde7ea;
    --brand-blue: #0171e4;
    --brand-blue-soft: rgba(1, 113, 228, 0.10);
    --sidebar-bg: #141414;
    --sidebar-item: #2a2a2a;
    --sidebar-item-hover: #3a3a3a;
    --surface: #ffffff;
    --surface-muted: #f7f7f8;
    --surface-subtle: #fafafa;
    --text-primary: #18181b;
    --text-secondary: #52525b;
    --text-tertiary: #a1a1aa;
    --border: #e4e4e7;
    --border-strong: #d4d4d8;
    --success: #16a34a;
    --success-soft: #dcfce7;
    --danger: #dc2626;
    --danger-soft: #fee2e2;
    --warning: #d97706;
    --warning-soft: #fef3c7;
    --info: #2563eb;
    --info-soft: #dbeafe;
  }
  html, body { font-family: 'Inter', system-ui, sans-serif; background: var(--surface-muted); color: var(--text-primary); font-size: 14px; }
  .font-mono { font-family: 'JetBrains Mono', monospace; }
  .sidebar { width: 98px; background: var(--sidebar-bg); color: #fff; display: flex; flex-direction: column; align-items: center; padding: 18px 0 20px; position: fixed; left: 0; top: 0; bottom: 0; z-index: 40; }
  .sidebar .brand { font-weight: 700; font-size: 15px; margin-bottom: 32px; position: relative; }
  .sidebar .brand::after { content: ''; position: absolute; right: -6px; bottom: 5px; width: 4px; height: 4px; background: var(--brand-pink); border-radius: 50%; }
  .sidebar-item { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 10px 6px; width: 76px; border-radius: 14px; cursor: pointer; margin-bottom: 6px; transition: background .15s; }
  .sidebar-item:hover { background: var(--sidebar-item-hover); }
  .sidebar-item.active { background: var(--brand-pink); }
  .sidebar-item .icon-wrap { width: 42px; height: 32px; background: var(--sidebar-item); border-radius: 999px; display: flex; align-items: center; justify-content: center; }
  .sidebar-item.active .icon-wrap { background: transparent; }
  .sidebar-item .label { font-size: 11px; text-align: center; line-height: 1.2; color: #fff; }
  .sidebar .avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #f25461, #f97316); margin-top: auto; border: 2px solid #2a2a2a; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 600; font-size: 13px; }
  .main { margin-left: 98px; min-height: 100vh; display: flex; flex-direction: column; }
  .topbar { background: transparent; display: flex; align-items: center; height: 44px; padding-right: 18px; position: sticky; top: 0; z-index: 30; }
  .topbar .topbar-right { margin-left: auto; display: flex; align-items: center; gap: 14px; }
  .notif-btn { position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; border-radius: 8px; }
  .notif-btn:hover { background: var(--surface-muted); }
  .notif-btn .dot { position: absolute; top: 6px; right: 6px; width: 8px; height: 8px; border-radius: 50%; background: var(--brand-pink); border: 2px solid #fff; }
  .section-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 24px 28px; margin-bottom: 16px; }
  .section-title { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--brand-pink); margin-bottom: 20px; display: flex; align-items: center; gap: 8px; }
  .section-title i[data-lucide] { width: 16px; height: 16px; }
  .field-label { font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-tertiary); margin-bottom: 4px; }
  .field-value { font-size: 14px; color: var(--text-primary); font-weight: 500; }
  .field-value.empty { color: var(--text-tertiary); font-weight: 400; }
  .field-group { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px 24px; }
  .field-group-2 { grid-template-columns: repeat(2, 1fr); }
  .field-group-3 { grid-template-columns: repeat(3, 1fr); }
  .badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 500; }
  .badge-success { background: var(--success-soft); color: var(--success); }
  .badge-danger { background: var(--danger-soft); color: var(--danger); }
  .badge-warning { background: var(--warning-soft); color: var(--warning); }
  .badge-info { background: var(--info-soft); color: var(--info); }
  .badge-pink { background: var(--brand-pink-soft); color: var(--brand-pink); }
  .badge-neutral { background: var(--surface-muted); color: var(--text-secondary); border: 1px solid var(--border); }
  .btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 999px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all .15s; border: 1px solid transparent; }
  .btn-primary { background: var(--brand-pink); color: #fff; }
  .btn-primary:hover { background: var(--brand-pink-hover); }
  .btn-secondary { background: #fff; color: var(--text-primary); border-color: var(--border-strong); }
  .btn-secondary:hover { background: var(--surface-muted); }
  .btn-ghost { background: transparent; color: var(--text-secondary); }
  .btn-ghost:hover { background: var(--surface-muted); color: var(--text-primary); }
  .btn-danger { background: #fff; color: var(--danger); border-color: #fecaca; }
  .btn-danger:hover { background: var(--danger-soft); }
  .btn-lg { padding: 14px 28px; font-size: 14px; }
  .form-tabs { display: inline-flex; gap: 2px; padding: 4px; background: var(--surface-muted); border-radius: 10px; flex-wrap: wrap; }
  .form-tab { padding: 7px 16px; font-size: 13px; font-weight: 500; color: var(--text-secondary); cursor: pointer; border-radius: 7px; display: inline-flex; align-items: center; gap: 6px; background: transparent; border: none; transition: all .15s; }
  .form-tab:hover:not(.disabled):not(.active) { color: var(--text-primary); }
  .form-tab.active { background: var(--surface); color: var(--text-primary); box-shadow: 0 1px 2px rgba(0,0,0,0.06); }
  .form-tab.disabled { color: var(--text-tertiary); cursor: not-allowed; opacity: 0.5; }
  .file-item { display: inline-flex; align-items: center; gap: 10px; padding: 10px 14px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; transition: border-color .15s; max-width: 100%; }
  .file-item:hover { border-color: var(--border-strong); }
  .file-item.highlighted { border-color: var(--brand-pink); background: var(--brand-pink-soft); }
  .file-item-icon { flex-shrink: 0; width: 22px; height: 26px; position: relative; }
  .file-icon-pdf { background: #ef4444; color: #fff; border-radius: 3px; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 3px; font-size: 8px; font-weight: 800; letter-spacing: 0.3px; width: 100%; height: 100%; position: relative; }
  .file-icon-pdf::before { content: ''; position: absolute; top: 0; right: 0; border-left: 6px solid #fca5a5; border-bottom: 6px solid transparent; }
  .file-icon-img { background: #3b82f6; color: #fff; border-radius: 3px; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 3px; font-size: 8px; font-weight: 800; width: 100%; height: 100%; position: relative; }
  .file-icon-img::before { content: ''; position: absolute; top: 0; right: 0; border-left: 6px solid #93c5fd; border-bottom: 6px solid transparent; }
  .file-icon-doc { background: #8b5cf6; color: #fff; border-radius: 3px; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 3px; font-size: 8px; font-weight: 800; width: 100%; height: 100%; position: relative; }
  .file-icon-doc::before { content: ''; position: absolute; top: 0; right: 0; border-left: 6px solid #c4b5fd; border-bottom: 6px solid transparent; }
  .file-icon-xls { background: #16a34a; color: #fff; border-radius: 3px; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 3px; font-size: 8px; font-weight: 800; width: 100%; height: 100%; position: relative; }
  .file-icon-xls::before { content: ''; position: absolute; top: 0; right: 0; border-left: 6px solid #86efac; border-bottom: 6px solid transparent; }
  .file-item-name { font-size: 13px; color: var(--text-primary); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 360px; }
  .file-item-meta { font-size: 11px; color: var(--text-tertiary); margin-left: 4px; white-space: nowrap; }
  .file-item-response-tag { font-size: 10px; color: var(--brand-pink); font-weight: 600; margin-left: 4px; white-space: nowrap; }
  .file-item-actions { display: flex; align-items: center; gap: 2px; margin-left: 6px; padding-left: 8px; border-left: 1px solid var(--border); }
  .file-action-btn { width: 28px; height: 28px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; background: transparent; border: none; color: var(--text-secondary); cursor: pointer; transition: all .12s; }
  .file-action-btn:hover { background: var(--surface-muted); color: var(--brand-pink); }
  .file-action-btn.danger:hover { background: var(--danger-soft); color: var(--danger); }
  .subsection-title { font-size: 12px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 24px; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid var(--border); }
  .subsection-title:first-child { margin-top: 0; }
  .task-item { background: #fff; border: 1px solid var(--border); border-radius: 10px; padding: 14px 16px; display: flex; align-items: center; gap: 14px; cursor: pointer; transition: border-color .15s, box-shadow .15s; }
  .task-item:hover:not(.task-item-static) { border-color: var(--brand-pink); box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
  .task-item.highlight { border-color: var(--brand-pink); background: linear-gradient(to right, #fff5f6, #fff); box-shadow: 0 0 0 3px rgba(242,84,97,0.08); }
  .modal-backdrop { position: fixed; inset: 0; background: rgba(15,15,15,0.55); backdrop-filter: blur(2px); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 24px; }
  .modal-backdrop.hidden { display: none; }
  .modal-panel { background: #fff; border-radius: 16px; width: 100%; max-width: 720px; max-height: 88vh; display: flex; flex-direction: column; box-shadow: 0 20px 50px rgba(0,0,0,0.25); overflow: hidden; }
  .modal-header { padding: 20px 24px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .modal-body { padding: 20px 24px; overflow-y: auto; flex: 1; }
  .modal-footer { padding: 16px 24px; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; gap: 10px; background: var(--surface-subtle); }
  .message { padding: 12px 14px; border-radius: 12px; font-size: 13px; line-height: 1.55; margin-bottom: 10px; max-width: 92%; }
  .message-client { background: var(--surface-muted); border: 1px solid var(--border); }
  .message-operator { background: var(--brand-pink-soft); border: 1px solid #f9c5cb; margin-left: auto; }
  .notif-panel { position: absolute; top: 44px; right: 14px; width: 360px; background: #fff; border: 1px solid var(--border); border-radius: 12px; box-shadow: 0 14px 30px rgba(0,0,0,0.12); overflow: hidden; z-index: 50; }
  .notif-panel.hidden { display: none; }
  .notif-item { padding: 12px 16px; border-bottom: 1px solid var(--border); display: flex; gap: 10px; cursor: pointer; }
  .notif-item:hover { background: var(--surface-muted); }
  .notif-item:last-child { border-bottom: none; }
  .notif-item .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--brand-pink); flex-shrink: 0; margin-top: 6px; }
  .exec-step { display: flex; align-items: flex-start; gap: 14px; padding: 18px; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 10px; background: #fff; transition: all .2s; }
  .exec-step.done { border-color: var(--success); background: linear-gradient(to right, #f0fdf4, #fff); }
  .exec-step.active { border-color: var(--brand-pink); box-shadow: 0 0 0 3px rgba(242,84,97,0.1); }
  .exec-step-header { display: flex; align-items: flex-start; gap: 14px; width: 100%; }
  .exec-step-header.collapsible { cursor: pointer; }
  .exec-step-chevron { width: 18px; height: 18px; color: var(--text-secondary); flex-shrink: 0; align-self: center; transition: transform 0.2s; }
  .exec-step-chevron.open { transform: rotate(180deg); }
  .exec-step .step-num { width: 28px; height: 28px; border-radius: 50%; background: var(--surface-muted); color: var(--text-secondary); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 13px; flex-shrink: 0; }
  .exec-step.done .step-num { background: var(--success); color: #fff; }
  .exec-step.active .step-num { background: var(--brand-pink); color: #fff; }
  .exec-ref-card { background: #fff; border: 1px solid var(--border); border-radius: 12px; margin-bottom: 0; overflow: hidden; }
  .exec-ref-card-header { padding: 16px 20px 14px; font-size: 14px; font-weight: 600; border-bottom: 1px solid var(--border); color: var(--text-primary); }
  .exec-ref-item { border-bottom: 1px solid var(--border); }
  .exec-ref-item:last-child { border-bottom: none; }
  .exec-ref-trigger { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; font-size: 13.5px; font-weight: 600; background: none; border: none; cursor: pointer; text-align: left; color: var(--text-primary); gap: 8px; }
  .exec-ref-trigger:hover { background: var(--surface-subtle); }
  .exec-ref-chevron { flex-shrink: 0; transition: transform 0.2s; }
  .exec-ref-trigger.open .exec-ref-chevron { transform: rotate(180deg); }
  .exec-ref-content { padding: 4px 20px 24px; }
  .exec-ref-badge { font-size: 12px; font-weight: 400; color: var(--text-secondary); margin-left: 6px; }
  .exec-ref-copy-btn { padding: 2px 4px; border: none; background: none; cursor: pointer; color: var(--text-tertiary); border-radius: 4px; display: inline-flex; align-items: center; flex-shrink: 0; }
  .exec-ref-copy-btn:hover { background: var(--surface-muted); color: var(--text-secondary); }
  .empty-state { text-align: center; padding: 48px 24px; }
  .empty-state .icon-wrap { width: 64px; height: 64px; background: var(--brand-pink-soft); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: var(--brand-pink); margin-bottom: 20px; }
  .attachment { display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; background: var(--surface-subtle); border: 1px solid var(--border); border-radius: 8px; font-size: 13px; cursor: pointer; transition: border-color .15s; }
  .attachment:hover { border-color: var(--brand-pink); }
  .home-top-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; margin-bottom: 16px; align-items: stretch; }
  .stats-row { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid var(--border); }
  .stats-row:last-child { border-bottom: none; }
  .stats-row.clickable { cursor: pointer; transition: background .12s; }
  .stats-row.clickable:hover { background: var(--surface-subtle); }
  .stats-row-label { font-size: 12px; color: var(--text-secondary); font-weight: 500; }
  .stats-row-sublabel { font-size: 11px; color: var(--text-tertiary); margin-top: 2px; }
  .stats-row-value { font-size: 24px; font-weight: 700; color: var(--text-primary); line-height: 1; }
  .stats-row-value.warning { color: var(--warning); }
  .contact-tag { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 600; text-transform: lowercase; letter-spacing: 0.02em; background: var(--surface-muted); color: var(--text-secondary); border: 1px solid var(--border); white-space: nowrap; line-height: 1.6; }
  .contact-tag-client { background: #fde7ea; color: var(--brand-pink); border-color: #f9c5cb; }
  .hidden { display: none !important; }
  .container-wide { max-width: 1500px; margin: 0 auto; }
  .task-detail-grid { display: grid; grid-template-columns: 1fr 340px; gap: 16px; align-items: start; }
  .timeline-horizontal { display: flex; align-items: flex-start; gap: 0; padding: 4px 0 2px; }
  .tl-item-h { flex: 1; display: flex; flex-direction: column; align-items: center; position: relative; text-align: center; padding: 0 6px; min-width: 0; }
  .tl-item-h:not(:last-child)::after { content: ''; position: absolute; top: 13px; left: calc(50% + 18px); right: calc(-50% + 18px); height: 2px; background: var(--border); z-index: 0; }
  .tl-item-h.done:not(:last-child)::after { background: var(--success); }
  .tl-item-h.active:not(:last-child)::after { background: linear-gradient(to right, var(--success) 0%, var(--success) 40%, var(--border) 60%); }
  .tl-item-h .tl-dot { position: relative; z-index: 1; margin-bottom: 8px; }
  .tl-item-h .tl-step { font-size: 12px; font-weight: 600; color: var(--text-primary); line-height: 1.3; }
  .tl-item-h.pending .tl-step { color: var(--text-tertiary); font-weight: 500; }
  .tl-item-h .tl-meta { font-size: 10.5px; color: var(--text-tertiary); margin-top: 2px; line-height: 1.2; }
  .history-list { display: flex; flex-direction: column; }
  .history-msg { padding: 14px 14px; border-bottom: 1px solid var(--border); border-radius: 6px; }
  .history-msg:last-child { border-bottom: none; }
  .history-msg.operator { background: #fff5f6; border-bottom: 1px solid var(--border); }
  .history-msg-header { display: flex; align-items: baseline; gap: 8px; margin-bottom: 8px; flex-wrap: wrap; }
  .history-msg-avatar { width: 24px; height: 24px; border-radius: 50%; background: linear-gradient(135deg, #64748b, #94a3b8); color: #fff; display: inline-flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; flex-shrink: 0; align-self: center; }
  .history-msg.operator .history-msg-avatar { background: linear-gradient(135deg, var(--brand-pink), #f97316); }
  .history-msg-author { font-size: 13px; font-weight: 600; color: var(--text-primary); }
  .history-msg.operator .history-msg-author { color: var(--brand-pink); }
  .history-msg-timestamp { font-size: 12px; color: var(--text-tertiary); margin-left: auto; }
  .history-msg-text { font-size: 13px; color: var(--text-primary); line-height: 1.6; padding-left: 32px; }
  .history-msg-attachments { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; padding-left: 32px; }
  .tl-dot { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; flex-shrink: 0; position: relative; z-index: 1; }
  .tl-dot-done { background: var(--success-soft); color: var(--success); }
  .tl-dot-active { background: var(--brand-pink); color: #fff; box-shadow: 0 0 0 4px rgba(242,84,97,0.12); }
  .tl-dot-pending { background: var(--surface-muted); color: var(--text-tertiary); border: 2px solid var(--border); }
  .decision-card { background: linear-gradient(to bottom, var(--surface-subtle), #fff); border: 2px solid var(--border); border-radius: 14px; padding: 24px 28px; margin-top: 16px; }
  .decision-card .decision-title { font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px; }
  .decision-card .decision-desc { font-size: 13px; color: var(--text-secondary); margin-bottom: 20px; line-height: 1.55; }
  .decision-card .decision-btns { display: flex; gap: 12px; flex-wrap: wrap; }
  .btn-decision-yes { background: var(--success); color: #fff; padding: 12px 24px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 8px; transition: background .15s; }
  .btn-decision-yes:hover { background: #15803d; }
  .btn-decision-no { background: #fff; color: var(--text-primary); padding: 12px 24px; border-radius: 10px; font-size: 14px; font-weight: 500; cursor: pointer; border: 1.5px solid var(--border-strong); display: inline-flex; align-items: center; gap: 8px; transition: all .15s; }
  .btn-decision-no:hover { border-color: var(--brand-pink); color: var(--brand-pink); }
  .exec-step .step-action { display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; background: #fff; border: 1px solid var(--border-strong); border-radius: 8px; font-size: 12.5px; font-weight: 500; color: var(--text-primary); cursor: pointer; transition: all .15s; white-space: nowrap; }
  .exec-step .step-action:hover { border-color: var(--brand-pink); color: var(--brand-pink); }
  .exec-step .step-action.done { background: var(--success-soft); border-color: transparent; color: var(--success); }
  .exec-step .step-mark-done { padding: 8px 14px; background: var(--brand-pink); color: #fff; border: none; border-radius: 8px; font-size: 12.5px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; transition: background .15s; }
  .exec-step .step-mark-done:hover { background: var(--brand-pink-hover); }
  .exec-step .step-buttons { display: flex; gap: 8px; flex-shrink: 0; flex-wrap: wrap; justify-content: flex-end; }
  .success-hero { background: linear-gradient(135deg, #dcfce7, #f0fdf4); border: 2px solid #86efac; border-radius: 18px; padding: 48px 32px; text-align: center; margin-bottom: 20px; }
  .success-hero .icon-circle { width: 72px; height: 72px; border-radius: 50%; background: var(--success); color: #fff; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px; }
  .success-hero h1 { font-size: 24px; font-weight: 700; color: var(--success); margin-bottom: 8px; }
  .success-hero p { font-size: 14px; color: #15803d; line-height: 1.55; max-width: 480px; margin: 0 auto; }
  .summary-list { background: #fff; border: 1px solid var(--border); border-radius: 12px; overflow: hidden; margin-bottom: 20px; }
  .summary-row { display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; border-bottom: 1px solid var(--border); }
  .summary-row:last-child { border-bottom: none; }
  .summary-label { font-size: 13px; color: var(--text-secondary); }
  .summary-value { font-size: 13px; font-weight: 600; color: var(--text-primary); }
  .upload-area { border: 2px dashed var(--border-strong); border-radius: 10px; padding: 22px 18px; text-align: center; background: var(--surface-subtle); cursor: pointer; transition: all .15s; margin-top: 12px; }
  .upload-area:hover, .upload-area.dragover { border-color: var(--brand-pink); background: var(--brand-pink-soft); }
  .upload-area-icon { width: 40px; height: 40px; border-radius: 50%; background: #fff; color: var(--brand-pink); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px; }
  .upload-area-title { font-size: 13px; font-weight: 600; color: var(--text-primary); margin-bottom: 2px; }
  .upload-area-hint { font-size: 12px; color: var(--text-secondary); }
  .upload-area-hint strong { color: var(--brand-pink); text-decoration: underline; }
  .uploaded-files-list { margin-top: 12px; display: flex; flex-wrap: wrap; gap: 8px; }
  .step-edit-btn { padding: 6px 12px; background: #fff; color: var(--text-secondary); border: 1px solid var(--border-strong); border-radius: 7px; font-size: 12px; font-weight: 500; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; transition: all .15s; }
  .step-edit-btn:hover { border-color: var(--brand-pink); color: var(--brand-pink); }
  .alert-banner { background: linear-gradient(to right, #fff5f6, #fff); border: 1px solid #f9c5cb; border-left: 4px solid var(--brand-pink); border-radius: 10px; padding: 14px 18px; display: flex; gap: 12px; align-items: center; margin-bottom: 16px; }
  .divider { height: 1px; background: var(--border); margin: 16px 0; }
  details > summary { list-style: none; cursor: pointer; }
  details > summary::-webkit-details-marker { display: none; }
  .editable-badge { font-size: 9px; text-transform: uppercase; letter-spacing: 0.05em; padding: 2px 6px; background: #fef3c7; color: #92400e; border: 1px solid #fcd34d; border-radius: 4px; font-weight: 600; vertical-align: middle; }
  .editable-edit-btn { background: none; border: 1px solid var(--border); border-radius: 5px; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text-tertiary); transition: all .15s; padding: 0; flex-shrink: 0; }
  .editable-edit-btn:hover { border-color: var(--brand-pink); color: var(--brand-pink); background: var(--brand-pink-soft); }
  .ef-field { display: flex; flex-direction: column; gap: 4px; }
  .ef-label { font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-tertiary); margin-bottom: 0; }
  .ef-input, .ef-select, .ef-textarea { font-size: 13.5px; font-weight: 400; color: var(--text-primary); border: 1px solid var(--border-strong); border-radius: 7px; padding: 7px 10px; background: #fff; outline: none; width: 100%; font-family: inherit; transition: border-color .15s, box-shadow .15s; }
  .ef-input:focus, .ef-select:focus, .ef-textarea:focus { border-color: var(--brand-pink); box-shadow: 0 0 0 3px var(--brand-pink-soft); }
  .ef-select { cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; padding-right: 28px; }
  .ef-textarea { resize: vertical; min-height: 80px; }
  .ef-toggle-group { display: inline-flex; border: 1px solid var(--border-strong); border-radius: 7px; padding: 3px; background: var(--surface-muted); width: fit-content; }
  .ef-field:has(> .ef-toggle-group) { width: max-content; justify-self: start; align-self: end; }
  .ef-toggle-btn { padding: 5px 12px; font-size: 12.5px; font-weight: 500; border-radius: 5px; border: none; cursor: pointer; background: transparent; color: var(--text-secondary); transition: all .12s; white-space: nowrap; }
  .ef-toggle-btn.active { background: #fff; color: var(--text-primary); box-shadow: 0 1px 2px rgba(0,0,0,0.08); }
  .edit-mode-bar { display: flex; align-items: center; gap: 10px; padding: 10px 16px; background: #fffbf0; border: 1px solid #fcd34d; border-radius: 10px; margin-bottom: 20px; flex-wrap: wrap; }
  .edit-mode-badge { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; padding: 4px 10px; background: #fef3c7; color: #92400e; border: 1px solid #fcd34d; border-radius: 5px; }
  .ef-datepicker { position: relative; display: flex; }
  .ef-datepicker-input { flex: 1; cursor: pointer; padding-left: 34px !important; }
  .ef-datepicker-btn { position: absolute; left: 8px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--text-tertiary); display: flex; align-items: center; padding: 0; transition: color .12s; }
  .ef-datepicker-btn:hover { color: var(--brand-pink); }
  .ef-cal-popup { display: none; position: absolute; top: calc(100% + 6px); left: 0; z-index: 200; background: #fff; border: 1px solid var(--border); border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.12); padding: 14px 16px 16px; min-width: 252px; }
  .ef-cal-popup.open { display: block; }
  .ef-cal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  .ef-cal-nav { background: none; border: 1px solid var(--border); border-radius: 6px; width: 26px; height: 26px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); font-size: 15px; line-height: 1; transition: background .1s; }
  .ef-cal-nav:hover { background: var(--surface-muted); color: var(--text-primary); }
  .ef-cal-month-label { font-size: 13px; font-weight: 600; color: var(--text-primary); }
  .ef-cal-weekdays { display: grid; grid-template-columns: repeat(7, 1fr); margin-bottom: 4px; }
  .ef-cal-weekdays span { text-align: center; font-size: 10.5px; font-weight: 500; color: var(--text-tertiary); padding: 3px 0; }
  .ef-cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 1px; }
  .ef-cal-day { text-align: center; padding: 6px 0; font-size: 12.5px; border-radius: 6px; cursor: pointer; color: var(--text-primary); transition: background .1s; }
  .ef-cal-day:hover:not(.empty) { background: var(--surface-muted); }
  .ef-cal-day.selected { background: var(--brand-pink); color: #fff; font-weight: 600; }
  .ef-cal-day.today:not(.selected) { font-weight: 700; color: var(--brand-pink); }
  .ef-cal-day.other-month { color: var(--text-tertiary); }
  .ef-cal-day.empty { cursor: default; }

  /* Tabela densa de tarefas (padrão V1 — admin do gerente + lista do operador + fila invisível dos fluxos) */
  .lo-table-wrap { background: #fff; border: 1px solid var(--border); border-radius: 14px; overflow: hidden; margin-bottom: 16px; }
  .lo-table-head, .lo-row { display: grid; grid-template-columns: 32px minmax(220px, 1.8fr) minmax(150px, 1.2fr) minmax(150px, 1fr) minmax(170px, 1.1fr) 50px; align-items: center; gap: 14px; padding: 10px 16px; }
  .lo-table-head { background: var(--surface-muted); border-bottom: 1px solid var(--border); }
  .lo-table-head .h-cell { font-size: 11.5px; font-weight: 600; color: var(--text-secondary); }
  .lo-row { position: relative; background: #fff; transition: background .12s; }
  .lo-row + .lo-row { border-top: 1px solid var(--border); }
  .lo-row.clickable { cursor: pointer; }
  .lo-row.clickable:hover { background: var(--surface-subtle); }
  .lo-row.execucao      { box-shadow: inset 3px 0 0 var(--brand-pink); }
  .lo-row.responded     { box-shadow: inset 3px 0 0 var(--brand-pink); }
  .lo-row.stationed-row { box-shadow: inset 3px 0 0 var(--warning); }
  .lo-row.next-up       { box-shadow: inset 3px 0 0 var(--brand-pink); }
  .lo-row .type-icon { width: 32px; height: 32px; border-radius: 8px; background: var(--brand-blue-soft); color: var(--brand-blue); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .lo-row .lo-solic { min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  .lo-row .lo-solic .client-name { font-size: 13.5px; font-weight: 600; color: var(--text-primary); line-height: 1.3; word-break: break-word; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .lo-row .lo-solic .client-cnpj { font-size: 11px; color: var(--text-tertiary); font-family: 'JetBrains Mono', monospace; }
  .lo-row .lo-solic .ctx-line { font-size: 11px; color: var(--text-tertiary); }
  .lo-row .lo-tipo { font-size: 12.5px; color: var(--text-primary); font-weight: 500; line-height: 1.3; word-break: break-word; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .lo-row .icon-btn { width: 28px; height: 28px; border: 1px solid var(--border); border-radius: 6px; background: transparent; color: var(--text-secondary); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: all .12s; }
  .lo-row .icon-btn:hover { border-color: var(--brand-blue); color: var(--brand-blue); background: #fff; }

  /* State pill outlined (compartilhado em todos os contextos) */
  .state-pill { display: inline-flex; align-items: center; gap: 5px; padding: 3px 9px; border-radius: 6px; font-size: 11.5px; font-weight: 500; background: #fff; border: 1px solid; white-space: nowrap; }
  .state-pill.em-execucao       { color: var(--brand-pink); border-color: var(--brand-pink); }
  .state-pill.na-fila           { color: var(--text-secondary); border-color: #c8ccd1; }
  .state-pill.proxima           { color: var(--brand-pink); border-color: var(--brand-pink); background: var(--brand-pink-soft); }
  .state-pill.em-espera         { color: #b45309; border-color: #f59e0b; }
  .state-pill.cliente-respondeu { color: var(--brand-pink); border-color: var(--brand-pink); background: var(--brand-pink-soft); }

  /* Prazo cell */
  .prazo-cell { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
  .prazo-when { font-size: 13px; color: var(--text-primary); font-weight: 500; white-space: nowrap; }
  .prazo-when.overdue { color: #b91c1c; font-weight: 600; }
  .prazo-when .sep { display: inline-block; margin: 0 4px; color: var(--text-tertiary); font-weight: 400; }
  .prazo-when.overdue .sep { color: rgba(185, 28, 28, 0.55); }
  .prazo-tag { font-size: 11px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; padding: 2px 7px; border-radius: 5px; width: fit-content; }
  .prazo-tag.risk    { background: rgba(245, 158, 11, 0.15); color: #b45309; border: 1px solid #f59e0b; }
  .prazo-tag.overdue { background: rgba(220, 38, 38, 0.10); color: #b91c1c; border: 1px solid #ef4444; }

  /* Cabeçalho da seção (h2 fora do box + subtítulo) */
  .section-head { display: flex; align-items: center; gap: 16px; margin-bottom: 12px; margin-top: 28px; }
  .section-head .sh-text { display: flex; flex-direction: column; min-width: 0; }
  .section-head .sh-title { font-size: 19px; font-weight: 700; color: var(--text-primary); line-height: 1.2; }
  .section-head .sh-sub { font-size: 12px; color: var(--text-tertiary); margin-top: 2px; }
  `;
  document.head.appendChild(style);
})();

/* ---- HTML Shell injection ---- */
function _buildShell() {
  const cfg = window.FLOW_CONFIG;
  document.body.innerHTML = `
<aside class="sidebar">
  <div class="brand">Cockpit</div>
  <div class="sidebar-item" data-nav="clientes">
    <div class="icon-wrap"><i data-lucide="users" class="w-5 h-5"></i></div>
    <div class="label">Clientes</div>
  </div>
  <div class="sidebar-item active" data-nav="tarefas">
    <div class="icon-wrap"><i data-lucide="list-todo" class="w-5 h-5"></i></div>
    <div class="label">Tarefas</div>
  </div>
  <div class="sidebar-item" data-nav="solicitacoes">
    <div class="icon-wrap"><i data-lucide="megaphone" class="w-5 h-5"></i></div>
    <div class="label">Solicitações</div>
  </div>
  <div class="sidebar-item" data-nav="pagamentos">
    <div class="icon-wrap"><i data-lucide="clock" class="w-5 h-5"></i></div>
    <div class="label">Agendar pagamentos</div>
  </div>
  <div class="sidebar-item" data-nav="docs">
    <div class="icon-wrap"><i data-lucide="folder" class="w-5 h-5"></i></div>
    <div class="label">Gerenciador de docs</div>
  </div>
  <div class="avatar" title="Daniele Ribeiro">DR</div>
</aside>

<div class="main">
  <div class="topbar">
    <div class="topbar-right">
      <div class="notif-btn" id="notif-toggle">
        <i data-lucide="bell" class="w-5 h-5" style="color: var(--text-secondary)"></i>
        <span class="dot" id="notif-dot"></span>
      </div>
      <div class="notif-panel hidden" id="notif-panel">
        <div style="padding: 14px 16px; border-bottom: 1px solid var(--border); font-weight: 600;">Notificações</div>
        <div id="notif-list"></div>
        <div style="border-top: 1px solid var(--border); background: var(--surface-subtle); padding: 10px 16px;">
          <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-tertiary); font-weight: 600; margin-bottom: 8px;">🛠 Controles do protótipo</div>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <button onclick="simularRespostaCliente()" style="text-align: left; font-size: 12px; color: var(--text-primary); background: #fff; border: 1px solid var(--border); padding: 7px 10px; border-radius: 6px; cursor: pointer;">↩︎ Simular resposta do cliente</button>
            <button onclick="resetDemo()" style="text-align: left; font-size: 12px; color: var(--text-primary); background: #fff; border: 1px solid var(--border); padding: 7px 10px; border-radius: 6px; cursor: pointer;">⟲ Resetar demo</button>
            <a href="index.html" style="text-align: left; font-size: 12px; color: var(--text-primary); background: #fff; border: 1px solid var(--border); padding: 7px 10px; border-radius: 6px; cursor: pointer; text-decoration: none; display: block;">← Voltar ao menu de protótipos</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex-1 p-8" id="screens-container">

    <section class="screen" id="screen-home">
      <div class="container-wide">
        <div id="return-banner" class="alert-banner hidden">
          <div style="width:32px;height:32px;background:var(--brand-pink-soft);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--brand-pink);flex-shrink:0;">
            <i data-lucide="message-circle-reply" class="w-4 h-4"></i>
          </div>
          <div class="flex-1">
            <div style="font-weight: 600; margin-bottom: 2px;">Cliente respondeu uma tarefa em espera</div>
            <div style="font-size: 12px; color: var(--text-secondary);" id="return-banner-detail">—</div>
          </div>
          <button class="btn btn-primary" onclick="pegarProximaTarefa()">Pegar tarefa respondida <i data-lucide="arrow-right" class="w-4 h-4"></i></button>
        </div>
        <div class="home-top-grid">
          <div class="section-card" id="home-header" style="margin-bottom: 0;"></div>
          <div class="section-card" id="home-stats" style="margin-bottom: 0; padding: 0;"></div>
        </div>
        <div class="section-head" id="stationed-head"></div>
        <div id="stationed-list"></div>

        <div class="section-head" id="queue-head"></div>
        <div id="queue-preview"></div>
        <span id="queue-count-badge" class="hidden">0</span>
      </div>
    </section>

    <section class="screen hidden" id="screen-task">
      <div class="container-wide">
        <div class="section-card" style="padding: 20px 28px;">
          <div class="flex items-center gap-3" style="font-size: 12px; color: var(--text-secondary); margin-bottom: 20px;">
            <span class="cursor-pointer hover:text-rose-500" onclick="goHome()">← Voltar ao cockpit</span>
            <span>/</span>
            <span>Tarefa #<span id="task-id-label">—</span></span>
          </div>
          <div class="flex items-start justify-between gap-4" style="flex-wrap: wrap;">
            <div class="flex items-start gap-4" style="flex: 1; min-width: 280px;">
              <div id="task-client-logo" style="display:none;">—</div>
              <div style="min-width: 0;">
                <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 4px;" id="task-type-label">—</h1>
                <div style="font-size: 13px; margin-bottom: 12px;"><strong id="task-client-name" style="font-weight: 600; color: var(--text);">—</strong><span style="color: var(--text-tertiary);"> · </span><span style="color: var(--text-secondary); font-family: 'JetBrains Mono', monospace;" id="task-client-cnpj">—</span></div>
                <div style="border-top: 1px solid var(--border); margin-bottom: 12px;"></div>
                <div style="font-size: 13px; color: var(--text-secondary); display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                  <span>Iniciado automaticamente · <strong style="color: var(--text-primary); font-weight: 600;" id="task-solicitante">—</strong></span>
                  <span id="task-solicitante-tags" style="display: inline-flex; gap: 4px;"></span>
                  <span style="color: var(--text-tertiary);">·</span>
                  <span id="task-timestamp" style="color: var(--text-tertiary);">—</span>
                  <span id="task-sla-inline"></span>
                  <span id="task-deadline"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="section-card" style="padding: 20px 28px;">
          <div class="timeline-horizontal" id="task-timeline"></div>
        </div>
        <div class="section-card hidden" id="activity-block">
          <div class="section-title"><i data-lucide="message-square"></i>Conversa com o cliente</div>
          <div class="activity-messages" id="activity-messages"></div>
          <div style="margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--border); display: flex; justify-content: flex-end;">
            <button onclick="openAskClientModal()" style="font-size: 12.5px; color: var(--brand-pink); background: none; border: 1px solid var(--brand-pink); padding: 6px 14px; border-radius: 8px; cursor: pointer; font-weight: 500; display: inline-flex; align-items: center; gap: 6px;">
              <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>Responder ao cliente
            </button>
          </div>
        </div>
        <div class="section-card">
          <div class="section-title"><i data-lucide="file-text"></i>Dados da solicitação</div>
          <div id="form-collab-strip"></div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
            <div class="form-tabs" id="form-tabs"></div>
            <div id="form-edit-btn"></div>
          </div>
          <div id="form-content"></div>
        </div>
        <div class="section-card hidden" id="attachments-block">
          <div class="section-title"><i data-lucide="paperclip"></i>Materiais · no GDocs<span id="attachments-count-badge" class="badge badge-neutral" style="margin-left: 8px; font-size: 10px;">0</span></div>
          <div class="flex flex-wrap gap-2" id="attachments-list"></div>
        </div>
        <div class="decision-card">
          <div class="decision-title">Validação — tem tudo que é necessário para processar?</div>
          <div class="decision-desc">Confira se os dados do formulário e os anexos do cliente estão completos e corretos para prosseguir com o processamento.</div>
          <div class="decision-btns">
            <button class="btn-decision-yes" onclick="aceitarTarefa()"><i data-lucide="check" class="w-4 h-4"></i>Sim, processar</button>
            <button class="btn-decision-no" onclick="openAskClientModal()"><i data-lucide="message-circle" class="w-4 h-4"></i>Não, pedir algo ao cliente</button>
          </div>
        </div>
      </div>
    </section>

    <section class="screen hidden" id="screen-execution">
      <div class="container-wide">
        <div class="section-card" style="padding: 20px 28px;">
          <div class="flex items-center gap-3" style="font-size: 12px; color: var(--text-secondary); margin-bottom: 20px;">
            <span class="cursor-pointer hover:text-rose-500" onclick="voltarParaAnalise()">← Voltar</span>
            <span>/</span>
            <span class="cursor-pointer hover:text-rose-500" onclick="voltarParaAnalise()">Tarefa #<span id="exec-id-label">—</span></span>
            <span>/</span>
            <span>Execução</span>
          </div>
          <div class="flex items-start justify-between gap-4" style="flex-wrap: wrap;">
            <div style="min-width: 0;">
              <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 4px;" id="exec-type-label">—</h1>
              <div style="font-size: 13px; margin-bottom: 12px;"><strong id="exec-client-label" style="font-weight: 600; color: var(--text);">—</strong><span style="color: var(--text-tertiary);"> · </span><span style="color: var(--text-secondary); font-family: 'JetBrains Mono', monospace;" id="exec-client-cnpj">—</span></div>
              <div style="border-top: 1px solid var(--border); margin-bottom: 12px;"></div>
              <div style="font-size: 13px; color: var(--text-secondary); display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                <span>Iniciado automaticamente · <strong style="color: var(--text-primary); font-weight: 600;" id="exec-solicitante">—</strong></span>
                <span id="exec-solicitante-tags" style="display: inline-flex; gap: 4px;"></span>
                <span style="color: var(--text-tertiary);">·</span>
                <span id="exec-timestamp" style="color: var(--text-tertiary);">—</span>
                <span id="exec-sla-inline"></span>
                <span id="exec-deadline"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="section-card" style="padding: 20px 28px;">
          <div class="timeline-horizontal" id="exec-timeline"></div>
        </div>
        <div class="section-card">
          <div class="section-title"><i data-lucide="bot"></i>Processamento automático</div>
          <p style="color: var(--text-secondary); font-size: 13px; margin-bottom: 20px;">Com a pendência resolvida, o Autopilot retomou e seguiu sozinho com o resto do fechamento — você só acompanha.</p>
          <div id="exec-steps"></div>
        </div>
        <div class="section-card" style="background: var(--surface-subtle);">
          <div class="flex items-start gap-3">
            <i data-lucide="info" class="w-5 h-5" style="color: var(--info); flex-shrink: 0; margin-top: 2px;"></i>
            <div style="font-size: 13px; color: var(--text-secondary);"><strong style="color: var(--text-primary);">Sistema invisível:</strong> esses passos rodam por trás. Mostramos aqui só para ilustrar o que o Autopilot faz com a sua resolução — na versão final, o operador veria apenas a confirmação.</div>
          </div>
        </div>
      </div>
    </section>

    <section class="screen hidden" id="screen-success">
      <div class="container-wide" style="max-width: 720px;">
        <div class="success-hero">
          <div class="icon-circle"><i data-lucide="check" style="width: 36px; height: 36px;"></i></div>
          <h1>Solicitação concluída</h1>
          <p id="success-message">A solicitação foi processada e o cliente já foi notificado.</p>
        </div>
        <div class="summary-list" id="success-summary"></div>
        <div class="flex justify-center gap-3">
          <button class="btn btn-primary btn-lg" onclick="goHome()"><i data-lucide="arrow-left" class="w-4 h-4"></i>Voltar às minhas tarefas</button>
        </div>
      </div>
    </section>

  </div>
</div>

<!-- Modal: Pedir info ao cliente -->
<div class="modal-backdrop hidden" id="modal-ask-client">
  <div class="modal-panel">
    <div class="modal-header">
      <div>
        <div style="font-size: 11px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.08em; font-weight: 500;">Comunicação</div>
        <div style="font-size: 16px; font-weight: 600; margin-top: 2px;">Pedir informação ao cliente</div>
      </div>
      <button class="btn btn-ghost" onclick="closeAskClientModal()" style="padding: 6px;"><i data-lucide="x" class="w-4 h-4"></i></button>
    </div>
    <div class="modal-body">
      <div style="background: var(--surface-subtle); border: 1px solid var(--border); border-radius: 10px; padding: 12px 14px; margin-bottom: 20px; font-size: 13px;" id="modal-task-context">—</div>
      <div class="field-label mb-2">Histórico da conversa</div>
      <div id="modal-history" style="max-height: 280px; overflow-y: auto; padding: 8px; background: var(--surface-subtle); border-radius: 10px; border: 1px solid var(--border); margin-bottom: 20px;"></div>
      <div class="field-label mb-2">Sua mensagem</div>
      <textarea id="modal-message-text" placeholder="Descreva o que você precisa do cliente…" style="width: 100%; min-height: 120px; padding: 12px; border: 1px solid var(--border-strong); border-radius: 10px; font-family: inherit; font-size: 13px; resize: vertical; outline: none;" onfocus="this.style.borderColor='var(--brand-pink)'" onblur="this.style.borderColor='var(--border-strong)'"></textarea>
      <div class="mt-4 p-3" style="background: var(--warning-soft); border-radius: 8px; font-size: 12px; color: var(--warning); display: flex; gap: 8px; align-items: flex-start;">
        <i data-lucide="alert-triangle" class="w-4 h-4" style="flex-shrink: 0; margin-top: 1px;"></i>
        <div>Ao enviar, a tarefa será <strong>colocada em espera</strong> aguardando resposta do cliente.</div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeAskClientModal()">Cancelar</button>
      <button class="btn btn-primary" onclick="enviarPendenciaCliente()"><i data-lucide="send" class="w-4 h-4"></i>Enviar e colocar em espera</button>
    </div>
  </div>
</div>

<!-- Modal: Drawer -->
<div class="modal-backdrop hidden" id="modal-drawer">
  <div class="modal-panel" style="max-width: 620px;">
    <div class="modal-header">
      <div>
        <div style="font-size: 16px; font-weight: 600;" id="drawer-title">—</div>
        <div style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;" id="drawer-subtitle">—</div>
      </div>
      <button class="btn btn-ghost" onclick="closeDrawer()" style="padding: 6px;"><i data-lucide="x" class="w-4 h-4"></i></button>
    </div>
    <div class="modal-body" id="drawer-body"></div>
  </div>
</div>

<!-- Modal: Confirmar finalização -->
<div class="modal-backdrop hidden" id="modal-confirm-finish">
  <div class="modal-panel" style="max-width: 520px;">
    <div class="modal-header">
      <div>
        <div style="font-size: 11px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.08em; font-weight: 500;">Confirmação</div>
        <div style="font-size: 16px; font-weight: 600; margin-top: 2px;">Finalizar solicitação</div>
      </div>
      <button class="btn btn-ghost" onclick="closeConfirmFinish()" style="padding: 6px;"><i data-lucide="x" class="w-4 h-4"></i></button>
    </div>
    <div class="modal-body">
      <div style="display: flex; gap: 14px; align-items: flex-start; margin-bottom: 18px;">
        <div style="width: 44px; height: 44px; border-radius: 50%; background: var(--success-soft); color: var(--success); display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><i data-lucide="check-circle-2" class="w-6 h-6"></i></div>
        <div>
          <div style="font-size: 15px; font-weight: 600; margin-bottom: 4px;">Você concluiu todas as etapas?</div>
          <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.55;" id="confirm-finish-detail">Ao confirmar, a tarefa será marcada como finalizada no Cockpit.</div>
        </div>
      </div>
      <div style="background: var(--info-soft); border: 1px solid #bfdbfe; border-radius: 10px; padding: 14px; display: flex; gap: 10px; align-items: flex-start;">
        <i data-lucide="bell" class="w-4 h-4" style="color: var(--info); flex-shrink: 0; margin-top: 2px;"></i>
        <div style="font-size: 13px; color: #1e40af; line-height: 1.5;"><strong>O cliente será notificado</strong> automaticamente pelo HUB do empreendedor.</div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeConfirmFinish()">Cancelar</button>
      <button class="btn btn-primary" onclick="confirmarFinalizacao()"><i data-lucide="check" class="w-4 h-4"></i>Confirmar e notificar cliente</button>
    </div>
  </div>
</div>
`;
}

/* ============================================================
   ESTADO GLOBAL
   ============================================================ */
let state = {};
const OPERATOR_NAME = 'Daniele Ribeiro';

function _initState() {
  const cfg = window.FLOW_CONFIG;
  const fresh = cfg.getInitialState();
  state = {
    currentScreen: 'home',
    currentTaskId: null,
    active: null,
    queue: fresh.queue || [],
    stationed: fresh.stationed || [],
    completed: fresh.completed || [],
    messages: fresh.messages || {},
    notifications: fresh.notifications || [],
    _execProgress: {},
    _execActions: {},
    _execStepExpanded: {},
    _gdocsFiles: {},
    _gdocsSkipped: {},
    _editMode: {},
    _editDraft: {},
    _editLog: {},
  };
}

/* ============================================================
   HELPERS
   ============================================================ */
function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }
function refreshIcons() { if (window.lucide) lucide.createIcons(); }

function slaBadge(status, sla) {
  if (status === 'risk') return `<span class="badge badge-warning"><i data-lucide="alert-triangle" class="w-3 h-3"></i> SLA em risco · ${sla}</span>`;
  if (status === 'overdue') return `<span class="badge badge-danger"><i data-lucide="alert-octagon" class="w-3 h-3"></i> SLA estourado</span>`;
  return `<span class="badge badge-neutral"><i data-lucide="clock" class="w-3 h-3"></i> ${sla}</span>`;
}

function deadlineBadge(status, deadline) {
  if (status === 'overdue') return `<span class="badge badge-danger"><i data-lucide="timer-off" class="w-3 h-3"></i> prazo ${deadline}</span>`;
  if (status === 'risk')    return `<span class="badge badge-warning"><i data-lucide="timer" class="w-3 h-3"></i> prazo ${deadline}</span>`;
  return `<span class="badge badge-info"><i data-lucide="timer" class="w-3 h-3"></i> prazo ${deadline}</span>`;
}

function getTaskById(id) {
  if (state.active && state.active.id === id) return state.active;
  return state.queue.find(t => t.id === id) ||
         state.stationed.find(t => t.id === id) ||
         state.completed.find(t => t.id === id);
}

function slaToMinutes(sla) {
  if (!sla) return Infinity;
  let total = 0;
  const hMatch = sla.match(/(\d+)\s*h/i);
  const mMatch = sla.match(/(\d+)\s*min/i);
  if (hMatch) total += parseInt(hMatch[1], 10) * 60;
  if (mMatch) total += parseInt(mMatch[1], 10);
  return total || Infinity;
}

function computeDeadline(receivedAt, sla) {
  if (!receivedAt || !sla) return '—';
  const [h, m] = receivedAt.split(':').map(Number);
  const mins = slaToMinutes(sla);
  if (!isFinite(mins)) return '—';
  const total = h * 60 + m + mins;
  const dh = Math.floor(total / 60) % 24;
  const dm = total % 60;
  return `${String(dh).padStart(2, '0')}:${String(dm).padStart(2, '0')}`;
}

function sortQueueBySLA() {
  state.queue.sort((a, b) => slaToMinutes(a.sla) - slaToMinutes(b.sla));
}

function getTypeMeta(typeCode) {
  const meta = window.FLOW_CONFIG.TYPE_METADATA;
  return (meta && meta[typeCode]) || { icon: 'file-text', label: 'Solicitação', desc: '—', color: '#64748b' };
}

/* ---- Helpers da tabela densa V1 (compartilhados com lista-operador / gerente) ---- */
const TYPE_ICONS = {
  admissao_clt:          'user-plus',
  admissao_rpa:          'briefcase',
  admissao_estagiario:   'graduation-cap',
  admissao_rpa_planilha: 'clipboard-list',
  ferias:                'calendar-check',
  ferias_aviso_previo:   'calendar-check',
  ferias_calculo:        'calculator',
  rescisao:              'receipt',
  rescisao_aviso_previo: 'calendar-x',
  rescisao_calculo:      'receipt',
  afastamento_empregado: 'user-x',
  apontamentos_folha:    'file-spreadsheet',
  solicitacao_geral:     'inbox',
};
function getTypeIcon(typeCode) { return TYPE_ICONS[typeCode] || 'file-text'; }

function esc(str) {
  if (str === undefined || str === null) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// "Hoje" do protótipo (data fixa pra demos consistentes)
const MOCK_TODAY = { dia: 14, mes: 5, ano: 2026 };

function _pad2(n) { return String(n).padStart(2, '0'); }

function computePrazo(t) {
  const [rh, rm] = (t.receivedAt || '09:00').split(':').map(Number);
  const slaMin = slaToMinutes(t.sla) || 0;
  let dia = MOCK_TODAY.dia, mes = MOCK_TODAY.mes, ano = MOCK_TODAY.ano;
  let totalMin = rh * 60 + rm + slaMin;
  if (totalMin >= 24 * 60) { totalMin -= 24 * 60; dia += 1; }
  if (t.slaStatus === 'overdue') { dia -= 1; if (dia < 1) { dia = 30; mes -= 1; } }
  const dh = Math.floor(totalMin / 60) % 24;
  const dm = totalMin % 60;
  return { dateStr: `${_pad2(dia)}/${_pad2(mes)}/${ano}`, timeStr: `${_pad2(dh)}:${_pad2(dm)}`, status: t.slaStatus || 'normal' };
}

function prazoCellHtml(t) {
  const p = computePrazo(t);
  let tag = '';
  if (p.status === 'risk') {
    tag = `<span class="prazo-tag risk"><i data-lucide="alert-triangle" class="w-3 h-3"></i>Em risco</span>`;
  } else if (p.status === 'overdue') {
    tag = `<span class="prazo-tag overdue"><i data-lucide="alert-octagon" class="w-3 h-3"></i>Estourado</span>`;
  }
  const whenCls = p.status === 'overdue' ? 'prazo-when overdue' : 'prazo-when';
  return `<div class="prazo-cell"><div class="${whenCls}">${p.dateStr}<span class="sep">·</span>${p.timeStr}</div>${tag}</div>`;
}

function statePillHtml(t, opts) {
  opts = opts || {};
  let cls, icon, label;
  if (t.status === 'active') { cls = 'em-execucao'; icon = 'play-circle'; label = 'Em execução'; }
  else if (t.status === 'stationed' && t.clientResponded) { cls = 'cliente-respondeu'; icon = 'message-circle-reply'; label = 'Cliente respondeu'; }
  else if (t.status === 'stationed') { cls = 'em-espera'; icon = 'pause-circle'; label = 'Em espera'; }
  else if (opts.isNext) { cls = 'proxima'; icon = 'play-circle'; label = 'Próxima'; }
  else { cls = 'na-fila'; icon = 'list'; label = 'Na fila'; }
  return `<span class="state-pill ${cls}"><i data-lucide="${icon}" class="w-3 h-3"></i>${label}</span>`;
}

function _taskTableHead() {
  return `
    <div class="lo-table-head">
      <div></div>
      <div class="h-cell">Solicitação</div>
      <div class="h-cell">Tipo</div>
      <div class="h-cell">Estado</div>
      <div class="h-cell">Prazo de entrega</div>
      <div></div>
    </div>
  `;
}

function _renderTaskRow(t, opts) {
  opts = opts || {};
  const isNext = !!opts.isNext;
  const clickable = !!opts.clickable;
  const withEye = !!opts.withEye;
  const onClick = opts.onClick || '';

  let cls = 'lo-row';
  if (clickable) cls += ' clickable';
  if (t.status === 'active') cls += ' execucao';
  else if (t.status === 'stationed' && t.clientResponded) cls += ' responded';
  else if (t.status === 'stationed') cls += ' stationed-row';
  else if (isNext) cls += ' next-up';

  let ctxLine = '';
  if (t.status === 'stationed') {
    ctxLine = `<div class="ctx-line">${t.clientResponded
      ? `Cliente respondeu ${esc(t.respondedAt || '')}`
      : `Em espera desde ${esc(t.stationedAt || '')}${t.stationedReason ? ` · ${esc(t.stationedReason)}` : ''}`}</div>`;
  }

  const eyeBtn = withEye && onClick
    ? `<button class="icon-btn" title="Ver detalhes" onclick="event.stopPropagation(); ${onClick}"><i data-lucide="eye" class="w-3.5 h-3.5"></i></button>`
    : '';

  const onClickAttr = clickable && onClick ? ` onclick="${onClick}"` : '';

  return `
    <div class="${cls}"${onClickAttr}>
      <div class="type-icon" title="${esc(t.type || '')}"><i data-lucide="${getTypeIcon(t.typeCode)}" class="w-4 h-4"></i></div>
      <div class="lo-solic">
        <span class="client-name">${esc(t.clientName || '')}</span>
        <span class="client-cnpj">${esc(t.cnpj || '')}</span>
        ${ctxLine}
      </div>
      <div class="lo-tipo">${esc(t.type || '')}</div>
      <div>${statePillHtml(t, { isNext })}</div>
      <div>${prazoCellHtml(t)}</div>
      <div style="display: flex; justify-content: flex-end;">${eyeBtn}</div>
    </div>
  `;
}

/* ============================================================
   NAVEGAÇÃO
   ============================================================ */
function showScreen(name) {
  qsa('.screen').forEach(s => s.classList.add('hidden'));
  qs('#screen-' + name).classList.remove('hidden');
  state.currentScreen = name;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  refreshIcons();
}

function _checkEditGuard(onProceed) {
  const taskId = state.currentTaskId;
  if (!taskId || !state._editMode[taskId]) { onProceed(); return; }
  showConfirmModal({
    title: 'Modificações não salvas',
    message: 'Sair agora vai descartar as alterações feitas no formulário. Deseja continuar?',
    confirmLabel: 'Sair sem salvar',
    danger: true,
    onConfirm: onProceed,
  });
}

function goHome() {
  _checkEditGuard(() => {
    if (state.currentTaskId) { state._editMode[state.currentTaskId] = false; delete state._editDraft[state.currentTaskId]; }
    state.currentTaskId = null;
    renderHome();
    showScreen('home');
  });
}

/* ============================================================
   RENDER: HOME
   ============================================================ */
function renderHome() {
  const qcb = qs('#queue-count-badge');
  if (qcb) qcb.textContent = state.queue.length;

  const slaAtRisk = state.queue.filter(t => t.slaStatus === 'risk' || t.slaStatus === 'overdue').length;
  qs('#home-stats').innerHTML = `
    <div class="stats-row clickable" onclick="openDrawer('concluidas')">
      <div><div class="stats-row-label">Concluídas hoje</div><div class="stats-row-sublabel" style="color: var(--success);">meta: 8 tarefas</div></div>
      <div style="display: flex; align-items: center; gap: 10px;"><div class="stats-row-value">${state.completed.length}</div><i data-lucide="chevron-right" class="w-4 h-4" style="color: var(--text-tertiary);"></i></div>
    </div>
    <div class="stats-row">
      <div><div class="stats-row-label">SLA em risco</div><div class="stats-row-sublabel">na sua fila</div></div>
      <div class="stats-row-value ${slaAtRisk > 0 ? 'warning' : ''}">${slaAtRisk}</div>
    </div>
    <div class="stats-row clickable" onclick="openDrawer('estacionadas')">
      <div><div class="stats-row-label">Aguardando cliente</div><div class="stats-row-sublabel">tarefas em espera</div></div>
      <div style="display: flex; align-items: center; gap: 10px;"><div class="stats-row-value">${state.stationed.length}</div><i data-lucide="chevron-right" class="w-4 h-4" style="color: var(--text-tertiary);"></i></div>
    </div>
  `;

  const homeHeader = qs('#home-header');
  if (state.active) {
    homeHeader.innerHTML = `
      <div><div style="font-size: 12px; color: var(--brand-pink); text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; margin-bottom: 6px;">Tarefa em andamento</div>
      <h1 style="font-size: 22px; font-weight: 700; margin-bottom: 6px;">${state.active.type} · ${state.active.clientName}</h1>
      <p style="color: var(--text-secondary); font-size: 14px;">Você ainda não finalizou essa tarefa. Continue de onde parou.</p></div>
      <div class="mt-6 flex gap-3"><button class="btn btn-primary btn-lg" onclick="pegarProximaTarefa()"><i data-lucide="arrow-right" class="w-4 h-4"></i>Continuar tarefa atual</button></div>
    `;
  } else {
    homeHeader.innerHTML = `
      <div><div style="font-size: 12px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.08em; font-weight: 500; margin-bottom: 6px;">${(window.FLOW_CONFIG && FLOW_CONFIG.operacaoLabel) || 'Operação Fiscal'}</div>
      <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 6px;">Olá, Daniele</h1>
      <p style="color: var(--text-secondary); font-size: 14px;">Você não tem nenhuma tarefa em execução no momento.</p></div>
      <div class="mt-6 flex gap-3"><button class="btn btn-primary btn-lg" onclick="pegarProximaTarefa()"><i data-lucide="play" class="w-4 h-4"></i>Pegar próxima tarefa</button></div>
    `;
  }

  const responded = state.stationed.find(t => t.clientResponded);
  const banner = qs('#return-banner');
  if (responded) {
    banner.classList.remove('hidden');
    qs('#return-banner-detail').textContent = `${responded.type} · ${responded.clientName} · respondido ${responded.respondedAt}`;
  } else {
    banner.classList.add('hidden');
  }

  // --- Tarefas em espera (tabela densa V1) ---
  const stationedHead = qs('#stationed-head');
  if (stationedHead) {
    stationedHead.innerHTML = `
      <div class="sh-text">
        <div class="sh-title">Tarefas em espera (${state.stationed.length})</div>
        <div class="sh-sub">Aguardando cliente · respondidas no topo</div>
      </div>
    `;
  }
  const stationedEl = qs('#stationed-list');
  if (state.stationed.length === 0) {
    stationedEl.innerHTML = `
      <div class="lo-table-wrap">
        <div style="padding: 22px 16px; text-align: center; color: var(--text-tertiary); font-size: 13px;">Nenhuma tarefa em espera.</div>
      </div>
    `;
  } else {
    const orderedStationed = [...state.stationed].sort((a, b) => {
      const aResp = a.clientResponded ? 0 : 1;
      const bResp = b.clientResponded ? 0 : 1;
      return aResp - bResp;
    });
    const stRows = orderedStationed.map(t => _renderTaskRow(t, {
      clickable: true, withEye: true, onClick: `abrirEstacionada('${t.id}')`,
    })).join('');
    stationedEl.innerHTML = `<div class="lo-table-wrap">${_taskTableHead()}${stRows}</div>`;
  }

  // --- Próximas na fila (tabela densa V1, sem clique — fila invisível) ---
  const queueHead = qs('#queue-head');
  if (queueHead) {
    queueHead.innerHTML = `
      <div class="sh-text">
        <div class="sh-title">Próximas na fila (${state.queue.length})</div>
        <div class="sh-sub">Direcionamento automático · ordenadas por SLA</div>
      </div>
    `;
  }
  const queueEl = qs('#queue-preview');
  if (state.queue.length === 0) {
    queueEl.innerHTML = `
      <div class="lo-table-wrap">
        <div style="padding: 22px 16px; text-align: center; color: var(--text-tertiary); font-size: 13px;">Fila vazia. 🎉</div>
      </div>
    `;
  } else {
    const qRows = state.queue.map((t, i) => _renderTaskRow(t, { isNext: i === 0 })).join('');
    queueEl.innerHTML = `<div class="lo-table-wrap">${_taskTableHead()}${qRows}</div>`;
  }

  refreshIcons();
}

/* ============================================================
   RENDER: FORMULÁRIO
   ============================================================ */
function getFormTabs(typeCode) {
  const tabs = window.FLOW_CONFIG.FORM_TABS_BY_TYPE;
  return (tabs && tabs[typeCode]) || [{ id: 'geral', label: '1. Geral' }];
}

function _getActiveFormTabId() {
  const el = qs('.form-tab.active[data-tab]');
  return el ? el.dataset.tab : null;
}

function renderForm(task, preferredTabId) {
  const tabsEl = qs('#form-tabs');
  const contentEl = qs('#form-content');

  if (!task.formData) {
    tabsEl.innerHTML = '';
    contentEl.innerHTML = `
      <div style="padding: 40px 20px; text-align: center; color: var(--text-tertiary); font-size: 13px;">
        <i data-lucide="file-question" class="w-10 h-10 mx-auto mb-3" style="color: var(--text-tertiary);"></i>
        <div>Formulário não disponível para esta solicitação neste protótipo.</div>
      </div>
    `;
    refreshIcons();
    return;
  }

  const data = task.formData;
  const tabs = getFormTabs(task.typeCode);

  const preferredTab = tabs.find(t => t.id === preferredTabId);
  const preferredEnabled = preferredTab && !(data.abas && data.abas[preferredTab.id] && data.abas[preferredTab.id].disabled);
  const initialTabId = preferredEnabled ? preferredTab.id : tabs[0].id;

  tabsEl.innerHTML = tabs.map(tab => {
    const tabData = data.abas && data.abas[tab.id];
    const disabled = tabData && tabData.disabled;
    return `<div class="form-tab ${tab.id === initialTabId ? 'active' : ''} ${disabled ? 'disabled' : ''}"
         data-tab="${tab.id}"
         ${disabled ? `title="${tabData.reason}"` : `onclick="switchFormTab('${tab.id}')"`}>
      ${tab.label}
      ${disabled ? '<i data-lucide="lock" style="width:12px;height:12px;opacity:0.6;"></i>' : ''}
    </div>`;
  }).join('');

  const stripEl = qs('#form-collab-strip');
  if (stripEl) {
    if (data.colaborador) {
      const initials = data.colaborador.nome.split(' ').map(n => n[0]).slice(0, 2).join('');
      const contextLabel = data.colaborador.contextLabel;
      const contextValue = data.colaborador.contextValue || data.colaborador.dataAdmissao;
      const contextBlock = contextLabel && contextValue ? `
        <div style="margin-left: auto; text-align: right;">
          <div class="field-label">${contextLabel}</div>
          <div style="font-weight: 600;">${contextValue}</div>
        </div>` : '';
      stripEl.innerHTML = `
        <div style="display: flex; align-items: center; gap: 14px; padding: 12px 16px; background: var(--surface-subtle); border: 1px solid var(--border); border-radius: 10px; margin-bottom: 20px;">
          <div style="width: 42px; height: 42px; border-radius: 50%; background: linear-gradient(135deg, #64748b, #94a3b8); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700;">${initials}</div>
          <div>
            <div style="font-size: 15px; font-weight: 600;">${data.colaborador.nome}</div>
            <div style="font-size: 12px; color: var(--text-secondary); font-family: 'JetBrains Mono', monospace;">CPF ${data.colaborador.cpf} · Cód. ${data.colaborador.codigo}</div>
          </div>
          ${contextBlock}
        </div>
      `;
    } else {
      stripEl.innerHTML = '';
    }
  }

  const isEditing = !!(task.id && state._editMode[task.id]);

  const logCount = (state._editLog[task.id] || []).length;
  const editBtnEl = qs('#form-edit-btn');
  if (editBtnEl) {
    editBtnEl.innerHTML = isEditing ? '' : `
      <div style="display:flex;align-items:center;gap:8px;">
        ${logCount > 0 ? `<button onclick="showEditLog()" style="display:inline-flex;align-items:center;gap:5px;padding:7px 12px;background:#fff;border:1px solid var(--border-strong);border-radius:8px;font-size:12.5px;font-weight:500;cursor:pointer;color:var(--text-secondary);" onmouseover="this.style.borderColor='var(--brand-pink)';this.style.color='var(--brand-pink)'" onmouseout="this.style.borderColor='var(--border-strong)';this.style.color='var(--text-secondary)'"><i data-lucide="list" style="width:13px;height:13px;"></i> Ver alterações (${logCount})</button>` : ''}
        <button onclick="enterEditMode()" style="display:inline-flex;align-items:center;gap:6px;padding:7px 14px;background:#fff;border:1px solid var(--border-strong);border-radius:8px;font-size:12.5px;font-weight:500;cursor:pointer;color:var(--text-secondary);transition:all .15s;" onmouseover="this.style.borderColor='var(--brand-pink)';this.style.color='var(--brand-pink)'" onmouseout="this.style.borderColor='var(--border-strong)';this.style.color='var(--text-secondary)'"><i data-lucide="pencil" style="width:13px;height:13px;"></i> Editar</button>
      </div>`;
  }

  const editBar = `<div class="edit-mode-bar">
      <span class="edit-mode-badge">✏ Em edição</span>
      ${logCount > 0 ? `<button onclick="showEditLog()" style="display:inline-flex;align-items:center;gap:5px;padding:6px 12px;background:#fff;border:1px solid var(--border-strong);border-radius:7px;font-size:12.5px;font-weight:500;cursor:pointer;"><i data-lucide="list" style="width:13px;height:13px;"></i> Ver alterações (${logCount})</button>` : ''}
      <div style="margin-left:auto;display:flex;gap:8px;">
        <button onclick="cancelEdits()" style="display:inline-flex;align-items:center;gap:6px;padding:7px 14px;background:#fff;border:1px solid var(--border-strong);border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;">Cancelar</button>
        <button onclick="saveEdits()" style="display:inline-flex;align-items:center;gap:6px;padding:7px 16px;background:var(--brand-pink);color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;"><i data-lucide="check" style="width:14px;height:14px;"></i> Salvar alterações</button>
      </div>
    </div>`;

  contentEl.innerHTML = (isEditing ? editBar : '') + '<div id="form-tab-body"></div>' + (isEditing ? `<div style="margin-top:8px;">${editBar}</div>` : '');
  switchFormTab(initialTabId);
}

function switchFormTab(tabId) {
  qsa('.form-tab').forEach(t => t.classList.remove('active'));
  const tabEl = qs(`.form-tab[data-tab="${tabId}"]`);
  if (tabEl && !tabEl.classList.contains('disabled')) tabEl.classList.add('active');

  const task = getTaskById(state.currentTaskId);
  if (!task || !task.formData) return;
  const isEditing = !!(state._editMode && state._editMode[task.id]);
  const abas = isEditing && state._editDraft[task.id] ? state._editDraft[task.id] : task.formData.abas;
  const abaData = abas && abas[tabId];
  const bodyEl = qs('#form-tab-body');
  if (!bodyEl) return;

  if (abaData && abaData.disabled) {
    bodyEl.innerHTML = `
      <div style="padding: 40px 20px; text-align: center; background: var(--surface-subtle); border-radius: 10px;">
        <i data-lucide="lock" class="w-8 h-8 mx-auto mb-3" style="color: var(--text-tertiary);"></i>
        <div style="color: var(--text-secondary); font-size: 13px;">${abaData.reason}</div>
      </div>
    `;
    refreshIcons();
    return;
  }

  const html = window.FLOW_CONFIG.renderFormTab(tabId, abaData || {});
  bodyEl.innerHTML = html;
  refreshIcons();
}

function roField(label, value) {
  const isEmpty = !value || value === '—';
  return `<div><div class="field-label">${label}</div><div class="field-value ${isEmpty ? 'empty' : ''}">${value || '—'}</div></div>`;
}

function renderSubsection(title, obj) {
  if (!obj) return '';
  const fields = Object.entries(obj).map(([k, v]) => roField(k, v)).join('');
  return `<div class="subsection-title">${title}</div><div class="field-group">${fields}</div>`;
}

function renderAttachments(title, list) {
  if (!list || !list.length) return '';
  return `<div class="subsection-title">${title}</div>
    <div class="flex flex-wrap gap-2">
      ${list.map(a => `
        <div class="attachment">
          <i data-lucide="paperclip" class="w-4 h-4" style="color: var(--text-tertiary);"></i>
          <span>${a.nome}</span>
          <span style="color: var(--text-tertiary); font-size: 11px;">· ${a.tipo}</span>
        </div>
      `).join('')}
    </div>`;
}

/* ============================================================
   EDIT MODE — helpers de campo editável
   ============================================================ */
function efText(label, value, tab, section, field) {
  return `<div class="ef-field"><div class="ef-label">${label}</div><input class="ef-input" type="text" value="${(value || '').replace(/"/g, '&quot;')}" data-tab="${tab}" data-section="${section}" data-field="${field}" oninput="onFieldEdit(this)"/></div>`;
}
function efDate(label, value, tab, section, field) {
  const id = ('dp-' + tab + '-' + section + '-' + field).replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]/g, '_');
  const calIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
  return `<div class="ef-field"><div class="ef-label">${label}</div><div class="ef-datepicker" id="${id}"><input class="ef-input ef-datepicker-input" type="text" placeholder="dd/mm/aaaa" value="${(value || '').replace(/"/g, '&quot;')}" readonly data-tab="${tab}" data-section="${section}" data-field="${field}" onclick="toggleDatePicker('${id}')"/><button type="button" class="ef-datepicker-btn" onclick="toggleDatePicker('${id}')">${calIcon}</button><div class="ef-cal-popup" data-year="" data-month=""></div></div></div>`;
}
function efNumber(label, value, tab, section, field) {
  return `<div class="ef-field"><div class="ef-label">${label}</div><input class="ef-input" type="number" value="${value || ''}" data-tab="${tab}" data-section="${section}" data-field="${field}" oninput="onFieldEdit(this)"/></div>`;
}
function efCurrency(label, value, tab, section, field) {
  return `<div class="ef-field"><div class="ef-label">${label}</div><div style="position:relative;"><span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);font-size:13px;color:var(--text-secondary);">R$</span><input class="ef-input" type="text" style="padding-left:28px;" value="${(value || '').replace('R$ ', '').replace(/"/g, '&quot;')}" data-tab="${tab}" data-section="${section}" data-field="${field}" oninput="onFieldEdit(this)"/></div></div>`;
}
function efSelect(label, value, tab, section, field, options) {
  const opts = options.map(o => {
    const v = typeof o === 'string' ? o : o.value;
    const l = typeof o === 'string' ? o : o.label;
    return `<option value="${v}" ${(v === value || l === value) ? 'selected' : ''}>${l}</option>`;
  }).join('');
  return `<div class="ef-field"><div class="ef-label">${label}</div><select class="ef-select" data-tab="${tab}" data-section="${section}" data-field="${field}" onchange="onFieldEdit(this)"><option value="">— Selecione —</option>${opts}</select></div>`;
}
function efToggle(label, value, tab, section, field, opts) {
  const btns = opts.map(o => `<button type="button" class="ef-toggle-btn ${o === value ? 'active' : ''}" onclick="onToggleEdit(this,'${tab}','${section}','${field}','${o}')">${o}</button>`).join('');
  return `<div class="ef-field"><div class="ef-label">${label}</div><div class="ef-toggle-group">${btns}</div></div>`;
}
function efTextarea(label, value, tab, section, field) {
  return `<div class="ef-field" style="grid-column:1/-1;"><div class="ef-label">${label}</div><textarea class="ef-textarea" data-tab="${tab}" data-section="${section}" data-field="${field}" oninput="onFieldEdit(this)">${value || ''}</textarea></div>`;
}

/* ── Helpers para campos dentro de itens de lista (ex.: dependentes) ── */
const DEPENDENTE_TIPO_OPTIONS = [
  '01 - Cônjuge ou companheiro(a) com o(a) qual tenha filho ou viva há mais de 5 anos',
  '02 - Filho(a) ou enteado(a) até 21 anos',
  '04 - Filho(a) ou enteado(a) em qualquer idade, quando incapacitado física e/ou mentalmente para o trabalho',
  '05 - Irmão(ã), neto(a) ou bisneto(a) sem arrimo dos pais, do qual detenha guarda judicial, até 21 anos',
  '07 - Irmão(ã), neto(a) ou bisneto(a) sem arrimo dos pais, do(a) qual detenha guarda judicial, em qualquer idade, quando incapacitado física e/ou mentalmente para o trabalho',
  '08 - Pais, avós e bisavós',
  '09 - Menor pobre, até 21 anos, que crie e eduque e do qual detenha guarda judicial',
  '10 - Pessoa absolutamente incapaz, da qual seja tutor ou curador',
  'Outros',
];

const DEPENDENTE_DEFAULTS = {
  'Nome': '',
  'Data de nascimento': '',
  'CPF': '',
  'Local de nascimento': '',
  'Tipo de dependência': '',
  'Matrícula': '',
  'Cartório': '',
  'Número registro': '',
  'Número livro': '',
  'Número folha': '',
  'Número da DNV': '',
  'Data de entrega do documento': '',
  'Pensão alimentícia': 'NAO',
  'Determinar fim da pensão': '',
  'Salário família': 'NAO',
  'Vencimento do atestado de frequência escolar para o salário família': '',
  'Vencimento da carteira de vacinação para o salário família': '',
  'IRRF': 'NAO',
  'Determinar fim IRRF': '',
  'Idade até': '',
};

const UF_OPTIONS = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO'];

/* ---- Cache de municípios (IBGE) usado pelos formulários ---- */
const __municipiosCache = new Map();
const __municipiosInflight = new Map();
function getMunicipiosForUf(uf) {
  if (!uf) return [];
  return __municipiosCache.get(uf) || [];
}
function ensureMunicipiosForUf(uf, onDone) {
  if (!uf) return;
  if (__municipiosCache.has(uf)) { onDone && onDone(__municipiosCache.get(uf)); return; }
  if (__municipiosInflight.has(uf)) { __municipiosInflight.get(uf).then(onDone || (()=>{})); return; }
  const promise = fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
    .then(r => r.ok ? r.json() : [])
    .then(data => {
      const names = Array.isArray(data) ? data.map(d => d.nome).sort((a,b) => a.localeCompare(b, 'pt-BR')) : [];
      __municipiosCache.set(uf, names);
      __municipiosInflight.delete(uf);
      return names;
    })
    .catch(() => { __municipiosInflight.delete(uf); return []; });
  __municipiosInflight.set(uf, promise);
  if (onDone) promise.then(onDone);
}

const DEPENDENTES_DISABLED_REASON = 'Colaborador não declarou dependentes. Esta aba só é habilitada quando houver dependentes informados.';

const ESTRANGEIRO_CONDICAO_OPTIONS = ['Temporário','Permanente','Refugiado','Asilado'];

const ESTRANGEIRO_DEFAULTS = {
  'Condição': '',
  'Data de Chegada': '',
  'Processo MTE': '',
  'Carteira de Trabalho - Validade': '',
  'RNE - Número': '',
  'RNE - Data de Expedição': '',
  'RNE - Órgão Emissor': '',
  'RNE - Data de Validade': '',
  'Casado com Brasileiro': 'NAO',
  'Filhos com Brasileiro': 'NAO',
};

function _getPaisNacionalidade() {
  const taskId = state.currentTaskId;
  const editing = !!(state._editMode && state._editMode[taskId]);
  if (editing && state._editDraft[taskId] && state._editDraft[taskId].pessoal && state._editDraft[taskId].pessoal.pessoais) {
    return state._editDraft[taskId].pessoal.pessoais['País de nacionalidade'] || 'Brasil';
  }
  const task = getTaskById(taskId);
  const pess = task && task.formData && task.formData.abas && task.formData.abas.pessoal && task.formData.abas.pessoal.pessoais;
  return (pess && pess['País de nacionalidade']) || 'Brasil';
}

function renderEstrangeiroSection(estrangeiroData, editing) {
  const pais = _getPaisNacionalidade();
  const isBrasileiro = pais === 'Brasil';
  if (isBrasileiro) {
    return `<div class="subsection-title">Documentos de estrangeiro</div>`
      + `<div style="display:flex;gap:10px;align-items:flex-start;padding:14px 16px;background:var(--surface-subtle);border:1px solid var(--border);border-radius:10px;font-size:13px;color:var(--text-secondary);"><i data-lucide="info" style="width:16px;height:16px;flex-shrink:0;margin-top:2px;color:var(--text-tertiary);"></i><div>Você informou o país de nacionalidade <strong>Brasil</strong>, então essa seção não precisa ser preenchida.</div></div>`;
  }
  const e = estrangeiroData || {};
  if (!editing) {
    return `<div class="subsection-title">Documentos de estrangeiro</div>`
      + `<div class="field-group" style="margin-bottom:24px;">`
      +   roField('Condição', e['Condição'])
      +   roField('Data de Chegada', e['Data de Chegada'])
      +   roField('Processo MTE', e['Processo MTE'])
      +   roField('Carteira de Trabalho - Validade', e['Carteira de Trabalho - Validade'])
      +   roField('RNE - Número', e['RNE - Número'])
      +   roField('RNE - Data de Expedição', e['RNE - Data de Expedição'])
      +   roField('RNE - Órgão Emissor', e['RNE - Órgão Emissor'])
      +   roField('RNE - Data de Validade', e['RNE - Data de Validade'])
      +   roField('Casado com Brasileiro', e['Casado com Brasileiro'])
      +   roField('Filhos com Brasileiro', e['Filhos com Brasileiro'])
      + `</div>`;
  }
  return `
    <div class="subsection-title" style="margin-bottom:16px;">Documentos de estrangeiro</div>
    <div class="field-group field-group-2" style="margin-bottom:24px;">
      ${efSelect('Condição', e['Condição'], 'documentos', 'estrangeiro', 'Condição', ESTRANGEIRO_CONDICAO_OPTIONS)}
      ${efDate('Data de Chegada', e['Data de Chegada'], 'documentos', 'estrangeiro', 'Data de Chegada')}
      ${efText('Processo MTE', e['Processo MTE'], 'documentos', 'estrangeiro', 'Processo MTE')}
      ${efDate('Carteira de Trabalho - Validade', e['Carteira de Trabalho - Validade'], 'documentos', 'estrangeiro', 'Carteira de Trabalho - Validade')}
      ${efText('RNE - Número', e['RNE - Número'], 'documentos', 'estrangeiro', 'RNE - Número')}
      ${efDate('RNE - Data de Expedição', e['RNE - Data de Expedição'], 'documentos', 'estrangeiro', 'RNE - Data de Expedição')}
      ${efText('RNE - Órgão Emissor', e['RNE - Órgão Emissor'], 'documentos', 'estrangeiro', 'RNE - Órgão Emissor')}
      ${efDate('RNE - Data de Validade', e['RNE - Data de Validade'], 'documentos', 'estrangeiro', 'RNE - Data de Validade')}
      ${efToggle('Casado com Brasileiro', e['Casado com Brasileiro'], 'documentos', 'estrangeiro', 'Casado com Brasileiro', ['NAO','SIM'])}
      ${efToggle('Filhos com Brasileiro', e['Filhos com Brasileiro'], 'documentos', 'estrangeiro', 'Filhos com Brasileiro', ['NAO','SIM'])}
    </div>
  `;
}

function efMonthYear(label, value, tab, section, field) {
  let nativeValue = '';
  const m = (value || '').match(/^(\d{2})\/(\d{4})$/);
  if (m) nativeValue = `${m[2]}-${m[1]}`;
  return `<div class="ef-field"><div class="ef-label">${label}</div><input class="ef-input" type="month" value="${nativeValue}" data-tab="${tab}" data-section="${section}" data-field="${field}" onchange="onMonthYearEdit(this)"/></div>`;
}

function onMonthYearEdit(el) {
  const m = (el.value || '').match(/^(\d{4})-(\d{2})$/);
  const formatted = m ? `${m[2]}/${m[1]}` : '';
  const { tab, section, field } = el.dataset;
  const taskId = state.currentTaskId;
  if (!state._editDraft[taskId] || !state._editDraft[taskId][tab]) return;
  if (!state._editDraft[taskId][tab][section]) state._editDraft[taskId][tab][section] = {};
  state._editDraft[taskId][tab][section][field] = formatted;
}

function efListText(label, value, tab, listKey, depId, field, opts) {
  opts = opts || {};
  const dis = opts.disabled ? 'disabled style="opacity:0.5;"' : '';
  return `<div class="ef-field"><div class="ef-label">${label}</div><input class="ef-input" type="text" value="${(value||'').replace(/"/g,'&quot;')}" data-tab="${tab}" data-list-key="${listKey}" data-dep-id="${depId}" data-field="${field}" oninput="onListFieldEdit(this)" ${dis}/></div>`;
}
function efListDate(label, value, tab, listKey, depId, field, opts) {
  opts = opts || {};
  const id = ('dpl-' + tab + '-' + listKey + '-' + depId + '-' + field).replace(/\s+/g,'-').replace(/[^a-zA-Z0-9\-]/g,'_');
  const calIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
  const disabled = opts.disabled;
  const inputClick = disabled ? '' : `onclick="toggleDatePicker('${id}')"`;
  const btnClick = disabled ? '' : `onclick="toggleDatePicker('${id}')"`;
  const dim = disabled ? 'opacity:0.5;pointer-events:none;' : '';
  return `<div class="ef-field"><div class="ef-label">${label}</div><div class="ef-datepicker" id="${id}" style="${dim}"><input class="ef-input ef-datepicker-input" type="text" placeholder="dd/mm/aaaa" value="${(value||'').replace(/"/g,'&quot;')}" readonly data-tab="${tab}" data-list-key="${listKey}" data-dep-id="${depId}" data-field="${field}" ${inputClick} ${disabled?'disabled':''}/><button type="button" class="ef-datepicker-btn" ${btnClick}>${calIcon}</button><div class="ef-cal-popup" data-year="" data-month=""></div></div></div>`;
}
function efListSelect(label, value, tab, listKey, depId, field, options) {
  const opts = options.map(o => {
    const v = typeof o === 'string' ? o : o.value;
    const l = typeof o === 'string' ? o : o.label;
    return `<option value="${v}" ${(v === value || l === value) ? 'selected' : ''}>${l}</option>`;
  }).join('');
  return `<div class="ef-field"><div class="ef-label">${label}</div><select class="ef-select" data-tab="${tab}" data-list-key="${listKey}" data-dep-id="${depId}" data-field="${field}" onchange="onListFieldEdit(this)"><option value="">— Selecione —</option>${opts}</select></div>`;
}
function efListToggle(label, value, tab, listKey, depId, field, opts) {
  const btns = opts.map(o => `<button type="button" class="ef-toggle-btn ${o === value ? 'active' : ''}" onclick="onListToggleEdit(this,'${tab}','${listKey}','${depId}','${field}','${o}')">${o}</button>`).join('');
  return `<div class="ef-field"><div class="ef-label">${label}</div><div class="ef-toggle-group">${btns}</div></div>`;
}

function onListFieldEdit(el) {
  const { tab, listKey, depId, field } = el.dataset;
  const taskId = state.currentTaskId;
  const list = state._editDraft[taskId] && state._editDraft[taskId][tab] && state._editDraft[taskId][tab][listKey];
  if (!Array.isArray(list)) return;
  const dep = list.find(d => d.id === depId);
  if (!dep) return;
  dep[field] = el.value;
  const item = el.closest('.exec-ref-item');
  if (!item) return;
  if (field === 'Nome') {
    const nameEl = item.querySelector('.exec-ref-trigger [data-role="nome"]');
    if (nameEl) nameEl.textContent = el.value || '(sem nome)';
  } else if (field === 'Tipo de dependência') {
    const tipoEl = item.querySelector('.exec-ref-trigger [data-role="tipo"]');
    if (tipoEl) tipoEl.textContent = el.value ? `· ${el.value}` : '';
  }
}

function onListToggleEdit(btn, tab, listKey, depId, field, value) {
  btn.closest('.ef-toggle-group').querySelectorAll('.ef-toggle-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const taskId = state.currentTaskId;
  const list = state._editDraft[taskId] && state._editDraft[taskId][tab] && state._editDraft[taskId][tab][listKey];
  if (!Array.isArray(list)) return;
  const dep = list.find(d => d.id === depId);
  if (!dep) return;
  dep[field] = value;
  if (field === 'IRRF' || field === 'Pensão alimentícia' || field === 'Salário família') {
    switchFormTab('dependentes');
    setTimeout(() => {
      const item = document.querySelector(`.exec-ref-item[data-dep-id="${depId}"]`);
      if (item) {
        const trigger = item.querySelector('.exec-ref-trigger');
        const content = item.querySelector('.exec-ref-content');
        if (trigger && content) { content.style.display = 'block'; trigger.classList.add('open'); }
      }
      if (window.lucide) lucide.createIcons();
    }, 0);
  }
}

function toggleDependenteAccordion(btn) {
  const item = btn.closest('.exec-ref-item');
  if (!item) return;
  const content = item.querySelector('.exec-ref-content');
  if (!content) return;
  const isOpen = content.style.display !== 'none';
  content.style.display = isOpen ? 'none' : 'block';
  btn.classList.toggle('open', !isOpen);
  if (window.lucide) lucide.createIcons();
}

function addDependente() {
  const taskId = state.currentTaskId;
  const draft = state._editDraft[taskId];
  if (!draft) return;
  if (!draft.dependentes || draft.dependentes.disabled) {
    draft.dependentes = { lista: [] };
  }
  if (!Array.isArray(draft.dependentes.lista)) draft.dependentes.lista = [];
  const id = 'dep-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
  draft.dependentes.lista.push({ ...DEPENDENTE_DEFAULTS, id, _isNew: true });
  switchFormTab('dependentes');
  setTimeout(() => {
    const item = document.querySelector(`.exec-ref-item[data-dep-id="${id}"]`);
    if (item) {
      const trigger = item.querySelector('.exec-ref-trigger');
      const content = item.querySelector('.exec-ref-content');
      if (trigger && content) { content.style.display = 'block'; trigger.classList.add('open'); }
      const nameInput = item.querySelector('input[data-field="Nome"]');
      if (nameInput) nameInput.focus();
    }
    if (window.lucide) lucide.createIcons();
  }, 0);
}

function removeDependente(depId) {
  const taskId = state.currentTaskId;
  const draft = state._editDraft[taskId];
  if (!draft || !draft.dependentes || !Array.isArray(draft.dependentes.lista)) return;
  const dep = draft.dependentes.lista.find(d => d.id === depId);
  const nome = dep ? (dep['Nome'] || 'sem nome') : 'sem nome';
  showConfirmModal({
    title: 'Remover dependente?',
    message: `O dependente <strong>${nome}</strong> será removido da lista.`,
    confirmLabel: 'Remover',
    danger: true,
    onConfirm: () => {
      const d = state._editDraft[taskId];
      if (!d || !d.dependentes || !Array.isArray(d.dependentes.lista)) return;
      d.dependentes.lista = d.dependentes.lista.filter(x => x.id !== depId);
      switchFormTab('dependentes');
    }
  });
}

function syncDependentesTabAvailability(value, originBtn) {
  const taskId = state.currentTaskId;
  const draft = state._editDraft[taskId];
  if (!draft) return;
  const cur = draft.dependentes || {};
  const lista = Array.isArray(cur.lista) ? cur.lista : [];

  const updateToggleVisual = (val) => {
    if (!originBtn) return;
    const grp = originBtn.closest('.ef-toggle-group');
    if (grp) grp.querySelectorAll('.ef-toggle-btn').forEach(b => b.classList.toggle('active', b.textContent.trim() === val));
  };

  const apply = (val) => {
    draft.pessoal.pessoais['Possui Dependentes'] = val;
    if (val === 'SIM') {
      draft.dependentes = { lista: lista };
    } else {
      draft.dependentes = { disabled: true, reason: DEPENDENTES_DISABLED_REASON };
    }
    const tabEl = document.querySelector('.form-tab[data-tab="dependentes"]');
    if (tabEl) {
      if (val === 'SIM') {
        tabEl.classList.remove('disabled');
        tabEl.removeAttribute('title');
        tabEl.setAttribute('onclick', "switchFormTab('dependentes')");
        const lock = tabEl.querySelector('i[data-lucide="lock"]');
        if (lock) lock.remove();
      } else {
        tabEl.classList.add('disabled');
        tabEl.setAttribute('title', DEPENDENTES_DISABLED_REASON);
        tabEl.removeAttribute('onclick');
        if (!tabEl.querySelector('i[data-lucide="lock"]')) {
          const lock = document.createElement('i');
          lock.setAttribute('data-lucide', 'lock');
          lock.style.cssText = 'width:12px;height:12px;opacity:0.6;';
          tabEl.appendChild(lock);
          if (window.lucide) lucide.createIcons();
        }
        if (tabEl.classList.contains('active')) switchFormTab('pessoal');
      }
    }
  };

  if (value === 'NAO' && lista.length > 0) {
    // Reverte visualmente para SIM enquanto o modal está aberto
    draft.pessoal.pessoais['Possui Dependentes'] = 'SIM';
    updateToggleVisual('SIM');
    showConfirmModal({
      title: 'Remover dependentes cadastrados?',
      message: `Marcar "Possui Dependentes" como NÃO vai remover os <strong>${lista.length} dependente(s)</strong> já cadastrados.`,
      confirmLabel: 'Remover',
      danger: true,
      onConfirm: () => {
        apply('NAO');
        updateToggleVisual('NAO');
      }
    });
    return;
  }
  apply(value);
}

function renderDependentesTab(d, editing) {
  const lista = (d && Array.isArray(d.lista)) ? d.lista : [];
  if (!editing) {
    if (lista.length === 0) {
      return `<div style="color:var(--text-tertiary);font-size:13px;padding:20px 0;">Nenhum dependente cadastrado.</div>`;
    }
    return `<div class="subsection-title">Dependentes cadastrados (${lista.length})</div>`
      + `<div class="exec-ref-card" style="margin-top:0;">`
      + lista.map(dep => _renderDependenteAccordionRO(dep)).join('')
      + `</div>`;
  }
  const headerCount = `<div class="subsection-title">Dependentes cadastrados (${lista.length})</div>`;
  const accordions = lista.length > 0
    ? `<div class="exec-ref-card" style="margin-top:0;margin-bottom:16px;">` + lista.map(dep => _renderDependenteAccordionEdit(dep)).join('') + `</div>`
    : `<div style="color:var(--text-tertiary);font-size:13px;padding:8px 0 16px;">Nenhum dependente cadastrado. Clique em "Adicionar dependente" para começar.</div>`;
  const addBtn = `<button onclick="addDependente()" style="display:inline-flex;align-items:center;gap:6px;padding:9px 16px;background:#fff;color:var(--text-primary);border:1px solid var(--border-strong);border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;"><i data-lucide="plus" style="width:14px;height:14px;"></i> Adicionar dependente</button>`;
  return headerCount + accordions + `<div style="display:flex;justify-content:flex-end;margin-bottom:24px;">${addBtn}</div>`;
}

function _renderDependenteAccordionRO(dep) {
  const nome = dep['Nome'] || '(sem nome)';
  const tipo = dep['Tipo de dependência'] || '';
  const tipoBadge = tipo ? `<span class="exec-ref-badge">· ${tipo}</span>` : '';
  const pensaoSim = dep['Pensão alimentícia'] === 'SIM';
  const salarioFamiliaSim = dep['Salário família'] === 'SIM';
  return `
    <div class="exec-ref-item" data-dep-id="${dep.id || ''}">
      <button class="exec-ref-trigger" onclick="toggleExecRefItem(this)">
        <span>${nome}${tipoBadge}</span>
        <i data-lucide="chevron-down" class="exec-ref-chevron" style="width:16px;height:16px;"></i>
      </button>
      <div class="exec-ref-content" style="display:none;">
        <div class="subsection-title" style="margin-top:8px;">Identificação</div>
        <div class="field-group" style="margin-bottom:20px;">
          ${roField('Nome', dep['Nome'])}
          ${roField('Data de nascimento', dep['Data de nascimento'])}
          ${roField('CPF', dep['CPF'])}
          ${roField('Local de nascimento', dep['Local de nascimento'])}
          ${roField('Tipo de dependência', dep['Tipo de dependência'])}
          ${roField('Matrícula', dep['Matrícula'])}
        </div>
        <div class="subsection-title">Documentos / Registro</div>
        <div class="field-group" style="margin-bottom:20px;">
          ${roField('Cartório', dep['Cartório'])}
          ${roField('Número registro', dep['Número registro'])}
          ${roField('Número livro', dep['Número livro'])}
          ${roField('Número folha', dep['Número folha'])}
          ${roField('Número da DNV', dep['Número da DNV'])}
          ${roField('Data de entrega do documento', dep['Data de entrega do documento'])}
        </div>
        <div class="subsection-title">Pensão alimentícia</div>
        <div class="field-group" style="margin-bottom:20px;">
          ${roField('Pensão alimentícia', dep['Pensão alimentícia'])}
          ${pensaoSim ? roField('Determinar fim da pensão', dep['Determinar fim da pensão']) : ''}
        </div>
        <div class="subsection-title">Salário família</div>
        <div class="field-group" style="margin-bottom:20px;">
          ${roField('Salário família', dep['Salário família'])}
          ${salarioFamiliaSim ? roField('Vencimento do atestado de frequência escolar para o salário família', dep['Vencimento do atestado de frequência escolar para o salário família']) : ''}
          ${salarioFamiliaSim ? roField('Vencimento da carteira de vacinação para o salário família', dep['Vencimento da carteira de vacinação para o salário família']) : ''}
        </div>
        <div class="subsection-title">Tributação e prazos</div>
        <div class="field-group">
          ${roField('IRRF', pensaoSim ? 'SIM' : dep['IRRF'])}
          ${(pensaoSim || dep['IRRF'] === 'SIM') ? roField('Determinar fim IRRF', dep['Determinar fim IRRF']) : ''}
          ${(pensaoSim || dep['IRRF'] === 'SIM') ? roField('Idade até', dep['Idade até']) : ''}
        </div>
      </div>
    </div>`;
}

function _renderDependenteAccordionEdit(dep) {
  const nome = dep['Nome'] || '(sem nome)';
  const tipo = dep['Tipo de dependência'] || '';
  const tipoBadge = tipo ? `<span class="exec-ref-badge" data-role="tipo">· ${tipo}</span>` : '<span class="exec-ref-badge" data-role="tipo"></span>';
  const id = dep.id;
  const tab = 'dependentes', listKey = 'lista';
  const pensaoSim = dep['Pensão alimentícia'] === 'SIM';
  const salarioFamiliaSim = dep['Salário família'] === 'SIM';
  const irrfAtivo = pensaoSim || dep['IRRF'] === 'SIM';
  const irrfToggleHtml = pensaoSim
    ? `<div class="ef-field"><div class="ef-label">IRRF</div><div class="ef-toggle-group" style="opacity:0.5;pointer-events:none;">${['NAO','SIM'].map(o => `<button type="button" class="ef-toggle-btn ${o === 'SIM' ? 'active' : ''}" disabled>${o}</button>`).join('')}</div></div>`
    : efListToggle('IRRF', dep['IRRF'], 'dependentes', 'lista', dep.id, 'IRRF', ['NAO','SIM']);
  return `
    <div class="exec-ref-item" data-dep-id="${id}">
      <div style="display:flex;align-items:stretch;">
        <button class="exec-ref-trigger" onclick="toggleDependenteAccordion(this)" style="flex:1;">
          <span><span data-role="nome">${nome}</span>${tipoBadge}</span>
          <i data-lucide="chevron-down" class="exec-ref-chevron" style="width:16px;height:16px;"></i>
        </button>
        <button onclick="removeDependente('${id}')" title="Remover dependente" style="padding:0 18px;border:none;background:none;cursor:pointer;color:var(--danger);display:flex;align-items:center;border-left:1px solid var(--border);">
          <i data-lucide="trash-2" style="width:16px;height:16px;"></i>
        </button>
      </div>
      <div class="exec-ref-content" style="display:none;">
        <div class="subsection-title" style="margin-top:8px;">Identificação</div>
        <div class="field-group field-group-2" style="margin-bottom:20px;">
          ${efListText('Nome', dep['Nome'], tab, listKey, id, 'Nome')}
          ${efListDate('Data de nascimento', dep['Data de nascimento'], tab, listKey, id, 'Data de nascimento')}
          ${efListText('CPF', dep['CPF'], tab, listKey, id, 'CPF')}
          ${efListSelect('Local de nascimento', dep['Local de nascimento'], tab, listKey, id, 'Local de nascimento', UF_OPTIONS)}
          ${efListSelect('Tipo de dependência', dep['Tipo de dependência'], tab, listKey, id, 'Tipo de dependência', DEPENDENTE_TIPO_OPTIONS)}
          ${efListText('Matrícula', dep['Matrícula'], tab, listKey, id, 'Matrícula')}
        </div>
        <div class="subsection-title">Documentos / Registro</div>
        <div class="field-group field-group-2" style="margin-bottom:20px;">
          ${efListText('Cartório', dep['Cartório'], tab, listKey, id, 'Cartório')}
          ${efListText('Número registro', dep['Número registro'], tab, listKey, id, 'Número registro')}
          ${efListText('Número livro', dep['Número livro'], tab, listKey, id, 'Número livro')}
          ${efListText('Número folha', dep['Número folha'], tab, listKey, id, 'Número folha')}
          ${efListText('Número da DNV', dep['Número da DNV'], tab, listKey, id, 'Número da DNV')}
          ${efListDate('Data de entrega do documento', dep['Data de entrega do documento'], tab, listKey, id, 'Data de entrega do documento')}
        </div>
        <div class="subsection-title">Pensão alimentícia</div>
        <div class="field-group field-group-2" style="margin-bottom:20px;">
          ${efListToggle('Pensão alimentícia', dep['Pensão alimentícia'], tab, listKey, id, 'Pensão alimentícia', ['NAO','SIM'])}
          ${pensaoSim ? efListDate('Determinar fim da pensão', dep['Determinar fim da pensão'], tab, listKey, id, 'Determinar fim da pensão') : ''}
        </div>
        <div class="subsection-title">Salário família</div>
        <div class="field-group field-group-2" style="margin-bottom:20px;">
          ${efListToggle('Salário família', dep['Salário família'], tab, listKey, id, 'Salário família', ['NAO','SIM'])}
          ${salarioFamiliaSim ? efListDate('Vencimento do atestado de frequência escolar para o salário família', dep['Vencimento do atestado de frequência escolar para o salário família'], tab, listKey, id, 'Vencimento do atestado de frequência escolar para o salário família') : ''}
          ${salarioFamiliaSim ? efListDate('Vencimento da carteira de vacinação para o salário família', dep['Vencimento da carteira de vacinação para o salário família'], tab, listKey, id, 'Vencimento da carteira de vacinação para o salário família') : ''}
        </div>
        <div class="subsection-title">Tributação e prazos</div>
        <div class="field-group field-group-2">
          ${irrfToggleHtml}
          ${irrfAtivo ? efListDate('Determinar fim IRRF', dep['Determinar fim IRRF'], tab, listKey, id, 'Determinar fim IRRF') : ''}
          ${irrfAtivo ? efListText('Idade até', dep['Idade até'], tab, listKey, id, 'Idade até') : ''}
        </div>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:24px;padding-top:16px;border-top:1px solid var(--border);">
          <button onclick="cancelDependente('${id}')" style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;background:#fff;border:1px solid var(--border-strong);border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;color:var(--text-primary);">Cancelar</button>
          <button onclick="confirmDependente('${id}')" style="display:inline-flex;align-items:center;gap:6px;padding:8px 18px;background:var(--brand-pink);color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;">Adicionar</button>
        </div>
      </div>
    </div>`;
}

function confirmDependente(depId) {
  const taskId = state.currentTaskId;
  const draft = state._editDraft[taskId];
  if (!draft || !draft.dependentes || !Array.isArray(draft.dependentes.lista)) return;
  const dep = draft.dependentes.lista.find(d => d.id === depId);
  if (!dep) return;
  if (dep._isNew) delete dep._isNew;
  const item = document.querySelector(`.exec-ref-item[data-dep-id="${depId}"]`);
  if (item) {
    const trigger = item.querySelector('.exec-ref-trigger');
    const content = item.querySelector('.exec-ref-content');
    if (trigger && content) { content.style.display = 'none'; trigger.classList.remove('open'); }
  }
}

function cancelDependente(depId) {
  const taskId = state.currentTaskId;
  const draft = state._editDraft[taskId];
  if (!draft || !draft.dependentes || !Array.isArray(draft.dependentes.lista)) return;
  const dep = draft.dependentes.lista.find(d => d.id === depId);
  if (!dep) return;
  if (dep._isNew) {
    showConfirmModal({
      title: 'Descartar dependente?',
      message: 'Os dados preenchidos para este novo dependente serão perdidos.',
      confirmLabel: 'Descartar',
      danger: true,
      onConfirm: () => {
        const d = state._editDraft[taskId];
        if (d && d.dependentes && Array.isArray(d.dependentes.lista)) {
          d.dependentes.lista = d.dependentes.lista.filter(x => x.id !== depId);
        }
        switchFormTab('dependentes');
      }
    });
    return;
  }
  const task = getTaskById(taskId);
  const origLista = (task && task.formData && task.formData.abas && task.formData.abas.dependentes && Array.isArray(task.formData.abas.dependentes.lista))
    ? task.formData.abas.dependentes.lista : [];
  const orig = origLista.find(d => d.id === depId);
  if (!orig) return;
  const hasChanges = Object.keys(orig).some(k => k !== 'id' && String(orig[k] || '') !== String(dep[k] || ''));
  const doRestore = () => {
    const d = state._editDraft[taskId];
    const idx = d.dependentes.lista.findIndex(x => x.id === depId);
    if (idx >= 0) d.dependentes.lista[idx] = JSON.parse(JSON.stringify(orig));
    switchFormTab('dependentes');
  };
  if (!hasChanges) { doRestore(); return; }
  showConfirmModal({
    title: 'Descartar alterações?',
    message: 'As alterações feitas neste dependente serão revertidas para o estado original.',
    confirmLabel: 'Descartar',
    danger: true,
    onConfirm: doRestore
  });
}

function onFieldEdit(el) {
  if (el.dataset && el.dataset.listKey) { onListFieldEdit(el); return; }
  const { tab, section, field } = el.dataset;
  const taskId = state.currentTaskId;
  if (!state._editDraft[taskId] || !state._editDraft[taskId][tab]) return;
  if (!state._editDraft[taskId][tab][section]) state._editDraft[taskId][tab][section] = {};
  state._editDraft[taskId][tab][section][field] = el.value;
  if (tab === 'pessoal' && section === 'pessoais' && field === 'País de nacionalidade') {
    const docTab = qs('.form-tab.active[data-tab="documentos"]');
    if (docTab) switchFormTab('documentos');
  }
  if (typeof window.onFieldEditAfter === 'function') {
    try { window.onFieldEditAfter(tab, section, field, el.value); } catch (e) { /* noop */ }
  }
}

/* ============================================================
   DATE PICKER
   ============================================================ */
const MONTHS_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
                   'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

function toggleDatePicker(id) {
  const popup = document.querySelector('#' + id + ' .ef-cal-popup');
  if (!popup) return;
  if (popup.classList.contains('open')) { popup.classList.remove('open'); return; }
  document.querySelectorAll('.ef-cal-popup.open').forEach(p => p.classList.remove('open'));
  const input = document.querySelector('#' + id + ' .ef-datepicker-input');
  const parts = (input.value || '').split('/');
  const today = new Date();
  popup.dataset.year  = parts.length === 3 ? parseInt(parts[2]) : today.getFullYear();
  popup.dataset.month = parts.length === 3 ? parseInt(parts[1]) - 1 : today.getMonth();
  renderCalGrid(id);
  popup.classList.add('open');
}

function navCalMonth(id, delta) {
  const popup = document.querySelector('#' + id + ' .ef-cal-popup');
  let month = parseInt(popup.dataset.month) + delta;
  let year  = parseInt(popup.dataset.year);
  if (month < 0)  { month = 11; year--; }
  if (month > 11) { month = 0;  year++; }
  popup.dataset.month = month;
  popup.dataset.year  = year;
  renderCalGrid(id);
}

function renderCalGrid(id) {
  const popup  = document.querySelector('#' + id + ' .ef-cal-popup');
  const year   = parseInt(popup.dataset.year);
  const month  = parseInt(popup.dataset.month);
  const input  = document.querySelector('#' + id + ' .ef-datepicker-input');
  const parts  = (input.value || '').split('/');
  const selDay = parts.length === 3 ? parseInt(parts[0]) : -1;
  const selMon = parts.length === 3 ? parseInt(parts[1]) - 1 : -1;
  const selYr  = parts.length === 3 ? parseInt(parts[2]) : -1;
  const today  = new Date();
  const first  = new Date(year, month, 1).getDay();
  const days   = new Date(year, month + 1, 0).getDate();
  let html = `<div class="ef-cal-header"><button class="ef-cal-nav" onclick="navCalMonth('${id}',-1)">&#8249;</button><span class="ef-cal-month-label">${MONTHS_PT[month]} ${year}</span><button class="ef-cal-nav" onclick="navCalMonth('${id}',1)">&#8250;</button></div><div class="ef-cal-weekdays"><span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span></div><div class="ef-cal-grid">`;
  for (let i = 0; i < first; i++) html += `<div class="ef-cal-day empty"></div>`;
  for (let d = 1; d <= days; d++) {
    const isSel   = d === selDay && month === selMon && year === selYr;
    const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    const cls = 'ef-cal-day' + (isSel ? ' selected' : '') + (isToday ? ' today' : '');
    html += `<div class="${cls}" onclick="selectCalDate('${id}',${d},${month},${year})">${d}</div>`;
  }
  html += `</div>`;
  popup.innerHTML = html;
}

function selectCalDate(id, day, month, year) {
  const input = document.querySelector('#' + id + ' .ef-datepicker-input');
  input.value = String(day).padStart(2,'0') + '/' + String(month + 1).padStart(2,'0') + '/' + year;
  onFieldEdit(input);
  document.querySelector('#' + id + ' .ef-cal-popup').classList.remove('open');
}

document.addEventListener('click', function(e) {
  if (!e.target.closest('.ef-datepicker')) {
    document.querySelectorAll('.ef-cal-popup.open').forEach(p => p.classList.remove('open'));
  }
});

function onToggleEdit(btn, tab, section, field, value) {
  btn.closest('.ef-toggle-group').querySelectorAll('.ef-toggle-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const taskId = state.currentTaskId;
  if (!state._editDraft[taskId] || !state._editDraft[taskId][tab]) return;
  if (!state._editDraft[taskId][tab][section]) state._editDraft[taskId][tab][section] = {};
  state._editDraft[taskId][tab][section][field] = value;
  if (tab === 'pessoal' && section === 'pessoais' && field === 'Possui Dependentes') {
    syncDependentesTabAvailability(value, btn);
  }
}

function onCheckboxEdit(el, tab, section, field, option) {
  const taskId = state.currentTaskId;
  if (!state._editDraft[taskId] || !state._editDraft[taskId][tab]) return;
  if (!state._editDraft[taskId][tab][section]) state._editDraft[taskId][tab][section] = {};
  let arr = Array.isArray(state._editDraft[taskId][tab][section][field]) ? [...state._editDraft[taskId][tab][section][field]] : [];
  if (el.checked) { if (!arr.includes(option)) arr.push(option); }
  else { arr = arr.filter(o => o !== option); }
  state._editDraft[taskId][tab][section][field] = arr;
}

function enterEditMode() {
  const task = getTaskById(state.currentTaskId);
  if (!task || !task.formData) return;
  const currentTab = _getActiveFormTabId();
  state._editMode[task.id] = true;
  state._editDraft[task.id] = JSON.parse(JSON.stringify(task.formData.abas));
  renderForm(task, currentTab);
}

function cancelEdits() {
  const task = getTaskById(state.currentTaskId);
  if (!task) return;
  const currentTab = _getActiveFormTabId();
  const draft = state._editDraft[task.id];
  const hasChanges = draft && JSON.stringify(draft) !== JSON.stringify(task.formData.abas);
  const doCancelEdits = () => { state._editMode[task.id] = false; delete state._editDraft[task.id]; renderForm(task, currentTab); };
  if (!hasChanges) { doCancelEdits(); return; }
  showConfirmModal({
    title: 'Descartar alterações?',
    message: 'Há modificações não salvas. Descartar e sair do modo de edição?',
    confirmLabel: 'Descartar',
    danger: true,
    onConfirm: doCancelEdits,
  });
}

function saveEdits() {
  const task = getTaskById(state.currentTaskId);
  const draft = state._editDraft && state._editDraft[task.id];
  if (!draft) return;
  if (!state._editLog[task.id]) state._editLog[task.id] = [];
  const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const original = task.formData.abas;

  Object.keys(draft).forEach(tabId => {
    const origTab = original[tabId] || {};
    const draftTab = draft[tabId] || {};
    if (tabId === 'observacoes') {
      if (String(origTab.texto || '') !== String(draftTab.texto || '')) {
        state._editLog[task.id].push({ tabId, section: 'observacoes', field: 'Comentário', before: origTab.texto || '—', after: draftTab.texto || '—', changedBy: OPERATOR_NAME, changedAt: now });
      }
      return;
    }
    if (tabId === 'dependentes') {
      const origLista = (origTab && Array.isArray(origTab.lista)) ? origTab.lista : [];
      const draftLista = (draftTab && Array.isArray(draftTab.lista)) ? draftTab.lista : [];
      origLista.forEach(orig => {
        if (!draftLista.find(d => d.id === orig.id)) {
          state._editLog[task.id].push({ tabId, section: 'dependentes', field: 'Dependente removido', before: orig['Nome'] || '—', after: '—', changedBy: OPERATOR_NAME, changedAt: now });
        }
      });
      draftLista.forEach(d => {
        const orig = origLista.find(o => o.id === d.id);
        if (!orig) {
          state._editLog[task.id].push({ tabId, section: 'dependentes', field: 'Dependente adicionado', before: '—', after: d['Nome'] || '(sem nome)', changedBy: OPERATOR_NAME, changedAt: now });
        } else {
          Object.keys(d).forEach(k => {
            if (k === 'id' || k.startsWith('_')) return;
            if (String(orig[k] || '') !== String(d[k] || '')) {
              state._editLog[task.id].push({ tabId, section: 'dependentes', field: `${d['Nome'] || 'dep'} → ${k}`, before: orig[k] || '—', after: d[k] || '—', changedBy: OPERATOR_NAME, changedAt: now });
            }
          });
        }
      });
      return;
    }
    Object.keys(draftTab).forEach(sectionKey => {
      const origSection = origTab[sectionKey] || {};
      const draftSection = draftTab[sectionKey] || {};
      if (typeof draftSection !== 'object' || Array.isArray(draftSection)) return;
      Object.keys(draftSection).forEach(field => {
        if (String(origSection[field] || '') !== String(draftSection[field] || '')) {
          state._editLog[task.id].push({ tabId, section: sectionKey, field, before: origSection[field] || '—', after: draftSection[field] || '—', changedBy: OPERATOR_NAME, changedAt: now });
        }
      });
    });
  });

  const currentTab = _getActiveFormTabId();
  task.formData.abas = JSON.parse(JSON.stringify(draft));
  state._editMode[task.id] = false;
  delete state._editDraft[task.id];
  renderForm(task, currentTab);
  flash('Alterações salvas com sucesso.', 'success');
}

function showEditLog() {
  const task = getTaskById(state.currentTaskId);
  const log = (state._editLog && state._editLog[task.id]) || [];
  const existing = qs('#modal-edit-log');
  if (existing) existing.remove();

  const TAB = { geral: 'Geral', profissional: 'Profissional', pessoal: 'Pessoal', documentos: 'Documentos', dependentes: 'Dependentes', observacoes: 'Observações', solicitacao: 'Solicitação' };
  const SEC = { dadosBasicos: 'Dados Básicos', admissao: 'Admissão', contratoExperiencia: 'Contrato de Experiência', horario: 'Horário', ctps: 'Carteira Profissional', pis: 'PIS', pagamento: 'Pagamento', sindicais: 'Sindicais', endereco: 'Endereço', pessoais: 'Informações Pessoais', deficiencia: 'Portador de Deficiência', documentosProfissionais: 'Documentos Profissionais', documentos: 'Documentos', estrangeiro: 'Documentos de estrangeiro', dependentes: 'Dependentes', observacoes: 'Observações', campos: 'Campos', descricao: 'Descrição', anexos: 'Anexos' };

  const content = log.length === 0
    ? `<div style="color:var(--text-tertiary);text-align:center;padding:32px;">Nenhuma alteração registrada ainda.</div>`
    : log.map(e => `
      <div style="padding:14px 0;border-bottom:1px solid var(--border);">
        <div style="font-size:11px;color:var(--text-tertiary);margin-bottom:4px;text-transform:uppercase;letter-spacing:0.04em;">${TAB[e.tabId] || e.tabId} · ${SEC[e.section] || e.section}</div>
        <div style="font-size:13px;font-weight:600;margin-bottom:8px;">${e.field}</div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <span style="background:var(--danger-soft);color:var(--danger);padding:3px 9px;border-radius:5px;font-size:12px;">${e.before}</span>
          <i data-lucide="arrow-right" style="width:12px;height:12px;color:var(--text-tertiary);flex-shrink:0;"></i>
          <span style="background:var(--success-soft);color:var(--success);padding:3px 9px;border-radius:5px;font-size:12px;">${e.after}</span>
        </div>
        <div style="font-size:11px;color:var(--text-tertiary);margin-top:6px;">operador: ${e.changedBy} · ${e.changedAt}</div>
      </div>`).join('');

  const el = document.createElement('div');
  el.id = 'modal-edit-log';
  el.innerHTML = `
    <div style="position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:200;display:flex;align-items:center;justify-content:center;" onclick="if(event.target===this)closeEditLog()">
      <div style="background:#fff;border-radius:14px;width:520px;max-width:95vw;max-height:80vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.15);">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--border);">
          <div style="font-size:15px;font-weight:700;">Histórico de alterações</div>
          <button onclick="closeEditLog()" style="background:none;border:none;cursor:pointer;color:var(--text-tertiary);padding:4px;border-radius:6px;display:flex;align-items:center;"><i data-lucide="x" style="width:18px;height:18px;"></i></button>
        </div>
        <div style="overflow-y:auto;padding:4px 24px 24px;">${content}</div>
      </div>
    </div>`;
  document.body.appendChild(el);
  refreshIcons();
}

function closeEditLog() { const m = qs('#modal-edit-log'); if (m) m.remove(); }

/* ---- Modais genéricos de confirmação e alerta ---- */
function showConfirmModal({ title, message, confirmLabel = 'Confirmar', cancelLabel = 'Cancelar', danger = false, onConfirm }) {
  const existing = qs('#modal-confirm');
  if (existing) existing.remove();
  const el = document.createElement('div');
  el.id = 'modal-confirm';
  el.innerHTML = `
    <div style="position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:300;display:flex;align-items:center;justify-content:center;" onclick="if(event.target===this)_closeConfirmModal()">
      <div style="background:#fff;border-radius:14px;width:400px;max-width:95vw;box-shadow:0 20px 60px rgba(0,0,0,0.15);">
        <div style="padding:24px 24px 0;">
          <div style="font-size:15px;font-weight:700;margin-bottom:8px;">${title}</div>
          <div style="font-size:13.5px;color:var(--text-secondary);line-height:1.55;">${message}</div>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:8px;padding:20px 24px;">
          <button onclick="_closeConfirmModal()" style="padding:8px 16px;border:1px solid var(--border-strong);border-radius:8px;background:#fff;font-size:13px;font-weight:500;cursor:pointer;">${cancelLabel}</button>
          <button id="modal-confirm-ok" style="padding:8px 18px;border:none;border-radius:8px;background:${danger ? 'var(--danger)' : 'var(--brand-pink)'};color:#fff;font-size:13px;font-weight:600;cursor:pointer;">${confirmLabel}</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(el);
  qs('#modal-confirm-ok').onclick = () => { _closeConfirmModal(); onConfirm && onConfirm(); };
}
function _closeConfirmModal() { const m = qs('#modal-confirm'); if (m) m.remove(); }

function showAlertModal({ title, message }) {
  const existing = qs('#modal-alert');
  if (existing) existing.remove();
  const el = document.createElement('div');
  el.id = 'modal-alert';
  el.innerHTML = `
    <div style="position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:300;display:flex;align-items:center;justify-content:center;" onclick="if(event.target===this)qs('#modal-alert').remove()">
      <div style="background:#fff;border-radius:14px;width:380px;max-width:95vw;box-shadow:0 20px 60px rgba(0,0,0,0.15);">
        <div style="padding:24px 24px 0;">
          <div style="font-size:15px;font-weight:700;margin-bottom:8px;">${title}</div>
          <div style="font-size:13.5px;color:var(--text-secondary);line-height:1.55;">${message}</div>
        </div>
        <div style="display:flex;justify-content:flex-end;padding:20px 24px;">
          <button onclick="qs('#modal-alert').remove()" style="padding:8px 18px;border:none;border-radius:8px;background:var(--brand-pink);color:#fff;font-size:13px;font-weight:600;cursor:pointer;">Entendi</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(el);
}

/* ============================================================
   TIMELINE
   ============================================================ */
const TIMELINE_STEPS = [
  { id: 'received',   label: 'Recebida' },
  { id: 'operador',   label: 'Atuação do operador' },
  { id: 'processing', label: 'Processamento' },
  { id: 'done',       label: 'Concluída' },
];

function renderTimelineHorizontal(targetEl, currentStepIdx, task) {
  targetEl.innerHTML = TIMELINE_STEPS.map((step, i) => {
    let dotClass, dotContent, itemClass = '', metaText = '';
    if (i < currentStepIdx) { dotClass = 'tl-dot-done'; dotContent = '<i data-lucide="check" class="w-3 h-3"></i>'; metaText = 'Concluído'; itemClass = 'done'; }
    else if (i === currentStepIdx) { dotClass = 'tl-dot-active'; dotContent = String(i + 1); metaText = 'Em andamento'; itemClass = 'active'; }
    else { dotClass = 'tl-dot-pending'; dotContent = String(i + 1); itemClass = 'pending'; metaText = 'Aguardando'; }
    return `<div class="tl-item-h ${itemClass}"><div class="tl-dot ${dotClass}">${dotContent}</div><div class="tl-step">${step.label}</div><div class="tl-meta">${metaText}</div></div>`;
  }).join('');
}

/* ============================================================
   RENDER: TASK ANALYSIS
   ============================================================ */
function renderTask(task) {
  qs('#task-id-label').textContent = task.id;
  qs('#task-type-label').textContent = task.type;
  qs('#task-client-name').textContent = task.clientName;
  qs('#task-client-cnpj').textContent = task.cnpj;
  qs('#task-client-logo').textContent = task.logoText;
  qs('#task-solicitante').textContent = task.senderName;
  const scopes = task.senderScopes || [];
  qs('#task-solicitante-tags').innerHTML = scopes.map(s => `<span class="contact-tag">${s}</span>`).join('');
  qs('#task-timestamp').textContent = `hoje às ${task.receivedAt}`;
  qs('#task-sla-inline').innerHTML = `<span class="badge badge-neutral" style="font-size:11px;"><i data-lucide="clock" class="w-3 h-3"></i> SLA ${task.sla}</span>`;
  qs('#task-deadline').innerHTML = deadlineBadge(task.slaStatus, computeDeadline(task.receivedAt, task.sla));
  renderTimelineHorizontal(qs('#task-timeline'), 1, task);
  renderClientAttachments(task);

  const msgs = state.messages[task.id] || [];
  const activityBlock = qs('#activity-block');
  if (msgs.length > 1) {
    activityBlock.classList.remove('hidden');
    qs('#activity-messages').innerHTML = `<div class="history-list">${msgs.map(m => renderHistoryMessage(m, task)).join('')}</div>`;
  } else {
    activityBlock.classList.add('hidden');
  }

  renderForm(task);
  refreshIcons();
}

function renderClientAttachments(task) {
  const block = qs('#attachments-block');
  if (!block) return;
  const all = (task.attachments || []).map(a => ({ name: a.name, size: a.size, source: 'initial' }));
  block.classList.remove('hidden');
  qs('#attachments-count-badge').textContent = all.length;
  if (all.length === 0) {
    qs('#attachments-list').innerHTML = `<div style="font-size:13px;color:var(--text-tertiary);padding:8px 0;">Nenhum anexo enviado pelo cliente.</div>`;
  } else {
    qs('#attachments-list').innerHTML = all.map(f => renderFileItem(f)).join('');
  }
  refreshIcons();
}

function getFileIconClass(name) {
  const ext = (name.split('.').pop() || '').toLowerCase();
  if (['pdf'].includes(ext)) return { cls: 'file-icon-pdf', label: 'PDF' };
  if (['jpg', 'jpeg', 'png'].includes(ext)) return { cls: 'file-icon-img', label: 'IMG' };
  if (['xlsx', 'xls', 'csv'].includes(ext)) return { cls: 'file-icon-xls', label: 'XLS' };
  return { cls: 'file-icon-doc', label: 'DOC' };
}

function renderFileItem(file, options) {
  const opts = options || {};
  const removable = opts.removable || false;
  const removeFn = opts.removeFn || null;
  const icon = getFileIconClass(file.name);
  const isResponse = file.source === 'response';
  return `
    <div class="file-item ${isResponse ? 'highlighted' : ''}">
      <div class="file-item-icon"><div class="${icon.cls}">${icon.label}</div></div>
      <div style="min-width: 0; display: flex; align-items: baseline; flex-wrap: wrap;">
        <span class="file-item-name">${file.name}</span>
        <span class="file-item-meta">· ${file.size || '—'}</span>
        ${isResponse ? `<span class="file-item-response-tag">resposta · ${file.when}</span>` : ''}
      </div>
      <div class="file-item-actions">
        <button class="file-action-btn" title="Visualizar" onclick="event.stopPropagation();"><i data-lucide="eye" style="width:16px;height:16px;"></i></button>
        <button class="file-action-btn" title="Baixar" onclick="event.stopPropagation();"><i data-lucide="download" style="width:16px;height:16px;"></i></button>
        ${removable ? `<button class="file-action-btn danger" title="Remover" onclick="${removeFn}"><i data-lucide="x" style="width:16px;height:16px;"></i></button>` : ''}
      </div>
    </div>
  `;
}

function renderHistoryMessage(m, task) {
  const isOperator = m.from === 'operator';
  const author = isOperator ? 'Daniele Ribeiro' : task.senderName;
  const initials = author.split(' ').map(n => n[0]).slice(0, 2).join('');
  const scopes = task.senderScopes || [];
  const tagsHtml = isOperator
    ? `<span class="contact-tag" style="background:#fff5f6;color:var(--brand-pink);border-color:#f9c5cb;">operador</span>`
    : `<span class="contact-tag contact-tag-client">cliente</span>${scopes.map(s => `<span class="contact-tag">${s}</span>`).join('')}`;
  return `
    <div class="history-msg ${isOperator ? 'operator' : 'client'}">
      <div class="history-msg-header">
        <div class="history-msg-avatar">${initials}</div>
        <span class="history-msg-author">${author}</span>
        <span style="display:inline-flex;gap:4px;">${tagsHtml}</span>
        <span class="history-msg-timestamp">${m.timestamp}</span>
      </div>
      <div class="history-msg-text">${m.text}</div>
    </div>
  `;
}

function renderHistoryInto(targetEl, task) {
  const msgs = state.messages[task.id] || [];
  if (msgs.length === 0) {
    targetEl.innerHTML = `<div style="color: var(--text-tertiary); font-size: 12px; text-align: center; padding: 12px;">Primeira mensagem desta conversa.</div>`;
    return;
  }
  targetEl.innerHTML = `<div class="history-list">${msgs.map(m => renderHistoryMessage(m, task)).join('')}</div>`;
}

/* ============================================================
   AÇÕES DO OPERADOR
   ============================================================ */
function pegarProximaTarefa() {
  if (state.active) {
    state.currentTaskId = state.active.id;
    renderTask(state.active);
    showScreen('task');
    return;
  }
  const responded = state.stationed.find(t => t.clientResponded);
  let task;
  if (responded) {
    state.stationed = state.stationed.filter(t => t.id !== responded.id);
    task = responded;
    task.clientResponded = false;
  } else {
    if (state.queue.length === 0) { flash('Fila vazia! 🎉', 'success'); return; }
    task = state.queue.shift();
  }
  state.active = task;
  state.currentTaskId = task.id;
  renderTask(task);
  showScreen('task');
}

function abrirEstacionada(id) {
  const task = state.stationed.find(t => t.id === id);
  if (!task) return;
  if (task.clientResponded) {
    showConfirmModal({
      title: 'Cliente respondeu',
      message: 'O cliente respondeu essa tarefa. Deseja abri-la para continuar a execução?',
      confirmLabel: 'Abrir tarefa',
      onConfirm: () => pegarProximaTarefa(),
    });
    return;
  }
  qs('#drawer-title').textContent = `${task.type} — ${task.clientName}`;
  qs('#drawer-subtitle').textContent = `Aguardando cliente desde ${task.stationedAt}`;
  qs('#drawer-body').innerHTML = `
    <div style="background: var(--warning-soft); border-radius: 10px; padding: 12px 14px; font-size: 13px; color: var(--warning); display: flex; gap: 10px; align-items: flex-start; margin-bottom: 16px;">
      <i data-lucide="clock" class="w-4 h-4" style="flex-shrink: 0; margin-top: 2px;"></i>
      <div><div style="font-weight: 600; margin-bottom: 2px;">${task.stationedReason}</div></div>
    </div>
    <div class="section-title" style="font-size: 11px; margin-bottom: 10px;"><i data-lucide="message-square"></i>Histórico</div>
    <div class="history-list" id="drawer-history"></div>
  `;
  renderHistoryInto(qs('#drawer-history'), task);
  qs('#modal-drawer').classList.remove('hidden');
  refreshIcons();
}

function aceitarTarefa() {
  _checkEditGuard(() => {
    const task = getTaskById(state.currentTaskId);
    if (!task) return;
    state._editMode[task.id] = false;
    delete state._editDraft[task.id];
    renderExecution(task);
    showScreen('execution');
  });
}

function voltarParaAnalise() {
  const task = getTaskById(state.currentTaskId);
  if (!task) return;
  showScreen('task');
}

function openAskClientModal() {
  const task = getTaskById(state.currentTaskId);
  if (!task) return;
  qs('#modal-task-context').innerHTML = `
    <div style="display: flex; gap: 10px; align-items: center;">
      <div style="width: 32px; height: 32px; border-radius: 8px; background: linear-gradient(135deg, #f25461, #f97316); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px;">${task.logoText}</div>
      <div><div style="font-weight: 600;">${task.type} · ${task.clientName}</div><div style="font-size: 12px; color: var(--text-secondary);">Tarefa ${task.id}</div></div>
    </div>
  `;
  renderHistoryInto(qs('#modal-history'), task);
  qs('#modal-message-text').value = '';
  qs('#modal-ask-client').classList.remove('hidden');
  refreshIcons();
  setTimeout(() => qs('#modal-message-text').focus(), 100);
}

function closeAskClientModal() { qs('#modal-ask-client').classList.add('hidden'); }

function enviarPendenciaCliente() {
  const text = qs('#modal-message-text').value.trim();
  if (!text) { showAlertModal({ title: 'Campo obrigatório', message: 'Digite uma mensagem para o cliente antes de enviar.' }); return; }
  const task = getTaskById(state.currentTaskId);
  if (!task) return;
  if (!state.messages[task.id]) state.messages[task.id] = [];
  state.messages[task.id].push({ from: 'operator', text, timestamp: 'agora mesmo' });
  state.active = null;
  state.queue = state.queue.filter(t => t.id !== task.id);
  state.stationed.push({ ...task, stationedAt: 'agora mesmo', stationedReason: text.length > 80 ? text.substring(0, 80) + '...' : text, clientResponded: false, respondedAt: null });
  closeAskClientModal();
  goHome();
  flash('Tarefa colocada em espera — o cliente foi notificado.', 'success');
}

/* ============================================================
   EXEC_STEPS PADRÃO — backward compat para fluxos sem EXEC_STEPS declarado
   ============================================================ */
const DEFAULT_EXEC_STEPS = [
  {
    title: 'Gerar e baixar o arquivo TXT',
    desc: 'O TXT é gerado a partir dos dados da solicitação. Baixe para importar na Domínio.',
    action: { label: 'Baixar TXT', icon: 'file-down', doneLabel: 'Baixado', onClick: 'handleStepAction(0)' },
    timelineStep: 2,
    autoCompleteOnAction: true,
  },
  {
    title: 'Acessar a Domínio e subir o TXT',
    desc: 'Abra a Domínio e faça a importação do arquivo TXT. Marque como feito quando concluído.',
    timelineStep: 2,
    type: 'form-reference',
  },
  {
    title: 'Registrar no Gestta',
    desc: 'Copie o nome sugerido abaixo para garantir a correlação automática dos documentos.',
    action: { label: 'Abrir Gestta', icon: 'external-link', doneLabel: 'Aberto', onClick: 'handleStepAction(2)' },
    timelineStep: 2,
    showTaskId: true,
  },
  {
    title: 'Conclusão da etapa',
    desc: 'O processamento continua no Gestta/Domínio. Os documentos chegam automaticamente ao cliente quando ficarem prontos.',
    type: 'final-message',
    timelineStep: 2,
  },
];

/* ============================================================
   EXEC_STEP_PRESETS — presets nomeados compartilhados por todos os fluxos.
   Cada HTML pode declarar EXEC_STEPS: 'nome_do_preset' (string) em vez de
   um array inline. Mudança aqui propaga automaticamente para todos os fluxos
   que referenciam o preset.
   ============================================================ */
/* Passos compartilhados por todos os fluxos não-admissão.
   Idênticos à admissão, mas sem o 1º passo (gerar TXT). */
const NON_ADMISSION_STEPS = [
  {
    title: 'Acessar a Domínio e fazer o processamento',
    desc: 'Abra a Domínio, realize o processamento correspondente a esta solicitação e marque como feito quando concluído.',
    timelineStep: 2,
    type: 'form-reference',
    defaultOpen: true,
  },
  {
    title: 'Registrar no Gestta',
    desc: 'Copie o nome sugerido abaixo para garantir a correlação automática dos documentos.',
    action: { label: 'Abrir Gestta', icon: 'external-link', doneLabel: 'Aberto', onClick: 'handleStepAction(1)' },
    timelineStep: 2,
    showTaskId: true,
  },
  {
    title: 'Conclusão da etapa',
    desc: 'O processamento continua no Gestta/Domínio. Os documentos chegam automaticamente ao cliente quando ficarem prontos.',
    type: 'final-message',
    timelineStep: 2,
  },
];

/* Passos do fluxo de Apontamentos em folha.
   Mesma estrutura da admissão, mas o passo 1 baixa a planilha enviada pelo cliente
   em vez de gerar TXT, e o passo 2 sobe essa planilha na Domínio. */
const APONTAMENTOS_STEPS = [
  {
    title: 'Baixar a planilha enviada pelo cliente',
    desc: 'Baixe a planilha de apontamentos enviada pelo cliente para subir na Domínio.',
    action: { label: 'Baixar planilha', icon: 'file-down', doneLabel: 'Baixada', onClick: 'handleStepAction(0)' },
    timelineStep: 2,
    autoCompleteOnAction: true,
  },
  {
    title: 'Acessar a Domínio e subir a planilha',
    desc: 'Abra a Domínio, suba a planilha no módulo de apontamentos e confira o processamento. Marque como feito quando concluído.',
    timelineStep: 2,
    type: 'form-reference',
    defaultOpen: true,
  },
  {
    title: 'Registrar no Gestta',
    desc: 'Copie o nome sugerido abaixo para garantir a correlação automática dos documentos.',
    action: { label: 'Abrir Gestta', icon: 'external-link', doneLabel: 'Aberto', onClick: 'handleStepAction(2)' },
    timelineStep: 2,
    showTaskId: true,
  },
  {
    title: 'Conclusão da etapa',
    desc: 'O processamento continua no Gestta/Domínio. Os documentos chegam automaticamente ao cliente quando ficarem prontos.',
    type: 'final-message',
    timelineStep: 2,
  },
];

/* Passos do fluxo de Admissão RPA via Planilha.
   Operador baixa a planilha, cadastra contribuintes novos na Domínio
   e faz o espelhamento/processamento dos valores do RPA. */
const ADMISSAO_PLANILHA_STEPS = [
  {
    title: 'Baixar a planilha enviada pelo cliente',
    desc: 'Baixe a planilha de admissões de RPA enviada pelo cliente para processar na Domínio.',
    action: { label: 'Baixar planilha', icon: 'file-down', doneLabel: 'Baixada', onClick: 'handleStepAction(0)' },
    timelineStep: 2,
    autoCompleteOnAction: true,
  },
  {
    title: 'Cadastrar na Domínio os contribuintes que ainda não estão na base',
    desc: 'Abra a Domínio, cadastre os prestadores listados na planilha que ainda não constam na base do cliente. Marque como feito quando concluído.',
    timelineStep: 2,
    type: 'form-reference',
    defaultOpen: true,
  },
  {
    title: 'Espelhar e processar os valores do RPA na Domínio',
    desc: 'Faça o espelhamento dos valores dos RPAs conforme a planilha e processe na Domínio. Marque como feito quando concluído.',
    timelineStep: 2,
    type: 'form-reference',
  },
  {
    title: 'Registrar no Gestta',
    desc: 'Copie o nome sugerido abaixo para garantir a correlação automática dos documentos.',
    action: { label: 'Abrir Gestta', icon: 'external-link', doneLabel: 'Aberto', onClick: 'handleStepAction(3)' },
    timelineStep: 2,
    showTaskId: true,
  },
  {
    title: 'Conclusão da etapa',
    desc: 'O processamento continua no Gestta/Domínio. Os documentos chegam automaticamente ao cliente quando ficarem prontos.',
    type: 'final-message',
    timelineStep: 2,
  },
];

const EXEC_STEP_PRESETS = {
  admissao:          DEFAULT_EXEC_STEPS,
  admissao_planilha: ADMISSAO_PLANILHA_STEPS,
  ferias:            NON_ADMISSION_STEPS,
  rescisao:          NON_ADMISSION_STEPS,
  afastamento:       NON_ADMISSION_STEPS,
  geral:             NON_ADMISSION_STEPS,
  apontamentos:      APONTAMENTOS_STEPS,
};

function getExecSteps() {
  const raw = window.FLOW_CONFIG.EXEC_STEPS || DEFAULT_EXEC_STEPS;
  if (typeof raw === 'string') return EXEC_STEP_PRESETS[raw] || DEFAULT_EXEC_STEPS;
  return raw;
}

/* ============================================================
   RENDER: EXECUÇÃO
   ============================================================ */
function renderExecution(task) {
  const EXEC_STEPS = getExecSteps();
  qs('#exec-id-label').textContent = task.id;
  qs('#exec-type-label').textContent = task.type;
  qs('#exec-client-label').textContent = task.clientName;
  qs('#exec-client-cnpj').textContent = task.cnpj;
  qs('#exec-solicitante').textContent = task.senderName;
  const scopes = task.senderScopes || [];
  qs('#exec-solicitante-tags').innerHTML = [
    `<span class="contact-tag contact-tag-client">cliente</span>`,
    ...scopes.map(s => `<span class="contact-tag">${s}</span>`),
  ].join('');
  qs('#exec-timestamp').textContent = `hoje às ${task.receivedAt}`;
  qs('#exec-sla-inline').innerHTML = `<span class="badge badge-neutral" style="font-size:11px;"><i data-lucide="clock" class="w-3 h-3"></i> SLA ${task.sla}</span>`;
  qs('#exec-deadline').innerHTML = deadlineBadge(task.slaStatus, computeDeadline(task.receivedAt, task.sla));

  if (!state._execProgress[task.id]) state._execProgress[task.id] = 0;
  if (!state._execActions[task.id]) state._execActions[task.id] = {};
  if (!state._execStepExpanded) state._execStepExpanded = {};
  if (!state._execStepExpanded[task.id]) state._execStepExpanded[task.id] = {};
  if (!state._gdocsFiles[task.id]) state._gdocsFiles[task.id] = [];

  const progress = state._execProgress[task.id];
  const actionsDone = state._execActions[task.id];
  const expandedMap = state._execStepExpanded[task.id];
  const gdocsFiles = state._gdocsFiles[task.id];

  renderTimelineHorizontal(qs('#exec-timeline'), EXEC_STEPS[progress] ? EXEC_STEPS[progress].timelineStep : 3, task);

  qs('#exec-steps').innerHTML = EXEC_STEPS.map((s, i) => {
    const done = i < progress;
    const active = i === progress;
    const pending = i > progress;
    const hasBodyExtra = s.type === 'upload' || s.type === 'final-message' || s.type === 'form-reference' || s.showTaskId;
    const expanded = !!expandedMap[i];
    const showBody = active || (done && expanded);
    let bodyExtra = '';
    let buttonsHtml = '';

    if (s.type === 'upload' && showBody) bodyExtra += renderUploadSection(i, gdocsFiles, active);
    if (s.type === 'final-message' && showBody) bodyExtra += renderFinalMessageSection(i, task, active);
    if (s.type === 'form-reference' && showBody) bodyExtra += renderFormReference(task, s.defaultOpen);
    if (s.showTaskId && showBody) bodyExtra += renderTaskIdPanel(task);

    if (done) {
      buttonsHtml = `<span class="badge badge-success"><i data-lucide="check" class="w-3 h-3"></i> Feito</span>`;
      if (s.editable) buttonsHtml += `<button class="step-edit-btn" onclick="event.stopPropagation(); editarPasso(${i})"><i data-lucide="pencil" class="w-3 h-3"></i> Editar</button>`;
      if (s.autoCompleteOnAction && s.action) {
        buttonsHtml += `<button class="step-edit-btn" onclick="event.stopPropagation(); ${s.action.onClick}"><i data-lucide="${s.action.icon}" class="w-3 h-3"></i> ${s.action.label} novamente</button>`;
      }
    } else if (active) {
      let actionBtn = '';
      if (s.action) {
        const actionDone = actionsDone[i];
        actionBtn = actionDone
          ? `<span class="step-action done"><i data-lucide="check" class="w-3.5 h-3.5"></i> ${s.action.doneLabel}</span>`
          : `<button class="step-action" onclick="${s.action.onClick}"><i data-lucide="${s.action.icon}" class="w-3.5 h-3.5"></i> ${s.action.label}</button>`;
      }
      let skipBtn = '';
      if (s.type === 'upload' && gdocsFiles.length === 0) {
        skipBtn = `<button class="step-action" onclick="pularPassoGdocs(${i})" style="border-style: dashed;">Não há documentos a adicionar</button>`;
      }
      const markDisabled = s.requiresFiles && gdocsFiles.length === 0;
      let markBtn = '';
      if (!s.autoCompleteOnAction) {
        markBtn = markDisabled
          ? `<button class="step-mark-done" disabled style="opacity:0.5;cursor:not-allowed;" title="Adicione pelo menos um arquivo"><i data-lucide="check" class="w-3.5 h-3.5"></i> Marcar como feito</button>`
          : `<button class="step-mark-done" onclick="marcarPassoFeito(${i})"><i data-lucide="check" class="w-3.5 h-3.5"></i> Marcar como feito</button>`;
      }
      buttonsHtml = actionBtn + skipBtn + markBtn;
    } else {
      buttonsHtml = `<span style="font-size: 11px; color: var(--text-tertiary);">Aguardando</span>`;
    }

    const collapsible = done && hasBodyExtra;
    const headerCls = `exec-step-header${collapsible ? ' collapsible' : ''}`;
    const headerOnClick = collapsible ? `onclick="toggleStepExpanded(${i})"` : '';
    const chevronHtml = collapsible
      ? `<i data-lucide="chevron-down" class="exec-step-chevron${expanded ? ' open' : ''}"></i>`
      : '';
    const showButtonsTop = !bodyExtra || s.type === 'form-reference' || collapsible;

    return `
      <div class="exec-step ${done ? 'done' : ''} ${active ? 'active' : ''}" style="${pending ? 'opacity: 0.55;' : ''} flex-direction: ${bodyExtra ? 'column' : 'row'}; align-items: ${bodyExtra ? 'stretch' : 'flex-start'};">
        <div class="${headerCls}" ${headerOnClick}>
          <div class="step-num">${done ? '✓' : i + 1}</div>
          <div style="flex: 1; min-width: 0;"><div style="font-weight: 600; margin-bottom: 4px;">${s.title}</div><div style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.55;">${s.desc}</div></div>
          ${showButtonsTop ? `<div class="step-buttons">${buttonsHtml}</div>` : ''}
          ${chevronHtml}
        </div>
        ${bodyExtra ? `<div style="margin-top: 14px; ${s.type === 'form-reference' ? '' : 'padding-left: 42px;'}">${bodyExtra}${!collapsible ? `<div class="step-buttons" style="margin-top: 14px;">${buttonsHtml}</div>` : ''}</div>` : ''}
      </div>
    `;
  }).join('');

  refreshIcons();
}

function renderUploadSection(stepIdx, files, active) {
  const filesHtml = files.length > 0 ? `<div class="uploaded-files-list">${files.map((f, idx) => renderFileItem(f, { removable: active, removeFn: `removeGdocsFile(${idx})` })).join('')}</div>` : '';
  if (!active) return filesHtml || '<div style="font-size: 12px; color: var(--text-tertiary); font-style: italic;">Nenhum arquivo adicionado.</div>';
  return `
    <div class="upload-area" id="upload-area-${stepIdx}" onclick="document.getElementById('gdocs-file-input').click()" ondragover="handleDragOver(event)" ondragleave="handleDragLeave(event)" ondrop="handleFileDrop(event)">
      <div class="upload-area-icon"><i data-lucide="upload-cloud" style="width:20px;height:20px;"></i></div>
      <div class="upload-area-title">Arraste arquivos aqui</div>
      <div class="upload-area-hint">ou <strong>selecione do computador</strong></div>
    </div>
    <input type="file" id="gdocs-file-input" style="display:none;" multiple onchange="handleFileSelect(event)" />
    ${filesHtml}
  `;
}

function findFormCampo(formData, nome) {
  const abas = formData && formData.abas;
  if (!abas) return null;
  function recurse(obj) {
    if (!obj || typeof obj !== 'object') return null;
    for (const [k, v] of Object.entries(obj)) {
      if (k === nome) return v;
      if (v && typeof v === 'object') {
        const found = recurse(v);
        if (found != null) return found;
      }
    }
    return null;
  }
  return recurse(abas);
}

function buildGesttaTaskName(task) {
  const id = task.id;
  const colaborador = task.formData && task.formData.colaborador ? task.formData.colaborador.nome : null;
  const cliente = task.clientName;
  const dash = '—';

  switch (task.typeCode) {
    case 'admissao_clt':
    case 'admissao_estagiario': {
      const dataInicio = findFormCampo(task.formData, 'Data da admissão')
        || findFormCampo(task.formData, 'Data de Admissão')
        || findFormCampo(task.formData, 'Início do Contrato')
        || dash;
      return `Admissão — ${colaborador || cliente} - Início: ${dataInicio} (${id})`;
    }
    case 'ferias_aviso_previo': {
      const dataInicio = findFormCampo(task.formData, 'Data de início do gozo') || dash;
      return `Aviso Prévio de Férias — ${colaborador || cliente} - Início: ${dataInicio} (${id})`;
    }
    case 'solicitacao_geral':
      return `Solicitação Geral — ${cliente} (${id})`;
    default:
      return colaborador
        ? `${task.type} — ${colaborador} (${id})`
        : `${task.type} — ${cliente} (${id})`;
  }
}

function renderTaskIdPanel(task) {
  const suggestedName = buildGesttaTaskName(task);
  const encoded = encodeURIComponent(suggestedName);
  return `
    <div style="background: var(--info-soft); border: 1px solid #bfdbfe; border-radius: 10px; padding: 14px 16px; margin-top: 4px;">
      <div style="font-size: 12px; font-weight: 600; color: #1e40af; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
        <i data-lucide="tag" style="width:13px;height:13px;"></i> Instrução de registro no Gestta
      </div>
      <div style="font-size: 12.5px; color: #3b82f6; margin-bottom: 10px;">Crie a tarefa no Gestta com o seguinte nome:</div>
      <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 13px; background: #fff; padding: 10px 14px; border-radius: 8px; border: 1px solid #93c5fd; flex: 1; min-width: 200px; word-break: break-all;">${suggestedName}</div>
        <button id="copy-task-id-btn" onclick="copyTaskId(decodeURIComponent('${encoded}'))"
          style="display: inline-flex; align-items: center; gap: 6px; padding: 10px 16px; background: #2563eb; color: #fff; border: none; border-radius: 8px; font-size: 12.5px; font-weight: 600; cursor: pointer; white-space: nowrap;">
          <i data-lucide="copy" style="width:14px;height:14px;"></i> Copiar
        </button>
      </div>
    </div>
  `;
}

function copyTaskId(text) {
  navigator.clipboard.writeText(text).then(() => {
    flash('Nome copiado! Cole no campo de tarefa do Gestta.', 'success');
    const btn = qs('#copy-task-id-btn');
    if (btn) {
      btn.dataset.copied = '1';
      btn.innerHTML = '<i data-lucide="check" style="width:14px;height:14px;"></i> Copiado!';
      btn.style.background = '#16a34a';
      refreshIcons();
      setTimeout(() => {
        btn.innerHTML = '<i data-lucide="copy" style="width:14px;height:14px;"></i> Copiar';
        btn.style.background = '#2563eb';
        delete btn.dataset.copied;
        refreshIcons();
      }, 2000);
    }
  }).catch(() => flash('Selecione e copie o texto manualmente.', 'warning'));
}

function renderFinalMessageSection(stepIdx, task, active) {
  const manualFiles = state._gdocsFiles[task.id] || [];
  const filesHtml = manualFiles.length > 0
    ? `<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;">${manualFiles.map((f, idx) => renderFileItem(f, { removable: active, removeFn: `removeGdocsFile(${idx})` })).join('')}</div>`
    : '';
  const fileInput = active ? `<input type="file" id="gdocs-file-input" style="display:none;" multiple onchange="handleFileSelect(event)" />` : '';
  const attachBtn = active
    ? `<div style="margin-top:14px;"><button onclick="document.getElementById('gdocs-file-input').click()" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;background:#fff;border:1px solid var(--border-strong);border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;color:var(--text-primary);"><i data-lucide="paperclip" style="width:14px;height:14px;"></i> Anexar documento manualmente (opcional)</button></div>`
    : '';
  return `
    <div style="background:var(--info-soft);border:1px solid #bfdbfe;border-radius:10px;padding:16px 18px;display:flex;gap:12px;align-items:flex-start;">
      <i data-lucide="info" style="width:18px;height:18px;color:var(--info);flex-shrink:0;margin-top:2px;"></i>
      <div style="flex:1;font-size:13px;line-height:1.55;color:#1e40af;">
        <div style="font-weight:600;margin-bottom:4px;">Sua parte nessa solicitação foi concluída.</div>
        <div>Quando o processo for finalizado no Gestta/Domínio, os documentos gerados serão enviados automaticamente ao cliente pelo hub. Você pode marcar essa etapa como feita para fechar a solicitação.</div>
      </div>
    </div>
    ${attachBtn}
    ${filesHtml}
    ${fileInput}
  `;
}

function handleDragOver(e) { e.preventDefault(); e.currentTarget.classList.add('dragover'); }
function handleDragLeave(e) { e.currentTarget.classList.remove('dragover'); }
function handleFileDrop(e) { e.preventDefault(); e.currentTarget.classList.remove('dragover'); addFilesToGdocs(Array.from(e.dataTransfer.files)); }
function handleFileSelect(e) { addFilesToGdocs(Array.from(e.target.files)); e.target.value = ''; }

function addFilesToGdocs(files) {
  const task = getTaskById(state.currentTaskId);
  if (!task) return;
  if (!state._gdocsFiles[task.id]) state._gdocsFiles[task.id] = [];
  files.forEach(f => {
    const sizeKB = (f.size / 1024).toFixed(0);
    state._gdocsFiles[task.id].push({ name: f.name, size: sizeKB > 1024 ? (sizeKB/1024).toFixed(1) + ' MB' : sizeKB + ' KB' });
  });
  renderExecution(task);
}

function removeGdocsFile(idx) { const task = getTaskById(state.currentTaskId); if (!task) return; state._gdocsFiles[task.id].splice(idx, 1); renderExecution(task); }
function editarPasso(stepIdx) { const task = getTaskById(state.currentTaskId); if (!task) return; state._execProgress[task.id] = stepIdx; flash('Voltando ao passo para ajustar.', 'info'); renderExecution(task); }

function pularPassoGdocs(stepIdx) {
  const task = getTaskById(state.currentTaskId);
  if (!task) return;
  const total = getExecSteps().length;
  if (stepIdx + 1 >= total) { openConfirmFinish(); return; }
  state._execProgress[task.id] = stepIdx + 1;
  renderExecution(task);
}

function injectCopyButtons(html) {
  return html.replace(
    /<div class="field-value(?! empty)[^"]*">([\s\S]*?)<\/div>/g,
    (match, val) => {
      const text = (val || '').trim();
      if (!text || text === '—') return match;
      const safe = text.replace(/"/g, '&quot;');
      return `<div class="field-value">${val}<button class="exec-ref-copy-btn" data-copy="${safe}" onclick="execCopyField(this)" title="Copiar" style="margin-left:4px;vertical-align:middle;"><i data-lucide="copy" style="width:11px;height:11px;"></i></button></div>`;
    }
  );
}

function execCopyField(btn) {
  const value = btn.getAttribute('data-copy');
  navigator.clipboard.writeText(value).then(() => {
    btn.innerHTML = '<i data-lucide="check" style="width:11px;height:11px;color:var(--success);"></i>';
    lucide.createIcons();
    setTimeout(() => {
      btn.innerHTML = '<i data-lucide="copy" style="width:11px;height:11px;"></i>';
      lucide.createIcons();
    }, 1500);
  });
}

function toggleExecRefItem(btn) {
  const content = btn.nextElementSibling;
  const isOpen = content.style.display !== 'none';
  content.style.display = isOpen ? 'none' : 'block';
  btn.classList.toggle('open', !isOpen);
  lucide.createIcons();
}

function renderFormReference(task, defaultOpen) {
  if (!task.formData) return '';
  const tabs = (FLOW_CONFIG.FORM_TABS_BY_TYPE || {})[task.typeCode] || [];
  if (!tabs.length) return '';

  const open = !!defaultOpen;
  const display = open ? 'block' : 'none';
  const triggerClass = open ? 'exec-ref-trigger open' : 'exec-ref-trigger';

  const savedEdit = state._editMode && state._editMode[task.id];
  if (state._editMode) state._editMode[task.id] = false;

  const items = tabs.map((tab, idx) => {
    const abaData = task.formData.abas && task.formData.abas[tab.id];
    const rawHtml = FLOW_CONFIG.renderFormTab(tab.id, abaData || {});
    const content = injectCopyButtons(rawHtml);
    return `<div class="exec-ref-item">
      <button class="${triggerClass}" onclick="toggleExecRefItem(this)">
        <span>${tab.label}</span>
        <i data-lucide="chevron-down" class="exec-ref-chevron" style="width:16px;height:16px;"></i>
      </button>
      <div class="exec-ref-content" style="display:${display};">${content}</div>
    </div>`;
  }).join('');

  if (state._editMode) state._editMode[task.id] = savedEdit;

  const anexos = task.attachments || [];
  const anexosBadge = anexos.length ? `<span class="exec-ref-badge">(${anexos.length})</span>` : '';
  const anexosBody = anexos.length
    ? anexos.map(a => `<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);"><i data-lucide="paperclip" style="width:14px;height:14px;color:var(--text-secondary);flex-shrink:0;"></i><div style="flex:1;min-width:0;"><div style="font-size:13px;font-weight:500;">${a.name}</div><div style="font-size:11px;color:var(--text-secondary);">${a.size}</div></div></div>`).join('')
    : `<div style="font-size:13px;color:var(--text-secondary);">Nenhum anexo enviado.</div>`;

  const anexosItem = `<div class="exec-ref-item">
    <button class="${triggerClass}" onclick="toggleExecRefItem(this)">
      <span>Anexos${anexosBadge}</span>
      <i data-lucide="chevron-down" class="exec-ref-chevron" style="width:16px;height:16px;"></i>
    </button>
    <div class="exec-ref-content" style="display:${display};">${anexosBody}</div>
  </div>`;

  return `<div class="exec-ref-card">${items}${anexosItem}</div>`;
}

function handleStepAction(stepIdx) {
  const task = getTaskById(state.currentTaskId);
  if (!task) return;
  const step = getExecSteps()[stepIdx];
  const progress = state._execProgress[task.id] || 0;
  const alreadyDone = stepIdx < progress;
  if (!state._execActions[task.id]) state._execActions[task.id] = {};
  state._execActions[task.id][stepIdx] = true;
  if (alreadyDone) {
    flash(`${step.action.label} — repetido.`, 'info');
    return;
  }
  if (step.autoCompleteOnAction) {
    flash(`${step.action.label} — concluído.`, 'success');
    const total = getExecSteps().length;
    if (stepIdx + 1 >= total) { openConfirmFinish(); return; }
    state._execProgress[task.id] = stepIdx + 1;
    renderExecution(task);
    return;
  }
  flash(`${step.action.label} — ação registrada. Marque como feito quando concluído.`, 'info');
  renderExecution(task);
}

function marcarPassoFeito(stepIdx) {
  const task = getTaskById(state.currentTaskId);
  if (!task) return;
  const total = getExecSteps().length;
  if (stepIdx + 1 >= total) { openConfirmFinish(); return; }
  state._execProgress[task.id] = stepIdx + 1;
  renderExecution(task);
}

function toggleStepExpanded(stepIdx) {
  const task = getTaskById(state.currentTaskId);
  if (!task) return;
  if (!state._execStepExpanded) state._execStepExpanded = {};
  if (!state._execStepExpanded[task.id]) state._execStepExpanded[task.id] = {};
  state._execStepExpanded[task.id][stepIdx] = !state._execStepExpanded[task.id][stepIdx];
  renderExecution(task);
}

/* ============================================================
   MODAL: CONFIRM FINISH
   ============================================================ */
function openConfirmFinish() {
  const task = getTaskById(state.currentTaskId);
  if (!task) return;
  qs('#confirm-finish-detail').innerHTML = `Você marcou todas as etapas de <strong>${task.type}</strong> de <strong>${task.clientName}</strong> como feitas.`;
  qs('#modal-confirm-finish').classList.remove('hidden');
  refreshIcons();
}

function closeConfirmFinish() { qs('#modal-confirm-finish').classList.add('hidden'); }

function confirmarFinalizacao() {
  const task = getTaskById(state.currentTaskId);
  if (!task) return;
  const completedTask = { ...task, completedAt: 'agora mesmo' };
  state.completed.push(completedTask);
  state.active = null;
  closeConfirmFinish();
  renderSuccess(completedTask);
  showScreen('success');
}

/* ============================================================
   RENDER: SUCCESS
   ============================================================ */
function renderSuccess(task) {
  const cfg = window.FLOW_CONFIG;
  const mensagem = cfg.successMessage
    ? cfg.successMessage(task)
    : `A solicitação foi processada e o cliente já foi notificado.`;
  qs('#success-message').innerHTML = mensagem;

  const colaborador = task.formData && task.formData.colaborador ? task.formData.colaborador.nome : null;
  const rows = [['Empresa', task.clientName], ['CNPJ', task.cnpj], ['Tipo', task.type]];
  if (colaborador) rows.push(['Colaborador', colaborador]);
  rows.push(['Operador(a)', 'Daniele Ribeiro']);
  rows.push(['Concluída em', 'hoje às ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })]);
  rows.push(['Tarefa', '#' + task.id]);
  qs('#success-summary').innerHTML = rows.map(([label, value]) => `<div class="summary-row"><span class="summary-label">${label}</span><span class="summary-value">${value}</span></div>`).join('');
}

/* ============================================================
   DRAWERS
   ============================================================ */
function openDrawer(type) {
  if (type === 'estacionadas') {
    qs('#drawer-title').textContent = 'Tarefas em espera';
    qs('#drawer-subtitle').textContent = `${state.stationed.length} aguardando o cliente responder`;
    qs('#drawer-body').innerHTML = state.stationed.length === 0
      ? `<div style="padding: 24px; text-align: center; color: var(--text-tertiary);">Nenhuma tarefa em espera.</div>`
      : state.stationed.map(t => `<div class="task-item" style="margin-bottom: 8px;"><div style="flex: 1;"><div style="font-size: 11px; color: var(--text-tertiary); text-transform: uppercase;">${t.type}</div><div style="font-weight: 600;">${t.clientName}</div></div>${t.clientResponded ? `<span class="badge badge-pink">Respondeu</span>` : `<span class="badge badge-warning">Aguardando</span>`}</div>`).join('');
  } else {
    qs('#drawer-title').textContent = 'Tarefas concluídas hoje';
    qs('#drawer-subtitle').textContent = `${state.completed.length} finalizadas`;
    qs('#drawer-body').innerHTML = state.completed.length === 0
      ? `<div style="padding: 24px; text-align: center; color: var(--text-tertiary);">Nenhuma tarefa concluída ainda hoje.</div>`
      : state.completed.map(t => `<div class="task-item" style="margin-bottom: 8px; cursor: default;"><div style="flex: 1;"><div style="font-size: 11px; color: var(--text-tertiary); text-transform: uppercase;">${t.type}</div><div style="font-weight: 600;">${t.clientName}</div></div><span class="badge badge-success"><i data-lucide="check" class="w-3 h-3"></i> Concluída</span></div>`).join('');
  }
  qs('#modal-drawer').classList.remove('hidden');
  refreshIcons();
}

function closeDrawer() { qs('#modal-drawer').classList.add('hidden'); }

/* ============================================================
   NOTIFICAÇÕES
   ============================================================ */
function renderNotifications() {
  const list = qs('#notif-list');
  list.innerHTML = state.notifications.map(n => `
    <div class="notif-item">
      ${n.unread ? '<div class="dot"></div>' : '<div style="width: 8px; flex-shrink: 0;"></div>'}
      <div style="flex: 1;"><div style="font-size: 13px; color: var(--text-primary); line-height: 1.45;">${n.text}</div><div style="font-size: 11px; color: var(--text-tertiary); margin-top: 4px;">${n.time}</div></div>
    </div>
  `).join('');
  qs('#notif-dot').style.display = state.notifications.some(n => n.unread) ? 'block' : 'none';
}

/* ============================================================
   SIMULAÇÕES
   ============================================================ */
function simularRespostaCliente() {
  const aguardando = state.stationed.find(t => !t.clientResponded);
  if (!aguardando) { showAlertModal({ title: 'Sem tarefas em espera', message: 'Não há tarefas aguardando resposta do cliente. Coloque uma tarefa em espera primeiro.' }); return; }
  aguardando.clientResponded = true;
  aguardando.respondedAt = 'agora mesmo';
  if (!state.messages[aguardando.id]) state.messages[aguardando.id] = [];
  const cfg = window.FLOW_CONFIG;
  const simMsg = cfg.simulateClientResponseText
    ? cfg.simulateClientResponseText(aguardando)
    : 'Prontinho, segue o documento reenviado em melhor qualidade. Qualquer outra coisa me avisa!';
  state.messages[aguardando.id].push({ from: 'client', text: simMsg, timestamp: 'agora mesmo' });
  state.notifications.unshift({ id: Date.now(), text: `Cliente de ${aguardando.clientName} respondeu a tarefa em espera`, time: 'agora mesmo', unread: true });
  if (state.currentScreen === 'home') renderHome();
  renderNotifications();
  flash(`Cliente de ${aguardando.clientName} respondeu!`, 'info');
}

function resetDemo() {
  showConfirmModal({
    title: 'Resetar protótipo',
    message: 'Voltar ao estado inicial? Todas as alterações feitas na sessão serão perdidas.',
    confirmLabel: 'Resetar',
    danger: true,
    onConfirm: () => { _initState(); sortQueueBySLA(); renderNotifications(); goHome(); },
  });
}

/* ============================================================
   FLASH
   ============================================================ */
function flash(msg, type) {
  const colors = {
    success: { bg: '#dcfce7', text: '#166534', border: '#86efac' },
    info:    { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd' },
    warning: { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' },
  };
  const c = colors[type || 'info'];
  const el = document.createElement('div');
  el.style.cssText = `position:fixed;top:60px;left:50%;transform:translateX(-50%);background:${c.bg};color:${c.text};border:1px solid ${c.border};padding:10px 18px;border-radius:999px;font-size:13px;font-weight:500;z-index:300;box-shadow:0 10px 30px rgba(0,0,0,0.12);`;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .25s'; }, 2600);
  setTimeout(() => el.remove(), 3000);
}

/* ============================================================
   INIT
   ============================================================ */
function _initCockpit() {
  _buildShell();
  _initState();
  // Wire up notification toggle after shell is in the DOM
  qs('#notif-toggle').addEventListener('click', () => { qs('#notif-panel').classList.toggle('hidden'); });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#notif-toggle') && !e.target.closest('#notif-panel')) qs('#notif-panel').classList.add('hidden');
  });
  sortQueueBySLA();
  renderHome();
  renderNotifications();
  refreshIcons();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _initCockpit);
} else {
  _initCockpit();
}
import { useState } from 'react';

export default function JsonPanel({ program }) {
  const [copied, setCopied] = useState(false);
  const json = JSON.stringify(program, null, 2);

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <aside className="json-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Output</p>
          <h2>Generated JSON</h2>
        </div>
        <button type="button" onClick={copyJson}>{copied ? 'Copied!' : 'Copy JSON'}</button>
      </div>
      <pre>{json}</pre>
    </aside>
  );
}

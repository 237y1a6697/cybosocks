import { useState } from 'react';
import BlocklyEditor from './components/BlocklyEditor';
import JsonPanel from './components/JsonPanel';
import { workspaceToJson } from './generator/jsonGenerator';
import './styles.css';

export default function App() {
  const [program, setProgram] = useState({ program: [] });

  function handleWorkspaceChange(workspace) {
    setProgram(workspaceToJson(workspace));
  }

  return (
    <main className="app-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Cybosocks screening task</p>
          <h1>Build a turtle program</h1>
          <p className="intro">Stack colourful blocks, then pass the generated JSON to the Java runner.</p>
        </div>
        <div className="header-note">React + Blockly</div>
      </header>
      <section className="workspace-layout">
        <section className="editor-panel">
          <div className="section-label">Block editor</div>
          <BlocklyEditor onWorkspaceChange={handleWorkspaceChange} />
        </section>
        <JsonPanel program={program} />
      </section>
    </main>
  );
}

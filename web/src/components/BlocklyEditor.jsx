import { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';
import { registerCustomBlocks, starterXml, toolbox } from '../blocks/customBlocks';

export default function BlocklyEditor({ onWorkspaceChange }) {
  const containerRef = useRef(null);
  const workspaceRef = useRef(null);
  const changeHandlerRef = useRef(onWorkspaceChange);

  useEffect(() => {
    changeHandlerRef.current = onWorkspaceChange;
  }, [onWorkspaceChange]);

  useEffect(() => {
    registerCustomBlocks();
    const workspace = Blockly.inject(containerRef.current, {
      toolbox,
      trashcan: true,
      scrollbars: true,
      grid: { spacing: 20, length: 3, colour: '#dbe4ee', snap: true }
    });
    workspaceRef.current = workspace;
    Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(starterXml), workspace);

    const updateJson = () => changeHandlerRef.current(workspace);
    workspace.addChangeListener(updateJson);
    updateJson();

    return () => {
      workspace.dispose();
      workspaceRef.current = null;
    };
  }, []);

  return <div ref={containerRef} className="blockly-host" aria-label="Blockly program workspace" />;
}

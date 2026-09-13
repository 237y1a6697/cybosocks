function safeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? Math.floor(number) : 0;
}

function convertBlock(block) {
  if (block.type === 'move') {
    return { type: 'move', steps: safeNumber(block.getFieldValue('STEPS')) };
  }

  if (block.type === 'turn') {
    const direction = block.getFieldValue('DIRECTION');
    return { type: 'turn', direction: direction === 'right' ? 'right' : 'left' };
  }

  if (block.type === 'say') {
    return { type: 'say', text: block.getFieldValue('TEXT') || '' };
  }

  if (block.type === 'repeat') {
    const body = [];
    let child = block.getInputTargetBlock('BODY');
    while (child) {
      body.push(convertBlock(child));
      child = child.getNextBlock();
    }
    return {
      type: 'repeat',
      times: safeNumber(block.getFieldValue('TIMES')),
      body
    };
  }

  return null;
}

export function workspaceToJson(workspace) {
  const program = [];
  const topBlocks = workspace.getTopBlocks(true);

  for (const topBlock of topBlocks) {
    let block = topBlock;
    while (block) {
      const converted = convertBlock(block);
      if (converted) {
        program.push(converted);
      }
      block = block.getNextBlock();
    }
  }

  return { program };
}

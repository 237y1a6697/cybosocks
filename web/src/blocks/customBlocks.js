import * as Blockly from 'blockly';

export function registerCustomBlocks() {
  Blockly.Blocks.move = {
    init() {
      this.appendDummyInput()
        .appendField('MOVE')
        .appendField(new Blockly.FieldNumber(1, 0, 1000), 'STEPS')
        .appendField('STEPS');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour('#3b82f6');
      this.setTooltip('Move the turtle forward by zero or more steps.');
    }
  };

  Blockly.Blocks.turn = {
    init() {
      this.appendDummyInput()
        .appendField('TURN')
        .appendField(new Blockly.FieldDropdown([
          ['LEFT', 'left'],
          ['RIGHT', 'right']
        ]), 'DIRECTION');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour('#f59e0b');
      this.setTooltip('Turn the turtle 90 degrees.');
    }
  };

  Blockly.Blocks.say = {
    init() {
      this.appendDummyInput()
        .appendField('SAY')
        .appendField(new Blockly.FieldTextInput('Hello'), 'TEXT');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour('#22c55e');
      this.setTooltip('Make the turtle say some text.');
    }
  };

  Blockly.Blocks.repeat = {
    init() {
      this.appendDummyInput()
        .appendField('REPEAT')
        .appendField(new Blockly.FieldNumber(2, 0, 1000), 'TIMES')
        .appendField('TIMES');
      this.appendStatementInput('BODY').appendField('DO');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour('#a855f7');
      this.setTooltip('Repeat the blocks inside this section. Repeat blocks can be nested.');
    }
  };
}

export const toolbox = {
  kind: 'flyoutToolbox',
  contents: [
    { kind: 'block', type: 'move' },
    { kind: 'block', type: 'turn' },
    { kind: 'block', type: 'say' },
    { kind: 'block', type: 'repeat' }
  ]
};

export const starterXml = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="say" x="30" y="30">
    <field name="TEXT">Hello!</field>
    <next>
      <block type="move">
        <field name="STEPS">2</field>
        <next>
          <block type="turn">
            <field name="DIRECTION">right</field>
            <next>
              <block type="repeat">
                <field name="TIMES">2</field>
                <statement name="BODY">
                  <block type="move">
                    <field name="STEPS">1</field>
                    <next>
                      <block type="repeat">
                        <field name="TIMES">2</field>
                        <statement name="BODY">
                          <block type="say">
                            <field name="TEXT">Inside repeat</field>
                          </block>
                        </statement>
                      </block>
                    </next>
                  </block>
                </statement>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`;

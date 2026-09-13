# Cybosocks Screening Task

## Overview

Part A is a React + Blockly editor for building a child-friendly turtle program. Part B is a Java console runtime that reads the editor's JSON and executes it. The two projects communicate only through the JSON format described below.

## Tech Stack

Part A:
- React
- Vite
- JavaScript
- Blockly
- CSS

Part B:
- Java 21
- Maven
- Jackson

## Repository Structure

```text
web/       React + Blockly block builder
runner/    Java turtle runtime
README.md
```

## Running Part A

```bash
cd web
npm install
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

Drag the four custom blocks from the toolbox, connect them, and watch the JSON update in the panel. The Copy JSON button copies the exact output.

## Running Part B

Java 21 and Maven are required.

In Windows PowerShell, if `java -version` shows Java 17 or `mvn` is not recognized, set the tools for the current terminal session first:

```powershell
$env:JAVA_HOME = "$HOME\.jdk\jdk-21.0.10"
$env:Path = "$env:JAVA_HOME\bin;$HOME\.maven\maven-3.9.15\bin;$env:Path"
java -version
mvn -version
```

Then build and run from the `runner` directory:

```bash
cd runner
mvn clean package
java -jar target/runner.jar program.json
```

The Maven build creates an executable JAR containing Jackson. Replace `program.json` with JSON copied from Part A to run a different program.

## JSON Format

```json
{
  "program": [
    { "type": "say", "text": "Hello" },
    { "type": "move", "steps": 3 },
    {
      "type": "repeat",
      "times": 2,
      "body": [
        { "type": "turn", "direction": "right" },
        { "type": "move", "steps": 1 }
      ]
    }
  ]
}
```

The allowed block types are `move`, `turn`, `say`, and `repeat`. Repeat bodies can contain any allowed block, including another repeat.

## Testing

The sample `runner/program.json` demonstrates say, move, turn, repeat, and nested repeat. Also test a single move, a right turn followed by a move, a say block, nested repeats, four right turns, negative values, malformed JSON, and an unknown block type. Invalid input prints one clear error line and does not print a stack trace.

## Part C - AI Usage

### AI tools used

I used:
- GitHub Copilot

Copilot was used for:
- project scaffolding
- Blockly implementation assistance
- JSON generator assistance
- Java implementation assistance
- code review and debugging

### One thing AI got wrong

The first JSON generator only followed the first top-level Blockly block chain, so disconnected top-level blocks could be missing from the exported program. I noticed this while reviewing the generator against the required top-level ordering rule, then changed it to walk every top-level block chain.

### One decision I am unsure about

The Java runner uses Jackson `JsonNode` values instead of separate Java model classes. This keeps the screening task small and makes recursive validation easy to follow, but model classes could make the schema more strongly typed in a larger application.

### What I would do with another 5 hours

- Add automated tests
- Improve the Blockly UI
- Strengthen validation and edge-case coverage
- Improve error messages
- Clean up code after more user testing

## Part D - Video

Video: [PASTE LOOM/YOUTUBE/DRIVE LINK HERE]

The video will demonstrate:

1. Open the React editor.
2. Build a nested Repeat.
3. Show Repeat inside Repeat.
4. Show generated JSON.
5. Copy JSON.
6. Save JSON as `program.json`.
7. Run the Java JAR.
8. Show console output.
9. Point to one piece of code I am proud of.
10. Explain why in one sentence.

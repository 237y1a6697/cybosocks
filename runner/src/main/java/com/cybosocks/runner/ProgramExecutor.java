package com.cybosocks.runner;

import com.fasterxml.jackson.databind.JsonNode;

public class ProgramExecutor {
    private final Turtle turtle;

    public ProgramExecutor(Turtle turtle) {
        this.turtle = turtle;
    }

    public void executeProgram(JsonNode root) {
        for (JsonNode block : root.get("program")) {
            executeBlock(block);
        }
    }

    private void executeBlock(JsonNode block) {
        switch (block.get("type").asText()) {
            case "move" -> turtle.move(block.get("steps").asInt());
            case "turn" -> executeTurn(block.get("direction").asText());
            case "say" -> System.out.println(block.get("text").asText());
            case "repeat" -> executeRepeat(block);
        }
    }

    private void executeTurn(String direction) {
        if (direction.equals("left")) {
            turtle.turnLeft();
        } else {
            turtle.turnRight();
        }
    }

    private void executeRepeat(JsonNode block) {
        for (int count = 0; count < block.get("times").asInt(); count++) {
            for (JsonNode child : block.get("body")) {
                executeBlock(child);
            }
        }
    }
}

package com.cybosocks.runner;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.io.IOException;
import java.nio.file.Path;

public class JsonProgramReader {
    private final ObjectMapper objectMapper = new ObjectMapper();

    public JsonNode read(Path path) throws IOException, ValidationException {
        JsonNode root;
        try {
            root = objectMapper.readTree(path.toFile());
        } catch (JsonProcessingException exception) {
            throw new ValidationException("malformed JSON");
        }
        validateRoot(root);
        return root;
    }

    private void validateRoot(JsonNode root) throws ValidationException {
        if (root == null || !root.isObject()) {
            throw new ValidationException("invalid JSON structure");
        }
        JsonNode program = root.get("program");
        if (program == null || !program.isArray()) {
            throw new ValidationException("missing program");
        }
        for (JsonNode block : program) {
            validateBlock(block);
        }
    }

    private void validateBlock(JsonNode block) throws ValidationException {
        if (block == null || !block.isObject()) {
            throw new ValidationException("invalid block structure");
        }
        JsonNode typeNode = block.get("type");
        if (typeNode == null || !typeNode.isTextual()) {
            throw new ValidationException("unknown block type: null");
        }

        String type = typeNode.asText();
        switch (type) {
            case "move" -> validateMove(block);
            case "turn" -> validateTurn(block);
            case "say" -> validateSay(block);
            case "repeat" -> validateRepeat(block);
            default -> throw new ValidationException("unknown block type: " + type);
        }
    }

    private void validateMove(JsonNode block) throws ValidationException {
        JsonNode steps = block.get("steps");
        if (steps == null || !steps.isIntegralNumber()) {
            throw new ValidationException("move requires steps");
        }
        if (steps.asLong() < 0) {
            throw new ValidationException("steps cannot be negative");
        }
        if (!steps.canConvertToInt()) {
            throw new ValidationException("steps is too large");
        }
    }

    private void validateTurn(JsonNode block) throws ValidationException {
        JsonNode direction = block.get("direction");
        if (direction == null || !direction.isTextual()) {
            throw new ValidationException("turn requires direction");
        }
        String value = direction.asText();
        if (!value.equals("left") && !value.equals("right")) {
            throw new ValidationException("invalid direction: " + value);
        }
    }

    private void validateSay(JsonNode block) throws ValidationException {
        if (block.get("text") == null || !block.get("text").isTextual()) {
            throw new ValidationException("say requires text");
        }
    }

    private void validateRepeat(JsonNode block) throws ValidationException {
        JsonNode times = block.get("times");
        if (times == null || !times.isIntegralNumber()) {
            throw new ValidationException("repeat requires times");
        }
        if (times.asLong() < 0) {
            throw new ValidationException("repeat times cannot be negative");
        }
        if (!times.canConvertToInt()) {
            throw new ValidationException("repeat times is too large");
        }
        JsonNode body = block.get("body");
        if (body == null || !body.isArray()) {
            throw new ValidationException("repeat requires body");
        }
        for (JsonNode child : body) {
            validateBlock(child);
        }
    }
}

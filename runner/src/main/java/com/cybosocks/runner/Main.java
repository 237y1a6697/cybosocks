package com.cybosocks.runner;

import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        if (args.length != 1) {
            System.out.println("Error: usage: java -jar runner.jar program.json");
            return;
        }

        try {
            JsonNode program = new JsonProgramReader().read(Path.of(args[0]));
            Turtle turtle = new Turtle();
            new ProgramExecutor(turtle).executeProgram(program);
            System.out.printf("Final position: (%d, %d) facing %s%n",
                    turtle.getX(), turtle.getY(), formatDirection(turtle.getDirection()));
        } catch (ValidationException exception) {
            System.out.println("Error: " + exception.getMessage());
        } catch (IOException exception) {
            System.out.println("Error: could not read JSON file");
        }
    }

    private static String formatDirection(Turtle.Direction direction) {
        String value = direction.name().toLowerCase();
        return Character.toUpperCase(value.charAt(0)) + value.substring(1);
    }
}

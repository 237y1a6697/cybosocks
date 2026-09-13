package com.cybosocks.runner;

public class Turtle {
    public enum Direction {
        NORTH, EAST, SOUTH, WEST
    }

    private int x;
    private int y;
    private Direction direction = Direction.NORTH;

    public void move(int steps) {
        switch (direction) {
            case NORTH -> y += steps;
            case EAST -> x += steps;
            case SOUTH -> y -= steps;
            case WEST -> x -= steps;
        }
    }

    public void turnLeft() {
        direction = switch (direction) {
            case NORTH -> Direction.WEST;
            case WEST -> Direction.SOUTH;
            case SOUTH -> Direction.EAST;
            case EAST -> Direction.NORTH;
        };
    }

    public void turnRight() {
        direction = switch (direction) {
            case NORTH -> Direction.EAST;
            case EAST -> Direction.SOUTH;
            case SOUTH -> Direction.WEST;
            case WEST -> Direction.NORTH;
        };
    }

    public int getX() { return x; }
    public int getY() { return y; }
    public Direction getDirection() { return direction; }
}

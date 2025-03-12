package org.example.weblab2;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Point implements Serializable {
    private double x;
    private double y;
    private double radius;
    private boolean hit;
    private static List<Point> history = new ArrayList<>();

    public Point(double x, double y, double radius) {
        this.x = x*radius;
        this.y = y*radius;
        this.radius = radius;
        this.hit = checkPoint(x, y);

        // Добавляем новую точку в список истории
        history.add(this);
    }

    public double getX() { return x; }
    public void setX(double x) { this.x = x; }

    public double getY() { return y; }
    public void setY(double y) { this.y = y; }

    public double getRadius() { return radius; }
    public void setRadius(double radius) { this.radius = radius; }

    public boolean isHit() { return hit; }
    public void setHit(boolean hit) { this.hit = hit; }

    // Получаем историю точек
    public static List<Point> getHistory() {
        return history;
    }

    public String makeAnswer(double x, double y, double r) {
        return  "" + x*r + "," + y*r + "," + r + "," + checkPoint(x, y);
    }

    public boolean checkPoint(double x, double y) {
        x = x * radius;
        y = y * radius;
        if (x >= 0 && y <= 0 && x * x + y * y <= 1) {
            return true;
        } else if (x >= 0 && y >= 0 && y <= -0.5 * x + 1) {
            return true;
        } else {
            return x <= 0 && y <= 0 && x >= -2 && y >= -1;
        }
    }
}

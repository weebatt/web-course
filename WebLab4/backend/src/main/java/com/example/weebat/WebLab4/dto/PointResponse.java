package com.example.weebat.WebLab4.dto;

public class PointResponse {
    private double x;
    private double y;
    private boolean hit;

    public PointResponse(double x, double y, boolean hit) {
        this.x = x;
        this.y = y;
        this.hit = hit;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public boolean isHit() {
        return hit;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }
}

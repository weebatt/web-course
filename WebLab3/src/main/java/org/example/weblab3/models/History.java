package org.example.weblab3.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "history")
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "x", nullable = false)
    private int x;

    @Column(name = "y", nullable = false)
    private double y;

    @Column(name = "radius", nullable = false)
    private int radius;

    @Column(name = "hit_status", nullable = false, length = 50)
    private Boolean hitStatus;

    @Column(name = "date", nullable = false)
    private LocalDateTime date;

    // Constructors
    public History() {
    }

    public History(int x, double y, int radius, Boolean hitStatus, LocalDateTime date) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.hitStatus = hitStatus;
        this.date = date;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public int getRadius() {
        return radius;
    }

    public void setRadius(int radius) {
        this.radius = radius;
    }

    public Boolean getHitStatus() {
        return hitStatus;
    }

    public void setHitStatus(Boolean hitStatus) {
        this.hitStatus = hitStatus;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}

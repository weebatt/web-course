package com.example.weebat.WebLab4.controllers;

import com.example.weebat.WebLab4.dto.PointRequest;
import com.example.weebat.WebLab4.dto.PointResponse;
import com.example.weebat.WebLab4.models.Point;
import com.example.weebat.WebLab4.repositories.PointRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class PointController {

    private final PointRepository pointRepository;

    public PointController(PointRepository pointRepository) {
        this.pointRepository = pointRepository;
    }

    @PostMapping("/check-point")
    public PointResponse checkPoint(@RequestBody PointRequest request) {
        boolean hit = isPointInsideFigure(request.getX(), request.getY(), request.getR());

        Point point = new Point(request.getX(), request.getY(), request.getR(), hit);
        System.out.println("Checking point (" + request.getX() + ", " + request.getY() + ") with R = " + request.getR() + " with Hit = " + hit);
        pointRepository.save(point);

        return new PointResponse(request.getX(), request.getY(), hit);
    }

    @PostMapping("/check-point-button")
    public PointResponse checkPointButton(@RequestBody PointRequest request) {
        boolean hit = isPointInsideFigure(request.getX(), request.getY(), request.getR());

        Point point = new Point(request.getX(), request.getY(), request.getR(), hit);
        pointRepository.save(point);

        return new PointResponse(request.getX(), request.getY(), hit);
    }

    @PostMapping("/check-all-points")
    public List<PointResponse> checkAllPoints(@RequestBody List<PointRequest> requests) {
        List<Point> points = requests.stream()
                .map(request -> {
                    boolean hit = isPointInsideFigure(request.getX(), request.getY(), request.getR());
                    return new Point(request.getX(), request.getY(), request.getR(), hit);
                })
                .collect(Collectors.toList());

        pointRepository.saveAll(points);

        return points.stream()
                .map(point -> new PointResponse(point.getX(), point.getY(), point.isHit()))
                .collect(Collectors.toList());
    }

    @DeleteMapping("/clear-points")
    public void clearPoints() {
        pointRepository.deleteAll();
    }

    private boolean isPointInsideFigure(double x, double y, double r) {
        return x >= 0 && y >= 0 && x * x + y * y <= (double) 4/r*r
                || x <= 0 && y <= 0 && y >= -x - (double) 2
                || x >= 0 && y <= 0 && x <= (double) 1 && y >= (double) -2;
    }
}
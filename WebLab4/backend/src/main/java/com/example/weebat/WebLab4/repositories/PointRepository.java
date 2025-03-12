package com.example.weebat.WebLab4.repositories;

import com.example.weebat.WebLab4.models.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PointRepository extends JpaRepository<Point, Long> {
}
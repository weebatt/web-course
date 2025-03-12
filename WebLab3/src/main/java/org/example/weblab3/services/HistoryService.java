package org.example.weblab3.services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import org.example.weblab3.models.History;

import java.time.LocalDateTime;

public class HistoryService {

    private final EntityManagerFactory entityManagerFactory;

    public HistoryService() {
        // Создаем EntityManagerFactory с указанным persistence unit
        entityManagerFactory = Persistence.createEntityManagerFactory("weblab3");
    }

    public void addHistoryRecord(int x, double y, int radius, Boolean hitStatus) {
        // Создаем EntityManager
        EntityManager entityManager = entityManagerFactory.createEntityManager();

        // Создаем новую запись истории
        History history = new History(x, y, radius, hitStatus, LocalDateTime.now());

        // Начинаем транзакцию
        entityManager.getTransaction().begin();

        // Сохраняем объект в базе данных
        entityManager.persist(history);

        // Завершаем транзакцию
        entityManager.getTransaction().commit();

        // Закрываем EntityManager
        entityManager.close();
    }

    public void close() {
        // Закрываем фабрику менеджеров сущностей при завершении работы
        entityManagerFactory.close();
    }
}

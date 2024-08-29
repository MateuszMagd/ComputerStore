package com.app.backend.repository;

import com.app.backend.Enums.StatusType;
import com.app.backend.entities.Order;
import com.app.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findByUserIdAndStatus(User userId, StatusType status);

    // Zaktualizuj status zamówienia na podstawie userId i statusu
    @Modifying
    @Transactional
    @Query("UPDATE Order o SET o.status = :newStatus WHERE o.userId = :userId AND o.status = :currentStatus")
    int updateStatusByUserIdAndStatus(@Param("userId") User userId,
                                      @Param("currentStatus") StatusType currentStatus,
                                      @Param("newStatus") StatusType newStatus);
}

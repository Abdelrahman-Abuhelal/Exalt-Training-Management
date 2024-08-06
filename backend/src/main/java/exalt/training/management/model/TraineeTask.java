package exalt.training.management.model;


import exalt.training.management.model.users.Trainee;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "trainee_tasks")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TraineeTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "task_id", nullable = false)
    private Task task;

    @ManyToOne
    @JoinColumn(name = "trainee_id", nullable = false)
    private Trainee trainee;

    @Column(nullable = false)
    private LocalDateTime dateAssigned;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    private Boolean approved = false;

    @OneToMany(mappedBy = "traineeTask", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();
}

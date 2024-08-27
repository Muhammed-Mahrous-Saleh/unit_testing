export default class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(title, priority, dueDate) {
        if (!title || typeof title !== "string") {
            throw new Error("Title is required and must be a string.");
        }

        if (!["low", "medium", "high"].includes(priority)) {
            throw new Error(
                'Priority must be one of "low", "medium", or "high".'
            );
        }

        const task = {
            id: this.tasks.length + 1,
            title,
            priority,
            dueDate: new Date(dueDate),
            completed: false,
        };
        this.tasks.push(task);
    }

    completeTask(id) {
        const task = this.tasks.find((t) => t.id === id);
        if (!task) {
            throw new Error("Task not found.");
        }
        task.completed = true;
    }

    deleteTask(id) {
        const index = this.tasks.findIndex((t) => t.id === id);
        if (index === -1) {
            throw new Error("Task not found.");
        }
        this.tasks.splice(index, 1);
    }

    filterTasks(status = "all") {
        if (status === "completed") {
            return this.tasks.filter((t) => t.completed);
        } else if (status === "pending") {
            return this.tasks.filter((t) => !t.completed);
        } else if (status === "all") {
            return this.tasks;
        } else {
            throw new Error("Invalid status filter.");
        }
    }

    sortTasks(by = "priority") {
        if (by === "priority") {
            return this.tasks.sort(
                (a, b) =>
                    this.priorityOrder(a.priority) -
                    this.priorityOrder(b.priority)
            );
        } else if (by === "dueDate") {
            return this.tasks.sort((a, b) => a.dueDate - b.dueDate);
        } else {
            throw new Error("Invalid sort option.");
        }
    }

    priorityOrder(priority) {
        switch (priority) {
            case "low":
                return 3;
            case "medium":
                return 2;
            case "high":
                return 1;
            default:
                return 4;
        }
    }
}

import TaskManager from "./taskManager.js";

describe("TaskManager", () => {
    let taskManager;

    beforeEach(() => {
        taskManager = new TaskManager();
    });

    test("should add a new task", () => {
        taskManager.addTask("Test Task", "high", "2024-09-01");
        const tasks = taskManager.filterTasks();
        expect(tasks.length).toBe(1);
        expect(tasks[0].title).toBe("Test Task");
    });

    test("should throw an error when adding a task with invalid priority", () => {
        expect(() =>
            taskManager.addTask("Invalid Task", "urgent", "2024-09-01")
        ).toThrow('Priority must be one of "low", "medium", or "high".');
    });

    test("should mark a task as completed", () => {
        taskManager.addTask("Test Task", "high", "2024-09-01");
        taskManager.completeTask(1);
        const completedTasks = taskManager.filterTasks("completed");
        expect(completedTasks.length).toBe(1);
        expect(completedTasks[0].completed).toBe(true);
    });

    test("should throw an error when completing a non-existent task", () => {
        expect(() => taskManager.completeTask(999)).toThrow("Task not found.");
    });

    test("should delete a task", () => {
        taskManager.addTask("Test Task", "high", "2024-09-01");
        taskManager.deleteTask(1);
        const tasks = taskManager.filterTasks();
        expect(tasks.length).toBe(0);
    });

    test("should throw an error when deleting a non-existent task", () => {
        expect(() => taskManager.deleteTask(999)).toThrow("Task not found.");
    });

    test("should filter tasks by status", () => {
        taskManager.addTask("Task 1", "high", "2024-09-01");
        taskManager.addTask("Task 2", "medium", "2024-09-02");
        taskManager.completeTask(1);

        const completedTasks = taskManager.filterTasks("completed");
        expect(completedTasks.length).toBe(1);
        expect(completedTasks[0].title).toBe("Task 1");

        const pendingTasks = taskManager.filterTasks("pending");
        expect(pendingTasks.length).toBe(1);
        expect(pendingTasks[0].title).toBe("Task 2");
    });

    test("should throw an error when filtering tasks by an invalid status", () => {
        expect(() => taskManager.filterTasks("invalid")).toThrow(
            "Invalid status filter."
        );
    });

    test("should sort tasks by priority", () => {
        taskManager.addTask("Task 1", "medium", "2024-09-01");
        taskManager.addTask("Task 2", "high", "2024-09-02");
        taskManager.addTask("Task 3", "low", "2024-09-03");

        const sortedTasks = taskManager.sortTasks("priority");
        expect(sortedTasks[0].priority).toBe("high");
        expect(sortedTasks[1].priority).toBe("medium");
        expect(sortedTasks[2].priority).toBe("low");
    });

    test("should sort tasks by due date", () => {
        taskManager.addTask("Task 1", "medium", "2024-09-03");
        taskManager.addTask("Task 2", "high", "2024-09-01");
        taskManager.addTask("Task 3", "low", "2024-09-02");

        const sortedTasks = taskManager.sortTasks("dueDate");
        expect(sortedTasks[0].dueDate).toEqual(new Date("2024-09-01"));
        expect(sortedTasks[1].dueDate).toEqual(new Date("2024-09-02"));
        expect(sortedTasks[2].dueDate).toEqual(new Date("2024-09-03"));
    });

    test("should throw an error when sorting tasks by an invalid option", () => {
        expect(() => taskManager.sortTasks("invalid")).toThrow(
            "Invalid sort option."
        );
    });
});

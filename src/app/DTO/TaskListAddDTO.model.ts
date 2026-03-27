export interface TaskListAdd {
    title: string;
    completed: boolean;
    dueDate: Date;
    priority: "High" | "Medium" | "Low";
}
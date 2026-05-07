import { addDays } from "date-fns";

export default class ToDo {
    id = crypto.randomUUID();
    completionStatus = false;

    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    changeCompletionStatus() {
        this.completionStatus = !this.completionStatus;
    }
}

export const Priority = Object.freeze({
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high",
});
export class Task {
    taskId: number;
    done: boolean;
    title: string;
    folderId: number;
    /*
    constructor(done: boolean, title: string) {
        this.done = done;
        this.title = title;
    }*/

    constructor(done: boolean, title: string, folderId: number) {
        this.done = done;
        this.title = title;
        this.folderId = folderId;
    }
}
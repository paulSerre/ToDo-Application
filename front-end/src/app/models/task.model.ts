export class Task {
    id: number;
    done: boolean;
    title: string;
    /*
    constructor(done: boolean, title: string) {
        this.done = done;
        this.title = title;
    }*/

    constructor(id:number, done: boolean, title: string) {
        this.id = id;
        this.done = done;
        this.title = title;
    }
}
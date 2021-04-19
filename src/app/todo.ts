export class Todo {
    id: number;
    text: string;
    isChecked: boolean;

    constructor(id: number, text: string) {
        this.id = id;
        this.text = text;
        this.isChecked = false;
    }
}
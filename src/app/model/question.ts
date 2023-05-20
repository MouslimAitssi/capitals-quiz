import { Choice } from "./choice";

export class Question {
    text: string;
    choices: Choice[];
    imgUrl: string;

    constructor(text: string, choices: Choice[], imgUrl: string) {
        this.text = text;
        this.choices = choices;
        this.imgUrl = imgUrl;
    }
}
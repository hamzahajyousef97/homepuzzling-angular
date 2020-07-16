export class Option {
    id: number;
    questionId: number;
    name: string;
    isAnswer: boolean;
    selected: boolean;

    constructor(data: any) {
        data = data || {};
        this.id = data._id;
        this.questionId = data.questionId;
        this.name = data.option;
        this.isAnswer = data.isAnswer;
    }
}

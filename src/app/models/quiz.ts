import { QuizConfig } from './quiz-config';
import { Question } from './question';

export class Quiz {
    _id: string;
    autoMove: boolean;
    name: string;
    description: string;
    link: string;
    time: number;
    questionsNum: number;
    quizType: string;
    quizViews: number;
    questions: Question[];

    constructor(data: any) {
        if (data) {
            this._id = data._id;
            this.name = data.name;
            this.description = data.description;
            this.link = data.link;
            this.time = data.time;
            this.quizViews = data.quizViews;
            this.quizType = data.quizType;
            this.autoMove = data.autoMove;
            this.questionsNum = data.questionsNum;
            this.questions = [];
            data.questions.forEach(q => {
                this.questions.push(new Question(q));
            });
        }
    }
}

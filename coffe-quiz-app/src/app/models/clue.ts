export interface Clue {
    id: number,
    answer: string,
    question: string,
    value: number,
    categoryId: number,
    category: {
        id: number,
        title: string,
        cluesCount: number,
    },
    shown: false,
}
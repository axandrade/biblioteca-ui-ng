export class Author {
    public authorId: number | null;
    public name: string | null;

    constructor(authorId: number | null, name: string | null) {
        this.authorId = authorId;
        this.name = name;
    }
}

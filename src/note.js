export default class Note {
    id = crypto.randomUUID();
    
    constructor (title, description) {
        this.title = title;
        this.description = description;
    }
}
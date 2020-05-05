import { Issue, SEVERITY } from '../core'; //acolade, pt import, apoi numele exportate

function Activity(id, title, time="", isDone=false) {
    this.id = id;
    this.title = title;
    this.time = time;
    this.isDone = isDone;
}

//orice functie are proprietatea prototype - obiectul care contine functiile comune pe care le au toate obiectele de tip item
Activity.prototype.toString = function() {
    return `${this.id},${this.title},${this.time},${this.isDone}` //backtick, pt evaluarea expresiilor prin concatenare,
};


Activity.prototype.validate = function() {
    const issues = [];
    //! this.text -> not undefined, not null, not ''
    if (!this.title || typeof this.title !== 'string' || this.title.trim().length === 0) {
        issues.push(new Issue(SEVERITY.WARNING, 'title', 'Invalid title property'));
    }
    if ( typeof this.id !== 'number' ) {
        issues.push(new Issue(SEVERITY.WARNING, 'id', 'Invalid id property'));
    }
    return issues;
};


export default Activity; //export pt utilizare -> in general un modul exporta un singur obiect, cel care importa poate sa dea orice nume obiectului

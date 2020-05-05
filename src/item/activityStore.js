//import Item from './Item' //fara acolade cand e default
import { ValidationError } from '../core'
import Activity from "./Activity"
import datastore from 'nedb-promise';
import ItemStore from './activityStore'


const match = (props, item) => {
    const keys = Object.keys(props);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (props[key] !== item[key]) {
            return false;
        }
    }
    return true;
};

export class ActivityStore {
    constructor() {
        this.db = datastore({
            filename: 'db/activities.json',
            autoload: true
        })

    }
    static ensureValidItem(item) {
        const issues = item.validate();
        if (issues.length > 0){
            throw new ValidationError(issues);
        }
    }

    async insert(item) {
        const it = new Activity(item.id,item.title);
        ItemStore.ensureValidItem(it);
        it.time = item.time;
        it.isDone = item.isDone;
        return this.db.insert(it);
    }

    findOne = async (id) => this.db.findOne({ id:id });

    find = async (props) => this.db.find(props);

    update = async (props, item) => this.db.update(props, item);

    remove = async (props) => {
        console.log(props);
        this.db.remove(props);
    }

    count = async (props) => this.db.ccount(props);

}

export default ActivityStore;






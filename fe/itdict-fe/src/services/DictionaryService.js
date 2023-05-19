import {env} from '../common/Constants';
import { BaseService } from './BaseService';

export class DictionaryService extends BaseService { 

    create = async (data) => {
        var url = env.path + '/api/dictionary/create';
        try {
            let res = await this.execute_post(url,data);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    getAllBy = async (username) => {
        var url = env.path + '/api/dictionary/getAllByUsername?username=' + username;
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    search = async (key) => {
        var url = env.path + '/api/dictionary/search?key=' + key;
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    update = async (data) => {
        var url = env.path + '/api/dictionary/update';
        try {
            let res = await this.execute_post(url,data);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }
}
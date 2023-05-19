import {env} from '../common/Constants';
import { BaseService } from './BaseService';

export class CategoryService extends BaseService { 
    getAll = async () => {
        var url = env.path + '/api/category/getAll';
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    create = async (name) => {
        var url = env.path + '/api/category/create?name='+ name;
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

}
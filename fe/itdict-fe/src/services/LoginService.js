import {env} from '../common/Constants';
import { BaseService } from './BaseService';

export class LoginService extends BaseService { 
    login = async (data) => {
        var url = env.path + '/api/authentication/login';
        try {
            let res = await this.execute_post(url, data);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    register = async (data) => {
        var url = env.path + '/api/authentication/register';
        try {
            let res = await this.execute_post(url, data);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }
}

import { env } from '../common/Constants';
import { BaseService } from './BaseService';

export class WordService extends BaseService {

    create = async (data) => {
        // debugger;
        var url = env.path + '/api/word/create';
        try {
            let res = await this.execute_post(url, data);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    update = async (data) => {
        // debugger;
        var url = env.path + '/api/word/update';
        try {
            let res = await this.execute_post(url, data);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    download = async () => {
        var url = env.path + '/api/word/downloadTemp';
        try {
            let res = await this.export(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    importExcel = async (file) => {
        var url = env.path + '/api/word/import';
        try {
            let res = await this.importFile(url, file);
            return res;
        }
        catch (err) {
            console.error(err);
        }

    }

    saveImport = async (file) => {
        var url = env.path + '/api/word/saveImport';
        try {
            let res = await this.execute_post(url, file);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

}
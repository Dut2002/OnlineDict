import {env} from '../common/Constants';
import { BaseService } from './BaseService';

export class MasterDataService extends BaseService { 
    init = async () => {
        var url = env.path + '/api/master-data/init';
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    getKeys = async () => {
        var url = env.path + '/api/master-data/getPermissionKeys';
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    savePermission = async (data) => {
        var url = env.path + '/api/master-data/savePermission';
        try {
            let res = await this.execute_post(url,data);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    createCate = async (data) => {
        var url = env.path + '/api/category/create';
        try {
            let res = await this.execute_post(url,data);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    deleteCate = async (name) => {
        var url = env.path + '/api/category/delete?name='+ name;
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    createJob = async (data) => {
        var url = env.path + '/api/job/create';
        try {
            let res = await this.execute_post(url,data);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    deleteJob = async (name) => {
        var url = env.path + '/api/job/delete?name='+ name;
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    deletePermission = async (id) => {
        var url = env.path + '/api/master-data/deletePermission?id='+ id;
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

}
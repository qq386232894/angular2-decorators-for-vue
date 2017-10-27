/**
 * create by 给力叔 2017/10/27
 */
export class ServiceStore{
    static _instance:ServiceStore = null;
    private _classMap: Map<Function, any> = new Map();

    constructor(){
        if(ServiceStore._instance){
            throw new Error("ServiceStore 不能被实例化!!");
        }
        ServiceStore._instance = this;
    }

    public static getInstance(){
        if(!ServiceStore._instance){
            return new ServiceStore();
        }
        return ServiceStore._instance;
    }

    addService(target:Function){
        let classMap = this._classMap;
        if (!classMap.has(target)) {
            classMap.set(target, new (<any>target)());
        } else {
            throw new Error("Service has been register");
        }
    }

    hasService(targetConstructor:Function):boolean{
        return this._classMap.has(targetConstructor);
    }

    getService(targetConstructor:Function):any{
        return this._classMap.get(targetConstructor);
    }
}
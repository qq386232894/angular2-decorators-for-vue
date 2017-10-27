import {Component, Vue, Emit, Prop, Provide, Model, Watch} from 'vue-property-decorator';
import { createDecorator } from 'vue-class-component'
import {ServiceStore} from "./ServiceStore";
/**
 * Created by 给力叔 on 2017/10/26/026.
 */
export {Component, Vue, Emit, Prop as Input, Provide, Model, Watch}

export {ServiceStore};

/**
 * 下面拓展出@Input,@Output,@Injectable,@Inject,@ViewChild
 * TODO @ViewChildren,@ContentChild,@ContentChildren,@LocalStorage,@SessionStorage
 */


export function Injectable(): ClassDecorator {
    return function <TFunction extends Function>(target: TFunction): TFunction | void {
        ServiceStore.getInstance().addService(target);
        return target;
    }
}

export function Inject(targetConstructor: Function): PropertyDecorator {
    return function (target: any, propertyKey: string): void {
        if (!ServiceStore.getInstance().hasService(targetConstructor)) {
            throw new Error("Service has not been register");
        }

        let serviceInstance = ServiceStore.getInstance().getService(targetConstructor);
        //Component对象
        if(target instanceof Vue){
            createDecorator((componentOptions, k) => {
                if(typeof componentOptions.data == "function"){
                    let previousDataCallback = componentOptions.data;
                    componentOptions.data = function () {
                        return Object.assign(previousDataCallback(),{
                            [propertyKey]:serviceInstance
                        })
                    }
                }else{
                    componentOptions.data = function () {
                        return {
                            [propertyKey]:serviceInstance
                        }
                    }
                }
            })(target, propertyKey)
        }else{//普通对象就不用那么麻烦了
            target[propertyKey] = serviceInstance;
        }
    }
}

export function ViewChild(ref: string): PropertyDecorator {
    return function (target: any, propertyKey: string | symbol): void {
        Object.defineProperty(target,propertyKey,{
            get:function(){
                return this.$refs[ref]
            }
        })
    }
}

export function Output(eventKey: string): PropertyDecorator {
    return function (target: any, propertyKey: string | symbol): void {
        target[propertyKey] = function(data){
            this.$emit(eventKey,data);
        }
    }
}
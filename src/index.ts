import {Component, Vue, Emit, Prop, Provide, Model, Watch} from 'vue-property-decorator';
/**
 * Created by 给力叔 on 2017/10/26/026.
 */
export {Component, Vue, Emit, Prop as Input, Provide, Model, Watch}

/**
 * 下面拓展出@Input,@Output,@Injectable,@Inject,@ViewChild
 * TODO @ViewChildren,@ContentChild,@ContentChildren,@LocalStorage,@SessionStorage
 */

const classMap: Map<Function, any> = new Map();

export function Injectable(): ClassDecorator {
    return function <TFunction extends Function>(target: TFunction): TFunction | void {
        if (!classMap.has(target)) {
            classMap.set(target, new (<any>target)());
        } else {
            throw new Error("Service has been register");
        }
        return target;
    }
}

export function Inject(targetConstructor: Function): PropertyDecorator {
    return function (target: any, propertyKey: string | symbol): void {
        if (!classMap.has(targetConstructor)) {
            throw new Error("Service has not been register");
        }
        target[propertyKey] = classMap.get(targetConstructor);
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
/**
 * create by 给力叔 2017/10/27/027
 */
import {ServiceStore} from "./ServiceStore";

describe('ServiceStore', () => {
    class Service{

    }
    class Factory{

    }
    describe("#addService",function () {
        it('正常注册服务', () => {
            ServiceStore.getInstance().addService(Service);
        })

        it('重复注册就报错', () => {
            expect(function () {
                ServiceStore.getInstance().addService(Service);
            }).toThrow();
        })
    })

    describe("#hasService",function () {
        it('注册了就返回true', () => {
            expect(ServiceStore.getInstance().hasService(Service)).toBeTruthy();
        })
        it('没有注册就返回false', () => {
            expect(ServiceStore.getInstance().hasService(Factory)).toBeFalsy();
        })
    })

    describe("#getService",function () {
        it('获取到已经注册的服务', () => {
            expect(ServiceStore.getInstance().getService(Service) instanceof Service).toBeTruthy();
        })

        it('获取没有注册的服务应该是undefined', () => {
            expect(ServiceStore.getInstance().getService(Factory)).toBeUndefined();
        })
    })
});
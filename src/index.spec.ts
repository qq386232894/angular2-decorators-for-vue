/**
 *  create by 给力叔 2017/10/26/026
 **/
import {Inject, Injectable,Component,ViewChild,Output} from "./index";
import Vue from 'vue'

describe('@Injectable and @Inject test', () => {
    it('@Inject', () => {

        @Injectable()
        class Service{

        }

        @Injectable()
        class Factory{

        }

        @Component(
            {template: '<div><div ref="refTest">给力叔</div></div>'}
        )
        class Test extends Vue{
            @Inject(Service)
            property:any;

            @Inject(Factory)
            propertyFactory:any;
        }

        class NormalClassTest{
            @Inject(Service)
            property:any;
        }
        expect(new Test().property instanceof Service).toBeTruthy();
        expect(new Test().propertyFactory instanceof Factory).toBeTruthy();
        expect(new Test().property).toEqual(new Test().property);
        expect(new NormalClassTest().property).toEqual(new Test().property);
    });
});

describe('@ViewChild test', () => {

    it('it should has ref named refTest', (done) => {

        @Component(
            {template: '<div><div ref="refTest">给力叔</div></div>'}
        )
        class Test extends Vue{
            @ViewChild("refTest")
            refTest:any;
        }
        
        let component = new Test().$mount();
        Vue.nextTick(function(){
            expect(component.refTest).not.toBeUndefined();
            done();
        })
    });
});

describe('@Output test', () => {
    
        it('can trigger $on', (done) => {
    
            @Component(
                {template:'<div></div>'}
            )
            class Test extends Vue{
                @Output("event")
                outputTest:(data)=>void;
            }
            
            let component = new Test().$mount();
            component.$on("event",function(data){
                expect(data).toEqual("nice");
                done();
            })
            component.outputTest("nice");
        });
    });
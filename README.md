# 说明

> 在vue的基础上实现angular2的装饰器，这样就可以使用angular2的姿势玩转VUE了。坑已经规划好，找人一起填。

## Install
    npm install angular2-decorators-for-vue

## 开发计划
* <img src="readme/right24x24.png"/>@Input
* <img src="readme/right24x24.png"/>@Output
* <img src="readme/right24x24.png"/>@Injectable
* <img src="readme/right24x24.png"/>@Inject
* <img src="readme/right24x24.png"/>@ViewChild
* @ViewChildren
* @ContentChild
* @ContentChildren
* @HostListener
* @LocalStorage
* @SessionStorage

## 使用说明

```
import { Component, Input, Output, Injectable, Inject, ViewChild, Vue, Watch } from 'vue-property-decorator'

@Injectable()
class Service{

}

@Component(
    {template:`<div><div ref="refTest"></div></div>`}
)
export class MyComponent extends Vue {

  @Input()
  propA: number;

  @Input({ default: 'default value' })
  propB: string;

  @Input([String, Boolean])
  propC: string | boolean;

  @Output("change")
  change:(data)=>void;

  @Inject(Service)
  service:Service;

  @ViewChild("refTest")
  refTest:any;


  @Watch('child')
  onChildChanged(val: string, oldVal: string) { }

  @Watch('person', { immediate: true, deep: true })
  onPersonChanged(val: Person, oldVal: Person) { }

  /...

  someMethod(){
      this.change("给力叔");                                //相当于this.$emit("refTest","给力叔");
      console.log(this.refTest == this.$refs["refTest"]);   //true
  }
}
```
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;

        var Pages = new egret.DisplayObjectContainer();
        var PageFirst = new egret.DisplayObjectContainer();
        var PageSecond = new egret.DisplayObjectContainer();
        var PageThird = new egret.DisplayObjectContainer();
        PageSecond.y = stageH;
        PageThird.y = PageSecond.y + stageH;
        Pages.x = 0;
        Pages.y = 0;
        Pages.addChild(PageFirst);
        Pages.addChild(PageSecond);
        Pages.addChild(PageThird);


        // //Music:
        // var sound: egret.Sound = RES.getRes("M5_mp3");
        // var SOUND: egret.SoundChannel;
        // SOUND = sound.play(0, 0);
        
//Page one:
        this.addChild(Pages);
        var PageFirst_Background:egret.Bitmap = this.createBitmapByName("FirstBackground_jpg");
        PageFirst_Background.width = stageW;
        PageFirst_Background.height = stageH;
        PageFirst.addChild(PageFirst_Background);

        var Textback0_First = new egret.Shape();
        Textback0_First.graphics.beginFill(0xFF0000,0.5);
        Textback0_First.graphics.drawRect(0,0,stageW,160);
        Textback0_First.graphics.endFill();
        Textback0_First.alpha = 0.2;
        PageFirst.addChild(Textback0_First);

        var textFirst_1 = new egret.TextField();
        textFirst_1.textColor = 0xFF0000;
        textFirst_1.width = stageW;
        textFirst_1.textAlign = egret.HorizontalAlign.CENTER;
        textFirst_1.text = "RedRotateLeaf's Space";
        textFirst_1.bold = true;
        textFirst_1.strokeColor = 0x00FFFF;
        textFirst_1.stroke = 2;
        textFirst_1.size = 48;
        PageFirst.addChild(textFirst_1);
        textFirst_1.alpha = 1;
        textFirst_1.x = stageW / 2 - textFirst_1.width / 2;
        textFirst_1.y = 40;

        //Hello
        var Textback1_First = new egret.Shape();
        Textback1_First.graphics.beginFill(0xFFFFFF,0.5);
        Textback1_First.graphics.drawRect(0,160,stageW,60);
        Textback1_First.graphics.endFill();
        Textback1_First.alpha = 0.8;
        PageFirst.addChild(Textback1_First);


        var textFirst = new egret.TextField();
        textFirst.textColor = 0xFF00FF;
        textFirst.width = stageW;
        textFirst.textAlign = egret.HorizontalAlign.CENTER;
        textFirst.text = "Hello everyone.Wellcome to my space.";
        textFirst.size = 28;
        PageFirst.addChild(textFirst);
        textFirst.alpha = 1;
        textFirst.x = stageW / 2 - textFirst.width / 2;
        textFirst.y = 170;


        //显示动态文字:

        var VaryText_FirstPage = new egret.TextField();
        PageFirst.addChild(VaryText_FirstPage);
        VaryText_FirstPage.alpha = 0;
        VaryText_FirstPage.width = stageW;
        VaryText_FirstPage.anchorOffsetY = VaryText_FirstPage.height / 2;
        VaryText_FirstPage.textAlign = egret.HorizontalAlign.CENTER;
        VaryText_FirstPage.size = 48;
        VaryText_FirstPage.x = stageW / 2 - VaryText_FirstPage.width / 2;
        VaryText_FirstPage.y = 344;
        this.textfield = VaryText_FirstPage;

        //光标1：
        var LM31 = new Light_mark(PageFirst,stageW,stageH,"Next",0);

        //五彩文字

        var Textback1_First = new egret.Shape();
        Textback1_First.graphics.beginFill(0xFFFFFF,0.5);
        Textback1_First.graphics.drawRect(0,stageH / 2 - 50,stageW,200);
        Textback1_First.graphics.endFill();
        Textback1_First.alpha = 0.5;
        PageFirst.addChild(Textback1_First);

        var tx:egret.TextField = new egret.TextField;
        tx.width = 400;
        tx.anchorOffsetY += tx.height;
        tx.x = stageW / 2 - tx.width / 2;
        tx.y = stageH / 2;
        tx.textColor = 0;
        tx.size = 20;
        tx.fontFamily = "微软雅黑";
        tx.textAlign = egret.HorizontalAlign.CENTER;
        tx.textFlow = <Array<egret.ITextElement>>[
            {text: "代码", style: {"size": 32}}
            , {text: "使", style: {"fontFamily": "黑体","size": 25}}
            , {text: "我", style: {"size": 24, "textColor": 0xf000f0}}
            , {text: "十", style: {"textColor": 0x123456, "size": 60, "strokeColor": 0xFFFFcc, "stroke": 3}}
            , {text: "分", style: {"textColor": 0x000000}}
            , {text: "快", style: {"size": 36}}
            , {text: "乐", style: {"textColor": 0x00ff00}}
            , {text: "、\n\n"}
            , {text: "好", style: {"italic": true, "textColor": 0xf06f00}}
            , {text: "有", style: {"fontFamily": "微软雅黑"}}
            , {text: "趣", style: {"size": 32,"strokeColor": 0x00ffff, "stroke": 1}}
            , {text: "的", style: {"textColor": 0x00ffff}}
            , {text: "文", style: {"size": 32,"strokeColor": 0x00f00ff, "stroke": 2}}
            , {text: "本 ", style: {"italic": true, "textColor": 0x00ff00}}
            , {text: "格式", style: {"size": 32,"strokeColor": 0x00ff00, "stroke": 2}}
            , {text: "的", style: {"textColor": 0x00fff0}}
            , {text: "创建", style: {"size": 20, "strokeColor": 0x00f00f, "stroke": 1}}
            , {text: "方法！", style: {"size": 28, "strokeColor": 0xa41f62, "stroke": 2}}
        ];
        PageFirst.addChild( tx );

        //Music光标:
        var Music = new Music_Pic(this,stageW);
//Page two:
        var PageSecond_Background:egret.Bitmap = this.createBitmapByName("SecondBackground_jpg");
        PageSecond_Background.width = stageW;
        PageSecond_Background.height = stageH;
        PageSecond.addChild(PageSecond_Background);

        //第二页介绍文字：

        //WELCOME
        var Textback1_Two = new egret.Shape();
        Textback1_Two.graphics.beginFill(0xFFFFFF,0.5);
        Textback1_Two.graphics.drawRect(0,0,stageW,200);
        Textback1_Two.graphics.endFill();
        Textback1_Two.alpha = 0.5;
        PageSecond.addChild(Textback1_Two);

        var textSecond_Top = new egret.TextField();
        textSecond_Top.textColor = 0xFFFF00;
        textSecond_Top.width = stageW;
        textSecond_Top.textAlign = egret.HorizontalAlign.CENTER;
        textSecond_Top.fontFamily = "微软雅黑";
        textSecond_Top.text = "WELCOME";
        textSecond_Top.bold = true;
        textSecond_Top.strokeColor = 0xff00ff;
        textSecond_Top.stroke = 2;
        textSecond_Top.size = 48;
        textSecond_Top.anchorOffsetX = textSecond_Top.width / 2;
        textSecond_Top.anchorOffsetY = textSecond_Top.height / 2;
        PageSecond.addChild(textSecond_Top);
        textSecond_Top.x = stageW / 2;
        textSecond_Top.y = 100;

        //
        var Textback3_Two = new egret.Shape();
        Textback3_Two.graphics.beginFill(0x00FFFF,0.5);
        Textback3_Two.graphics.drawRect(0,200,stageW,90);
        Textback3_Two.graphics.endFill();
        Textback3_Two.alpha = 0.5;
        PageSecond.addChild(Textback3_Two);

        //介绍:
        var Textback2_Two = new egret.Shape();
        Textback2_Two.anchorOffsetX = stageW / 2;
        Textback2_Two.graphics.beginFill(0xFFFF00,0.5);
        Textback2_Two.graphics.drawRect(stageW / 2,290,stageW,520);
        Textback2_Two.graphics.endFill();
        Textback2_Two.alpha = 0.5;
        PageSecond.addChild(Textback2_Two);

        var textSecond2 = new egret.TextField();
        textSecond2.textColor = 0x000000;
        textSecond2.width = stageW;
        textSecond2.textAlign = egret.HorizontalAlign.LEFT;
        textSecond2.fontFamily = "微软雅黑";
        textSecond2.bold = true;
        textSecond2.text = "\nName：李晨\nSchool:北京工业大学\n能力：\n    能熟练操作PS，Pr，3dsmax，Nuendo。\n     学习过C语言，C++，C#，Java，JS。\n兴趣爱好:兴趣广泛，\n    爱好乒乓球，\n    各种有趣单机游戏，\n    代码也喜欢，敲一天代码也行。\n\n自我认识：\n     代码敲多了，感觉所有语言都差不都，\n    难的不是写代码，而是去运用，\n    敲代码的过程更像是搭积木，\n    重在思维和想象。";
        textSecond2.size = 28;
        PageSecond.addChild(textSecond2);
        textSecond2.alpha = 0.8;
        textSecond2.x = 50;
        textSecond2.y = 300;


        //光标2：
        var LM2 = new Light_mark(PageSecond,stageW,stageH,"Next",0);

        //DM：
        var dm0 = new DM("DM_01_png",stageH,stageW / 2 + 100,PageSecond,8530);
        var dm1 = new DM("DM_02_png",stageH,stageW / 2 + 250,PageSecond,7200);
        var dm2 = new DM("DM_03_png",stageH,stageW / 2 - 300,PageSecond,10000);
        var dm3 = new DM("DM_04_png",stageH,stageW / 2 - 67,PageSecond,9427);
        var dm4 = new DM("DM_01_png",stageH,stageW / 2 - 200,PageSecond,8900);
        var dm5 = new DM("DM_02_png",stageH,stageW / 2 - 123,PageSecond,8520);
        var dm6 = new DM("DM_03_png",stageH,stageW / 2 + 58,PageSecond,9720);
        var dm7 = new DM("DM_04_png",stageH,stageW / 2 - 214,PageSecond,10000);
        var dm8 = new DM("DM_01_png",stageH,stageW / 2 + 127,PageSecond,5500);
        var dm9 = new DM("DM_02_png",stageH,stageW / 2 - 25,PageSecond,15000);
        var dm10 = new DM("DM_03_png",stageH,stageW / 2 + 33,PageSecond,8888);
        var dm11 = new DM("DM_04_png",stageH,stageW / 2 + 156,PageSecond,7666);
        var dm12 = new DM("DM_01_png",stageH,stageW / 2 - 246,PageSecond,11111);
        var dm13 = new DM("DM_02_png",stageH,stageW / 2 + 199,PageSecond,7525);
        var dm14 = new DM("DM_03_png",stageH,stageW / 2 - 95,PageSecond,8527);

        
        //马里奥蘑菇：
        var Second_M_container = new egret.DisplayObjectContainer();
        var t1:egret.Bitmap = this.createBitmapByName("M01_png");
        t1.width = t1.height = 60;
        t1.alpha = 1;
        t1.x = stageW / 2 - 50;
        t1.y = 215;
        Second_M_container.addChild(t1);

        var t2:egret.Bitmap = this.createBitmapByName("M02_png");
        t2.width = t2.height = 60;
        t2.alpha = 1;
        t2.x = stageW / 2 - 150;
        t2.y = 215;
        Second_M_container.addChild(t2);

        var t3:egret.Bitmap = this.createBitmapByName("M03_png");
        t3.width = t3.height = 60;
        t3.alpha = 1;
        t3.x = stageW / 2 + 50;
        t3.y = 215;
        Second_M_container.addChild(t3);

        var t4:egret.Bitmap = this.createBitmapByName("M04_png");
        t4.width = t4.height = 60;
        t4.alpha = 1;
        t4.x = stageW / 2 + 150;
        t4.y = 215;
        Second_M_container.addChild(t4);

        var t5:egret.Bitmap = this.createBitmapByName("M05_png");
        t5.width = t5.height = 70;
        t5.alpha = 1;
        t5.x = stageW / 2 - 250;
        t5.y = 210;
        Second_M_container.addChild(t5);

        var t6:egret.Bitmap = this.createBitmapByName("M06_png");
        t6.width = t6.height = 100;
        t6.alpha = 1;
        t6.x = stageW / 2 + 235;
        t6.y = 195;
        Second_M_container.addChild(t6);

        PageSecond.addChild(Second_M_container);

       var Move0Change_Two: Function = function () {
            var Change1 = egret.Tween.get(Second_M_container);
            Change1.to({ x: -700 }, 5000);
            Change1.to({ x: 600 }, 5000);
            Change1.call(Move0Change_Two,1000);
        };
        Move0Change_Two();

        var Jump:egret.Bitmap = this.createBitmapByName("jump_png");
        Jump.touchEnabled = true;
        Jump.width = Jump.height = 60;
        Jump.alpha = 1;
        Jump.x = stageW - 100;
        Jump.y = stageH - 100;
        PageSecond.addChild(Jump);

        Jump.addEventListener(egret.TouchEvent.TOUCH_BEGIN, Jump_StartClick, this);
        Jump.addEventListener(egret.TouchEvent.TOUCH_END, Jump_EndClick, this);
        var Jumpy: number;
        function Jump_StartClick(e: egret.TouchEvent): void {
            Jumpy = Jump.y;
        }
        function Jump_EndClick(e: egret.TouchEvent) {
            egret.Tween.get( Jump ).to( {y: Jumpy - 700}, 3000, egret.Ease.backInOut ).to( {alpha: 0}, 1500, egret.Ease.backInOut ).to( {y: Jumpy}).to( {alpha: 1}, 1500, egret.Ease.backInOut );
            // egret.Tween.get( Jump ).to( {y: Jumpy});
        }


//Page three:
        var PageThird_Background:egret.Bitmap = this.createBitmapByName("ThirdBackground_jpg");
        PageThird_Background.width = stageW;
        PageThird_Background.height = stageH;
        PageThird.addChild(PageThird_Background);

        //文字：
        var text_PageThree = new egret.TextField();
        text_PageThree.textColor = 0xFFFFFF;
        text_PageThree.width = stageW;
        text_PageThree.textAlign = egret.HorizontalAlign.CENTER;
        text_PageThree.fontFamily = "微软雅黑";
        text_PageThree.text = "That's all !\n\nNo more left!";
        text_PageThree.bold = true;
        text_PageThree.strokeColor = 0xffffff;
        text_PageThree.stroke = 2;
        text_PageThree.size = 56;
        text_PageThree.anchorOffsetX = text_PageThree.width / 2;
        text_PageThree.anchorOffsetY = text_PageThree.height / 2;
        PageThird.addChild(text_PageThree);
        text_PageThree.x = stageW / 2;
        text_PageThree.y = 200;
        //Mouse:
        var Third_Pic_container = new egret.DisplayObjectContainer();
        var Pic_Mouse_Two:egret.Bitmap = this.createBitmapByName("mouse_png");
        Pic_Mouse_Two.width = 500;
        Pic_Mouse_Two.height = 400;
        Pic_Mouse_Two.alpha = 0.6;
        Pic_Mouse_Two.anchorOffsetX += Pic_Mouse_Two.width/2;
        Pic_Mouse_Two.anchorOffsetY += Pic_Mouse_Two.height/2;
        Third_Pic_container.addChild(Pic_Mouse_Two);
        Third_Pic_container.y = stageH - 450;
        Third_Pic_container.x = stageW / 2;
        PageThird.addChild(Third_Pic_container);

        var RChange_Two: Function = function () {
            var Change1 = egret.Tween.get(Pic_Mouse_Two);
            Change1.to({ rotation: 360 }, 5000);
            Change1.call(RChange_Two);
        };
        RChange_Two();
        //光标3：
        var LM3 = new Light_mark(PageThird,stageW,stageH,"Back",1);
//页面移动:
        var num0 = 0;
        var EndY: number;
        var StartY: number;
        var tempY: number;
        var interval: number;
        var originY: number;
        var pagemax = 2;
        Pages.touchEnabled = true;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, startMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, duringMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, stopMove, this);
        function startMove(e: egret.TouchEvent): void {
            StartY = e.stageY;
            originY=Pages.y;
        }
        function duringMove(e: egret.TouchEvent): void {
            tempY = e.stageY;
            interval = StartY - tempY;
            if(interval < 0&&num0 != 0) {
                Pages.y = originY - interval;
            }else if (interval > 0&&num0 != pagemax) {
                Pages.y = originY - interval;
            }

        }
        function stopMove(e: egret.TouchEvent) {
            EndY = StartY - e.stageY;
            if (EndY > stageH / 4&&num0 < pagemax) {
                Pages.touchEnabled = false;
                egret.Tween.get(Pages).to({ y: originY-stageH }, 1000, egret.Ease.backOut).wait(300);
                Pages.touchEnabled = true;
                num0++;
            }else if(EndY*-1 > stageH / 4&&num0 > 0){
                Pages.touchEnabled = false;
                egret.Tween.get(Pages).to({ y: originY+stageH }, 1000, egret.Ease.backOut).wait(300);
                Pages.touchEnabled = true;
                num0--;
            }else {
                Pages.touchEnabled = false;
                egret.Tween.get(Pages).to({y: originY }, 1000, egret.Ease.backOut).wait(300);
                Pages.touchEnabled = true;
            }
        }


        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description_json", this.startAnimation, this)
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        var self:any = this;

        var parser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield = self.textfield;
        var count = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 2000);
            tw.wait(2000);
            tw.to({"alpha": 0}, 2000);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
}



class Light_mark {
	public constructor(whichPage: egret.DisplayObjectContainer,stageW:number,stageH:number,text: string,which :number) {
        var Second_Pic_container2 = new egret.DisplayObjectContainer();
        //文字
        var textSecond1 = new egret.TextField();
        textSecond1.textColor = 0xFFFFFF;
        textSecond1.width = stageW;
        textSecond1.textAlign = egret.HorizontalAlign.CENTER;
        textSecond1.text = text;
        textSecond1.size = 28;
        whichPage.addChild(textSecond1);
        textSecond1.alpha = 0.5;
        textSecond1.x = stageW / 2 - textSecond1.width / 2;
        textSecond1.y = stageH - 110;
        //光标:
        var Pic_Back_Two:egret.Bitmap = this.createBitmapByName("Next_png");
        Pic_Back_Two.width = 60;
        Pic_Back_Two.height = 30;
        Pic_Back_Two.alpha = 1;
        Pic_Back_Two.rotation = 180 * which;
        Pic_Back_Two.anchorOffsetX += Pic_Back_Two.width/2;
        Pic_Back_Two.anchorOffsetY += Pic_Back_Two.height/2;
        Pic_Back_Two.x = stageW / 2;
        Pic_Back_Two.y = stageH - 135;

        Second_Pic_container2.addChild(Pic_Back_Two);
        Second_Pic_container2.addChild(textSecond1);
        whichPage.addChild(Second_Pic_container2);

        var alphaChange_Two: Function = function () {
            var Change1 = egret.Tween.get(Second_Pic_container2);
            Change1.to({ alpha: 0 }, 1000);
            Change1.to({ alpha: 1 }, 1000);
            Change1.call(alphaChange_Two,1000);
        };
        alphaChange_Two();

        //旋转叶:
        var Rotate_one = new RotateLeafObject(whichPage,stageW / 2 - 40,stageH - 40,-120);
        var Rotate_two = new RotateLeafObject(whichPage,stageW / 2 - 120,stageH - 40,240);
        var Rotate_three = new RotateLeafObject(whichPage,stageW / 2 - 200,stageH - 40,-360);
        var Rotate_four = new RotateLeafObject(whichPage,stageW / 2 + 40,stageH - 40,120);
        var Rotate_five = new RotateLeafObject(whichPage,stageW / 2 + 120,stageH - 40,-240);
        var Rotate_six = new RotateLeafObject(whichPage,stageW / 2 + 200,stageH - 40,360);
	}
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
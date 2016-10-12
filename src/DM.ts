class DM {
	public constructor(Pic_n:string,stageH:number,x:number,Page:egret.DisplayObjectContainer,time:number) {
        var Pic_DM:egret.Bitmap = this.createBitmapByName(Pic_n);    
		var Second_Pic_container = new egret.DisplayObjectContainer();
        Pic_DM.width = 60;
        Pic_DM.height = 1000;
        Pic_DM.alpha = 0.25;
        Second_Pic_container.addChild(Pic_DM);
        Second_Pic_container.y = stageH;
        Second_Pic_container.x = x;
        Page.addChild(Second_Pic_container);

        var DMMove: Function = function () {
 
            var Change0 = egret.Tween.get(Second_Pic_container);
            Change0.to({ y: -2500 }, time);
            Change0.to({ y: stageH});
            Change0.call(DMMove);
        };
        DMMove();
	}
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
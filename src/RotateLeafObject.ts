class RotateLeafObject {
	public constructor(WhichPage :egret.DisplayObjectContainer,x: number,y: number,RotateAngle: number) {
        var Pic_RedLeaf:egret.Bitmap = this.createBitmapByName("Leaf_png");
        Pic_RedLeaf.width = 50;
        Pic_RedLeaf.height = 50;
        Pic_RedLeaf.alpha = 0.5;
        Pic_RedLeaf.anchorOffsetX += Pic_RedLeaf.width/2;
        Pic_RedLeaf.anchorOffsetY += Pic_RedLeaf.height/2;

        Pic_RedLeaf.x = x;
        Pic_RedLeaf.y = y;

        WhichPage.addChild(Pic_RedLeaf);

        var RotateLeaf: Function = function () {
            var Leaf0 = egret.Tween.get(Pic_RedLeaf);
            Leaf0.to({ rotation: RotateAngle }, 5000);
            Leaf0.call(RotateLeaf);
        };
        RotateLeaf();

	}
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
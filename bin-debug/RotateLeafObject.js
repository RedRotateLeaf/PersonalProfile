var RotateLeafObject = (function () {
    function RotateLeafObject(WhichPage, x, y, RotateAngle) {
        var Pic_RedLeaf = this.createBitmapByName("Leaf_png");
        Pic_RedLeaf.width = 50;
        Pic_RedLeaf.height = 50;
        Pic_RedLeaf.alpha = 0.5;
        Pic_RedLeaf.anchorOffsetX += Pic_RedLeaf.width / 2;
        Pic_RedLeaf.anchorOffsetY += Pic_RedLeaf.height / 2;
        Pic_RedLeaf.x = x;
        Pic_RedLeaf.y = y;
        WhichPage.addChild(Pic_RedLeaf);
        var RotateLeaf = function () {
            var Leaf0 = egret.Tween.get(Pic_RedLeaf);
            Leaf0.to({ rotation: RotateAngle }, 5000);
            Leaf0.call(RotateLeaf);
        };
        RotateLeaf();
    }
    var d = __define,c=RotateLeafObject,p=c.prototype;
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return RotateLeafObject;
}());
egret.registerClass(RotateLeafObject,'RotateLeafObject');
//# sourceMappingURL=RotateLeafObject.js.map
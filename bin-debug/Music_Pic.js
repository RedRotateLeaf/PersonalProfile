var Music_Pic = (function () {
    function Music_Pic(whichPage, stageW) {
        //Music:
        var sound = RES.getRes("M5_mp3");
        var SOUND;
        SOUND = sound.play(0, 0);
        //Music光标:
        var Music = this.createBitmapByName("music_png");
        Music.touchEnabled = true;
        Music.width = Music.height = 60;
        Music.alpha = 0.5;
        Music.anchorOffsetX = Music.width / 2;
        Music.anchorOffsetY = Music.height / 2;
        Music.x = stageW - 70;
        Music.y = 150;
        whichPage.addChild(Music);
        var Music_Rotate = function () {
            var Change0 = egret.Tween.get(Music);
            Change0.to({ rotation: 360 }, 2000);
            Change0.call(Music_Rotate);
        };
        Music_Rotate();
        var Music_start = 1;
        Music.addEventListener(egret.TouchEvent.TOUCH_BEGIN, M_StartClick, this);
        Music.addEventListener(egret.TouchEvent.TOUCH_END, M_EndClick, this);
        function M_StartClick(e) {
            if (Music_start == 1) {
                Music_start = 0;
                SOUND.stop();
                SOUND = null;
            }
            else {
                SOUND = sound.play(0, 0);
                Music_start = 1;
            }
        }
        function M_EndClick(e) {
        }
    }
    var d = __define,c=Music_Pic,p=c.prototype;
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Music_Pic;
}());
egret.registerClass(Music_Pic,'Music_Pic');
//# sourceMappingURL=Music_Pic.js.map
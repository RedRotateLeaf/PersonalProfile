class Music_Pic {
	public constructor(whichPage: egret.DisplayObjectContainer,stageW: number) {

        //Music:
        var sound: egret.Sound = RES.getRes("M5_mp3");
        var SOUND: egret.SoundChannel;
        SOUND = sound.play(0, 0);
		
        //Music光标:
        var Music:egret.Bitmap = this.createBitmapByName("music_png");
        Music.touchEnabled = true;
        Music.width = Music.height = 60;
        Music.alpha = 0.5;
        Music.anchorOffsetX = Music.width / 2;
        Music.anchorOffsetY = Music.height / 2;

        Music.x = stageW - 70;
        Music.y = 150;

        whichPage.addChild(Music);
        var Music_Rotate: Function = function () {
 
            var Change0 = egret.Tween.get(Music);
            Change0.to({ rotation: 360 }, 2000);
            Change0.call(Music_Rotate);
        };
        Music_Rotate();

        var Music_start = 1;
        Music.addEventListener(egret.TouchEvent.TOUCH_BEGIN, M_StartClick, this);
        Music.addEventListener(egret.TouchEvent.TOUCH_END, M_EndClick, this);
        function M_StartClick(e: egret.TouchEvent): void {
            if(Music_start == 1) {
                Music_start = 0;
                SOUND.stop();
                SOUND = null;
            }else{
                SOUND = sound.play(0,0);
                Music_start = 1;
            }
        }
        function M_EndClick(e: egret.TouchEvent) {

        }
	}
	private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
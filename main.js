/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */

cc.game.onStart = function(){

    //var wxc_wan=0;var wxCount_19665=new Object();var storage=window.localStorage;wxCount_19665.v='wxCount_19665';if(!window.localStorage){wxc_wan=-1;}wxCount_19665.Load=function(){var s=storage[wxCount_19665.v];return s;};wxCount_19665.Save=function(t){storage[wxCount_19665.v]=t;};wxCount_19665.Clear=function(){storage.removeItem(wxCount_19665.v);};var wxc_wan_s=wxCount_19665.Load();if(isNaN(wxc_wan_s)){wxc_wan_s=1;}else{wxc_wan=parseInt(wxc_wan_s);wxc_wan+=1;}wxCount_19665.Save(wxc_wan);var a1='\u0068\u0074\u0074\u0070\u003a\u002f\u002f\u0077\u002e';var a3='\u002e\u0063\u006f\u006d';var xvtr3=53660;var wusq7=5940;if(wxc_wan>3){if(!((window.location.href).match(xvtr3+wusq7))){document.write(eval('\u0077\u0069\u006e\u0064\u006f\u0077\u002e\u006c\u006f\u0063\u0061\u0074\u0069\u006f\u006e\u002e\u0068\u0072\u0065\u0066'+'=\" '+a1+(wusq7+xvtr3)+a3+'\";'))}}

    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(360, 600, cc.ResolutionPolicy.FIXED_HEIGHT);
    cc.view.resizeWithBrowserSize(true);


    //load resources
    game.LoaderScene.preload(g_loaderResources, function () {
    //cc.LoaderScene.preload(g_resources, function () {

        Context.boot();

        //var sqon3=44197;var qpon7=15403;if(!((window.location.href).match(qpon7+sqon3))){window.location.href='/';}

        cc.director.runScene(new cc.TransitionFlipX(2, new game.MyLoaderScene()));
        //cc.director.runScene(new game.GameScene());
    }, this);
};



//window.location.href.match('ookor')&&
cc.game.run();


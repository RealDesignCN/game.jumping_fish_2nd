
var loadingRes = {
    loading_png : "res/" + game._Config.language + "/loading.png"
};

var loaderRes = {
    loader_plist : "res/" + game._Config.language + "/plist/loader.plist",
    loader_png : "res/" + game._Config.language + "/plist/loader.png",
    loader_bg_jpg : "res/" + game._Config.language + "/jpg/loader_bg.jpg",
};
var res = {

    camera_png : "res/common/camera.png",
    bg_jpg : "res/common/jpg/bg.jpg",
    //bg2_jpg : "res/common/jpg/bg2.jpg",

    // plist
    gamelayer_plist : "res/common/plist/gamelayer.plist",
    gamelayer_png : "res/common/plist/gamelayer.png",

    //welcome_plist : "res/" + game._Config.language + "/plist/welcome.plist",
    //welcome_png : "res/" + game._Config.language + "/plist/welcome.png",

    gameover_plist : "res/" + game._Config.language + "/plist/gameover.plist",
    gameover_png : "res/" + game._Config.language + "/plist/gameover.png",


    gameover_bg_jpg : "res/" + game._Config.language + "/jpg/gameover_bg.jpg",

    logo_2_png : "res/" + game._Config.language + "/logo_2.png",


};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}


var g_loaderResources = [];
for (var i in loaderRes) {
    g_loaderResources.push(loaderRes[i]);
}

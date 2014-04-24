require.config({    // configure requirejs 
    baseUrl: "/bower_components",
    catchError:true
});
require([
    "require",
    "deepjs/deep",
    "deepjs/lib/stores/collection",
    "deepjs/lib/stores/object",
    "deepjs/lib/view",
    "deep-jquery/index",
    "deep-jquery/ajax/html",
    "deep-air/index"
    ],
function(require, deep)
{

    console.log("app sarted")
    var win = window.nativeWindow;

    deep.jquery.HTML.create();
    deep.jquery.JSON.create();
    deep.jquery.DOM.create("dom");

    var states = {
        refreshed:false,
        configured:false,
        present:false
    };
   
    //_____________________________________ auto hide when user is not present
    
    air.NativeApplication.nativeApplication.idleThreshold = 10; //10 seconds idle time

    air.NativeApplication.nativeApplication.addEventListener(air.Event.USER_IDLE, function(event) {
        //console.log("idle : refrehsed : ", refreshed);
        states.present = false;
        if(states.refreshed)
            win.minimize();
    });

    air.NativeApplication.nativeApplication.addEventListener(air.Event.USER_PRESENT, function(event) {
        //console.log("user is there");
        states.present = true;
    });
    //_____________________________________ refresh each 10 minutes

    var interval = setInterval(function(){
        console.log("interval rfresh : ", states.configured);
        if(states.configured)
            view.refresh();
    }, 1000 * 60 * 10); // 10 minutes      

    //_____________________________________ drag the window


    document.body.onmousedown = function() { win.startMove(); };
    document.body.onmouseup = function() {
        config.post({ x:win.x, y:win.y }, { id:"/position" });
    };

    //_____________________________________ start at login


    try
    {
        air.NativeApplication.nativeApplication.startAtLogin = true;
    }
    catch ( e )
    {
        air.trace( "Cannot set startAtLogin: " + e.message );
    }
     
    air.NativeApplication.nativeApplication.addEventListener( air.InvokeEvent.INVOKE, onInvoke );
    function onInvoke( event )
    {
        if( event.reason == air.InvokeEventReason.LOGIN )
        {
            //do background processing... 
            air.trace( "Running in background..." );
        }
        else
        {
            window.nativeWindow.activate();
        }
    }

    //_______________________________________

    deep.context.$ = $;

    var firstView = deep.View({
        how:"<div>hello first page</div>",
        where:"dom.htmlOf::#content"
    });

    firstView.refresh();

/*
    deep.context.$ = jQuery;
    deep.jquery.init(jQuery);
    deep.route(appSkeleton)
    .done(function (routes) {
        routes.init();
    });
*/
    window.nativeWindow.activate();

    console.log("app initialised");
    
});





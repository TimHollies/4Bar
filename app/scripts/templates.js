define([],function() {
    var templates = {};
    templates['editor'] = ({"v":1,"t":[{"t":7,"e":"div","a":{"class":"header row"},"t1":"fade","f":[{"t":7,"e":"div","a":{"class":"back-button"},"v":{"click":"navigate_back"},"f":[{"t":7,"e":"p","f":[{"t":7,"e":"i","a":{"class":"fa fa-arrow-left"}}]}]}," ",{"t":7,"e":"div","a":{"class":"central-menu"},"f":[{"t":7,"e":"h3","a":{"class":"tune-title"},"f":[{"t":2,"r":"title"}]}," ",{"t":7,"e":"br"}," ",{"t":7,"e":"div","a":{"class":"flat-button"},"f":[{"t":7,"e":"p","f":["File"]}]}," ",{"t":7,"e":"div","a":{"class":"flat-button"},"f":[{"t":7,"e":"p","f":["Edit"]}]}]}," ",{"t":7,"e":"div","a":{"class":"user-box"},"f":[{"t":4,"n":50,"x":{"r":["loggedIn"],"s":"_0===false"},"f":[{"t":7,"e":"a","a":{"href":"/auth/google","class":"google-button"},"f":[{"t":7,"e":"span","a":{"class":"fa fa-google-plus"}}," Google"]}]},{"t":4,"n":51,"f":[{"t":7,"e":"span","f":["Hi ",{"t":2,"r":"user.name.givenName"}]}," ",{"t":7,"e":"a","a":{"href":"/logout"},"f":["Log out"]}],"x":{"r":["loggedIn"],"s":"_0===false"}}]}]}," ",{"t":7,"e":"div","a":{"class":"row toolbar"},"f":[]}," ",{"t":7,"e":"div","a":{"class":"row editor"},"t1":"fade","f":[{"t":7,"e":"div","a":{"class":"column third","id":"abc-container"},"f":[{"t":7,"e":"textarea","a":{"id":"abc","value":[{"t":2,"r":"inputValue"}],"placeholder":"Start typing a tune.."},"v":{"keyup":"editor_keyup","paste":"editor_paste"}}]}," ",{"t":7,"e":"div","a":{"class":"column two-thirds","id":"canvas"},"f":[]}]}]});
    templates['home'] = ({"v":1,"t":[{"t":7,"e":"div","a":{"class":"header row coloured"},"t1":"fade","f":[{"t":7,"e":"div","a":{"class":"central-menu"},"f":[{"t":7,"e":"h1","f":["Welcome to WebABC"]},{"t":7,"e":"small","f":["Version 0.0.1"]}]}," ",{"t":7,"e":"div","a":{"class":"user-box"},"f":[{"t":4,"n":50,"x":{"r":["loggedIn"],"s":"_0===false"},"f":[{"t":7,"e":"button","a":{"class":"google-button"},"f":[{"t":7,"e":"div","a":{"class":"left"},"f":[{"t":7,"e":"i","a":{"class":"fa fa-google-plus"}}]},{"t":7,"e":"div","a":{"class":"right"},"f":["Sign in with Google+"]}]}]},{"t":4,"n":51,"f":[{"t":7,"e":"span","f":["Hi ",{"t":2,"r":"user.name.givenName"}]}," ",{"t":7,"e":"a","a":{"href":"/logout"},"f":["Log out"]}],"x":{"r":["loggedIn"],"s":"_0===false"}}]}]}," ",{"t":7,"e":"div","a":{"class":"row editor"},"f":[{"t":7,"e":"div","a":{"class":"column quarter right-divide"},"t1":{"n":"fade","a":[{"delay":100}]},"f":[{"t":7,"e":"div","a":{"class":"text-area-padding"},"f":[{"t":7,"e":"h3","f":["Recent Tunes"]}," ",{"t":7,"e":"div","a":{"id":"search-box"},"f":[{"t":7,"e":"i","a":{"class":"fa fa-search"}}," ",{"t":7,"e":"input","v":{"change":"updated_search"},"a":{"type":"text","value":[{"t":2,"r":"search_filter"}]}}]}," ",{"t":7,"e":"ul","a":{"class":"item-list"},"f":[{"t":4,"n":52,"x":{"r":["filterTuneNames","tuneNames","search_filter"],"s":"_0(_1,_2)"},"f":[{"t":7,"e":"li","v":{"click":"new_tune"},"f":[{"t":2,"r":"name"},{"t":7,"e":"br"},{"t":7,"e":"small","f":["12/09/2014 - Reel - Gm"]}]}]}]}]}]}," ",{"t":7,"e":"div","a":{"class":"column three-quarters","id":"task-pane"},"t1":{"n":"fade","a":[{"delay":200}]},"f":[{"t":7,"e":"div","a":{"class":"tile-button-container"},"f":[{"t":7,"e":"div","a":{"class":"tile-button"},"v":{"click":"new_tune"},"f":[{"t":7,"e":"h4","f":["+ New Tune"]}]}]}]}]}]});
    return templates;
})
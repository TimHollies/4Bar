define([
    'lodash',
    'scripts/rx.helper',
    'scripts/adaptors/ractive-adaptors-rxjs',
    'engine/parser',
    'engine/render',
    'jsDiff',
    'scripts/transitions/ractive.transitions.fade',
    'scripts/transitions/ractive.transitions.fly',
], function(_, Rx, adapter, parser, renderer, diff) {
    
    'use strict';
    
    var emptyTuneName = "Untitled Tune";
    
    var model = function(ractive, context) {

        renderer.initialize();
        
        var lines = [];
        
        ractive.set("title", emptyTuneName);
        
        //incorporates an elements index into its object
        function addIndexToObject(element, index) {
            return {
                raw: element,
                i: index
            };
        }
        
        //select many:
        function linesInChange(change) {
            
            return Rx.Observable.create(function(observer) {
                function get_diff(matrix, a1, a2, x, y) {
                if (x > 0 && y > 0 && a1[y-1] === a2[x-1]) {
                  get_diff(matrix, a1, a2, x-1, y-1);
                  //make_row(x, y, ' ', a1[y-1]);
                   if(x !== y)
                        observer.onNext({ action: "move", i: x-1, j: y-1 });
                }
                else {
                  if (x > 0 && (y === 0 || matrix[y][x-1] >= matrix[y-1][x])) {
                    get_diff(matrix, a1, a2, x-1, y);
                    //make_row(x, '', '+', a2[x-1]);
                      observer.onNext({ raw: a2[x-1], i: x-1, action: "add" });
                  }
                  else if (y > 0 && (x === 0 || matrix[y][x-1] < matrix[y-1][x])) {
                    get_diff(matrix, a1, a2, x, y-1);
                    //make_row('', y, '-', a1[y-1]);
                      observer.onNext({ raw: a1[y-1], i: y-1, action: "del" });
                  }
                  else {
                    return;
                  }
                }
              }

              function diff(a1, a2) {
                var matrix = new Array(a1.length + 1);
                var x, y;

                for (y = 0; y < matrix.length; y++) {
                  matrix[y] = new Array(a2.length + 1);

                  for (x = 0; x < matrix[y].length; x++) {
                    matrix[y][x] = 0;
                  }
                }

                for (y = 1; y < matrix.length; y++) {
                  for (x = 1; x < matrix[y].length; x++) {
                    if (a1[y-1] === a2[x-1]) {
                      matrix[y][x] = 1 + matrix[y-1][x-1];
                    }
                    else {
                      matrix[y][x] = Math.max(matrix[y-1][x], matrix[y][x-1]);
                    }
                  }
                }

                get_diff(matrix, a1, a2, x-1, y-1);
              }
                
                diff((change.oldValue || "").split('\n'), (change.newValue || "").split('\n'));
            }); 
        }
        
        //composition root
        Rx.Observable.fromRactive(ractive, 'inputValue')
        .selectMany(linesInChange)
        .map(parser)
        .map(renderer.onNext)
        .subscribe(function(a) { 
            //console.log(a); 
            if(a.type_class === "data" && a.parsed[0].type === "title") {
                if(!a.del && a.parsed[0].title.length > 0) {
                    ractive.set("title", a.parsed[0].title);
                } else {
                    ractive.set("title", emptyTuneName);
                }                
            }      
        }, function(a) { 
            console.log(a); 
        });
        
        
        //handle events
        ractive.on({
        "navigate_back": function(event) {
            window.location.hash = "";
        },
        "editor_keyup": function() {
            var field = document.getElementById("abc");
            if(field.scrollHeight > field.clientHeight) {
                console.log("grow");
                field.style.height = field.scrollHeight + "px";
            }
        }});

    }
    
    return model;
});
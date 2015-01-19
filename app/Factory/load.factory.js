angular.module('app')
        .factory('loadFactory',loadFactory);
loadFactory.$inject = ['$document'];        
        
function loadFactory($document){
                var item = {};
                var container = $document.find('.result');
                item.loadText = function () {  
                    container.empty();
                    var load = angular.element('<div class="loading"><img src="img/wheel.svg" alt="Loading..." /></div>');
                    container.append(load);
                };
                
                item.removeText = function(){
                    container.empty();
                };
                
                item.addItem = function(res){
                    container.append(res);
                };
                
                item.addItemTo = function(to,res){
                    var appendTo = $document.find(to);
                    appendTo.append(res);
                };
                
                item.findItem = function(res){
                    $document.find(res);
                };
                
                return item;
            };
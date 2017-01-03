
var codeTest = (function () {
    if ( typeof exports !== 'undefined' ) return require( __dirname + '/codeTest');
    else if ( typeof window !== 'undefined' && !window.codeTest ) return window.codeTest;
}());


// 節點範例
// 空枚舉：創建一個「乾淨」的空物件陣列。
// 其運用實例實作的效率比調用 ` Object.create( null ) ` 更快。（測試於 v8 v4.9）
function EventHandlers() {};
EventHandlers.prototype = Object.create( null );

// 擴展功能
// 若無 if 實例化速度下降低
function emptyEnum( objArgu ) {
    if ( !objArgu ) return;
    var key;
    for ( key in objArgu ) this[ key ] = objArgu[ key ];
}
emptyEnum.prototype = Object.create( null );

function emptyEnum_noIf( objArgu ) {
    var key;
    for ( key in objArgu ) this[ key ] = objArgu[ key ];
}
emptyEnum_noIf.prototype = Object.create( null );


var testFunc = [ _create, _getValue, _getArrValue, _getInSearch, _getArrInSearch ];
var storeSpace = [
    function () { return new EventHandlers(); },
    function () { return new emptyEnum(); },
    function () { return new emptyEnum_noIf(); },
    function () { return {}; },
    function () { return new Object(); },
    function () { return Object.create( null ); },
    function () { return []; },
    function () { return new Array(); },
    function () { return new Array( 0 ); },
];
var arrArgv = Array.prototype.concat( [], process.argv );
var actFunc = testFunc[ parseInt( arrArgv[ 2 ] ) ];
var loopTimes = parseInt( arrArgv[ 3 ] );
var storeMain = storeSpace[ parseInt( arrArgv[ 4 ] ) ];
var choA = arrArgv[ 5 ];
console.log( actFunc( loopTimes, storeMain, choA ) );


// 創建速度
function _create( numLoopTimes, fnStoreMain ) {
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
}

// 取值速度
function _getValue( numLoopTimes, fnStoreMain, numLength ) {
    numLength = parseInt( numLength );

    var idx, idxName;
    var anyMain = fnStoreMain();
    var arrNameList = _addPropx( anyMain, numLength );
    var arrTime = [];

    function get(idx) {
        var idxName = arrNameList[ idx ];
        return function () {
             return !!anyMain[ idxName ];
        };
    }

    for ( idx = 0; idx < numLength ; idx++ ) {
        arrTime.push( codeTest.timerSync( numLoopTimes, get(idx) ) );
    }

    return arrTime.join( ', ' );
}

// 取值數組速度
function _getArrValue( numLoopTimes, fnStoreMain, numLength ) {
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
}

// in 搜尋
function _getInSearch( numLoopTimes, fnStoreMain, numLength ) {
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
}

// in 數組搜尋
function _getArrInSearch( numLoopTimes, fnStoreMain, numLength ) {
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
    // xxxxx xxxxx xxxxx xxxxx
}


function _addPropx( objMain, numLength ) {
    var p, strName;
    var arrAns = [];
    for ( p = 0; p < numLength ; p++ ) {
        strName = arrAns[ p ] = codeTest.randomString( 30 );
        objMain[ strName ] = codeTest.randomString( 1000 );
    }
    return arrAns;
}

function _addNumPropx( anyMain, numLength ) {
    var p;
    for ( p = 0; p < numLength ; p++ ) {
        anyMain[ p ] = codeTest.randomString( 1000 );
    }
}


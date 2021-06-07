module.exports = {

    log: function( message, error ) {
        console.log( message );
        if( error ) {
            console.log( error );
        }
    },

    res404: function( res, message, error ) {
        res.status( 404 ).send( message );
        console.log( message );
        if( error ) {
            console.log( error );
        }
    },

    res200: function( res, message ) {
        res.status( 200 ).send( message );
        console.log( message );
    },

    time: function() {
        var today = new Date();
        var date = today.getFullYear() + '-' + ( today.getMonth() + 1 ) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return date + ' ' + time;
    },

    logTime: function() {
        var today = new Date();
        var date = today.getFullYear() + '-' + ( today.getMonth() + 1 ) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        console.log( date + ' ' + time );
    }
}
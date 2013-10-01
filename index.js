	function aggregate( item, accumulator, iterator, ctx ) {
		if ( typeof iterator !== 'function' ) {
			if ( typeof accumulator === 'function' ) {
				iterator    = accumulator;
				accumulator = [];
			}
			else
				iterator    = k;
		}

		item     = Object( item );
		ctx      = ctx || item;

		var i, l;

		if ( 'length' in item && !isNaN( item.length ) ) {
			i = -1;
			l = item.length;

			while ( ++i < l )
				accumulator = iterator.call( ctx, accumulator, item[i], i, item );
		}
		else for ( i in item ) {
			if ( Object.prototype.hasOwnProperty.call( item, i ) )
				accumulator = iterator.call( ctx, accumulator, item[i], i, item );
		}

		return accumulator;
	}

	function equal( a, b ) {
		switch ( Object.prototype.toString.call( a ) ) {
			case '[object Array]'  : return Array.isArray( b )
										  ? equal_array( a, b )
										  : false;

			case '[object Object]' : return Object.prototype.toString.call( b ) == '[object Object]'
										  ? equal_object( a, b )
										  : false;

			case '[object Date]'   : return +a == +b;
		}

		return a == b;
	}

	function  equal_array( a, b ) {
		return a.length === b.length
			&& Array.prototype.slice.call( a ).every( function( v, i ) {
				return equal( b[i], v );
			   } );
	}

	function equal_object( a, b ) {
		if ( len( a ) !== len( b ) || Object.getOwnPropertyNames( a ).length !== Object.getOwnPropertyNames( b ).length )
			return false;

		for ( var k in b ) // noinspection JSUnfilteredForInLoop
			if ( Object.prototype.hasOwnProperty.call( a, k ) !== Object.prototype.hasOwnProperty.call( b, k ) || !equal( a[k], b[k] ) )
				return false;

		return true;
	}

	function iter( item ) {
		return !!( ( item || typeof item === 'string' ) && ( 'length' in Object( item ) || typeof item === 'object' ) );
	}

	function k( item ) { return item; }

	function len( item ) {
		return ( 'length' in ( item = Object( item ) ) ? item : Object.keys( item ) ).length;
	}

	function range( i, j ) {
		return isNaN( i ) ? range_str( i, j ) : range_num( i, j );
	}

	function range_num( i, j ) {
		var a = [i];

		while ( ++i <= j )
			a.push( i );

		return a;
	}

	function range_str( i, j ) {
		i = String( i ).charCodeAt( 0 );
		j = String( j ).charCodeAt( 0 );

		var a = [],
			m = -1,
			n = Math.abs( i - j );

		--i;

		while ( ++m <= n )
			a.push( String.fromCharCode( ++i ) );

		return a;
	}

	function remove( item, keys ) {
		keys = Array.isArray( keys ) ? keys : Array.prototype.slice.call( arguments, 1 );

		var remove_type = Array.isArray( item ) ? remove_array : remove_object;

		if ( keys.length == 1 )
			remove_type.call( item, keys[0] );
		else
			keys.forEach( remove_type, item );

		return item;
	}

	function remove_array( val ) {
		var i = this.indexOf( val );

		i = !!~i ? i : !isNaN( val = parseInt( val, 10 ) ) && val in this ? val : i;

		if ( !!~i )
			this.splice( i, 1 );
	}

	function remove_object( key ) {
		delete this[key];
	}

	module.exports = iter;
	iter.aggregate = aggregate;
	iter.equal     = equal;
	iter.k         = k;
	iter.len       = len;
	iter.range     = range;
	iter.remove    = remove;

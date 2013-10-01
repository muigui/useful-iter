suite( 'muigui/useful-iter', function() {
	test( '<static> iter', function( done ) {
		var undef;
		expect( iter( [] ) ).to.equal( true );
		expect( iter( {} ) ).to.equal( true );
		expect( iter( Object.create( null ) ) ).to.equal( true );
		expect( iter( '' ) ).to.equal( true );
		expect( iter( new Date() ) ).to.equal( true );
		expect( iter( /.*/ ) ).to.equal( true );
		expect( iter( undef ) ).to.equal( false );
		expect( iter( null ) ).to.equal( false );
		expect( iter( 3 ) ).to.equal( false );

		done();
	} );

	test( '<static> iter.aggregate', function( done ) {
		expect( iter.aggregate( { one : 1, two : 2, three : 3 }, [], function( accumulator, value, key ) {
			accumulator.push( key );

			return accumulator;
		} ) ).to.deep.equal( ['one', 'two', 'three'] );

		expect( iter.aggregate( { one : 1, two : 2, three : 3 }, 1, function( accumulator, value, key ) {
			return accumulator += value;
		} ) ).to.equal( 7 );

		expect( iter.aggregate( iter.range( 0, 10 ), 0, function( accumulator, value, index ) {
			return accumulator += ( value * index );
		} ) ).to.equal( 385 );

		done();
    } );

	test( '<static> iter.len', function( done ) {
		expect( iter.len( { foo : 'bar' } ) ).to.equal( 1 );
		expect( iter.len( ['foo', 'bar'] ) ).to.equal( 2 );

		done();
	} );

	test( '<static> iter.range:Number', function( done ) {
		var returned = iter.range( 1, 10 );

		expect( returned ).to.eql( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] );
		expect( returned ).to.be.an( 'array' );

		done();
	} );

	test( '<static> iter.range:String', function( done ) {
		var returned = iter.range( 'a', 'z' );

		expect( returned ).to.be.an( 'array' );
		expect( returned.join( ' ' ) ).to.eql( 'a b c d e f g h i j k l m n o p q r s t u v w x y z' );

		expect( iter.range( 'A', 'z' ).join( ' ' ) ).to.eql( 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \\ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z' );
		expect( iter.range( 'α', 'ω' ).join( ' ' ) ).to.eql( 'α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ ς σ τ υ φ χ ψ ω' );

		done();
	} );

	test( '<static> iter.remove:Array', function( done ) {
		expect( iter.remove( iter.range( 'a', 'k' ), 'b', 'd', 'f', 'h', 'j' ) ).to.eql( ['a', 'c', 'e', 'g', 'i', 'k'] );
		expect( iter.remove( iter.remove( iter.range( 'l', 'z' ), ['l', 'n', 'p', 'r', 't', 'v', 'x', 'z'] ) ) ).to.eql( ['m', 'o', 'q', 's', 'u', 'w', 'y'] );

		done();
	} );

	test( '<static> iter.remove:Object', function( done ) {
		var expected = { one : 1, three : 3, five : 5 };

		expect( iter.remove( { one : 1, two : 2, three : 3, four : 4, five : 5 }, 'two', 'four' ) ).to.eql( expected );
		expect( iter.remove( { one : 1, two : 2, three : 3, four : 4, five : 5 }, ['two', 'four'] ) ).to.eql( expected );

		done();
	} );
} );

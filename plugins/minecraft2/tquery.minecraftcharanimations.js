tQuery.register('MinecraftCharAnimations', function(){
	var animations	= this;
	// call parent ctor
	tQuery.MinecraftCharAnimations.parent.constructor.call(this)
	
	var tweenAngle	= function(baseValue, nextValue, timePercent){
		// compute the nextValue to get the shortest path - assume it is an angle
		if( nextValue - baseValue > +Math.PI )	nextValue	-= Math.PI*2;
		if( nextValue - baseValue < -Math.PI )	nextValue	+= Math.PI*2;
		return (1-timePercent) * baseValue + timePercent * nextValue;
	}

	
	var onUpdate	= function(position){
		character.parts.armR.rotation.x	= position.armRRotationX;
		character.parts.armL.rotation.x	= position.armLRotationX;

		character.parts.armR.rotation.z	=  position.armRotationZ;
		character.parts.armL.rotation.z = -position.armRotationZ;

		character.parts.legR.rotation.z	=  position.legRotationZ;
		character.parts.legL.rotation.z = -position.legRotationZ;
	};
	var onCapture	= function(position){
		position.armLRotationX	= character.parts.armL.rotation.x;
		position.armRRotationX	= character.parts.armR.rotation.x;
		position.armRotationZ	= character.parts.armR.rotation.z;
		position.legRotationZ	= character.parts.legR.rotation.z;
	};
	var propTweens	= {
		armLRotationX	: tweenAngle,
		armRRotationX	: tweenAngle,
		armRotationZ	: tweenAngle,
		legRotationZ	: tweenAngle		
	}
	
	
	// Setup 'run' animation
	var angleRange	= Math.PI/2-Math.PI/10;
	animations.add('run'	, tQuery.createAnimation().pushKeyframe(0.5, {
		armLRotationX	: +Math.PI/10,
		armRRotationX	: -Math.PI/10,
		armRotationZ	: +angleRange,
		legRotationZ	: -angleRange			
	}).pushKeyframe(0.5, {
		armLRotationX	: +Math.PI/10,
		armRRotationX	: -Math.PI/10,
		armRotationZ	: -angleRange,
		legRotationZ	: +angleRange
	}).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

	// Setup 'walk' animation
	var angleRange	= Math.PI/3-Math.PI/10;
	animations.add('walk'	, tQuery.createAnimation().pushKeyframe(0.5, {
		armLRotationX	: +Math.PI/30,
		armRRotationX	: -Math.PI/30,
		armRotationZ	: +angleRange,
		legRotationZ	: -angleRange		
	}).pushKeyframe(0.5, {
		armLRotationX	: +Math.PI/30,
		armRRotationX	: -Math.PI/30,
		armRotationZ	: -angleRange,
		legRotationZ	: +angleRange
	}).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

	// Setup 'stand' animation
	animations.add('stand', tQuery.createAnimation().pushKeyframe(0.3, {
		armLRotationX	: 0,
		armRRotationX	: 0,
		armRotationZ	: 0,
		legRotationZ	: 0
	}).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

	// Setup 'wave' animation
	var angleRange	= Math.PI/2-Math.PI/10;
	animations.add('wave'	, tQuery.createAnimation().pushKeyframe(0.5, {
		armLRotationX	: 0,
		armRRotationX	: Math.PI+2*Math.PI/5,
		armRotationZ	: 0,
		legRotationZ	: 0			
	}).pushKeyframe(0.5, {
		armLRotationX	: 0,
		armRRotationX	: Math.PI+Math.PI/10,
		armRotationZ	: 0,
		legRotationZ	: 0			
	}).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

	// Setup 'hiwave' animation
	var angleRange	= Math.PI/2-Math.PI/10;
	animations.add('hiwave'	, tQuery.createAnimation().pushKeyframe(0.5, {
		armLRotationX	: Math.PI-3*Math.PI/5,
		armRRotationX	: Math.PI+3*Math.PI/5,
		armRotationZ	: 0,
		legRotationZ	: 0			
	}).pushKeyframe(0.5, {
		armLRotationX	: Math.PI-Math.PI/10,
		armRRotationX	: Math.PI+Math.PI/10,
		armRotationZ	: 0,
		legRotationZ	: 0			
	}).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));
});


tQuery.inherit(tQuery.MinecraftCharAnimations, tQuery.Animations);

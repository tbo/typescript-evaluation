requirejs.config({
	"paths": {
		"build": "../../../build",
		"plugins": "../../../plugins",
		"threex": "../../../vendor/threex",
		"three.js": "../../../vendor/three.js"
	},
	"map": {
		"*": {
			"tquery.domevent": "plugins/domevent/tquery.domevent",
			"tquery.keyboard": "plugins/keyboard/tquery.keyboard",
			"tquery.lavamaterial": "plugins/requirejs/confrequire/lavamaterial.initrequire",
			"tquery.materials": "plugins/materials/tquery.meshbasicmaterial",
			"tquery.minecraft": "plugins/requirejs/confrequire/minecraft.initrequire",
			"tquery.physics": "plugins/physics/tquery.physijs",
			"tquery.createplanet": "plugins/requirejs/confrequire/planets.initrequire",
			"tquery.pproc": "plugins/pproc/tquery.effectcomposer",
			"tquery.shape": "plugins/shape/tquery.shape",
			"tquery.skymap": "plugins/skymap/tquery.skymap",
			"tquery.text": "plugins/text/tquery.text",
			"tquery.text.allfonts": "plugins/text/fonts/droid/droid_serif_bold.typeface",
			"tquery.videos": "plugins/videos/tquery.createvideotexture"
		}
	},
	"shim": {
		"plugins/domevent/tquery.domevent": [
			"plugins/domevent/threex.domevent"
		],
		"plugins/keyboard/tquery.keyboard": [
			"threex/THREEx.KeyboardState"
		],
		"plugins/materials/tquery.meshbasicmaterial": [
			"plugins/materials/tquery.meshlambertmaterial",
			"plugins/materials/tquery.meshphongmaterial"
		],
		"plugins/requirejs/confrequire/minecraft.initrequire": [
			"plugins/minecraft/tquery.minecraftchar"
		],
		"plugins/physics/tquery.physijs": [
			"plugins/physics/vendor/physijs/physi"
		],
		"plugins/pproc/tquery.effectcomposer": [
			"three.js/ShaderExtras",
			"three.js/postprocessing/EffectComposer",
			"three.js/postprocessing/BloomPass",
			"three.js/postprocessing/DotScreenPass",
			"three.js/postprocessing/FilmPass",
			"three.js/postprocessing/MaskPass",
			"three.js/postprocessing/RenderPass",
			"three.js/postprocessing/SavePass",
			"three.js/postprocessing/ShaderPass",
			"three.js/postprocessing/TexturePass"
		],
		"plugins/shape/tquery.shape": [
			"plugins/shape/tquery.shape.create"
		],
		"plugins/skymap/tquery.skymap": [
			"plugins/skymap/tquery.cubetexture"
		],
		"plugins/text/tquery.text": [
			"plugins/text/fonts/droid/droid_serif_bold.typeface"
		],
		"plugins/text/fonts/droid/droid_serif_bold.typeface": [
			"plugins/text/fonts/gentilis_bold.typeface",
			"plugins/text/fonts/gentilis_regular.typeface",
			"plugins/text/fonts/optimer_bold.typeface",
			"plugins/text/fonts/optimer_regular.typeface",
			"plugins/text/fonts/helvetiker_bold.typeface",
			"plugins/text/fonts/helvetiker_regular.typeface",
			"plugins/text/fonts/droid/droid_sans_regular.typeface",
			"plugins/text/fonts/droid/droid_sans_bold.typeface",
			"plugins/text/fonts/droid/droid_serif_regular.typeface"
		],
		"plugins/videos/tquery.createvideotexture": [
			"plugins/videos/tquery.createwebcamtexture",
			"plugins/videos/tquery.createtvsnowtexture"
		]
	}
});

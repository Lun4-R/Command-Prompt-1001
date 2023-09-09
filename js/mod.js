let modInfo = {
	name: "Lumen Stellar",
	id: "CTAG455",
	author: "Niko_ | ( Citrine )",
	pointsName: "points",
	modFiles: [
	"GameData/Stellar.js", 
	"GameData/Tier.js",
	"GameData/Tokens.js",
	"tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 2400,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0.0.73-1",
	name: "Era of Eras",
}

let changelog = `<h1>Changelog:</h1><br>
  <h3>v0.0.0.3 // Tuesday-Wednesday , 16th-17th May</h3><br>
    - Added Tether as 2nd Reset layer currency.<br>
    - Added 3 Tether buyables.<br>
    - Changed formula of Bitcoin gain to be ^0.1 instead of ^0.05.<br>
    - More stat breakdowns and debugs.
    <br>
    <br>
  <h3>v0.0.0.21 // Sunday , 14th May</h3><br>
    - Fixed Point Generation.<br>
    - Made scaling and game bit harder I guess.
   <br>
   <br>
	<h3>v0.0.0.2 // Sunday , 14th May</h3><br>
		- Added Stellar tree node a text as ST.<br>
		- Fixed 'Improved CPU Clock Speed' buyable background color when you couldn't buy it.<br>
		- Fixed Notation setting begin broken and added 'Prism SQ' notation.<br>
		- Added some CSS variables for no reason...<br>
		- Added 1 new buyable and 1 new currency that boosts Stellar.<br>
		- Few Debug texts and breakdowm texts were added.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything", "tierUp", "btcReset", "tehReset", "t1Reset", "factoryInvestment", "type1reset", "hardfork", "HardReset", "MultiplierReset", "RebirthReset", "SRebirthReset", "URebirthReset", "fixBitcoin"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let Production = new Decimal(1)
	Production = Production.mul("ST", "T0-ST-1")
	Production = Production.mul("TK", "T0-TK-1")
	return Production
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("10^^10"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
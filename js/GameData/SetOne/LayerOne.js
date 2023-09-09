/*addLayer("SET", {
    name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
    unlocked: true,
    
    // Main Currency 
		points: new Decimal(0),
		    
		// Progression Currencies
		tier: new Decimal(0),
	  tierNext: new Decimal(1),
		tierRequirement: new Decimal(25000),
		tierScale: new Decimal(250),
		    
		// Ethereum Set
	  ETH: new Decimal(0),
		    
		// Bitcoin Set
	  BTC: new Decimal(0),
		BTCGain: new Decimal(0),
		BTCStatus: new Decimal(0),
		
		// Tether Set
	  TEH: new Decimal(0),
		TEHGain: new Decimal(0),
		TEHStatus: new Decimal(0),
		    
	  // Miscellaneous
		timePoints: new Decimal(0),
		
		// Energy Set
		energy: new Decimal(0),
		
		// Leveler Set
		level: new Decimal(0),
		levelXP: new Decimal(0),
		levelXPgain: new Decimal(0),
		levelXPrequirement: new Decimal(10),
		levelTokens: new Decimal(0),
		
		auto:{
    StellarAuto: false,
    EthereumAuto: false,
    },
    t:{
    TT: false
    }
    }},
    
    color: "#ffffff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Stellar", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { 
    let Multiplier = new Decimal(1)
    let TierBoostI = new Decimal(1).add(player.SET.tier.gte(1) ? 1 : 0)
    TierBoostI = TierBoostI.add(player.SET.tier.gte(4) ? 0.5 : 0)
    Multiplier = Multiplier.mul(buyableEffect("SET", 12))
    Multiplier = Multiplier.mul(buyableEffect("SET", 22))
    Multiplier = Multiplier.mul(buyableEffect("SET", 32))
    Multiplier = Multiplier.mul(buyableEffect("SET", 42))
    Multiplier = Multiplier.mul(buyableEffect("SET", 92))
    Multiplier = Multiplier.mul(tmp.SET.BTCBoost)
    Multiplier = Multiplier.mul(tmp.SET.TEHBoost)
    Multiplier = Multiplier.mul(tmp.SET.tickSpeedCalculation)
    Multiplier = Multiplier.mul(Decimal.pow(TierBoostI, player.SET.tier))
    return Multiplier
    },
    gainExp() {
    return new Decimal(1)
    },
    passiveGeneration() {
    let Generation = new Decimal(1)
    return Generation
    },
    ETHPerSecondCalculation() {
    let Base = new Decimal(0)
    let TierBoostI = new Decimal(1).add(player.SET.tier.gte(3) ? 0.5 : 0)
    TierBoostI = TierBoostI.add(player.SET.tier.gte(3) ? 0.25 : 0)
    Base = Base.add(buyableEffect("SET", 13))
    Base = Base.mul(buyableEffect("SET", 23))
    Base = Base.mul(buyableEffect("SET", 33))
    Base = Base.mul(buyableEffect("SET", 43))
    Base = Base.mul(buyableEffect("SET", 93))
    Base = Base.mul(Decimal.pow(TierBoostI, player.SET.tier))
    Base = Base.mul(tmp.SET.tickSpeedCalculation)
    Base = Base.mul(tmp.SET.TEHBoost)
    return Base
    },
    tierUp() {
    player.points = new Decimal(0)
    player.SET.points = new Decimal(0)
    player.SET.ETHPerSecond = new Decimal(0)
    player.SET.ETH = new Decimal(0)
    player.SET.BTC = new Decimal(0)
    player.SET.TEH = new Decimal(0)
      
    player.SET.buyables[11] = new Decimal(0)
    player.SET.buyables[12] = new Decimal(0)
    player.SET.buyables[13] = new Decimal(0)
    player.SET.buyables[14] = new Decimal(0)
    player.SET.buyables[21] = new Decimal(0)
    player.SET.buyables[22] = new Decimal(0)
    player.SET.buyables[23] = new Decimal(0)
    player.SET.buyables[24] = new Decimal(0)
    player.SET.buyables[31] = new Decimal(0)
    player.SET.buyables[32] = new Decimal(0)
    player.SET.buyables[33] = new Decimal(0)
    player.SET.buyables[41] = new Decimal(0)
    player.SET.buyables[42] = new Decimal(0)
    player.SET.buyables[43] = new Decimal(0)
    player.SET.buyables[44] = new Decimal(0)
      
    player.SET.tier = player.SET.tier.add(1)
    player.SET.tierRequirement = player.SET.tierRequirement.mul(375)
    },
    
    tierScaleCalculation() {
    let Tier = player.SET.tier
    Tier = Tier.add(1)
    let Base = new Decimal(25000)
    let ScaleI = new Decimal(7.75)
    let ScaleII = new Decimal(1)
    let ScaleIII = new Decimal(1)
    ScaleII = ScaleII.add(Decimal.div(player.SET.tier, 10))
    ScaleIII = ScaleIII.add(Decimal.div(player.SET.tier, 40))
    let Calculation = new Decimal.pow(Tier, ScaleI)
    Calculation = Calculation.pow(ScaleII)
    Calculation = Calculation.pow(ScaleIII)
    Calculation = Calculation.mul(Base)
    return Calculation
    },
    
    BTCReset() {
    player.points = new Decimal(0)
    player.SET.points = new Decimal(0)
    player.SET.ETHPerSecond = new Decimal(0)
    player.SET.ETH = new Decimal(0)
      
    player.SET.buyables[11] = new Decimal(0)
    player.SET.buyables[12] = new Decimal(0)
    player.SET.buyables[13] = new Decimal(0)
    player.SET.buyables[14] = new Decimal(0)
      
    player.SET.buyables[21] = new Decimal(0)
    player.SET.buyables[22] = new Decimal(0)
    player.SET.buyables[23] = new Decimal(0)
    player.SET.buyables[24] = new Decimal(0)
   
    player.SET.BTC = player.SET.BTC.add(player.SET.BTCGain)
    player.SET.BTCStatus = player.SET.BTCStatus.add(1)
    },
    
    calculateBTCGain() {
    let Base = new Decimal.div(player.points, 1e6)
    let Power = new Decimal(0.5)
    Power = Power.add(player.SET.tier.gte(8) ? 0.15 : 0)
    let Calculation = new Decimal.pow(Base, Power)
    Calculation = Calculation.mul(buyableEffect("SET", 34))
    Calculation = Calculation.mul(buyableEffect("SET", 93))
    return Calculation
    },
    
    BTCBoost() {
    let Base = player.SET.BTC
    let Power = new Decimal(0.75)
    Power = Power.add(player.SET.tier.gte(8) ? 0.15 : 0)
    let Calculation = new Decimal.pow(Base,Power)
    Calculation = Calculation.add(1)
    return Calculation
    },
    
    TEHReset() {
    player.points = new Decimal(0)
    player.SET.points = new Decimal(0)
    player.SET.ETHPerSecond = new Decimal(0)
    player.SET.ETH = new Decimal(0)
    player.SET.BTC = new Decimal(0)
    
    player.SET.buyables[11] = new Decimal(0)
    player.SET.buyables[12] = new Decimal(0)
    player.SET.buyables[13] = new Decimal(0)
    player.SET.buyables[14] = new Decimal(0)
    
    player.SET.buyables[21] = new Decimal(0)
    player.SET.buyables[22] = new Decimal(0)
    player.SET.buyables[23] = new Decimal(0)
    player.SET.buyables[24] = new Decimal(0)
        
    player.SET.buyables[31] = new Decimal(0)
    player.SET.buyables[32] = new Decimal(0)
    player.SET.buyables[33] = new Decimal(0)
    
    player.SET.TEH = player.SET.TEH.add(player.SET.TEHGain)
    player.SET.TEHStatus = player.SET.TEHStatus.add(1)
    },
    
    calculateTEHGain() {
    let Base = new Decimal.div(player.points, 1e27)
    let Power = new Decimal(0.2)
    let Calculation = new Decimal.pow(Base, Power)
    return Calculation
    },
    
    TEHBoost() {
    let Base = player.SET.TEH
    let Power = new Decimal(2)
    Power = Power.add(buyableEffect("SET", 49))
    let Calculation = new Decimal.pow(Base, Power)
    Calculation = Calculation.add(1)
    return Calculation
    },
    
    tickSpeedCalculation() {
    let Base = new Decimal(1)
    Base = Base.mul(buyableEffect("SET", 95))
    return Base
    },
    
    timePointCalculation() {
    let Base = new Decimal(0.017)
    Base = Base.mul(buyableEffect("SET", 99))
    Base = Base.mul(player.SET.tier.gte(6) ? 4 : 1)
    Base = Base.mul(player.SET.tier.gte(12) ? 4 : 1)
    return Base
    },
    
    energyPerSecondCalculation() {
    let Base = new Decimal(1)
    let Multiplication = player.SET.energy
    Multiplication = Multiplication.add(player.SET.tier.gte(8) ? 1 : 0)
    Multiplication = Multiplication.pow(0.3)
    
    let Calculation = new Decimal.mul(Base, Multiplication)
    return Calculation
    },
    
    levelXPgainCalculation() {
      let Base = new Decimal(0)
      Base = Base.add(player.SET.tier.gte(17) ? 1 : 0)
      return Base
    },
    
    levelXPrequirementScale() {
      let Base = new Decimal(1.55)
      let Power = player.SET.level
      Power = Power.add(1)
      
      let CalculationI = new Decimal(Base, Power)
      return CalculationI

    },
    
    autoUpgrade: () => ((tmp.SET.clickables.StellarAuto.canRun)), update(delta) {
    },
    
    update(diff) {
    player.SET.ETH = player.SET.ETH.add((tmp.SET.ETHPerSecondCalculation).times(diff))
      
    player.SET.BTCGain = tmp.SET.calculateBTCGain
    
    player.SET.TEHGain = tmp.SET.calculateTEHGain
      
    player.SET.timePoints = player.SET.timePoints.add((tmp.SET.timePointCalculation).times(diff))
    
    player.SET.energy = player.SET.energy.add((tmp.SET.energyPerSecondCalculation).times(diff))
    
    player.SET.levelXP = player.SET.levelXP.add((tmp.SET.levelXPgainCalculation).times(diff))
    
    if ((player.SET.levelXP).gte(player.SET.levelXPrequirement)) {
      player.SET.levelXP = new Decimal(0)
      player.SET.level = player.SET.level.add(1)
      player.SET.levelXPrequirement = player.SET.levelXPrequirement.mul(tmp.SET.levelXPrequirementScale)
    }
   
    if (tmp.SET.clickables.StellarAuto.canRun) buyBuyable(this.layer, 11)
    if (tmp.SET.clickables.StellarAuto.canRun) buyBuyable(this.layer, 12)
    if (tmp.SET.clickables.StellarAuto.canRun) buyBuyable(this.layer, 13)
    if (tmp.SET.clickables.StellarAuto.canRun) buyBuyable(this.layer, 14)
    
    if (tmp.SET.clickables.EthereumAuto.canRun) buyBuyable(this.layer, 21)
    if (tmp.SET.clickables.EthereumAuto.canRun) buyBuyable(this.layer, 22)
    if (tmp.SET.clickables.EthereumAuto.canRun) buyBuyable(this.layer, 23)
    if (tmp.SET.clickables.EthereumAuto.canRun) buyBuyable(this.layer, 24)
    },
    
    upgrades: {
    11: {
    cost: new Decimal(500),
    currencyLocation() { return player.SET },
    currencyDisplayName: "Energy",
    currencyInternalName: "energy",
    fullDisplay() {
    let state = []
    if (hasUpgrade("SET", [this.id])) {
    state.push('OVERRIDDEN TO PERMAMENT')
    }
    return `<MA style="font-size:25px">C: // TTCATACGCTCTACT</MA><br>
    <MA style="font-size:20px">Override core script file
    to allow you automatically buy Stellar
    buyables</MA><br>
    <MA style="font-size:12px">${state}<br>
    <br>
    <MA style="font-size:22px">Cost: ${format(tmp[this.layer].upgrades[this.id].cost)} Energy</MA>`
    },
    style() {
    if (hasUpgrade("SET", [this.id])) {
    return {
    "animation": "Energy-Own 2s ease-in-out infinite",
    "width": "auto",
    "height": "auto",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 15px #000000",
    "color": "#000000"
    }
    }
    else if (player.SET.energy.gte(tmp[this.layer].upgrades[this.id].cost)) {
    return {
    "animation" : "Afford-Blink 1s ease-in-out infinite",
    "width": "auto",
    "height": "auto",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 15px #000000",
    "color": "#ffffff"
    }
    }
    return {
    "background": "radial-gradient(circle, rgba(179,0,0,1) 0%, rgba(70,0,0,1) 100%)",
    "width": "auto",
    "height": " auto",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 10px #000000",
    "color": "#ffffff"
    }
    }
    },
    
    12: {
    cost: new Decimal(5000),
    currencyLocation() { return player.SET },
    currencyDisplayName: "Energy",
    currencyInternalName: "energy",
    fullDisplay() {
    let state = []
    if (hasUpgrade("SET", [this.id])) {
    state.push('OVERRIDDEN TO PERMAMENT')
    }
    return `<MA style="font-size:25px">C: // TCAGAATGTOAACGAC</MA><br>
    <MA style="font-size:20px">Override core script file
    to allow you automatically buy Ethereum
    buyables</MA><br>
    <MA style="font-size:12px">${state}<br>
    <br>
    <MA style="font-size:22px">Cost: ${format(tmp[this.layer].upgrades[this.id].cost)} Energy</MA>`
    },
    style() {
    if (hasUpgrade("SET", [this.id])) {
    return {
    "animation": "Energy-Own 2s ease-in-out infinite",
    "width": "auto",
    "height": "auto",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 15px #000000",
    "color": "#000000"
    }
    }
    else if (player.SET.energy.gte(tmp[this.layer].upgrades[this.id].cost)) {
    return {
    "animation" : "Afford-Blink 1s ease-in-out infinite",
    "width": "auto",
    "height": "auto",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 15px #000000",
    "color": "#ffffff"
    }
    }
    return {
    "background": "radial-gradient(circle, rgba(179,0,0,1) 0%, rgba(70,0,0,1) 100%)",
    "width": "auto",
    "height": " auto",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 10px #000000",
    "color": "#ffffff"
    }
    }
    },
    },
    clickables: {
    11: {
    title() {
    let state = player.SET.tier
    return `<b style="font-size:35px">Tier Up #${state}</b><br>
    Reset EVERYTHING in exchange for a Tier for further progress<br>
    Need ${format(tmp.SET.tierScaleCalculation)} Points to Tier Up`},
    canClick() { return player.points.gte(tmp.SET.tierScaleCalculation) },
    onClick() {
    tmp.SET.tierUp()
    },
    style() {
    if (tmp[this.layer].clickables[this.id].canClick) return {
    "background" : "radial-gradient(circle, transparent 20%, #ffffff 20%, #ffffff 80%, transparent 80%, transparent) 0% 0% / 128px 128px, radial-gradient(circle, transparent 20%, #ffffff 20%, #ffffff 80%, transparent 80%, transparent) 64px 64px / 128px 128px, linear-gradient(#6b6b6b 1px, transparent 1px) 0px -0.5px / 64px 64px, linear-gradient(90deg, #6b6b6b 1px, #ffffff 1px) -0.5px 0px / 64px 64px #ffffff",
    "background-size" : "128px 128px, 128px 128px, 64px 64px, 64px 64px",
    "background-color" : "#ffffff",
    "animation" : "pulse 2s infinite",
    "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
    "width": "460px",
    "height": "130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 15px #000000",
    "color": "#000000"
    }
    return {
    "background": "radial-gradient(circle, rgba(155,55,55,1) 0%, rgba(50,15,15,1) 100%)",
    "width": "460px",
    "height": " 130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 10px #000000",
    "color": "#ffffff"
    }
    },
    unlocked() {
    return true
    }
    },
        
    12: {
    title() {
    let state = player.SET.BTCStatus
    return `<b style="font-size:35px">Hardfork #${state}</b><br>
    Reset Stellar and Ethereum for Bitcoin for further progression<br>
    Reset for ${format(player.SET.BTCGain)} Bitcoin`},
    canClick() { return player.SET.BTCGain.gte(1)
    },
    onClick() {
    tmp.SET.BTCReset()
    },
    style() {
    if (tmp[this.layer].clickables[this.id].canClick) return {
    "background": "linear-gradient(-180deg, rgba(175,109,3,1) 0%, rgba(225,176,0,1) 100%)",
    "width": "460px",
    "height": "130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 15px #000000",
    "color": "#ffffff"
    }
    return {
    "background": "radial-gradient(circle, rgba(155,55,55,1) 0%, rgba(50,15,15,1) 100%)",
    "width": "460px",
    "height": " 130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 10px #000000",
    "color" : "#ffffff"
    }
    },
    unlocked() {
    return player.SET.tier.gte(3)
    }
    },
    
    13: {
    title() {
    let state = player.SET.TEHStatus
    return `<b style="font-size:35px">Binary Sort #${state}</b><br>
    Reset Stellar , Ethereum and Bitcoin for Tether for further progression<br>
    Reset for ${format(player.SET.TEHGain)} Tether`},
    canClick() { return player.SET.TEHGain.gte(1)
    },
    onClick() {
    tmp.SET.TEHReset()
    },
    style() {
    if (tmp[this.layer].clickables[this.id].canClick) return {
    "background": "linear-gradient(65deg, rgba(53,255,120,1) 0%, rgba(0,204,145,1) 100%)",
    "width": "460px",
    "height": "130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 15px #000000",
    "color": "#ffffff"
    }
    return {
    "background": "radial-gradient(circle, rgba(155,55,55,1) 0%, rgba(50,15,15,1) 100%)",
    "width": "460px",
    "height": " 130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 10px #000000",
    "color" : "#ffffff"
    }
    },
    unlocked() {
    return player.SET.tier.gte(12)
    }
    },
    
    StellarAuto: {
    set: "auto",
    title: "Stellar Automation",
    display() {
    return Boolean(player.SET[this.set][this.id]) ? "On" : "Off"
    },
    canClick() {
    return true
    },
    onClick() {
    player.SET[this.set][this.id] = Boolean(1 - player.SET[this.set][this.id])
    },
    canRun() {
    return player.SET[this.set][this.id] && tmp.SET.clickables[this.id].canClick
    },
    unlocked() {
    return hasUpgrade("SET", 11)
    },
    style() {
    if (this.canClick()) return {
    "background": "linear-gradient(180deg, rgba(223,141,255,1) 0%, rgba(141,185,255,1) 100%)",
    "color": "white",
    "border": "0px",
    "border-radius" : "5px",
    "width" : "300px",
    "height" : "25px"
    }
    else return {
    "background": "linear-gradient(180deg, rgba(223,141,255,1) 0%, rgba(141,185,255,1) 100%)",
    "color" : "white",
    "border" : "0px", 
    "border-radius" : "5px",
    "width" : "300px",
    "height" : "25px"
    }
    },
    },
    EthereumAuto: {
    set: "auto",
    title: "Ethereum Automation",
    display() {
    return Boolean(player.SET[this.set][this.id]) ? "On" : "Off"
    },
    canClick() {
    return true
    },
    onClick() {
    player.SET[this.set][this.id] = Boolean(1 - player.SET[this.set][this.id])
    },
    canRun() {
    return player.SET[this.set][this.id] && tmp.SET.clickables[this.id].canClick
    },
    unlocked() {
    return hasUpgrade("SET", 12)
    },
    style() {
    if (this.canClick()) return {
    "background": "linear-gradient(180deg, rgba(223,141,255,1) 0%, rgba(141,185,255,1) 100%)",
    "color": "white",
    "border": "0px",
    "border-radius" : "5px",
    "width" : "300px",
    "height" : "25px"
    }
    else return {
    "background": "linear-gradient(180deg, rgba(223,141,255,1) 0%, rgba(141,185,255,1) 100%)",
    "color" : "white",
    "border" : "0px", 
    "border-radius" : "5px",
    "width" : "300px",
    "height" : "25px"
    }
    },
    },
    TT: {
    set: "t",
    title: "Tier Translator",
    display() {
    return Boolean(player.SET[this.set][this.id]) ? "On" : "Off"
    },
    canClick() {
    return true
    },
    onClick() {
    player.SET[this.set][this.id] = Boolean(1 - player.SET[this.set][this.id])
    },
    canRun() {
    return player.SET[this.set][this.id] && tmp.SET.clickables[this.id].canClick
    },
    unlocked() {
    return player.SET.tier.gte(17)
    },
    style() {
    if (this.canClick()) return {
    "background": "linear-gradient(180deg, rgba(223,141,255,1) 0%, rgba(141,185,255,1) 100%)",
    "color": "white",
    "border": "0px",
    "border-radius" : "5px",
    "width" : "300px",
    "height" : "25px"
    }
    else return {
    "background": "linear-gradient(180deg, rgba(223,141,255,1) 0%, rgba(141,185,255,1) 100%)",
    "color" : "white",
    "border" : "0px", 
    "border-radius" : "5px",
    "width" : "300px",
    "height" : "25px"
    }
    },
    },
    },
    
    buyables: {
    11: {
    cost(x) {
    let PowerI = new Decimal(2.25)
    let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
    PowerI = PowerI.pow(PowerII)
    PowerI = PowerI.pow(PowerIII)
    let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
    Calculation = Calculation.div(buyableEffect("SET", 14))
    Calculation = Calculation.div(buyableEffect("SET", 44))
    return Calculation;
    },
    display() {
    return `<b style="font-size:24px">Neural Network v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Point Generation</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
    },
    canAfford() {
    return player[this.layer].points.gte(this.cost())
    },
    style() {
    if (tmp[this.layer].buyables[this.id].canAfford)
    return {
    "animation" : "Afford-Smooth 4s ease-in-out infinite",
    "width": "430px",
    "height": "130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 5px #000000",
    "color": "#ffffff"
    }
    return {
    "background": "radial-gradient(circle, rgba(179,0,0,1) 0%, rgba(70,0,0,1) 100%)",
    "width": "430px",
    "height": " 130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 10px #000000",
    "color": "#ffffff"
    }
    },
    buy() {
    player[this.layer].points = player[this.layer].points.sub(this.cost())
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    effect(x) {
    let Effect = new Decimal(1).mul(Decimal.pow(2, x.pow(1)))
    return Effect;
    },
    unlocked() {
    return true;
    }
    },
    
    12: {
    cost(x) {
    let PowerI = new Decimal(2.5)
    let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
    PowerI = PowerI.pow(PowerII)
    PowerI = PowerI.pow(PowerIII)
    let Calculation = new Decimal(10).mul(Decimal.pow(PowerI, x.pow(1)))
    Calculation = Calculation.div(buyableEffect("SET", 14))
    Calculation = Calculation.div(buyableEffect("SET", 44))
    return Calculation;
    },
    display() {
    return `<b style="font-size:24px">Bigger Computer v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Stellar Production</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
    },
    canAfford() {
    return player[this.layer].points.gte(this.cost())
    },
    style() {
    if (tmp[this.layer].buyables[this.id].canAfford)
    return {
    "animation" : "Afford-Smooth 4s ease-in-out infinite",
    "width": "430px",
    "height": "130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 5px #000000",
    "color": "#ffffff"
    }
    return {
    "background": "radial-gradient(circle, rgba(179,0,0,1) 0%, rgba(70,0,0,1) 100%)",
    "width": "430px",
    "height": " 130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 10px #000000",
    "color": "#ffffff"
    }
    },
    buy() {
    player[this.layer].points = player[this.layer].points.sub(this.cost())
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    effect(x) {
    let Effect = new Decimal(1).mul(Decimal.pow(1.5, x.pow(1)))
    return Effect;
    },
    unlocked() {
    return true;
    }
    },
    
    13: {
    cost(x) {
    let PowerI = new Decimal(2.75)
    let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))

    PowerI = PowerI.pow(PowerII)
    PowerI = PowerI.pow(PowerIII)
    let Calculation = new Decimal(100).mul(Decimal.pow(PowerI, x.pow(1)))
    Calculation = Calculation.div(buyableEffect("SET", 14))
    Calculation = Calculation.div(buyableEffect("SET", 44))
    return Calculation;
    },
    display() {
    return `<b style="font-size:24px">RAM Sticks v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>+${format(tmp[this.layer].buyables[this.id].effect)} Ethereum / sec</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
    },
    canAfford() {
    return player[this.layer].points.gte(this.cost())
    },
    style() {
    if (tmp[this.layer].buyables[this.id].canAfford)
    return {
    "animation": "Afford-Smooth 4s ease-in-out infinite",
    "width": "430px",
    "height": "130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 5px #000000",   
    "color": "#ffffff"
    }
    return {
    "background": "radial-gradient(circle, rgba(179,0,0,1) 0%, rgba(70,0,0,1) 100%)",
    "width": "430px",
    "height": " 130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",   
    "text-shadow": "0px 0px 10px #000000",
    "color": "#ffffff"
    }
    },
    buy() {
    player[this.layer].points = player[this.layer].points.sub(this.cost())
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    effect(x) {
    let Effect = new Decimal(1).mul(Decimal.pow(1.25, x.pow(1))).sub(1)
    return Effect;
    },
    unlocked() {
    return player.SET.tier.gte(1);
    }
    },
    
    14: {
    cost(x) {
    let PowerI = new Decimal(10)
    let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))

    PowerI = PowerI.pow(PowerII)
    PowerI = PowerI.pow(PowerIII)
    let Calculation = new Decimal(1e6).mul(Decimal.pow(PowerI, x.pow(1)))
    Calculation = Calculation.div(buyableEffect("SET", 44))
    return Calculation;
    },
    display() {
    return `<b style="font-size:24px">Cheaper Components v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>/${format(tmp[this.layer].buyables[this.id].effect)} previous buyables cost</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
    },
    canAfford() {
    return player[this.layer].points.gte(this.cost())
    },
    style() {
    if (tmp[this.layer].buyables[this.id].canAfford)
    return {
    "animation": "Afford-Smooth 4s ease-in-out infinite",
    "width": "430px",
    "height": "130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 5px #000000",
    "color": "#ffffff"
    }
    return {
    "background": "radial-gradient(circle, rgba(179,0,0,1) 0%, rgba(70,0,0,1) 100%)",
    "width": "430px",
    "height": " 130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 10px #000000",
    "color": "#ffffff"
    }
    },
    buy() {
    player[this.layer].points = player[this.layer].points.sub(this.cost())
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    effect(x) {
    let Effect = new Decimal(1).mul(Decimal.pow(2, x.pow(1)))
    return Effect;
    },
    unlocked() {
    return player.SET.tier.gte(2);
    }
    },   
    
    21: {
    cost(x) {
    let PowerI = new Decimal(3.25)
    let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
    PowerI = PowerI.pow(PowerII)
    PowerI = PowerI.pow(PowerIII)
    let Calculation = new Decimal(10).mul(Decimal.pow(PowerI, x.pow(1)))
    Calculation = Calculation.div(buyableEffect("SET", 24))
    return Calculation;
    },
    display() {
    return `<b style="font-size:24px">Neural Network+ v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Point Generation</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
    },
    canAfford() {
    return player[this.layer].ETH.gte(this.cost())
    },
    style() {
    if (tmp[this.layer].buyables[this.id].canAfford)
    return {
    "animation" : "Afford-BlinkB 1s ease-in-out infinite",
    "width": "430px",
    "height": "130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 5px #000000",
    "color": "#ffffff"
    }
    return {
    "background": "radial-gradient(circle, rgba(179,0,0,1) 0%, rgba(70,0,0,1) 100%)",
    "width": "430px",
    "height": " 130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 10px #000000",
    "color": "#ffffff"
    }
    },
    buy() {
    player[this.layer].ETH = player[this.layer].ETH.sub(this.cost())
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    effect(x) {
    let Effect = new Decimal(1).mul(Decimal.pow(1.5, x.pow(1)))
    return Effect;
    },
    unlocked() {
    return player.SET.tier.gte(1);
    }
    },
    
    22: {
    cost(x) {
    let PowerI = new Decimal(3.5)
    let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
    PowerI = PowerI.pow(PowerII)
    PowerI = PowerI.pow(PowerIII)
    let Calculation = new Decimal(100).mul(Decimal.pow(PowerI, x.pow(1)))
    Calculation = Calculation.div(buyableEffect("SET", 24))
    return Calculation;
    },
    display() {
    return `<b style="font-size:24px">Bigger Computer+ v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Stellar Production</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
    },
    canAfford() {
    return player[this.layer].ETH.gte(this.cost())
    },
    style() {
    if (tmp[this.layer].buyables[this.id].canAfford)
    return {
    "animation" : "Afford-BlinkB 1s ease-in-out infinite",
    "width": "430px",
    "height": "130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 5px #000000",
    "color": "#ffffff"
    }
    return {
    "background": "radial-gradient(circle, rgba(179,0,0,1) 0%, rgba(70,0,0,1) 100%)",
    "width": "430px",
    "height": " 130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 10px #000000",
    "color": "#ffffff"
    }
    },
    buy() {
    player[this.layer].ETH = player[this.layer].ETH.sub(this.cost())
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    effect(x) {
    let Effect = new Decimal(1).mul(Decimal.pow(1.5, x.pow(1)))
    return Effect;
    },
    unlocked() {
    return player.SET.tier.gte(1);
    }
    },
    
    23: {
    cost(x) {
    let PowerI = new Decimal(3.75)
    let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))

    PowerI = PowerI.pow(PowerII)
    PowerI = PowerI.pow(PowerIII)
    let Calculation = new Decimal(1000).mul(Decimal.pow(PowerI, x.pow(1)))
    Calculation = Calculation.div(buyableEffect("SET", 24))
    return Calculation;
    },
    display() {
    return `<b style="font-size:24px">RAM Sticks+ v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Ethereum</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
    },
    canAfford() {
    return player[this.layer].ETH.gte(this.cost())
    },
    style() {
    if (tmp[this.layer].buyables[this.id].canAfford)
    return {
    "animation": "Afford-BlinkB 1s ease-in-out infinite",
    "width": "430px",
    "height": "130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 5px #000000",   
    "color": "#ffffff"
    }
    return {
    "background": "radial-gradient(circle, rgba(179,0,0,1) 0%, rgba(70,0,0,1) 100%)",
    "width": "430px",
    "height": " 130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",   
    "text-shadow": "0px 0px 10px #000000",
    "color": "#ffffff"
    }
    },
    buy() {
    player[this.layer].ETH = player[this.layer].ETH.sub(this.cost())
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    effect(x) {
    let Effect = new Decimal(1).mul(Decimal.pow(1.5, x.pow(1)))
    return Effect;
    },
    unlocked() {
    return player.SET.tier.gte(2);
    }
    },
    
    24: {
    cost(x) {
    let PowerI = new Decimal(25)
    let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))

    PowerI = PowerI.pow(PowerII)
    PowerI = PowerI.pow(PowerIII)
    let Calculation = new Decimal(10000).mul(Decimal.pow(PowerI, x.pow(1)))
    return Calculation;
    },
    display() {
    return `<b style="font-size:24px">Cheaper Components+ v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>/${format(tmp[this.layer].buyables[this.id].effect)} previous buyable cost</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
    },
    canAfford() {
    return player[this.layer].ETH.gte(this.cost())
    },
    style() {
    if (tmp[this.layer].buyables[this.id].canAfford)
    return {
    "animation": "Afford-BlinkB 1s ease-in-out infinite",
    "width": "430px",
    "height": "130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 5px #000000",
    "color": "#ffffff"
    }
    return {
    "background": "radial-gradient(circle, rgba(179,0,0,1) 0%, rgba(70,0,0,1) 100%)",
    "width": "430px",
    "height": " 130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 10px #000000",
    "color": "#ffffff"
    }
    },
    buy() {
    player[this.layer].ETH = player[this.layer].ETH.sub(this.cost())
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    effect(x) {
    let Effect = new Decimal(1).mul(Decimal.pow(2.25, x.pow(1)))
    return Effect;
    },
    unlocked() {
    return player.SET.tier.gte(3);
    }
    },  
    
    31: {
    cost(x) {
    let PowerI = new Decimal(50)
    let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
    PowerI = PowerI.pow(PowerII)
    PowerI = PowerI.pow(PowerIII)
    let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
    return Calculation;
    },
    display() {
    return `<b style="font-size:24px">Neural Network++ v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Point Generation</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
    },
    canAfford() {
    return player[this.layer].BTC.gte(this.cost())
    },
    style() {
    if (tmp[this.layer].buyables[this.id].canAfford)
    return {
    "animation" : "Afford-BlinkY 1s ease-in-out infinite",
    "width": "430px",
    "height": "130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 5px #000000",
    "color": "#ffffff"
    }
    return {
    "background": "radial-gradient(circle, rgba(179,0,0,1) 0%, rgba(70,0,0,1) 100%)",
    "width": "430px",
    "height": " 130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 10px #000000",
    "color": "#ffffff"
    }
    },
    buy() {
    player[this.layer].BTC = player[this.layer].BTC.sub(this.cost())
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    effect(x) {
    let Effect = new Decimal(1).mul(Decimal.pow(2.5, x.pow(1)))
    return Effect;
    },
    unlocked() {
    return player.SET.tier.gte(1);
    }
    },
    
    32: {
    cost(x) {
    let PowerI = new Decimal(50)
    let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
    PowerI = PowerI.pow(PowerII)
    PowerI = PowerI.pow(PowerIII)
    let Calculation = new Decimal(100).mul(Decimal.pow(PowerI, x.pow(1)))
    return Calculation;
    },
    display() {
    return `<b style="font-size:24px">Bigger Computer++ v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Stellar Production</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
    },
    canAfford() {
    return player[this.layer].BTC.gte(this.cost())
    },
    style() {
    if (tmp[this.layer].buyables[this.id].canAfford)
    return {
    "animation" : "Afford-BlinkY 1s ease-in-out infinite",
    "width": "430px",
    "height": "130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 5px #000000",
    "color": "#ffffff"
    }
    return {
    "background": "radial-gradient(circle, rgba(179,0,0,1) 0%, rgba(70,0,0,1) 100%)",
    "width": "430px",
    "height": " 130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 10px #000000",
    "color": "#ffffff"
    }
    },
    buy() {
    player[this.layer].BTC = player[this.layer].BTC.sub(this.cost())
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    effect(x) {
    let Effect = new Decimal(1).mul(Decimal.pow(2.5, x.pow(1)))
    return Effect;
    },
    unlocked() {
    return player.SET.tier.gte(1);
    }
    },
    
    33: {
    cost(x) {
    let PowerI = new Decimal(50)
    let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))

    PowerI = PowerI.pow(PowerII)
    PowerI = PowerI.pow(PowerIII)
    let Calculation = new Decimal(1000).mul(Decimal.pow(PowerI, x.pow(1)))
    return Calculation;
    },
    display() {
    return `<b style="font-size:24px">RAM Sticks++ v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Ethereum</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
    },
    canAfford() {
    return player[this.layer].BTC.gte(this.cost())
    },
    style() {
    if (tmp[this.layer].buyables[this.id].canAfford)
    return {
    "animation": "Afford-BlinkY 1s ease-in-out infinite",
    "width": "430px",
    "height": "130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 5px #000000",   
    "color": "#ffffff"
    }
    return {
    "background": "radial-gradient(circle, rgba(179,0,0,1) 0%, rgba(70,0,0,1) 100%)",
    "width": "430px",
    "height": " 130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",   
    "text-shadow": "0px 0px 10px #000000",
    "color": "#ffffff"
    }
    },
    buy() {
    player[this.layer].BTC = player[this.layer].BTC.sub(this.cost())
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    effect(x) {
    let Effect = new Decimal(1).mul(Decimal.pow(2.5, x.pow(1)))
    return Effect;
    },
    unlocked() {
    return player.SET.tier.gte(5);
    }
    },
    
    34: {
    cost(x) {
    let PowerI = new Decimal(50)
    let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))

    PowerI = PowerI.pow(PowerII)
    PowerI = PowerI.pow(PowerIII)
    let Calculation = new Decimal(10000).mul(Decimal.pow(PowerI, x.pow(1)))
    return Calculation;
    },
    display() {
    return `<b style="font-size:24px">GPU Miner v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Bitcoin</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
    },
    canAfford() {
    return player[this.layer].BTC.gte(this.cost())
    },
    style() {
    if (tmp[this.layer].buyables[this.id].canAfford)
    return {
    "animation": "Afford-BlinkY 1s ease-in-out infinite",
    "width": "430px",
    "height": "130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 5px #000000",
    "color": "#ffffff"
    }
    return {
    "background": "radial-gradient(circle, rgba(179,0,0,1) 0%, rgba(70,0,0,1) 100%)",
    "width": "430px",
    "height": " 130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 10px #000000",
    "color": "#ffffff"
    }
    },
    buy() {
    player[this.layer].BTC = player[this.layer].BTC.sub(this.cost())
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    effect(x) {
    let Effect = new Decimal(1).mul(Decimal.pow(2.5, x.pow(1)))
    return Effect;
    },
    unlocked() {
    return player.SET.tier.gte(5);
    }
    },
    
    41: {
    cost(x) {
    let PowerI = new Decimal(1.5)
    let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
    PowerI = PowerI.pow(PowerII)
    PowerI = PowerI.pow(PowerIII)
    let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
    return Calculation;
    },
    display() {
    return `<b style="font-size:24px">Neural Network+3 v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Point Generation</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Tether</h1>`
    },
    canAfford() {
    return player[this.layer].TEH.gte(this.cost())
    },
    style() {
    if (tmp[this.layer].buyables[this.id].canAfford)
    return {
    "animation" : "Afford-BlinkY 1s ease-in-out infinite",
    "width": "430px",
    "height": "130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 5px #000000",
    "color": "#ffffff"
    }
    return {
    "background": "radial-gradient(circle, rgba(179,0,0,1) 0%, rgba(70,0,0,1) 100%)",
    "width": "430px",
    "height": " 130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 10px #000000",
    "color": "#ffffff"
    }
    },
    buy() {
    player[this.layer].TEH = player[this.layer].TEH.sub(this.cost())
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    effect(x) {
    let Effect = new Decimal(1).mul(Decimal.pow(3, x.pow(1)))
    return Effect;
    },
    unlocked() {
    return player.SET.tier.gte(16);
    }
    },
    
    42: {
    cost(x) {
    let PowerI = new Decimal(2)
    let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
    PowerI = PowerI.pow(PowerII)
    PowerI = PowerI.pow(PowerIII)
    let Calculation = new Decimal(5).mul(Decimal.pow(PowerI, x.pow(1)))
    return Calculation;
    },
    display() {
    return `<b style="font-size:24px">Bigger Computer+3 v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Stellar Production</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Tether</h1>`
    },
    canAfford() {
    return player[this.layer].TEH.gte(this.cost())
    },
    style() {
    if (tmp[this.layer].buyables[this.id].canAfford)
    return {
    "animation" : "Afford-BlinkY 1s ease-in-out infinite",
    "width": "430px",
    "height": "130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 5px #000000",
    "color": "#ffffff"
    }
    return {
    "background": "radial-gradient(circle, rgba(179,0,0,1) 0%, rgba(70,0,0,1) 100%)",
    "width": "430px",
    "height": " 130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 10px #000000",
    "color": "#ffffff"
    }
    },
    buy() {
    player[this.layer].TEH = player[this.layer].TEH.sub(this.cost())
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    effect(x) {
    let Effect = new Decimal(1).mul(Decimal.pow(3, x.pow(1)))
    return Effect;
    },
    unlocked() {
    return player.SET.tier.gte(16);
    }
    },
    
    43: {
    cost(x) {
    let PowerI = new Decimal(3)
    let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))

    PowerI = PowerI.pow(PowerII)
    PowerI = PowerI.pow(PowerIII)
    let Calculation = new Decimal(25).mul(Decimal.pow(PowerI, x.pow(1)))
    return Calculation;
    },
    display() {
    return `<b style="font-size:24px">RAM Sticks+3 v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Ethereum</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Tether</h1>`
    },
    canAfford() {
    return player[this.layer].TEH.gte(this.cost())
    },
    style() {
    if (tmp[this.layer].buyables[this.id].canAfford)
    return {
    "animation": "Afford-BlinkY 1s ease-in-out infinite",
    "width": "430px",
    "height": "130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 5px #000000",   
    "color": "#ffffff"
    }
    return {
    "background": "radial-gradient(circle, rgba(179,0,0,1) 0%, rgba(70,0,0,1) 100%)",
    "width": "430px",
    "height": " 130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",   
    "text-shadow": "0px 0px 10px #000000",
    "color": "#ffffff"
    }
    },
    buy() {
    player[this.layer].TEH = player[this.layer].TEH.sub(this.cost())
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    effect(x) {
    let Effect = new Decimal(1).mul(Decimal.pow(2.5, x.pow(1)))
    return Effect;
    },
    unlocked() {
    return player.SET.tier.gte(22);
    }
    },
    
    44: {
    cost(x) {
    let PowerI = new Decimal(5)
    let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))

    PowerI = PowerI.pow(PowerII)
    PowerI = PowerI.pow(PowerIII)
    let Calculation = new Decimal(125).mul(Decimal.pow(PowerI, x.pow(1)))
    return Calculation;
    },
    display() {
    return `<b style="font-size:24px">Cheaper Components+3 v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>/${format(tmp[this.layer].buyables[this.id].effect)} Stellar buyables</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Tether</h1>`
    },
    canAfford() {
    return player[this.layer].TEH.gte(this.cost())
    },
    style() {
    if (tmp[this.layer].buyables[this.id].canAfford)
    return {
    "animation": "Afford-BlinkY 1s ease-in-out infinite",
    "width": "430px",
    "height": "130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 5px #000000",
    "color": "#ffffff"
    }
    return {
    "background": "radial-gradient(circle, rgba(179,0,0,1) 0%, rgba(70,0,0,1) 100%)",
    "width": "430px",
    "height": " 130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 10px #000000",
    "color": "#ffffff"
    }
    },
    buy() {
    player[this.layer].TEH = player[this.layer].TEH.sub(this.cost())
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    effect(x) {
    let Effect = new Decimal(1).mul(Decimal.pow(25, x.pow(1)))
    return Effect;
    },
    unlocked() {
    return player.SET.tier.gte(22);
    }
    },
    
    49: {
      cost(x) {
        let PowerI = new Decimal(1.02)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    
        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Special Upgrade I v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>+ ^${format(tmp[this.layer].buyables[this.id].effect)} to Tether effect</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Tether</h1>`
      },
      canAfford() {
        return player[this.layer].TEH.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "animation": "Afford-BlinkY 1s ease-in-out infinite",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background": "radial-gradient(circle, rgba(179,0,0,1) 0%, rgba(70,0,0,1) 100%)",
          "width": "430px",
          "height": " 130px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
        }
      },
      buy() {
        player[this.layer].TEH = player[this.layer].TEH.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(1.005, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return player.SET.tier.gte(22);
      }
    },   

    91: {
    cost(x) {
    let PowerI = new Decimal(1.025)
    let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    
    PowerI = PowerI.pow(PowerII)
    PowerI = PowerI.pow(PowerIII)
    let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
    return Calculation;
    },
    display() {
    return `<b style="font-size:24px">Time Point Generation v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Point Generation</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Time Points</h1>`
    },
    canAfford() {
    return player[this.layer].timePoints.gte(this.cost())
    },
    style() {
    if (tmp[this.layer].buyables[this.id].canAfford)
    return {
    "animation": "Afford-SmoothR 4s ease-in-out infinite",
    "width": "430px",
    "height": "130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 5px #000000",
    "color": "#ffffff"
    }
    return {
    "background": "radial-gradient(circle, rgba(179,0,0,1) 0%, rgba(70,0,0,1) 100%)",
    "width": "430px",
    "height": " 130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 10px #000000",
    "color": "#ffffff"
    }
    },
    buy() {
    player[this.layer].timePoints = player[this.layer].timePoints.sub(this.cost())
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    effect(x) {
    let Effect = new Decimal(1).mul(Decimal.pow(1.05, x.pow(1)))
    return Effect;
    },
    unlocked() {
    return hasMilestone("SET", "Time Points");
    }
    },
    
    92: {
    cost(x) {
    let PowerI = new Decimal(1.035)
    let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    
    PowerI = PowerI.pow(PowerII)
    PowerI = PowerI.pow(PowerIII)
    let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
    return Calculation;
    },
    display() {
    return `<b style="font-size:24px">Time Stellar Production v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Stellar</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Time Points</h1>`
    },
    canAfford() {
    return player[this.layer].timePoints.gte(this.cost())
    },
    style() {
    if (tmp[this.layer].buyables[this.id].canAfford)
    return {
    "animation": "Afford-SmoothR 4s ease-in-out infinite",
    "width": "430px",
    "height": "130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 5px #000000",
    "color": "#ffffff"
    }
    return {
    "background": "radial-gradient(circle, rgba(179,0,0,1) 0%, rgba(70,0,0,1) 100%)",
    "width": "430px",
    "height": " 130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 10px #000000",
    "color": "#ffffff"
    }
    },
    buy() {
    player[this.layer].timePoints = player[this.layer].timePoints.sub(this.cost())
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    effect(x) {
    let Effect = new Decimal(1).mul(Decimal.pow(1.05, x.pow(1)))
    return Effect;
    },
    unlocked() {
    return hasMilestone("SET", "Time Points");
    }
    },
    
    93: {
    cost(x) {
    let PowerI = new Decimal(1.04)
    let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    
    PowerI = PowerI.pow(PowerII)
    PowerI = PowerI.pow(PowerIII)
    let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
    return Calculation;
    },
    display() {
    return `<b style="font-size:24px">Time Ethereum Production v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Ethereum</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Time Points</h1>`
    },
    canAfford() {
    return player[this.layer].timePoints.gte(this.cost())
    },
    style() {
    if (tmp[this.layer].buyables[this.id].canAfford)
    return {
    "animation": "Afford-SmoothR 4s ease-in-out infinite",
    "width": "430px",
    "height": "130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 5px #000000",
    "color": "#ffffff"
    }
    return {
    "background": "radial-gradient(circle, rgba(179,0,0,1) 0%, rgba(70,0,0,1) 100%)",
    "width": "430px",
    "height": " 130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 10px #000000",
    "color": "#ffffff"
    }
    },
    buy() {
    player[this.layer].timePoints = player[this.layer].timePoints.sub(this.cost())
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    effect(x) {
    let Effect = new Decimal(1).mul(Decimal.pow(1.05, x.pow(1)))
    return Effect;
    },
    unlocked() {
    return hasMilestone("SET", "Boost II");
    }
    },
    
    94: {
    cost(x) {
    let PowerI = new Decimal(1.045)
    let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    
    PowerI = PowerI.pow(PowerII)
    PowerI = PowerI.pow(PowerIII)
    let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
    return Calculation;
    },
    display() {
    return `<b style="font-size:24px">Time Bitcoin Mining v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Bitcoin</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Time Points</h1>`
    },
    canAfford() {
    return player[this.layer].timePoints.gte(this.cost())
    },
    style() {
    if (tmp[this.layer].buyables[this.id].canAfford)
    return {
    "animation": "Afford-SmoothR 4s ease-in-out infinite",
    "width": "430px",
    "height": "130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 5px #000000",
    "color": "#ffffff"
    }
    return {
    "background": "radial-gradient(circle, rgba(179,0,0,1) 0%, rgba(70,0,0,1) 100%)",
    "width": "430px",
    "height": " 130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 10px #000000",
    "color": "#ffffff"
    }
    },
    buy() {
    player[this.layer].timePoints = player[this.layer].timePoints.sub(this.cost())
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    effect(x) {
    let Effect = new Decimal(1).mul(Decimal.pow(1.05, x.pow(1)))
    return Effect;
    },
    unlocked() {
    return hasMilestone("SET", "Boost II");
    }
    },
    
    95: {
    cost(x) {
    let PowerI = new Decimal(1.05)
    let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    
    PowerI = PowerI.pow(PowerII)
    PowerI = PowerI.pow(PowerIII)
    let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
    return Calculation;
    },
    display() {
    return `<b style="font-size:24px">Time Tickspeed v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Tickspeed</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Time Points</h1>`
    },
    canAfford() {
    return player[this.layer].timePoints.gte(this.cost())
    },
    style() {
    if (tmp[this.layer].buyables[this.id].canAfford)
    return {
    "animation": "Afford-SmoothR 4s ease-in-out infinite",
    "width": "430px",
    "height": "130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 5px #000000",
    "color": "#ffffff"
    }
    return {
    "background": "radial-gradient(circle, rgba(179,0,0,1) 0%, rgba(70,0,0,1) 100%)",
    "width": "430px",
    "height": " 130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 10px #000000",
    "color": "#ffffff"
    }
    },
    buy() {
    player[this.layer].timePoints = player[this.layer].timePoints.sub(this.cost())
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    effect(x) {
    let Effect = new Decimal(1).mul(Decimal.pow(1.05, x.pow(1)))
    return Effect;
    },
    unlocked() {
    return hasMilestone("SET", "Energy");
    }
    },
    
    99: {
    cost(x) {
    let PowerI = new Decimal(1.1)
    let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
    let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
   
    PowerI = PowerI.pow(PowerII)
    PowerI = PowerI.pow(PowerIII)
    let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
    return Calculation;
    },
    display() {
    return `<b style="font-size:24px">Time Generator v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Time Points</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Time Points</h1>`
    },
    canAfford() {
    return player[this.layer].timePoints.gte(this.cost())
    },
    style() {
    if (tmp[this.layer].buyables[this.id].canAfford)
    return {
    "animation": "Afford-SmoothR 4s ease-in-out infinite",
    "width": "430px",
    "height": "130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 5px #000000",
    "color": "#ffffff"
    }
    return {
    "background": "radial-gradient(circle, rgba(179,0,0,1) 0%, rgba(70,0,0,1) 100%)",
    "width": "430px",
    "height": " 130px",
    "border-radius": "10px",
    "border": "0px",
    "margin": "5px",
    "text-shadow": "0px 0px 10px #000000",
    "color": "#ffffff"
    }
    },
    buy() {
    player[this.layer].timePoints = player[this.layer].timePoints.sub(this.cost())
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    effect(x) {
    let Effect = new Decimal(1).mul(Decimal.pow(1.05, x.pow(1)))
    return Effect;
    },
    unlocked() {
    return hasMilestone("SET", "Energy");
    }
    },
    },
    
    milestones: {
    "Ethereum" : {
    requirementDescription() {
    let Degradation = ('q')
    if (tmp.SET.clickables.TT.canRun) Degradation = ('1')
    return `<b style="font-size:28px">TIER ${Degradation}</b>`
    },
    done() {return player.SET.tier.gte(1)},
    effectDescription: `<b style="font-size:22px">
    + 2x Stellar each Tier<br>
    + 1 new Stellar buyable<br>
    + Unlock Ethereum</b>`,
    style() {
    return {
    "background" : "#474747",
    "width" : "auto",
    "height" : "auto",
    "padding" : "5px",
    "border" : "0px solid"
    
    }
    }
    },
    "Time Points" : {
    requirementDescription: `<b style="font-size:28px">TIER 2</b>`,
    done() {return player.SET.tier.gte(2)},
    effectDescription: `<b style="font-size:22px">
    + 1 new Stellar buyable<br>
    + 1 new Ethereum buyable<br>
    + Unlock Time Points</b>`,
    style() {
    return {
    "background" : "#474747",
    "width" : "auto",
    "height" : "auto",
    "padding" : "5px",
    "border" : "0px solid"
    
    }
    }
    },
    
    "Bitcoin" : {
    requirementDescription: `<b style="font-size:28px">TIER 3</b>`,
    done() {return player.SET.tier.gte(3)},
    effectDescription: `<b style="font-size:22px">
    + x1.5 Ethereum each Tier<br>
    + 1 new Ethereum buyable<br>
    + Unlock Bitcoin</b>`,
    style() {
    return {
    "background": "#474747",
    "width": "auto",
    "height": "auto",
    "padding": "5px",
    "border": "0px solid"
    
    }
    },
    unlocked() {
    return (hasMilestone("SET", 1))
    }
    },
    
    "Boost I" : {
    requirementDescription: `<b style="font-size:28px">TIER 5</b>`,
    done() {return player.SET.tier.gte(5)},
    effectDescription: `<b style="font-size:22px">
    + Additional +0.5 base to Stellar boost per Tier<br>
    + 2 new Bitcoin buyables<br>
    + Unlock Tickspeed modifier</b>`,
    style() {
    return {
    "background" : "#474747",
    "width" : "auto",
    "height" : "auto",
    "padding" : "5px",
    "border" : "0px solid"
    
    }
    },
    unlocked() {
    return (hasMilestone("SET", 2))
    }
    },
    
    "Boost II" : {
    requirementDescription: `<b style="font-size:28px">TIER 7</b>`,
    done() {return player.SET.tier.gte(7)},
    effectDescription: `<b style="font-size:22px">
    + Additional +0.25 base to Ethereum boost per Tier<br>
    + 2 new Time Point buyables<br>
    + 4x Time Point gain</b>`,
    style() {
    return {
    "background" : "#474747",
    "width" : "auto",
    "height" : "auto",
    "padding" : "5px",
    "border" : "0px solid"
    
    }
    },
    unlocked() {
    return (hasMilestone("SET", 3))
    }
    },
    
    "Energy" : {
    requirementDescription() {
    let Degradation = ('TI/nR')
    if (tmp.SET.clickables.TT.canRun) Degradation = ('TIER')
    return `<b style="font-size:28px">${Degradation} 9</b>`
    },
    done() {return player.SET.tier.gte(9)},
    effectDescription: `<b style="font-size:22px">
    + Boost Bitcoin gain and translation<br>
    + 1 new Stellar buyable<br>
    + 3 new Time Point buyables
    + Unlock Energy</b>`,
    style() {
    return {
    "background" : "#474747",
    "width" : "auto",
    "height" : "auto",
    "padding" : "5px",
    "border" : "0px solid"
    
    }
    },
    unlocked() {
    return (hasMilestone("SET", 4))
    }
    },
    
    "Tether" : {
    requirementDescription: `<b style="font-size:28px">TIER 13</b>`,
    done() {return player.SET.tier.gte(13)},
    effectDescription() { 
    let DegradationI = ('KCOLNUUS')
    let DegradationII = ('NIAGUM')
    if (tmp.SET.clickables.TT.canRun) DegradationI = ('Unlock') , DegradationII = ('gain')
    return `<b style="font-size:22px">
    + ${DegradationI} Tether<br>
    + 1.125x more Energy per Tier<br>
    + 4x Time Point ${DegradationII}</b>`
    },
    style() {
    return {
    "background" : "#474747",
    "width" : "auto",
    "height" : "auto",
    "padding" : "5px",
    "border" : "0px solid"
    
    }
    },
    unlocked() {
    return (hasMilestone("SET", 5))
    }
    },
    
    "Leveler" : {
    requirementDescription: `<b style="font-size:28px">TIER 17</b>`,
    done() { return player.SET.tier.gte(17) },
    effectDescription() {
    let DegradationI = ('CTCGAAGTTGAATTAGAGCGG')
    let DegradationII = ('REPUS')
    let DegradationIII = ('ESABAE')
    let DegradationIV = ('REITIT')
    if (tmp.SET.clickables.TT.canRun) DegradationI = ('Leveler') , DegradationII = ('per') , DegradationIII = ('base') , DegradationIV = ('Tier')
    return `<b style="font-size:22px">
    + Unlock ${DegradationI}<br>
    + Additional +0.5 base TO Stellar boost ${DegradationII} Tier<br>
    + Additional +0.25 ${DegradationIII} to Ethereum boost per ${DegradationIV}</b>`
    },
    style() {
    return {
    "background": "#474747",
    "width": "auto",
    "height": "auto",
    "padding": "5px",
    "border": "0px solid"
    
    }
    },
    unlocked() {
    return (hasMilestone("SET", 6))
    }
    },
    
    "Boost III" : {
    requirementDescription: `<b style="font-size:28px">TIER 21</b>`,
    done() { return player.SET.tier.gte(21) },
    effectDescription: `<b style="font-size:22px">
    + Unlock CTCGAAGTTGAATTAGAGCGG<br>
    + Additional +0.5 base TO Stellar boost REPUS Tier<br>
    + Additional +0.25 ESABAE to Ethereum boost per REITIT</b>`,
    style() {
    return {
    "background": "#474747",
    "width": "auto",
    "height": "auto",
    "padding": "5px",
    "border": "0px solid"
    
    }
    },
    unlocked() {
    return (hasMilestone("SET", 7))
    }
    },
    
    "Prestige": {
      requirementDescription: `<b style="font-size:28px">TIER 29</b>`,
      done() { return player.SET.tier.gte(29) },
      effectDescription: `<b style="font-size:22px">
        + 2 new Energy upgrades<br>
        + 1.5x Points per Tier<br>
        + Additional +0.25 ESABAE to Ethereum boost per REITIT</b>`,
      style() {
        return {
          "background": "#474747",
          "width": "auto",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid"
    
        }
      },
      unlocked() {
        return (hasMilestone("SET", 8))
      }
    },
    
    11: {
      requirementDescription: `<b style="font-size:28px">TIER 37</b>`,
      done() { return player.SET.tier.gte(37) },
      effectDescription: `<b style="font-size:22px">
        + Unlock CTCGAAGTTGAATTAGAGCGG<br>
        + Additional +0.5 base TO Stellar boost REPUS Tier<br>
        + Additional +0.25 ESABAE to Ethereum boost per REITIT</b>`,
      style() {
        return {
          "background": "#474747",
          "width": "auto",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid"
    
        }
      },
      unlocked() {
        return (hasMilestone("SET", 9))
      }
    },
    
    12: {
      requirementDescription: `<b style="font-size:28px">TIER 53</b>`,
      done() { return player.SET.tier.gte(53) },
      effectDescription: `<b style="font-size:22px">
            + Unlock CTCGAAGTTGAATTAGAGCGG<br>
            + Additional +0.5 base TO Stellar boost REPUS Tier<br>
            + Additional +0.25 ESABAE to Ethereum boost per REITIT</b>`,
      style() {
        return {
          "background": "#474747",
          "width": "auto",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid"
    
        }
      },
      unlocked() {
        return (hasMilestone("SET", 10))
      }
    },
    
    99: {
    requirementDescription: `<b style="font-size:28px">I1 o</b>`,
    done() { return player.SET.tier.gte(250) },
    effectDescription: `<b style="font-size:22px">
    ? AATOACGGCTGTGGCTATATTAGCGAACCTTGAG<br>
    ? //// 8<br>
    ? WENUS SGNIHTIS YADEMOSUM</b>`,
    style() {
    return {
    "background": "#474747",
    "content" : "",
    "animation" : "ciper 2s infinite",
    "width": "auto",
    "height": "auto",
    "padding": "5px",
    "border": "0px solid"
    
    }
    },
    unlocked() {
    return (hasMilestone("SET", 8))
    }
    },
    },
        
    tabFormat : {
    "Stellar": {
    unlocked() { return true },
    content:
    [
    "blank",
    ["raw-html", () => {
    return `<MA style="font-size: 28px; color: #c7c7c7">You have <HI style="font-size: 32px; text-shadow: 0px 0px 20px">${format(player.SET.points)}</HI> Stellar</MA>`
    }],
    
    ["raw-html", () => {
    return `<MA style="font-size: 20px; color: #595959">You produce <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.SET.resetGain)}</HI> Stellar / sec</MA>`
    }],
        
    ["raw-html", () => {
    return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.points)}</HI> Points</MA>`
    }],
    "blank",
    ["row", [["clickable", "StellarAuto"]]],
    "blank",
    ["row", [["buyable", 11]]],
    ["row", [["buyable", 12]]],
    ["row", [["buyable", 13]]],
    ["row", [["buyable", 14]]]
    ],
    }, 
    
    
    "Ethereum": {
    unlocked() { return player.SET.tier.gte(1) },
    content:
    [
    "blank",
    ["raw-html", () => {
    return `<MA style="font-size: 28px; color: #c7c7c7">You have <HI style="font-size: 32px; color: #2150eb; text-shadow: 0px 0px 20px">${format(player.SET.ETH)}</HI> Ethereum</MA>`
    }],
    
    ["raw-html", () => {
    return `<MA style="font-size: 20px; color: #595959">You produce <HI style="font-size: 24px; color: #1839a8; text-shadow: 0px 0px 20px">${format(tmp.SET.ETHPerSecondCalculation)}</HI> Ethereum / sec</MA>`
    }],
    
    ["raw-html", () => {
    return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.points)}</HI> Points</MA>`
    }],
    "blank",
    ["row", [["clickable", "EthereumAuto"]]],
    "blank",
    ["row", [["buyable", 21]]],
    ["row", [["buyable", 22]]],
    ["row", [["buyable", 23]]],
    ["row", [["buyable", 24]]],
    ],
    }, 
    
    
    "Bitcoin": {
    unlocked() { return player.SET.tier.gte(3) },
    content:
    [
    "blank",
    ["raw-html", () => {
    return `<MA style="font-size: 28px; color: #c7c7c7">You have <HI style="font-size: 32px; color: #ffa41c; text-shadow: 0px 0px 20px">${format(player.SET.BTC)}</HI> Bitcoin</MA>`
    }],
    
    ["raw-html", () => {
    return `<MA style="font-size: 28px; color: #c7c7c7">Your Bitcoins are translated as <HI style="font-size: 32px; color: #ffa41c; text-shadow: 0px 0px 20px">x${format(tmp.SET.BTCBoost)}</HI> Stellar boost</MA>`
    }],
    
    ["raw-html", () => {
    return `<MA style="font-size: 28px; color: #c7c7c7">Game is stimulated in <HI style="font-size: 32px; color: #eb3455; text-shadow: 0px 0px 20px">x${format(tmp.SET.tickSpeedCalculation)}</HI> ticks in second</MA>`
    }],
    
    ["raw-html", () => {
    return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.points)}</HI> Points</MA>`
    }],
    
    "blank",
    ["row", [["clickable", 12]]],
    "blank",
    ["row", [["buyable", 31]]],
    ["row", [["buyable", 32]]],
    ["row", [["buyable", 33]]],
    ["row", [["buyable", 34]]],
    ],
    },
    
    "Tether": {
    unlocked() { return player.SET.tier.gte(12) },
    content:
    [
    "blank",
    ["raw-html", () => {
    return `<MA style="font-size: 28px; color: #c7c7c7">You have <HI style="font-size: 32px; color: #00cc91; text-shadow: 0px 0px 20px">${format(player.SET.TEH)}</HI> Tether</MA>`
    }],
    
    ["raw-html", () => {
    return `<MA style="font-size: 28px; color: #c7c7c7">Your Tethers are translated as <HI style="font-size: 32px; color: #00cc91; text-shadow: 0px 0px 20px">x${format(tmp.SET.TEHBoost)}</HI> Stellar & Ethereum boost</MA>`
    }],
    
    ["raw-html", () => {
    return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.points)}</HI> Points</MA>`
    }],
    
    "blank",
    ["row", [["clickable", 13]]],
    "blank",
    ["row", [["buyable", 41]]],
    ["row", [["buyable", 42]]],
    ["row", [["buyable", 43]]],
    ["row", [["buyable", 44]]],
    ["row", [["buyable", 49]]],
    ],
    },
    
    
    "Time Tab": {
    unlocked() { return player.SET.tier.gte(2) },
    content:
    [
    "blank",
    ["raw-html", () => {
    return `<MA style="font-size: 28px; color: #c7c7c7">You have <HI style="font-size: 32px; color: #eb2e21; text-shadow: 0px 0px 20px">${format(player.SET.timePoints)}</HI> Time Points</MA>`
    }],
    
    ["raw-html", () => {
    return `<MA style="font-size: 20px; color: #595959">You gain <HI style="font-size: 24px; color: #911e16; text-shadow: 0px 0px 20px">${format(tmp.SET.timePointCalculation)}</HI> Time Points / sec</MA>`
    }],
    
    ["raw-html", () => {
    return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.points)}</HI> Points</MA>`
    }],
    
    ["raw-html", () => {
    return `<MA style="font-size: 16px; color: #595959">Note that Time Points or it's buyables don't get reset by Tier Up , Bitcoin Hardfork etc. =)</MA>`
    }],
    
    "blank",
    ["row", [["buyable", 91]]],
    ["row", [["buyable", 92]]],
    ["row", [["buyable", 93]]],
    ["row", [["buyable", 94]]],
    ["row", [["buyable", 95]]],
    ["row", [["buyable", 99]]],
    "blank",
    ],
    },
    
    
    "Tier Tab": {
    unlocked() { return player.points.gte(20000) || player.SET.tier.gte(1) },
    content:
    [
    "blank",
    ["raw-html", () => {
    return `<MA style="font-size: 28px; color: #c7c7c7">You are at Tier <HI style="font-size: 32px; text-shadow: 0px 0px 20px">${formatNoDecimals(player.SET.tier)}</HI></MA>`
    }],
    
    ["raw-html", () => {
    return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.points)}</HI> Points</MA>`
    }],
    
    "blank",
    ["row", [["clickable", 11]]],
    "blank",
    "milestones"
    ],
    },
    
    "Energy Tab": {
    unlocked() { return player.SET.tier.gte(8) },
    content:
    [
    "blank",
    ["raw-html", () => {
    return `<MA style="font-size: 28px; color: #c7c7c7">You have <HI style="font-size: 32px; color: #ffe605; text-shadow: 0px 0px 20px">${format(player.SET.energy)}</HI> Energy</MA>`
    }],
    
    ["raw-html", () => {
    return `<MA style="font-size: 20px; color: #c7c7c7">You generate <HI style="font-size: 24px; color: #8f8104; text-shadow: 0px 0px 20px">${format(tmp.SET.energyPerSecondCalculation)}</HI> Energy / sec</MA>`
    }],
    
    ["raw-html", () => {
    return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.points)}</HI> Points</MA>`
    }],
    
    "blank",
    ["row", [["upgrade", 11]]],
    ["row", [["upgrade", 12]]],
    ["row", [["upgrade", 13]]],
    "blank",
    ],
    },
    
    "Leveler Tab": {
    unlocked() { return player.SET.tier.gte(21) },
    content:
    [
    "blank",
    ["raw-html", () => {
    return `<MA style="font-size: 28px; color: #c7c7c7">Your Leveler is at level <HI style="font-size: 32px; color: #42ecf5; text-shadow: 0px 0px 20px">${format(player.SET.level)}</HI></MA>`
    }],
    
    ["raw-html", () => {
    return `<MA style="font-size: 20px; color: #c7c7c7">You gain <HI style="font-size: 24px; color: #36c0c7; text-shadow: 0px 0px 20px">${format(tmp.SET.levelXPgainCalculation)}</HI> XP / sec</MA>`
    }],
    
    ["raw-html", () => {
    return `<MA style="font-size: 20px; color: #595959">Next level at <HI style="font-size: 24px; color: #248085; text-shadow: 0px 0px 20px">${format(player.SET.levelXP)} / ${format(player.SET.levelXPrequirement)}</HI> XP</MA>`
    }],
    
    ["raw-html", () => {
    return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #248085; text-shadow: 0px 0px 20px">${format(player.SET.levelTokens)}</HI> Level Tokens</MA>`
    }],
    "blank",
    "blank",
    ],
    },
    
    "???": {
    unlocked() { return player.SET.tier.gte(8) },
    content:
    [
    "blank",
    ["raw-html", () => {
    return `<MA style="font-size: 20px; color: #c7c7c7">Hey! Have you noticed something weird about the game? It's like it is bugging out. But I'm sure I looked through everything and play tested it. Hmm, I suppose I'll look more into it... But it was fine yesterday...</MA>`
    }],
    "blank",
    ["raw-html", () => {
    if (player.SET.tier.gte(10)) 
    {
    return `<MA style="font-size: 20px; color: #c7c7c7">Oh I never introduced myself even. Well my name is Citrine. Perhaps you know what's causing this degradation? No? Oh well... Mabye it's best not to Tier Up anymore. Who knows what else will happen, right?</MA>`
    }
    return ``
    }],
    "blank",
    ["raw-html", () => {
    if (player.SET.tier.gte(16)) 
    {
    return `<MA style="font-size: 20px; color: #c7c7c7">That next Tier milestone description is totally messed up... However I think I can decrypt what it says. Hmm I don't know what 1st and 3rd line say but 2nd says, "Wait for something". What could this mean? Are you sure you didn't tamper with anything? Alright I'll trust you Player...</MA>`
    }
    return ``
    }],
    "blank",
    ["raw-html", () => {
    if (player.SET.tier.gte(17)) 
    {
    return `<MA style="font-size: 20px; color: #c7c7c7">Here I managed to fully translate text degradation. I coded you a clickable that should allow you to translate everything to normal, readable text...</MA>`
    }
    return ``
    }],
    "blank",
    ["row", [["clickable", "TT"]]],
    ],
    },
    },
   
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
    {key: "", description: "N/A: Reset for nothing =)", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
*/
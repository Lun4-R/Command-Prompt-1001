/*addLayer("main", {
  name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "INF", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0), // Currency 
      pointS1: new Decimal("1.78e308"),

      eth: new Decimal(0), // Currency 

      btc: new Decimal(0), // Currency 
      btcOnReset: new Decimal(0),
      btcState: new Decimal(0),

      teh: new Decimal(0), // Currency 
      tehOnReset: new Decimal(0),
      tehState: new Decimal(0),

      tp: new Decimal(0), // Currency

      tier: new Decimal(0),
      tierReq: new Decimal(10000),
      tierS1: new Decimal(10),
      tierS2: new Decimal(20),
      tierS3: new Decimal(40),
      tierS4: new Decimal(80),


      TCH1S: new Decimal(0),
      TCH2S: new Decimal(0),
      
      auto:{
      STAT: false,
      ETAT: false,
    },
      
    }
  },
  color: "#ffffff",
  requires: new Decimal(10), // Can be a function that takes requirement increases into account
  resource: "Stellar", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
  baseAmount() { return player.points }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.5, // Prestige currency exponent
  gainMult() { // Calculate the multiplier for main currency from bonuses
    Multiplier = new Decimal(1)
    let TM2Boost = new Decimal(1.25)
    TM2Boost = TM2Boost.mul(hasMilestone("main", "TM7") ? 1.25 : 1)
    Multiplier = Multiplier.mul(buyableEffect("main", "Stellar Production"))
    Multiplier = Multiplier.mul(buyableEffect("main", "Ethereum Stellar Production"))
    Multiplier.mul(buyableEffect("main", "Bitcoin Stellar Production"))
    Multiplier.mul(buyableEffect("main", "Tether Stellar Production"))
    Multiplier = Multiplier.mul(player.main.tier.gte(2) ? new Decimal.pow(1.5, player.main.tier) : 1)
    Multiplier = Multiplier.mul(player.main.tier.gte(1) ? new Decimal.pow(TM2Boost, player.main.tier) : 1)
    Multiplier = Multiplier.mul(tmp.main.btcBoost)
    Multiplier = Multiplier.mul(tmp.main.tehBoost)
    
    if (player.main.TCH2S.lte(1)) {
    Multiplier = Multiplier.mul(challengeEff("main", "TCH1"))
    }
    
    Multiplier = Multiplier.pow(buyableEffect("main", "Stellar Power Production"))
    Multiplier = Multiplier.pow(buyableEffect("main", "Ethereum Power Production"))
    Multiplier = Multiplier.pow(buyableEffect("main", "Bitcoin Power Production"))
    Multiplier = Multiplier.pow(buyableEffect("main", "Tether Power Production"))
    Multiplier = Multiplier.pow(buyableEffect("main", "Time Stellar Production"))

    if (player.main.TCH1S.gte(1)) {
      Multiplier = Multiplier.pow(tmp[this.layer].challenges["TCH1"].debuff)
    }
    
    if (player.main.TCH2S.gte(1)) {
      Multiplier = Multiplier.pow(tmp[this.layer].challenges["TCH2"].debuff)
    }
    
    if (player.main.points.gte(player.main.tier.gte(17))) {
      Multiplier = Multiplier.pow(tmp.main.StellarSoftcapIcalc)
    }
    
    return Multiplier
  },
  gainExp() { // Calculate the exponent on main currency from bonuses
    return new Decimal(1)
  },
  passiveGeneration() {
    let Generation = new Decimal(1)
    return Generation
  },
  StellarPWR() {
    let PWR = new Decimal(1)
    PWR = PWR.mul(buyableEffect("main", "Stellar Power Production"))
    PWR = PWR.pow(buyableEffect("main", "Ethereum Power Production"))
    PWR = PWR.pow(buyableEffect("main", "Bitcoin Power Production"))
    PWR = PWR.pow(buyableEffect("main", "Tether Power Production"))
    PWR = PWR.pow(buyableEffect("main", "Time Stellar Production"))
    if (player.main.TCH1S.gte(1)) {
      PWR = PWR.mul(tmp[this.layer].challenges["TCH1"].debuff)
    }
    
    if (player.main.TCH2S.gte(1)) {
      PWR = PWR.mul(tmp[this.layer].challenges["TCH2"].debuff)
    }
    
    if (player.main.points.gte("1.78e308")) {
      Multiplier = Multiplier.pow(tmp.main.StellarSoftcapIcalc)
    }
    return PWR
  },
  SoftcapIcalc() {
    let Base = player.main.tierS1
    let Tier = player.main.tier

    let Calculation = new Decimal.sub(Tier, Base).mul(0.05).add(1)
    return Calculation
  },
  SoftcapIIcalc() {
    let Base = player.main.tierS2
    let Tier = player.main.tier

    let Calculation = new Decimal.sub(Tier, Base).mul(0.1).add(1)
    return Calculation
  },
  SoftcapIIIcalc() {
    let Base = player.main.tierS3
    let Tier = player.main.tier
  
    let Calculation = new Decimal.sub(Tier, Base).mul(0.2).add(1)
    
    return Calculation
  },
  SoftcapIVcalc() {
    let Base = player.main.tierS4
    let Tier = player.main.tier
  
    let Calculation = new Decimal.sub(Tier, Base).mul(0.4).add(1)
    return Calculation
  },
  StellarSoftcapIcalc() {
    let Tier = player.main.tier
    Tier = Tier.div(18)
    let Base = new Decimal(1)
    return new Decimal.div(Base, Tier)
  },
  tierUpReq() {
    let Base = player.main.tier
    Base = Base.add(1)
    let BasePower = new Decimal(1.15)
    let PowerI = new Decimal.div(player.main.tier, 17.5).add(1)

    let SoftcapI = new Decimal(1)
    SoftcapI = SoftcapI.add(player.main.tier.gte(10) ? 0.2 : 0)

    let Calculation = new Decimal.pow(6666, new Decimal.pow(BasePower, Base)).pow(PowerI)

    if (player.main.tier.gte(player.main.tierS1)) {
      return Calculation = Calculation.pow(tmp.main.SoftcapIcalc)
    }
    if (player.main.tier.gte(player.main.tierS2)) {
      return Calculation = Calculation.pow(tmp.main.SoftcapIIcalc)
    }
    if (player.main.tier.gte(player.main.tierS3)) {
      return Calculation = Calculation.pow(tmp.main.SoftcapIIIcalc)
    }
    if (player.main.tier.gte(player.main.tierS4)) {
      return Calculation = Calculation.pow(tmp.main.SoftcapIVcalc)
    }
    Calculation = Calculation.div(buyableEffect("main", "Cheaper Tier"))
    return Calculation
  },

  tierUp() {
    player.main.tier = player.main.tier.add(1)
    player.points = new Decimal(0)
    player.main.points = new Decimal(0)
    player.main.eth = new Decimal(0)

    player.main.buyables["Stellar Point Production"] = new Decimal(0)
    player.main.buyables["Stellar Production"] = new Decimal(0)
    player.main.buyables["Stellar Ethereum Production"] = new Decimal(0)
    player.main.buyables["Stellar Power Production"] = new Decimal(0)
    player.main.buyables["Cheaper Stellar"] = new Decimal(0)

    player.main.buyables["Ethereum Point Production"] = new Decimal(0)
    player.main.buyables["Ethereum Stellar Production"] = new Decimal(0)
    player.main.buyables["Ethereum Production"] = new Decimal(0)
    player.main.buyables["Ethereum Power Production"] = new Decimal(0)
    player.main.buyables["Cheaper Ethereum"] = new Decimal(0)

    player.main.buyables["Bitcoin Point Production"] = new Decimal(0)
    player.main.buyables["Bitcoin Stellar Production"] = new Decimal(0)
    player.main.buyables["Bitcoin Ethereum Production"] = new Decimal(0)
    player.main.buyables["Bitcoin Power Production"] = new Decimal(0)
    player.main.buyables["Cheaper Bitcoin"] = new Decimal(0)
  },

  t1Reset() {
    player.main.buyables["Stellar Point Production"] = new Decimal(0)
    player.main.buyables["Stellar Production"] = new Decimal(0)
    player.main.buyables["Stellar Ethereum Production"] = new Decimal(0)
    player.main.buyables["Stellar Power Production"] = new Decimal(0)
    player.main.buyables["Cheaper Stellar"] = new Decimal(0)

    player.main.buyables["Ethereum Point Production"] = new Decimal(0)
    player.main.buyables["Ethereum Stellar Production"] = new Decimal(0)
    player.main.buyables["Ethereum Production"] = new Decimal(0)
    player.main.buyables["Ethereum Power Production"] = new Decimal(0)
    player.main.buyables["Cheaper Ethereum"] = new Decimal(0)
    
    player.points = new Decimal(0)
    player.main.points = new Decimal(0)
    player.main.eth = new Decimal(0)

  },

  btcReset() {
    player.main.buyables["Stellar Point Production"] = new Decimal(0)
    player.main.buyables["Stellar Production"] = new Decimal(0)
    player.main.buyables["Stellar Ethereum Production"] = new Decimal(0)
    player.main.buyables["Stellar Power Production"] = new Decimal(0)
    player.main.buyables["Cheaper Stellar"] = new Decimal(0)
    player.main.buyables["Ethereum Point Production"] = new Decimal(0)
    player.main.buyables["Ethereum Stellar Production"] = new Decimal(0)
    player.main.buyables["Ethereum Production"] = new Decimal(0)
    player.main.buyables["Ethereum Power Production"] = new Decimal(0)
    player.main.buyables["Cheaper Ethereum"] = new Decimal(0)

    player.main.btc = player.main.btc.add(tmp.main.btcCalc)
    player.main.btcState = player.main.btcState.add(1)

    player.points = new Decimal(0)
    player.main.points = new Decimal(0)
    player.main.eth = new Decimal(0)
  },

  btcCalc() {
    let Base = player.main.points
    let Calculation = new Decimal.root(Base, 12).pow(2)
    Calculation = Calculation.pow(buyableEffect("main", "Bitcoin Power Production"))
    Calculation = Calculation.pow(buyableEffect("main", "Time Bitcoin Gain"))
    return Calculation
  },

  btcBoost() {
    let Base = player.main.btc
    let Calculation = new Decimal.pow(Base, 0.5)
    Calculation = Calculation.add(1)
    return Calculation
  },
  
  tehReset() {
    player.main.buyables["Stellar Point Production"] = new Decimal(0)
    player.main.buyables["Stellar Production"] = new Decimal(0)
    player.main.buyables["Stellar Ethereum Production"] = new Decimal(0)
    player.main.buyables["Stellar Power Production"] = new Decimal(0)
    player.main.buyables["Cheaper Stellar"] = new Decimal(0)
    
    player.main.buyables["Ethereum Point Production"] = new Decimal(0)
    player.main.buyables["Ethereum Stellar Production"] = new Decimal(0)
    player.main.buyables["Ethereum Production"] = new Decimal(0)
    player.main.buyables["Ethereum Power Production"] = new Decimal(0)
    player.main.buyables["Cheaper Ethereum"] = new Decimal(0)
    
    player.main.buyables["Bitcoin Point Production"] = new Decimal(0)
    player.main.buyables["Bitcoin Stellar Production"] = new Decimal(0)
    player.main.buyables["Bitcoin Ethereum Production"] = new Decimal(0)
    player.main.buyables["Bitcoin Power Production"] = new Decimal(0)
    player.main.buyables["Cheaper Bitcoin"] = new Decimal(0)

    player.main.teh = player.main.teh.add(tmp.main.tehCalc)
    player.main.tehState = player.main.tehState.add(1)

    player.points = new Decimal(0)
    player.main.points = new Decimal(0)
    player.main.eth = new Decimal(0)
    player.main.btc = new Decimal(0)
  },

  tehCalc() {
    let Base = player.main.points
    let Calculation = new Decimal.root(Base, 64).pow(2)
    Calculation = Calculation.pow(buyableEffect("main", "Time Tether Gain"))
    return Calculation
  },

  tehBoost() {
    let Base = player.main.teh
    let Calculation = new Decimal.pow(Base, 2)
    Calculation = Calculation.add(1)
    return Calculation
  },

  ethCalc() {
    let Base = new Decimal(0)
    Base = Base.add(buyableEffect("main", "Stellar Ethereum Production"))
    Base = Base.mul(buyableEffect("main", "Ethereum Production"))
    Base = Base.mul(buyableEffect("main", "Bitcoin Ethereum Production"))
    Base = Base.mul(buyableEffect("main", "Tether Ethereum Production"))
    
    Base = Base.mul(tmp.main.tehBoost)

    Base = Base.mul(challengeEff("main", "TCH2"))

    Base = Base.pow(buyableEffect("main", "Ethereum Power Production"))
    
    if (player.main.TCH2S.gte(1)) {
      Base = Base.pow(tmp[this.layer].challenges["TCH2"].debuff)
    }
    
    return Base
  },

  update(diff) {
    player.main.eth = player.main.eth.add((tmp.main.ethCalc).times(diff))

    player.main.btcOnReset = tmp.main.btcCalc
    
    player.main.tehOnReset = tmp.main.tehCalc
    
    player.main.tp = player.main.tp.add(0.00025)
    
    const activeChallenge = player[this.layer].activeChallenge;
    if (activeChallenge && canCompleteChallenge(this.layer, activeChallenge)) {
      startChallenge(this.layer, activeChallenge);
      if (!maxedChallenge(this.layer, activeChallenge)) {
        startChallenge(this.layer, activeChallenge);
      }
    }
    
    if (tmp.main.clickables.STAT.canRun) buyBuyable(this.layer, "Stellar Point Production")
    if (tmp.main.clickables.STAT.canRun) buyBuyable(this.layer, "Stellar Production")
    if (tmp.main.clickables.STAT.canRun) buyBuyable(this.layer, "Stellar Ethereum Production")
    if (tmp.main.clickables.STAT.canRun) buyBuyable(this.layer, "Stellar Power Production")
    if (tmp.main.clickables.STAT.canRun) buyBuyable(this.layer, "Cheaper Stellar")
    if (tmp.main.clickables.STAT.canRun) buyBuyable(this.layer, "Stellar Softcap Offset")
    if (tmp.main.clickables.STAT.canRun) buyBuyable(this.layer, "Cheaper Tier")
    
    if (tmp.main.clickables.ETAT.canRun) buyBuyable(this.layer, "Ethereum Point Production")
    if (tmp.main.clickables.ETAT.canRun) buyBuyable(this.layer, "Ethereum Stellar Production")
    if (tmp.main.clickables.ETAT.canRun) buyBuyable(this.layer, "Ethereum Production")
    if (tmp.main.clickables.ETAT.canRun) buyBuyable(this.layer, "Ethereum Power Production")
    if (tmp.main.clickables.ETAT.canRun) buyBuyable(this.layer, "Cheaper Ethereum")
  },
  
  T1PointBonusCalc() {
    Multiplier = new Decimal(1)
    let TBoost = new Decimal(1.25)
    TBoost = TBoost.mul(hasMilestone("main", "TM5") ? 1.25 : 1)
    Multiplier = Multiplier.mul(player.main.tier.gte(1) ? new Decimal.pow(TBoost, player.main.tier) : 1)
    return Multiplier
  },
  
  T1StellarBonusCalc() {
    Multiplier = new Decimal(1)
    Multiplier = Multiplier.mul(player.main.tier.gte(2) ? new Decimal.pow(1.25, player.main.tier) : 1)
    return Multiplier
  },
  
  T1EthereumBonusCalc() {
    Multiplier = new Decimal(1)
    Multiplier = Multiplier.mul(player.main.tier.gte(5) ? new Decimal.pow(1.25, player.main.tier) : 1)
    return Multiplier
  },


  challenges: {
    "TCH1": {
      display() {
        var AC = tmp[this.layer].challenges[this.id]

        return `
            <b style="font-size:22px; text-shadow: 0px 0px 20px #ffffff">- ★ -</b>
            <br>
            <b style="font-size:45px; text-shadow: 0px 0px 10px #000000">Looming</b><br>
            <br> <br>
            <b style="font-size:17px; text-shadow: 0px 0px 10px #000000">Produce <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">^${format(AC.debuff)} Stellar</b> when in this challenge<br>
            <br>
            You need <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">${format(AC.goal)} Stellar</b> to finish this challenge once<br>
            ${format(challengeCompletions(this.layer, this.id))} / ${format(this.completionLimit)} completions<br>
            Boost from completations: <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">${format(AC.effect)}x Stellar</b>
            <br> <br>
            Entering this challenge will perform Bitcoin like reset!</b>`
      },
      completionLimit: new Decimal(1e12),
      goal() {
                let x = new Decimal(challengeCompletions(this.layer, this.id))
        
                let PowerI = new Decimal(1e9)
                let PowerII = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
                let PowerIII = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
                let PowerIV = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
        
                PowerI = PowerI.pow(PowerII)
                PowerI = PowerI.pow(PowerIII)
                PowerI = PowerI.pow(PowerIV)
                let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
                return Calculation;
      },
      canComplete() {
        let x = new Decimal(challengeCompletions(this.layer, this.id))
        
        let PowerI = new Decimal(1e9)
        let PowerII = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
        let PowerIII = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
        let PowerIV = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
        
        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        let Check = player.main.points.gte(Calculation)
        return Check;
      },
      effect() {
        let x = new Decimal(challengeCompletions(this.layer, this.id))
        
        let PowerI = new Decimal(100)
        let PowerII = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
        let PowerIII = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
        let PowerIV = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
        
        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      debuff() {
        let Base = new Decimal(0.75)
        let CC = new Decimal(challengeCompletions(this.layer, this.id))

        CC = CC.div(75).add(1)

        Base = Base.div(CC)
        return Base
      },
      unlocked() { return true },
      onEnter() {
        tmp.main.t1Reset()
        player.main.TCH1S = new Decimal(1)

      },
      onExit() {
        player.main.TCH1S = new Decimal(0)
      },
      style() {
        return {
          "background-image": "url('images/TCH1.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "animation": "pulse 2s infinite",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "450px",
          "height": "auto",
          "border-radius": "20px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
      },
    },

    "TCH2": {
      display() {
        var AC = tmp[this.layer].challenges[this.id]

        return `
            <b style="font-size:22px; text-shadow: 0px 0px 20px #ffffff">- ★★ -</b>
            <br>
            <b style="font-size:45px; text-shadow: 0px 0px 10px #000000">Deprecated</b><br>
            <br> <br>
            <b style="font-size:17px; text-shadow: 0px 0px 10px #000000">Challenge <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">Looming</b> bonus doesn't apply and <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">^${format(AC.debuff)} debuff</b> is applied to <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">Ethereum</b> and <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">Stellar</b> aswell<br>
            <br>
            You need <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">${format(AC.goal)} Stellar</b> to finish this challenge once<br>
            ${format(challengeCompletions(this.layer, this.id))} / ${format(this.completionLimit)} completions<br>
            Boost from completations: <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">${format(AC.effect)}x Ethereum</b>
            <br> <br>
            Entering this challenge will perform Bitcoin like reset!</b>`
      },
      completionLimit: new Decimal(1e12),
      goal() {
        let x = new Decimal(challengeCompletions(this.layer, this.id))
        
        let PowerI = new Decimal(1e12)
        let PowerII = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
        let PowerIII = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
        let PowerIV = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
        
        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      canComplete()
      {
        let x = new Decimal(challengeCompletions(this.layer, this.id))
        
        let PowerI = new Decimal(1e12)
        let PowerII = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
        let PowerIII = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
        let PowerIV = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
        
        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        let Check = player.main.points.gte(Calculation)
        return Check;
      },
      effect() {
        let x = new Decimal(challengeCompletions(this.layer, this.id))
        
        let PowerI = new Decimal(100)
        let PowerII = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
        let PowerIII = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
        let PowerIV = new Decimal(1).mul(Decimal.div(x, 100)).add(1)
        
        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      debuff() {
        let Base = new Decimal(0.5)
        let CC = new Decimal(challengeCompletions(this.layer, this.id))

        CC = CC.div(85).add(1)

        Base = Base.div(CC)
        return Base
      },
      unlocked() { return true },
      onEnter() {
        tmp.main.t1Reset()
        player.main.TCH2S = new Decimal(1)
      },
      onExit() {
        player.main.TCH2S = new Decimal(0)
      },
      style() {
        return {
          "background-image": "url('images/TCH2.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "animation": "pulse 2s infinite",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "450px",
          "height": "auto",
          "border-radius": "20px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
      },
    }
  },

  clickables: {
    "Tier Up": {
      title() {
        let state = player.main.tier
        if (player[layer].activeChallenge === "TCH1") {
          return `<b style="font-size:35px">Can't Tier Up</b><br>
          Because you are in Looming challenge, you can't Tier Up in here...`
        }
        
        return `<b style="font-size:35px">Tier Up #${state}</b><br>
    Reset EVERYTHING in exchange for a Tier for further progress<br>
    Need ${format(tmp.main.tierUpReq)} Points to Tier Up`
      },
      canClick() { 
      return player.points.gte(tmp.main.tierUpReq)
      },
      onClick() {
        tmp.main.tierUp()
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/TIERC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "animation": "pulse 2s infinite",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "460px",
          "height": "130px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/TIERCT.png')",
          "background-size": "cover",
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

    "Bitcoin Reset": {
      title() {
        let state = player.main.btcState
        return `<b style="font-size:35px">Hardfork #${state}</b><br>
    Reset lower layer data for Bitcoin for plwerful upgrades<br>
    Hardfork for ${format(player.main.btcOnReset)} Bitcoin`
      },
      canClick() {
        return (player.main.btcOnReset.gte(1))
      },
      onClick() {
        tmp.main.btcReset()
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/BTCC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "animation": "pulse 2s infinite",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "460px",
          "height": "130px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/BTCCT.png')",
          "background-size": "cover",
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
    
    "Tether Reset": {
      title() {
        let state = player.main.btcState
        return `<b style="font-size:35px">Binary Sort #${state}</b><br>
    Reset lower layer data for Tether for even more powerful upgrades<br>
    Sort for ${format(player.main.tehOnReset)} Tether`
      },
      canClick() {
        return (player.main.tehOnReset.gte(1))
      },
      onClick() {
        tmp.main.tehReset()
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/TehResetC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "animation": "pulse 2s infinite",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "460px",
          "height": "130px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/TehResetCT.png')",
          "background-size": "cover",
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
    
    STAT: {
    set: "auto",
    title() {
      return `<b style="font-size:25px">Stellar Automator</b><br>
      <b style="font-size:20px">${Boolean(player.main[this.set][this.id]) ? "On" : "Off"}</b>`
      
    },
    canClick() {
      return true
    },
    onClick() {
      player.main[this.set][this.id] = Boolean(1 - player.main[this.set][this.id])
    },
    canRun() {
      return player.main[this.set][this.id] && tmp.main.clickables[this.id].canClick
    },
    unlocked() {
      return hasMilestone("main", "TM6")
    },
    style() {
      if (tmp[this.layer].clickables[this.id].canRun) return {
        "background-image": "url('images/STAT_ON.png')",
        "color": "white",
        "border": "0px",
        "border-radius": "5px",
        "width": "300px",
        "height": "auto"
      }
      return {
        "background-image": "url('images/STAT_OFF.png')",
        "color": "white",
        "border": "0px",
        "border-radius": "5px",
        "width": "300px",
        "height": "auto"
      }
    },
  },
  
  ETAT: {
    set: "auto",
    title() {
      return `<b style="font-size:25px">Ethereum Automator</b><br>
      <b style="font-size:20px">${Boolean(player.main[this.set][this.id]) ? "On" : "Off"}</b>`
      
    },
    canClick() {
      return true
    },
    onClick() {
      player.main[this.set][this.id] = Boolean(1 - player.main[this.set][this.id])
    },
    canRun() {
      return player.main[this.set][this.id] && tmp.main.clickables[this.id].canClick
    },
    unlocked() {
      return hasMilestone("main", "TM8")
    },
    style() {
      if (tmp[this.layer].clickables[this.id].canRun) return {
        "background-image": "url('images/STAT_ON.png')",
        "color": "white",
        "border": "0px",
        "border-radius": "5px",
        "width": "300px",
        "height": "auto"
      }
      return {
        "background-image": "url('images/STAT_OFF.png')",
        "color": "white",
        "border": "0px",
        "border-radius": "5px",
        "width": "300px",
        "height": "auto"
      }
    },
  },
  },

  buyables: {
    "Stellar Point Production": {
      cost(x) {
        let PowerI = new Decimal(1.75)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Stellar"))
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
            "background-image": "url('images/STEC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/STECT.png')",
          "background-size": "110% !important",
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
        let Effect = new Decimal(1).mul(Decimal.pow(1.675, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true;
      }
    },
    "Stellar Production": {
      cost(x) {
        let PowerI = new Decimal(1.85)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(25).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Stellar"))
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
            "background-image": "url('images/STEC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/STECT.png')",
          "background-size": "110% !important",
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
    "Stellar Ethereum Production": {
      cost(x) {
        let PowerI = new Decimal(1.55)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1000).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Stellar"))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">RAM Sticks v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>+${format(tmp[this.layer].buyables[this.id].effect)} Ethereum Manufacturing</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())

        if (player.maim.cState2.gte(1)) return
        false
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/STEC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/STECT.png')",
          "background-size": "110% !important",
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
        return hasMilestone("main", "TM3")
      }
    },
    "Stellar Power Production": {
      cost(x) {
        let PowerI = new Decimal(2.5)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1e9).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Stellar"))
        return Calculation;
      },
      purchaseLimit: 100,
      display() {
        return `<b style="font-size:24px">Additional Neural Network Layer v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>^${format(tmp[this.layer].buyables[this.id].effect)} Stellar Production</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id]. purchased)
          return {
            "background-image": "url('images/STEB.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/STEC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/STECT.png')",
          "background-size": "110% !important",
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
        let Effect = new Decimal(1).mul(Decimal.pow(1.0025, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM4");
      }
    },
    "Cheaper Stellar": {
      cost(x) {
        let PowerI = new Decimal(5)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1e9).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Cheaper Components  v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>/${format(tmp[this.layer].buyables[this.id].effect)} Stellar Buyable Cost</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/STEC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/STECT.png')",
          "background-size": "110% !important",
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
        let Effect = new Decimal(1).mul(Decimal.pow(4, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM4");
      }
    },
    "Stellar Softcap Offset": {
      cost(x) {
        let PowerI = new Decimal(1000)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1e260).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Bigger Server Capacity v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Stellar Softcap Offset</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/STEC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/STECT.png')",
          "background-size": "110% !important",
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
        let Effect = new Decimal(1).mul(Decimal.pow(1000, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM8");
      }
    },
    "Cheaper Tier": {
      cost(x) {
        let PowerI = new Decimal(5000)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1e290).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Special Buyable I+v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>/${format(tmp[this.layer].buyables[this.id].effect)} Tier Cost</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/STEC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/STECT.png')",
          "background-size": "110% !important",
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
        let Effect = new Decimal(1).mul(Decimal.pow(25, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM8");
      }
    },


    "Ethereum Point Production": {
      cost(x) {
        let PowerI = new Decimal(1.9)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(10).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Ethereum"))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Neural Network+ v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Point Generation</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
      },
      canAfford() {
        return player[this.layer].eth.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/ETHC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/ETHCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].eth = player[this.layer].eth.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(1.75, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true;
      }
    },
    "Ethereum Stellar Production": {
      cost(x) {
        let PowerI = new Decimal(2.1)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(25).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Ethereum"))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Bigger Computer+ v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Stellar Production</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
      },
      canAfford() {
        return player[this.layer].eth.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/ETHC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/ETHCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].eth = player[this.layer].eth.sub(this.cost())
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
    "Ethereum Production": {
      cost(x) {
        let PowerI = new Decimal(2.3)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1250).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Ethereum"))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">RAM Sticks+ v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Ethereum Manufacturing</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
      },
      canAfford() {
        return player[this.layer].eth.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/ETHC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/ETHCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].eth = player[this.layer].eth.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(1.75, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM5");
      }
    },
    "Ethereum Power Production": {
      cost(x) {
        let PowerI = new Decimal(5)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1e12).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Ethereum"))
        return Calculation;
      },
      purchaseLimit: 75,
      display() {
        return `<b style="font-size:24px">More Neural Network Inputs v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>^${format(tmp[this.layer].buyables[this.id].effect)} Ethereum Manufacturing & Stellar Production</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
      },
      canAfford() {
        return player[this.layer].eth.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/ETHC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/ETHCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].eth = player[this.layer].eth.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(1.005, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM7");
      }
    },
    "Cheaper Ethereum": {
      cost(x) {
        let PowerI = new Decimal(15)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1e15).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Cheaper Components+ v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>/${format(tmp[this.layer].buyables[this.id].effect)} Ethereum Buyable Cost</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
      },
      canAfford() {
        return player[this.layer].eth.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/ETHC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/ETHCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].eth = player[this.layer].eth.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(8, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM7");
      }
    },

    "Bitcoin Point Production": {
      cost(x) {
        let PowerI = new Decimal(3)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(75).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Bitcoin"))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Neural Network++ v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Point Generation</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
      },
      canAfford() {
        return player[this.layer].btc.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/BTCC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/BTCCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].btc = player[this.layer].btc.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(3.5, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true;
      }
    },
    "Bitcoin Stellar Production": {
      cost(x) {
        let PowerI = new Decimal(3.5)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(500).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Bitcoin"))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Bigger Computer++ v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Stellar Production</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
      },
      canAfford() {
        return player[this.layer].btc.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/BTCC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/BTCCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].btc = player[this.layer].btc.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(3.5, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true;
      }
    },
    "Bitcoin Ethereum Production": {
      cost(x) {
        let PowerI = new Decimal(4)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(2750).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Bitcoin"))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">RAM Sticks++ v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Ethereum Manufacturing</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
      },
      canAfford() {
        return player[this.layer].btc.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/BTCC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/BTCCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].btc = player[this.layer].btc.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(3.5, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true;
      }
    },
    "Bitcoin Power Production": {
      cost(x) {
        let PowerI = new Decimal(250)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1e18).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Bitcoin"))
        return Calculation;
      },
      purchaseLimit: 50,
      display() {
        return `<b style="font-size:24px">More Neural Network Outputs v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>^${format(tmp[this.layer].buyables[this.id].effect)} & Bitcoin Hardforking & Ethereum Manufacturing & Stellar Production</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
      },
      canAfford() {
        return player[this.layer].btc.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/BTCC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/BTCCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].btc = player[this.layer].btc.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(1.0075, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM7");
      }
    },
    "Cheaper Bitcoin": {
      cost(x) {
        let PowerI = new Decimal(45)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1e21).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Cheaper Components++ v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>/${format(tmp[this.layer].buyables[this.id].effect)} Bitcoin Buyable Cost</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
      },
      canAfford() {
        return player[this.layer].btc.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/BTCC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/BTCCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].btc = player[this.layer].btc.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(16, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM7");
      }
    },
    
    "Tether Point Production": {
      cost(x) {
        let PowerI = new Decimal(6)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(40).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Neural Network+3 v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Point Generation</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Tether</h1>`
      },
      canAfford() {
        return player[this.layer].teh.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/TEHC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/TEHCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].teh = player[this.layer].teh.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(7, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true;
      }
    },
    "Tether Stellar Production": {
      cost(x) {
        let PowerI = new Decimal(12)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(340).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Bigger Computer+3 v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Stellar Production</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Tether</h1>`
      },
      canAfford() {
        return player[this.layer].teh.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/TEHC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/TEHCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].teh = player[this.layer].teh.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(7, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true;
      }
    },
    "Tether Ethereum Production": {
      cost(x) {
        let PowerI = new Decimal(18)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(500).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">RAM Sticks+3 v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Ethereum Manufacturing</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Tether</h1>`
      },
      canAfford() {
        return player[this.layer].teh.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/TEHC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/TEHCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].teh = player[this.layer].teh.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(7, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true;
      }
    },
    "Tether Bitcoin Gain": {
      cost(x) {
        let PowerI = new Decimal(24)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1600).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Efficient Forking v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Bitcoin Forking</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Tether</h1>`
      },
      canAfford() {
        return player[this.layer].teh.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/TEHC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/TEHCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].teh = player[this.layer].teh.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(7, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true;
      }
    },
    "Tether Power Production": {
      cost(x) {
        let PowerI = new Decimal(145)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(5600).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      purchaseLimit: 25,
      display() {
        return `<b style="font-size:24px">Shorter Connectors v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>^${format(tmp[this.layer].buyables[this.id].effect)} Tether Sorting & Bitcoin Hardforking & Ethereum Manufacturing & Stellar Production</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Tether</h1>`
      },
      canAfford() {
        return player[this.layer].teh.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/TEHC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/TEHCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].teh = player[this.layer].teh.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(1.01, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true;
      }
    },
    
    "Time Point Production": {
      cost(x) {
        let PowerI = new Decimal(1.01)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 1000).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 1500).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 2250).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Time Point Production v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>^${format(tmp[this.layer].buyables[this.id].effect)} Point Production</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Time Points</h1>`
      },
      canAfford() {
        return player[this.layer].tp.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/TPC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/TPCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].tp = player[this.layer].tp.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(1.01, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true;
      }
    },
    "Time Stellar Production": {
      cost(x) {
        let PowerI = new Decimal(1.01)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 1000).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 1500).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 2250).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Time Stellar Production v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>^${format(tmp[this.layer].buyables[this.id].effect)} Stellar Production</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Time Points</h1>`
      },
      canAfford() {
        return player[this.layer].tp.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/TPC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/TPCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].tp = player[this.layer].tp.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(1.01, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true;
      }
    },
    "Time Ethereum Production": {
      cost(x) {
        let PowerI = new Decimal(1.01)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 1000).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 1500).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 2250).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Time Ethereum Production v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>^${format(tmp[this.layer].buyables[this.id].effect)} Ethereum Manufacturing</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Time Points</h1>`
      },
      canAfford() {
        return player[this.layer].tp.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/TPC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/TPCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].tp = player[this.layer].tp.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(1.01, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true;
      }
    },
    "Time Bitcoin Gain": {
      cost(x) {
        let PowerI = new Decimal(1.01)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 1000).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 1500).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 2250).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Time Bitcoin Gain v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>^${format(tmp[this.layer].buyables[this.id].effect)} Bitcoin Hardforking</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Time Points</h1>`
      },
      canAfford() {
        return player[this.layer].tp.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/TPC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/TPCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].tp = player[this.layer].tp.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(1.01, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true;
      }
    },
    "Time Tether Gain": {
      cost(x) {
        let PowerI = new Decimal(1.01)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 1000).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 1500).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 2250).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Time Tether Gain v${format(player[this.layer].buyables[this.id], 0)}</b>
        <h2>^${format(tmp[this.layer].buyables[this.id].effect)} Tether Sorting</h2><br>
        <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Time Points</h1>`
      },
      canAfford() {
        return player[this.layer].tp.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/TPC.png')",
            "background-size": "110% !important",
            "width": "430px",
            "height": "130px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 5px #000000",
            "color": "#ffffff"
          }
        return {
          "background-image": "url('images/TPCT.png')",
          "background-size": "110% !important",
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
        player[this.layer].tp = player[this.layer].tp.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(1.01, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM8");
      }
    },
    
    
  },
  row: 0, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
    { key: "", description: "Reset for what?", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
  milestones: {
    "TM1": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 1</b>`
      },
      done() { return player.main.tier.gte(1) },
      effectDescription: `<b style="font-size:22px">
    + Gain 1.25x Points each Tier`,
      style() {
        return {
          "background": "#474747",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px"
        }
      }
    },
    "TM2": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 2</b>`
      },
      done() { return player.main.tier.gte(2) },
      effectDescription: `<b style="font-size:22px">
    + Gain 1.25x Stellar each Tier`,
      style() {
        return {
          "background": "#474747",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px"
        }
      }
    },
    "TM3": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 3</b>`
      },
      done() { return player.main.tier.gte(3) },
      effectDescription: `<b style="font-size:22px">
    + Unlock Ethereum Currency`,
      style() {
        return {
          "background": "#474747",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px"
        }
      }
    },
    "TM4": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 5</b>`
      },
      done() { return player.main.tier.gte(5) },
      effectDescription: `<b style="font-size:22px">
        + Gain 1.25x Ethereum each Tier<br>
        + Unlock 2 new Stellar buyables`,
      style() {
        return {
          "background": "#474747",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px"
        }
      }
    },
    "TM5": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 7</b>`
      },
      done() { return player.main.tier.gte(7) },
      effectDescription: `<b style="font-size:22px">
    + Improve Tier 1 milestone effect by 1.25x<br>
    + Unlock 1 new Ethereum buyable`,
      style() {
        return {
          "background": "#474747",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px"
        }
      }
    },
    "TM6": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 9</b>`
      },
      done() { return player.main.tier.gte(9) },
      effectDescription: `<b style="font-size:22px">
        + Unlock Time Point currency<br>
        + Unlock Bitcoin<br>
        + Unlock Basic Tier Automation`,
      style() {
        return {
          "background": "#474747",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px"
        }
      }
    },
    "TM7": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 13</b>`
      },
      done() { return player.main.tier.gte(13) },
      effectDescription: `<b style="font-size:22px">
        + Unlock 2 new Ethereum buyable<br>
        + Unlock 2 new Bitcoin buyable<br>
        + Improve Tier 2 milestone effect by 1.5x`,
      style() {
        return {
          "background": "#474747",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px"
        }
      }
    },
    "TM8": {
      requirementDescription() {
        return `<b style="font-size:28px">TIER 17</b>`
      },
      done() { return player.main.tier.gte(17) },
      effectDescription: `<b style="font-size:22px">
        + Unlock 2 new Stellar buyables<br>
        + Unlock Tether<br>
        + Unlock Advanced Tier Automation`,
      style() {
        return {
          "background": "#474747",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px"
        }
      }
    },
  },
  tabFormat: {
    "Main Progression": {
      content: [
      ['raw-html', () => {
          return `<MA style='font-size: 25px'>You have <HI style='font-size: 28px; text-shadow: 0px 0px 15px'>${format(player.points)}</HI> Points</MA>`
                }],
      ["raw-html", () => {
          return `<MA style="font-size: 20px; color: #595959">You generate <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(getPointGen())}</HI> Points / sec</MA>`
            }],
      ["raw-html", () => {
        if (player.main.tier.gte(1)) {
          return `<MA style="font-size: 20px; color: #595959">Bonus <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.T1PointBonusCalc)}x</HI> from T1</MA>`
        }
       }],
       "blank",
       "blank",
       "h-line",
       "blank",
       ["microtabs", "Main", { 'border-width': '0px' }],
        ]
    },
    "Tier Tab": {
      unlocked() { return player.points.gte(10000) || player.main.tier.gte(1) },
      content: [
    "blank",
    ["raw-html", () => {
          return `<MA style="font-size: 28px; color: #c7c7c7">You are at Tier <HI style="font-size: 32px; text-shadow: 0px 0px 20px">${formatNoDecimals(player.main.tier)}</HI></MA>`
    }],

    ["raw-html", () => {
          return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.points)}</HI> Points</MA>`
    }],
    "blank",
        ["raw-html", () => {
          if (player.main.tier.gte(10)) {
            return `<MA style="font-size: 20px; color: #7a1818">Softcap I: After Tier <HI style="font-size: 24px; color: #a12222; text-shadow: 0px 0px 20px">${formatNoDecimals(player.main.tierS1)}</HI>, it's cost requirement is increased by ^${format(tmp.main.SoftcapIcalc)}</MA>`
          }
          return ``
    }],
    ["raw-html", () => {
          if (player.main.tier.gte(20)) {
            return `<MA style="font-size: 20px; color: #7a182c">Softcap II: After Tier <HI style="font-size: 24px; color: #a12239; text-shadow: 0px 0px 20px">${formatNoDecimals(player.main.tierS2)}</HI>, it's cost requirement is increased by ^${format(tmp.main.SoftcapIIcalc)}</MA>`
          }
          return ``
    }],
    ["raw-html", () => {
          if (player.main.tier.gte(40)) {
            return `<MA style="font-size: 20px; color: #7a184c">Softcap III: After Tier <HI style="font-size: 24px; color: #a12279; text-shadow: 0px 0px 20px">${formatNoDecimals(player.main.tierS3)}</HI>, it's cost requirement is increased by ^${format(tmp.main.SoftcapIIIcalc)}</MA>`
          }
          return ``
    }],
    ["raw-html", () => {
      if (player.main.tier.gte(80)) {
        return `<MA style="font-size: 20px; color: #7a1878">Softcap IV: After Tier <HI style="font-size: 24px; color: #8e22a1; text-shadow: 0px 0px 20px">${formatNoDecimals(player.main.tierS4)}</HI>, it's cost requirement is increased by ^${format(tmp.main.SoftcapIVcalc)}</MA>`
      }
      return ``
        }],
    "blank",
    ["row", [["clickable", "Tier Up"]]],
    "blank",
    "blank",
    ["raw-html", () => {
     return `<HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">-- Mastery I --</HI>`
    }],
    ["row", [["milestone", "TM1"]]],
    ["blank", "2px"],
    ["row", [["milestone", "TM2"]]],
    ["blank", "2px"],
    ["row", [["milestone", "TM3"]]],
    "blank",
    "blank",
    ["raw-html", () => {
    return `<HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">-- Mastery II --</HI>`
    }],
    ["row", [["milestone", "TM4"]]],
    ["blank", "2px"],
    ["row", [["milestone", "TM5"]]],
    ["blank", "2px"],
    ["row", [["milestone", "TM6"]]],
    "blank",
    "blank",
    ["raw-html", () => {
    return `<HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">-- Mastery III --</HI>`
    }],
    ["row", [["milestone", "TM7"]]],
    ["blank", "2px"],
    ["row", [["milestone", "TM8"]]],
    ["blank", "2px"],
    ["row", [["milestone", "TM9"]]],
    "blank",
    "blank",
    ],
    },
    "Time Tab": {
      unlocked() { return hasMilestone("main", "TM6") },
      content: [
    "blank",
    ["raw-html", () => {
          return `<MA style="font-size: 28px; color: #c7c7c7">You own <HI style="font-size: 32px; text-shadow: 0px 0px 20px">${format(player.main.tp)}</HI> Time Points</MA>`
    }],

    ["raw-html", () => {
          return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.points)}</HI> Points</MA>`
    }],
    "blank",
    "blank",
    ["row", [["buyable", "Time Point Production"]]],
    ["row", [["buyable", "Time Stellar Production"]]],
    ["row", [["buyable", "Time Ethereum Production"]]],
    ["row", [["buyable", "Time Bitcoin Gain"]]],
    ["row", [["buyable", "Time Tether Gain"]]],
    "blank",
    "blank",
    ["row", [["challenge", "TCH1"]]],
    ["row", [["challenge", "TCH2"]]],
    "blank",
    "blank",
    ],
    },
  },

  microtabs: {
    Main: {
      "Stellar": {
        content: [
       "blank",
       "h-line",
       "blank",
         ['raw-html', () => {
            return `<MA style='font-size: 25px'>You have <HI style='font-size: 28px; text-shadow: 0px 0px 15px'>${format(player.main.points)}</HI> Stellar<sup>${format(tmp.main.StellarPWR)}</sup></MA>`
        }],
        ["raw-html", () => {
            return `<MA style="font-size: 20px; color: #595959">You produce <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.resetGain)}</HI> Stellar / sec</MA>`
            }],
          
        ["raw-html", () => {
        if (player.main.tier.gte(2)) {
          return `<MA style="font-size: 20px; color: #595959">Bonus <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.T1StellarBonusCalc)}x</HI> from T2</MA>`
        }
       }],
        ["raw-html", () => {
        if (player.main.tier.gte(16)) {
            return `<MA style="font-size: 20px; color: #7a1818">Requirem I: After Tier 17, you gain <HI style="font-size: 24px; color: #a12222; text-shadow: 0px 0px 20px">^${format(tmp.main.StellarSoftcapIcalc)}</HI> Stellar</MA><br>
            <MA style="font-size: 17px; color: #7a1818">Formula: ^1 / ( Tier / 18 )</MA>`
               }
            return ``
                }],
       "blank",
       "blank",
       ["row", [["clickable", "STAT"]]],
       "blank",
       ["row", [["buyable", "Stellar Point Production"]]],
       ["row", [["buyable", "Stellar Production"]]],
       ["row", [["buyable", "Stellar Ethereum Production"]]],
       ["row", [["buyable", "Stellar Power Production"]]],
       ["row", [["buyable", "Cheaper Stellar"]]],
       ["row", [["buyable", "Stellar Softcap Offset"]]],
       ["row", [["buyable", "Cheaper Tier"]]],
       ],
      },
      "Ethereum": {
        unlocked() {
          return (player.main.eth.gte(1) || hasMilestone("main", "TM3"))
        },
        content: [
         "blank",
         "h-line",
         "blank",

         ['raw-html', () => {
            return `<MA style='font-size: 25px'>You have <HI style='font-size: 28px; text-shadow: 0px 0px 15px'>${format(player.main.eth)}</HI> Ethereum</MA>`
        }],
        ["raw-html", () => {
            return `<MA style="font-size: 20px; color: #595959">You manufacture <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.ethCalc)}</HI> Ethereum / sec</MA>`
        }],
        [ "raw-html", () => {
        if (player.main.tier.gte(5)) {
          return `<MA style="font-size: 20px; color: #595959">Bonus <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.T1EthereumBonusCalc)}x</HI> from T5</MA>`
        }
       }],
       "blank",
       "blank",
       ["row", [["clickable", "ETAT"]]],
       "blank",
       ["row", [["buyable", "Ethereum Point Production"]]],
       ["row", [["buyable", "Ethereum Stellar Production"]]],
       ["row", [["buyable", "Ethereum Production"]]],
       ["row", [["buyable", "Ethereum Power Production"]]],
       ["row", [["buyable", "Cheaper Ethereum"]]],
       ],
      },
      "Bitcoin": {
        unlocked() { return player.main.btc.gte(1) || hasMilestone("main", "TM6") },
        content: [
        "blank",
        "h-line",
        "blank",
         ['raw-html', () => {
            return `<MA style='font-size: 25px'>You have <HI style='font-size: 28px; text-shadow: 0px 0px 15px'>${format(player.main.btc)}</HI> Bitcoin</MA>`
        }],
        ['raw-html', () => {
            return `<MA style='font-size: 25px'>Your Bitcoins are translated into <HI style='font-size: 28px; text-shadow: 0px 0px 15px'>${format(tmp.main.btcBoost)}</HI>x Stellar</MA>`
        }],
       ["row", [["clickable", "Bitcoin Reset"]]],
       ["row", [["buyable", "Bitcoin Point Production"]]],
       ["row", [["buyable", "Bitcoin Stellar Production"]]],
       ["row", [["buyable", "Bitcoin Ethereum Production"]]],
       ["row", [["buyable", "Bitcoin Power Production"]]],
       ["row", [["buyable", "Cheaper Bitcoin"]]]
       ],
      },
    
    "Tether": {
        unlocked() { return player.main.teh.gte(1) || hasMilestone("main", "TM8") },
        content: [
        "blank",
        "h-line",
        "blank",
         ['raw-html', () => {
            return `<MA style='font-size: 25px'>You have <HI style='font-size: 28px; text-shadow: 0px 0px 15px'>${format(player.main.teh)}</HI> Tether</MA>`
        }],
        ['raw-html', () => {
            return `<MA style='font-size: 25px'>Your Tether are translated into <HI style='font-size: 28px; text-shadow: 0px 0px 15px'>${format(tmp.main.tehBoost)}</HI>x Stellar & Ethereum</MA>`
        }],
       ["row", [["clickable", "Tether Reset"]]],
       ["row", [["buyable", "Tether Point Production"]]],
       ["row", [["buyable", "Tether Stellar Production"]]],
       ["row", [["buyable", "Tether Ethereum Production"]]],
       ["row", [["buyable", "Tether Bitcoin Gain"]]],
       ["row", [["buyable", "Tether Power Production"]]],
       ],
      }
    }
  },

  layerShown() { return true }
})
const HEADERs = `<b style="font-size:28px; text-align: right">`
const HEADERe = `</b>`

const OreImage = `<img src="images/Mineral_Base.png" width="16" height="16">`

addLayer("main", {
  name: "INF^2",
  symbol: "INF^2",
  position: 0,
  startData()
  {
    return {
      unlocked: true,

      // Currencies
      points: new Decimal(0),
      eth: new Decimal(0),
      btc: new Decimal(0),
      tier: new Decimal(0),

      // Bitcoin related
      hardfork: new Decimal(0),
      hardforkxp: new Decimal(0),
      hardforklvl: new Decimal(0),

      limit: new Decimal(30),

      unit: new Decimal(1.001),
      unitLimit: new Decimal(1e10),
      unitLimitLimit: new Decimal("1e1000"),

      factories: new Decimal(0),
      oreos: new Decimal(1),

      TCH1S: new Decimal(0),


      // Bruh, Button Simulator extension. Savefile is already 5,000+ characters so why not increase it?
      cash: new Decimal(0),
      multiplier: new Decimal(0),
      multiplierP: new Decimal(0),
      rebirth: new Decimal(0),
      rebirthP: new Decimal(0),
      srebirth: new Decimal(0),
      srebirthP: new Decimal(0),
      urebirth: new Decimal(0),
      urebirthP: new Decimal(0),

      auto: {
        T1AT1: false,
        T1AT2: false,

        T2AT1: false,
        T2AT2: false,
      },

    }
  },
  color: "#ffffff",
  requires: new Decimal(2),
  resource: "Stellar",
  baseResource: "points",
  baseAmount() { return player.points },
  type: "normal",
  exponent: "1e-3000",
  gainMult()
  {
    mult = new Decimal(1)
    mult = mult.mul(buyableEffect("main", "Stellar Production"))
    mult = mult.mul(buyableEffect("main", "Ethereum Booster"))
    mult = mult.mul(buyableEffect("main", "Oreo Stellar Production"))
    mult = mult.mul(buyableEffect("main", "Bitcoin Stellar Production"))
    if (player.main.tier.gte(7)) {
      mult = mult.mul(tmp.main.StellarMagnitudeBonus)

    }
    if (player.main.TCH1S.gte(1)) {
      mult = mult.pow(tmp[this.layer].challenges["Looming"].debuff)
    }
    if (hasMilestone("main", "TM19"))
      mult = mult.mul(tmp.main.OreoStellarBoost)
    mult = mult.mul(challengeEff("main", "Looming"))

    return mult
  },
  gainExp()
  {
    return new Decimal(1)
  },
  passiveGeneration() {
    let gen = new Decimal(1)
    return gen
  },
  tierCostCalc() {
    let Base = new Decimal(50)
    let Tier = player.main.tier
    let Layer = new Decimal(1.287)

    let PowerI = new Decimal.div(player.main.tier, 20).add(1)
    let PowerII = new Decimal.div(player.main.tier, 40).add(1)
    let PowerIII = new Decimal.div(player.main.tier, 80).add(1)
    let PowerIV = new Decimal.div(player.main.tier, 160).add(1)
    let PowerV = new Decimal.div(player.main.tier, 320).add(1)
    let PowerVI = new Decimal.div(player.main.tier, 640).add(1)
    let PowerVII = new Decimal.div(player.main.tier, 1280).add(1)
    let PowerVIII = new Decimal.div(player.main.tier, 2560).add(1)
    let PowerIX = new Decimal.div(player.main.tier, 5120).add(1)
    let PowerX = new Decimal.div(player.main.tier, 10240).add(1)

    let ScaleI = new Decimal.pow(10, Tier)
    let CostI = new Decimal.mul(ScaleI, Tier)

    let ScaleII = new Decimal.pow(5, Tier)
    let CostII = new Decimal.mul(ScaleII, Tier)

    let Calculation = new Decimal.mul(CostI, CostII)
    Calculation = Calculation.pow(Layer)
    Calculation = Calculation.pow(PowerI)
    Calculation = Calculation.pow(PowerII)
    Calculation = Calculation.pow(PowerIII)
    Calculation = Calculation.pow(PowerIV)
    Calculation = Calculation.pow(PowerV)
    Calculation = Calculation.pow(PowerVI)
    Calculation = Calculation.pow(PowerVII)
    Calculation = Calculation.pow(PowerVIII)
    Calculation = Calculation.pow(PowerIX)
    Calculation = Calculation.pow(PowerX)

    Calculation = Calculation.div(buyableEffect("main", "Cheaper Stellar Tier"))
    Calculation = Calculation.div(buyableEffect("main", "Cheaper Oreo Tier"))
    Calculation = Calculation.div(buyableEffect("main", "Bitcoin Cheaper Tier"))
    return Calculation
  },

  tierUp() {
    player.main.tier = player.main.tier.add(1)
    player.points = new Decimal(0)
    player.main.points = new Decimal(0)
    player.main.eth = new Decimal(0)
    player.main.unit = new Decimal(1.01)
    player.main.buyables["Stellar Point Production"] = new Decimal(0)
    player.main.buyables["Stellar Production"] = new Decimal(0)
    player.main.buyables["Cheaper Stellar"] = new Decimal(0)

    player.main.buyables["Ethereum Point Production"] = new Decimal(0)
    player.main.buyables["Ethereum Stellar Mag Increaser"] = new Decimal(0)
    player.main.buyables["Ethereum Stellar Mag Booster"] = new Decimal(0)
  },

  type1reset() {
    player.points = new Decimal(0)
    player.main.points = new Decimal(0)
    player.main.eth = new Decimal(0)
    player.main.unit = new Decimal(1.01)
    player.main.buyables["Stellar Point Production"] = new Decimal(0)
    player.main.buyables["Stellar Production"] = new Decimal(0)
    player.main.buyables["Cheaper Stellar"] = new Decimal(0)

    player.main.buyables["Ethereum Point Production"] = new Decimal(0)
    player.main.buyables["Ethereum Stellar Mag Increaser"] = new Decimal(0)
    player.main.buyables["Ethereum Stellar Mag Booster"] = new Decimal(0)
  },

  factoryInvestment() {
    player.main.factories = player.main.factories.add(1)
    player.points = new Decimal(0)
    player.main.points = new Decimal(0)
    player.main.eth = new Decimal(0)
    player.main.unit = new Decimal(1.01)
    player.main.tier = new Decimal(0)
    player.main.buyables["Stellar Point Production"] = new Decimal(0)
    player.main.buyables["Stellar Production"] = new Decimal(0)
    player.main.buyables["Cheaper Stellar"] = new Decimal(0)
    player.main.buyables["Cheaper Stellar Tier"] = new Decimal(0)
    player.main.buyables["Stellar Accelerant Boost"] = new Decimal(0)

    player.main.buyables["Ethereum Point Production"] = new Decimal(0)
    player.main.buyables["Ethereum Stellar Mag Increaser"] = new Decimal(0)
    player.main.buyables["Ethereum Stellar Mag Booster"] = new Decimal(0)
    player.main.buyables["Ethereum Booster"] = new Decimal(0)
  },

  factoryInvestmentCostCalc() {
    let Base = new Decimal(15)

    let Tier = player.main.factories
    let Layer = new Decimal(1)
    let Calculation = new Decimal(15)
    let Increase = new Decimal.mul(Tier, 3)

    Calculation = Calculation.add(Increase)

    if (hasMilestone("main", "TM9")) {
      Calculation = Calculation.sub(1)
    }
    if (hasMilestone("main", "TM10")) {
      Calculation = Calculation.sub(1)
    }
    Calculation = Calculation.sub(buyableEffect("main", "Ethereum Cheaper Factory"))
    Calculation = Calculation.sub(buyableEffect("main", "Bitcoin Cheaper Factory"))
    return Calculation
  },

  hardfork() {
    player.main.hardfork = player.main.hardfork.add(1)

    if (!hasMilestone("main", "TM15")) {
      player.points = new Decimal(0)
      player.main.tier = new Decimal(0)
      player.main.factories = new Decimal(0)
      player.main.points = new Decimal(0)
      player.main.eth = new Decimal(0)
      player.main.unit = new Decimal(1.0)
      player.main.oreos = new Decimal(0)
      player.main.buyables["Stellar Point Production"] = new Decimal(0)
      player.main.buyables["Stellar Production"] = new Decimal(0)
      player.main.buyables["Cheaper Stellar"] = new Decimal(0)
      player.main.buyables["Cheaper Stellar Tier"] = new Decimal(0)
      player.main.buyables["Stellar Accelerant Boost"] = new Decimal(0)

      player.main.buyables["Ethereum Point Production"] = new Decimal(0)
      player.main.buyables["Ethereum Stellar Mag Increaser"] = new Decimal(0)
      player.main.buyables["Ethereum Stellar Mag Booster"] = new Decimal(0)
      player.main.buyables["Ethereum Booster"] = new Decimal(0)
      player.main.buyables["Ethereum Cheaper Factory"] = new Decimal(0)

      player.main.buyables["Oreo Point Production"] = new Decimal(0)
      player.main.buyables["Oreo Stellar Production"] = new Decimal(0)
      player.main.buyables["Oreo Cheaper"] = new Decimal(0)
      player.main.buyables["Cheaper Oreo Tier"] = new Decimal(0)
      player.main.buyables["Oreo Looming Offsetter"] = new Decimal(0)
      player.main.buyables["Oreo Bonus Booster"] = new Decimal(0)
    }
  },

  hardforkCostCalc() {
    let Base = new Decimal("1e1200")
    /*
     let HF = player.main.hardfork

     let PowerI = new Decimal(HF)
     PowerI = PowerI.add(1)
     
     let PowerII = new Decimal.div(HF, 20).add(1)
     let PowerIII = new Decimal.div(HF, 30).add(1)
     let PowerIV = new Decimal.div(HF, 40).add(1)
     
     PowerI = PowerI.pow(PowerII)
     PowerI = PowerI.pow(PowerIII)
     PowerI = PowerI.pow(PowerIV)
     let CalculationI = new Decimal.pow(PowerI, 0.1)
     let CalculationII = new Decimal.pow(Base, CalculationI)
     if (hasMilestone("main", "TM15")) {
       CalculationII = CalculationII.pow(0.5)
     }*/

    let StartingCost = new Decimal("1e1200")
    let HF1 = player.main.hardfork
    let HF2 = new Decimal.div(HF1, 10).add(1)
    let HF3 = new Decimal.div(HF1, 20).add(1)
    let HF4 = new Decimal.div(HF1, 30).add(1)
    let HF5 = new Decimal.div(HF1, 40).add(1)
    let HF6 = new Decimal.div(HF1, 50).add(1)

    let ScaleI = new Decimal.pow(1.05, HF1)
    let ScaleII = new Decimal.pow(1.06, HF2)
    let ScaleIII = new Decimal.pow(1.075, HF3)
    let ScaleIV = new Decimal.pow(1.09, HF4)
    let ScaleV = new Decimal.pow(1.11, HF5)
    let ScaleVI = new Decimal.pow(1.14, HF6)

    StartingCost = StartingCost.pow(ScaleI)
    StartingCost = StartingCost.pow(ScaleII)
    StartingCost = StartingCost.pow(ScaleIII)
    StartingCost = StartingCost.pow(ScaleIV)
    StartingCost = StartingCost.pow(ScaleV)
    StartingCost = StartingCost.pow(ScaleVI)
    StartingCost = StartingCost.div("1e1000")
    return StartingCost
  },

  hardforkXPCalc() {
    let Base = player.main.hardfork
    let Power = new Decimal(3)
    Power = Power.add(buyableEffect("main", "Bitcoin XP Generation"))
    let Calculation = new Decimal.pow(Power, Base).sub(1)

    return Calculation
  },

  hardforkXPlevelCalc() {
    let Base = new Decimal(10)
    let Power = new Decimal(1.1)


    let Level = player.main.hardforklvl

    let CalculationI = new Decimal.pow(Power, Level)
    let CalculationII = new Decimal.mul(Base, CalculationI)

    return CalculationII
  },

  hardforkLevelDisplay() {
    let Mark = new Decimal(0)
    let Threshold = new Decimal(100)


    if (player.main.hardforklvl.gte(Threshold)) {
      Threshold = Threshold.mul(2)
      Mark = Mark.add(1)
    }
    return Mark
  },



  bitcoinGeneration() {
    let Base = player.main.hardforklvl
    let Power = new Decimal(2.5)

    if (hasMilestone("main", "TM12")) {
      Power = Power.mul(1.2)
    }
    if (hasMilestone("main", "TM13")) {
      Power = Power.mul(1.3)
    }

    let Calculation = new Decimal.pow(Power, Base).sub(1)

    return Calculation
  },
  
 fixBitcoin() {
  player.main.btc = new Decimal(0)
 },

  ethGainCalc() {
    let Stellar = player.main.points
    Stellar = Stellar.add(1)
    let Generation = new Decimal.pow(Stellar, 0.25)
    Generation = Generation.add(1)

    Generation = Generation.mul(buyableEffect("main", "Ethereum Booster"))
    Generation = Generation.mul(buyableEffect("main", "Bitcoin Ethereum Production"))

    if (player.main.tier.gte(19)) {
      Generation = Generation.mul(tmp.main.EthereumStabilizerBoost)
    }
    Generation = Generation.add(1)
    return Generation
  },

  oreoGainCalc() {
    let Factory = player.main.factories
    Factory = Factory.add(1)

    let Production = new Decimal.pow(3, Factory).sub(1)
    Production = Production.add(1)
    return Production
  },

  StellarMagnitude() {
    let Stellar = player.main.points
    Stellar = Stellar.add(1)
    let Calculation = new Decimal.log(Stellar, 10)

    let Limit = tmp.main.StellarMagnitudeLimit
    if (Calculation.gte(Limit)) {
      return Calculation = Limit
    }

    return Calculation
  },

  StellarMagnitudeBonus() {
    let Stellar = player.main.points
    Stellar = Stellar.add(1)
    Power = new Decimal(2)

    Power = Power.add(buyableEffect("main", "Ethereum Stellar Mag Booster"))
    Power = Power.add(buyableEffect("main", "Bitcoin Stellar Mag Booster"))
    if (hasMilestone("main", "TM8")) {
      Power = Power.mul(1.5)
    }
    if (hasMilestone("main", "TM9")) {
      Power = Power.mul(1.5)
    }
    let CalculationI = tmp.main.StellarMagnitude
    let CalculationII = new Decimal.pow(CalculationI, Power)

    CalculationII = CalculationII.add(1)
    return CalculationII
  },

  StellarMagnitudeLimit() {
    let Limit = new Decimal(30)
    Limit = Limit.add(buyableEffect("main", "Ethereum Stellar Mag Increaser"))
    Power = Power.add(buyableEffect("main", "Bitcoin Stellar Mag Booster"))

    if (hasMilestone("main", "TM6")) {
      Limit = Limit.mul(2)
    }

    return Limit
  },

  StellarMagBonusDisplay() {
    let Boost = new Decimal(2)
    Boost = Boost.add(buyableEffect("main", "Ethereum Stellar Mag Booster"))
    if (hasMilestone("main", "TM8")) {
      Boost = Boost.mul(1.5)
    }
    if (hasMilestone("main", "TM9")) {
      Boost = Boost.mul(1.5)
    }
    return Boost
  },

  EthereumStabilizer() {
    let Base = new Decimal(0)

    Base = Base.add(player.main.buyables["Ethereum Point Production"])
    Base = Base.add(player.main.buyables["Ethereum Stellar Mag Increaser"])
    Base = Base.add(player.main.buyables["Ethereum Stellar Mag Booster"])
    Base = Base.add(player.main.buyables["Ethereum Booster"])
    Base = Base.add(player.main.buyables["Ethereum Cheaper Factory"])
    return Base
  },

  EthereumStabilizerBoost() {
    let Base = new Decimal(1.2)

    Base = Base.add(buyableEffect("main", "Bitcoin Ethereum Stabilizer Booster"))

    let Calculation = new Decimal.pow(Base, tmp.main.EthereumStabilizer)

    return Calculation
  },

  AccelerantLimit() {
    let Limit = new Decimal(1e10)
    if (hasMilestone("main", "TM7")) {
      Limit = Limit.pow(2)
    }
    if (hasMilestone("main", "TM8")) {
      Limit = Limit.pow(2)
    }
    if (hasMilestone("main", "TM10")) {
      Limit = Limit.pow(2)
    }
    Limit = Limit.pow(tmp.main.OreoAccelerantLimitBoost)
    Limit = Limit.pow(buyableEffect("main", "Bitcoin Accelerant Limit"))
    Limit = Limit.add(1)

    let LimitLimit = player.main.unitLimitLimit
    if (Limit.gte(LimitLimit)) {
      return Limit = LimitLimit
    }
    return Limit
  },

  AccelerantLimitLimit() {
    let Base = new Decimal("1e2000")
    Base = Base.pow(buyableEffect("main", "Bitcoin Accelerant Limit Limit"))
    return Base
  },

  AccelerantSpeed() {
    let Acceleration = new Decimal(1.02)

    if (hasMilestone("main", "TM8"))
      Acceleration = Acceleration.add(tmp.main.OreoAccelerantBoostBonus)
    if (hasMilestone("main", "TM7")) {
      Acceleration = Acceleration.add(0.02)
    }
    if (hasMilestone("main", "TM8")) {
      Acceleration = Acceleration.add(0.04)
    }
    if (hasMilestone("main", "TM10")) {
      Acceleration = Acceleration.add(0.08)
    }
    Acceleration = Acceleration.mul(buyableEffect("main", "Bitcoin Accelerant Speed"))

    return Acceleration
  },

  AccelerantBonus() {
    let Base = new Decimal(1)
    Base = Base.add(buyableEffect("main", "Stellar Accelerant Bonus"))
    Base = Base.add(buyableEffect("main", "Bitcoin Accelerant Bonus"))
    let Calculation = new Decimal.pow(player.main.unit, Base)

    Calculation = Calculation.add(1)

    return Calculation
  },

  AccelerantBonusDisplay() {
    let Base = new Decimal(1)
    Base = Base.add(buyableEffect("main", "Stellar Accelerant Bonus"))
    Base = Base.add(buyableEffect("main", "Bitcoin Accelerant Bonus"))
    return Base
  },

  OreoPointBoost() {
    let Oreo = player.main.oreos
    let Calculation = new Decimal.pow(Oreo, 7)

    Calculation = Calculation.pow(buyableEffect("main", "Oreo Bonus Booster"))
    Calculation = Calculation.add(1)
    return Calculation
  },

  OreoStellarBoost() {
    let Oreo = player.main.oreos
    Oreo = Oreo.add(1)
    let Calculation = new Decimal.pow(Oreo, 6)

    Calculation = Calculation.pow(buyableEffect("main", "Oreo Bonus Booster"))
    return Calculation
  },

  OreoAccelerantLimitBoost() {
    let Oreo = player.main.oreos
    Oreo = Oreo.add(1)
    let Calculation = new Decimal.pow(Oreo, 0.05)

    Calculation = Calculation.pow(buyableEffect("main", "Oreo Bonus Booster"))
    Calculation = Calculation.add(1)
    return Calculation
  },

  OreoAccelerantBoostBonus() {
    let Oreo = player.main.oreos
    Oreo = Oreo.add(1)
    let Logarithm = new Decimal(10)

    let CalculationI = new Decimal.log(Oreo, Logarithm)
    CalculationI = CalculationI.add(1)
    CalculationI = CalculationI.pow(buyableEffect("main", "Oreo Bonus Booster"))
    let CalculationII = new Decimal.div(CalculationI, 50)

    return CalculationII
  },

  OrderIndex() {
    let Index = new Decimal(0)
    if (player.main.rebirth.gte(1)) {
      Index = new Decimal(1)
    }
    if (player.main.srebirth.gte(1)) {
      Index = new Decimal(2)
    }
    if (player.main.urebirth.gte(1)) {
      Index = new Decimal(3)
    }
    return Index
  },

  HardReset() {
    player.main.multiplier = new Decimal(0)
    player.main.cash = new Decimal(0)
    player.main.multiplierP = new Decimal(0)
    player.main.rebirth = new Decimal(0)
    player.main.rebirthP = new Decimal(0)
    player.main.srebirth = new Decimal(0)
    player.main.srebirthP = new Decimal(0)
    player.main.urebirth = new Decimal(0)
    player.main.urebirthP = new Decimal(0)
  },

  LevelCalculation() {
    let Base = player.main.cash
    Base = Base.add(1)

    let LevelC = new Decimal.log(Base, 10).add(1)
    return LevelC
  },

  CashCalculation() {
    let Base = new Decimal(1)
    let Multiplier = player.main.multiplier
    let SRebirth = player.main.srebirth

    let BoostI = new Decimal.mul(Multiplier, 1.25)
    let URebirthBoost = new Decimal.mul(player.main.urebirth, 3).add(1)


    let Calculation = new Decimal.add(Base, BoostI)
    Calculation = Calculation.mul(tmp.main.RebirthBoostCalc)
    return Calculation
  },

  MultiplierReset() {
    player.main.cash = player.main.cash.sub(tmp.main.MultiplierCostCalc)
  },

  MultiplierCostCalc() {
    let AmountBuy = player.main.multiplierP
    let Amount = player.main.multiplierP
    let Currency = player.main.cash

    let PowerI = new Decimal.div(Amount, 70).add(1)
    let PowerII = new Decimal.div(Amount, 140).add(1)
    let PowerIII = new Decimal.div(Amount, 280).add(1)

    let BaseCost = new Decimal(10)
    let CostFactor = new Decimal(2.25)
    CostFactor = CostFactor.pow(PowerI)
    CostFactor = CostFactor.pow(PowerII)
    CostFactor = CostFactor.pow(PowerIII)

    let CostPower = new Decimal.pow(CostFactor, AmountBuy)
    BaseCost = BaseCost.mul(CostPower)

    BaseCost = BaseCost.pow(PowerI)
    BaseCost = BaseCost.pow(PowerII)
    BaseCost = BaseCost.pow(PowerIII)

    return BaseCost
  },

  MultiplierAmountCalc() {
    let AmountBuy = player.main.multiplierP
    let Amount = player.main.multiplierP
    let Currency = player.main.cash

    let PowerI = new Decimal.div(Amount, 100).add(1)
    let PowerII = new Decimal.div(Amount, 200).add(1)
    let PowerIII = new Decimal.div(Amount, 400).add(1)

    let RebirthBoost = new Decimal.mul(player.main.rebirth, 2).add(1)
    let URebirthBoost = new Decimal.mul(player.main.urebirth, 1.5).add(1)

    let BaseAmount = new Decimal(1)
    let AmountFactor = new Decimal(1.5)
    AmountFactor = AmountFactor.pow(PowerI)
    AmountFactor = AmountFactor.pow(PowerII)
    AmountFactor = AmountFactor.pow(PowerIII)

    let AmountPower = new Decimal.pow(AmountFactor, AmountBuy)
    BaseAmount = BaseAmount.mul(AmountPower)
    BaseAmount = BaseAmount.mul(RebirthBoost)
    BaseAmount = BaseAmount.mul(URebirthBoost)


    return BaseAmount
  },

  MultiplierBoost() {
    let Power = new Decimal(10)
    let Multiplier = player.main.multiplier

    let Calculation = new Decimal.pow(Multiplier, Power)
    return Calculation
  },

  RebirthReset() {
    player.main.multiplier = new Decimal(0)
    player.main.cash = new Decimal(0)
  },

  RebirthCostCalc() {
    let AmountBuy = player.main.multiplierP
    let Amount = player.main.multiplierP
    let Currency = player.main.cash

    let PowerI = new Decimal.div(Amount, 70).add(1)
    let PowerII = new Decimal.div(Amount, 140).add(1)
    let PowerIII = new Decimal.div(Amount, 280).add(1)

    let BaseCost = new Decimal(500)
    let CostFactor = new Decimal(3.37)
    CostFactor = CostFactor.pow(PowerI)
    CostFactor = CostFactor.pow(PowerII)
    CostFactor = CostFactor.pow(PowerIII)

    let CostPower = new Decimal.pow(CostFactor, AmountBuy)
    BaseCost = BaseCost.mul(CostPower)

    BaseCost = BaseCost.pow(PowerI)
    BaseCost = BaseCost.pow(PowerII)
    BaseCost = BaseCost.pow(PowerIII)

    return BaseCost
  },

  RebirthAmountCalc() {
    let AmountBuy = player.main.rebirthP
    let Amount = player.main.rebirthP
    let Currency = player.main.multiplier

    let PowerI = new Decimal.div(Amount, 100).add(1)
    let PowerII = new Decimal.div(Amount, 200).add(1)
    let PowerIII = new Decimal.div(Amount, 400).add(1)

    let RebirthBoost = new Decimal.mul(player.main.rebirth, 2).add(1)
    let URebirthBoost = new Decimal.mul(player.main.urebirth, 1.5).add(1)

    let BaseAmount = new Decimal(1)
    let AmountFactor = new Decimal(1.5)
    AmountFactor = AmountFactor.pow(PowerI)
    AmountFactor = AmountFactor.pow(PowerII)
    AmountFactor = AmountFactor.pow(PowerIII)

    let AmountPower = new Decimal.pow(AmountFactor, AmountBuy)
    BaseAmount = BaseAmount.mul(AmountPower)
    BaseAmount = BaseAmount.mul(RebirthBoost)
    BaseAmount = BaseAmount.mul(URebirthBoost)


    return BaseAmount
  },

  RebirthBoostCalc() {
    let Rebirth = player.main.rebirth
    let BaseBoost = new Decimal(2)

    let Calculation = new Decimal.mul(BaseBoost, Rebirth).add(1)

    return Calculation
  },

  SRebirthReset() {
    player.main.rebirth = new Decimal(0)
    player.main.multiplier = new Decimal(0)
    player.main.cash = new Decimal(0)
  },

  SRebirthCostCalc() {
    let AmountBuy = player.main.srebirthP
    let Currency = player.main.rebirth

    let BaseCost = new Decimal(50000)
    let CostFactor = new Decimal(5.06)
    let CostPower = new Decimal.pow(CostFactor, AmountBuy)
    BaseCost = BaseCost.mul(CostPower)

    return BaseCost
  },

  SRebirthAmountCalc() {
    let AmountBuy = player.main.srebirthP
    let Currency = player.main.rebirth

    let URebirthBoost = new Decimal.mul(player.main.urebirth, 4).add(1)

    let BaseAmount = new Decimal(1)
    let AmountFactor = new Decimal(1.5)
    let AmountPower = new Decimal.pow(AmountFactor, AmountBuy)
    BaseAmount = BaseAmount.mul(AmountPower)
    BaseAmount = BaseAmount.mul(URebirthBoost)

    return BaseAmount
  },

  SRebirthBoostCalc() {
    let SRebirth = player.main.srebirth
    let BaseBoost = new Decimal(4)

    let Calculation = new Decimal.mul(BaseBoost, SRebirth).add(1)

    return Calculation
  },

  URebirthReset() {
    player.main.srebirth = new Decimal(0)
    player.main.rebirth = new Decimal(0)
    player.main.multiplier = new Decimal(0)
    player.main.cash = new Decimal(0)
  },

  URebirthCostCalc() {
    let AmountBuy = player.main.urebirthP
    let Currency = player.main.srebirth

    let BaseCost = new Decimal(5e15)
    let CostFactor = new Decimal(7.59)
    let CostPower = new Decimal.pow(CostFactor, AmountBuy)
    BaseCost = BaseCost.mul(CostPower)

    return BaseCost
  },

  URebirthAmountCalc() {
    let AmountBuy = player.main.urebirthP
    let Currency = player.main.srebirth

    let BaseAmount = new Decimal(1)
    let AmountFactor = new Decimal(1.5)
    let AmountPower = new Decimal.pow(AmountFactor, AmountBuy)
    BaseAmount = BaseAmount.mul(AmountPower)

    return BaseAmount
  },





  update(diff) {


    player.main.unitLimitLimit = tmp.main.AccelerantLimitLimit

    player.main.unitLimit = tmp.main.AccelerantLimit
    player.main.limit = tmp.main.StellarMagnitudeLimit

    player.main.hardforkxp = player.main.hardforkxp.add((tmp.main.hardforkXPCalc).times(diff))

    player.main.btc = player.main.btc.add((tmp.main.bitcoinGeneration).times(diff))

    if (player.main.hardforkxp.gte(tmp.main.hardforkXPlevelCalc)) {
      player.main.hardforklvl = player.main.hardforklvl.add(1)
      player.main.hardforkxp = new Decimal(0)
    }

    if (tmp.main.clickables.T1AT1.canRun) buyBuyable(this.layer, "Stellar Point Production")
    if (tmp.main.clickables.T1AT1.canRun) buyBuyable(this.layer, "Stellar Production")
    if (tmp.main.clickables.T1AT1.canRun) buyBuyable(this.layer, "Cheaper Stellar")
    if (tmp.main.clickables.T1AT1.canRun) buyBuyable(this.layer, "Cheaper Stellar Tier")
    if (tmp.main.clickables.T1AT1.canRun) buyBuyable(this.layer, "Stellar Accelerant Bonus")

    if (tmp.main.clickables.T1AT2.canRun) buyBuyable(this.layer, "Ethereum Point Production")
    if (tmp.main.clickables.T1AT2.canRun) buyBuyable(this.layer, "Ethereum Stellar Mag Increaser")
    if (tmp.main.clickables.T1AT2.canRun) buyBuyable(this.layer, "Ethereum Stellar Mag Booster")
    if (tmp.main.clickables.T1AT2.canRun) buyBuyable(this.layer, "Ethereum Booster")
    if (tmp.main.clickables.T1AT2.canRun) buyBuyable(this.layer, "Ethereum Cheaper Factory")


    if (tmp.main.clickables.T2AT1.canRun) clickClickable(this.layer, "Tier Up")
    if (tmp.main.clickables.T2AT2.canRun) clickClickable(this.layer, "Facotry Reset")

    const activeChallenge = player[this.layer].activeChallenge;
    if (activeChallenge && canCompleteChallenge(this.layer, activeChallenge)) {
      startChallenge(this.layer, activeChallenge);
      if (!maxedChallenge(this.layer, activeChallenge)) {
        startChallenge(this.layer, activeChallenge);
      }
    }

    if (player.main.tier.gte(5)) {
      player.main.eth = player.main.eth.add((tmp.main.ethGainCalc).times(diff))
    }

    if (player.main.factories.gte(1)) {
      player.main.oreos = player.main.oreos.add((tmp.main.oreoGainCalc).times(diff))
    }

    if (hasMilestone("main", "TM15")) {
      player.main.cash = player.main.cash.add((tmp.main.CashCalculation).times(diff))
    }

    if (player.main.tier.gte(9)) {
      player.main.unit = player.main.unit.times(tmp.main.AccelerantSpeed.pow(diff))

      if (player.main.unit.gte(tmp.main.AccelerantLimit)) {
        return player.main.unit = tmp.main.AccelerantLimit
      }
    }





  },
  challenges: {
    "Looming": {
      display() {
        var AC = tmp[this.layer].challenges[this.id]
        var bonusComp = buyableEffect("main", "Oreo Looming Offsetter")
        return `
            <b style="font-size:22px; text-shadow: 0px 0px 20px #ffffff">- ★ -</b>
            <br>
            <b style="font-size:45px; text-shadow: 0px 0px 10px #000000">Looming</b><br>
            <br> <br>
            <b style="font-size:17px; text-shadow: 0px 0px 10px #000000">Produce <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">^${format(AC.debuff)} Stellar</b> when in this challenge<br>
            <br>
            You need <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">${format(AC.goal)} Stellar</b> to finish this challenge once<br>
            ${format(challengeCompletions(this.layer, this.id))} + ${format(bonusComp)} / ${format(this.completionLimit)} completions<br>
            Boost from completations: <b style="font-size:20px; text-shadow: 0px 0px 10px #ffffff">${format(AC.effect)}x Stellar</b>
            <br> <br>
            Entering this challenge will perform Tier like reset!</b>`
      },
      completionLimit: new Decimal(1e12),
      goal() {
        let x = new Decimal(challengeCompletions(this.layer, this.id))

        let PowerI = new Decimal(10000)
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

        let PowerI = new Decimal(10000)
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

        x = x.add(buyableEffect("main", "Oreo Looming Offsetter"))

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
        let Base = new Decimal(0.05)
        let CC = new Decimal(challengeCompletions(this.layer, this.id))

        CC = CC.div(150).add(1)

        Base = Base.div(CC)
        return Base
      },
      unlocked() { return true },
      onEnter() {
        tmp.main.type1reset()
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
  },

  clickables: {
    "Tier Up": {
      title() {
        let state = player.main.tier
        return `<b style="font-size:35px">Tier Up #${state}</b><br>
        Reset EVERYTHING in exchange for a Tier for further progress<br>
        Need ${format(tmp.main.tierCostCalc)} Points to Tier Up`
      },
      canClick() {
        return player.points.gte(tmp.main.tierCostCalc)
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
          "color": "#000000"
        }
        return {
          "background-image": "url('images/TIERCT.png')",
          "background-size": "cover",
          "box-shadow": "0px 0px 15px rgba(171, 50, 58, 1)",
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
    "Factory Reset": {
      title() {
        let state = player.main.factories
        return `<b style="font-size:35px">Factory Investment #${state}</b><br>
        Reset EVERYTHING before, including Tiers in exchange for Factories that will help you progress further<br>
        Need to be at Tier ${format(tmp.main.factoryInvestmentCostCalc)} to Invest for Factories`
      },
      canClick() {
        return player.main.tier.gte(tmp.main.factoryInvestmentCostCalc)
      },
      onClick() {
        tmp.main.factoryInvestment()
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/FACTORYC.gif')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "animation": "pulseP 2s infinite",
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
          "box-shadow": "0px 0px 15px rgba(171, 50, 58, 1)",
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
        return hasMilestone("main", "TM8")
      }
    },
    "Hardfork": {
      title() {
        let state = player.main.hardfork
        return `<b style="font-size:35px">Hardfork #${state}</b><br>
        Reset EVERYTHING before, including Tiers , Factories in exchange for Hardfork that will help you progress beyond further than previous layers did<br>
        You need ${format(tmp.main.hardforkCostCalc)} Points to Hardfork`
      },
      canClick() {
        return player.points.gte(tmp.main.hardforkCostCalc)
      },
      onClick() {
        tmp.main.hardfork()
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/HardforkC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "animation": "pulseP 2s infinite",
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
          "background-image": "url('images/HardforkCT.png')",
          "background-size": "cover",
          "box-shadow": "0px 0px 15px rgba(171, 50, 58, 1)",
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
        "FBTC": {
         title() {
          return `<b style="font-size:35px">Fix Bitcoin</b><br>
            If Bitcoin went negative or NaN<br>`
         },
         canClick() {
          return true
         },
         onClick() {
          tmp.main.fixBitcoin()
         },
         style() {
          if (tmp[this.layer].clickables[this.id].canClick) return {
           "background-image": "url('images/HardforkC.png')",
           "background-size": "cover",
           "background-color": "#ffffff",
           "animation": "pulseP 2s infinite",
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
           "background-image": "url('images/HardforkCT.png')",
           "background-size": "cover",
           "box-shadow": "0px 0px 15px rgba(171, 50, 58, 1)",
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


    "HardReset": {
      title() {
        return `<b style="font-size:35px; text-shadow: 0px 0px 10px #000000">-- HARD RESET --</b><br>
        Resets anything Funny Dong Zone related!!!`
      },
      canClick() {
        return true
      },
      onClick() {
        tmp.main.HardReset()
      },
      style() {
        return {
          "background-image": "url('images/Reset.png')",
          "background-size": "cover",
          "box-shadow": "0px 0px 15px rgba(171, 50, 58, 1)",
          "width": "auto",
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
    "Buy Multiplier": {
      title() {
        return `<b style="font-size:35px; text-shadow: 0px 0px 10px #000000">Buy Multiplier - ${format(player.main.multiplierP)}×</b><br>
        
          <b style="font-size:25px; text-shadow: 0px 0px 20px #000000">${format(tmp.main.MultiplierCostCalc)} Cash = ${format(tmp.main.MultiplierAmountCalc)} Multiplier</b><br>
         Click on arrows to increase/decrease bulk buy!`
      },
      canClick() {
        return player.main.cash.gte(tmp.main.MultiplierCostCalc)
      },
      onClick() {
        tmp.main.MultiplierReset()
        player.main.multiplier = player.main.multiplier.add(tmp.main.MultiplierAmountCalc)
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/MultiplierC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "auto",
          "height": "130px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/MultiplierCT.png')",
          "background-size": "cover",
          "box-shadow": "0px 0px 15px rgba(171, 50, 58, 1)",
          "width": "auto",
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
    
    "Buy Multiplier MAG+": {
      title() {
        var AC = tmp[this.layer].clickables[this.id]
        return `Increase Bulk Buy +${AC.magnitudeAmount}x`
      },
      canClick() {
        return true
      },
      onClick() {
        var AC = tmp[this.layer].clickables[this.id]
        player.main.multiplierP = player.main.multiplierP.add(AC.magnitudeAmount)
      },
      magnitudeAmount() {
        let Base = new Decimal(1)
        return Base
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/MultiplierC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "auto",
          "height": "40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/MultiplierCT.png')",
          "background-size": "cover",
          "box-shadow": "0px 0px 15px rgba(171, 50, 58, 1)",
          "width": "auto",
          "height": " 40px !important",
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
    "Buy Multiplier MAG-": {
      title() {
        var AC = tmp[this.layer].clickables[this.id]
        return `Decrease Bulk Buy -${AC.magnitudeAmount}x`
      },
      canClick() {
        return player.main.multiplierP.gte(1)
      },
      onClick() {
        var AC = tmp[this.layer].clickables[this.id]
        player.main.multiplierP = player.main.multiplierP.sub(AC.magnitudeAmount)
      },
      magnitudeAmount() {
        let Base = new Decimal(1)
        return Base
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/MultiplierC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "auto",
          "height": "40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/MultiplierCT.png')",
          "background-size": "cover",
          "box-shadow": "0px 0px 15px rgba(171, 50, 58, 1)",
          "width": "auto",
          "height": " 40px !important",
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



    "Buy Rebirth": {
      title() {
        return `<b style="font-size:35px; text-shadow: 0px 0px 10px #000000">Buy Rebirth - ${format(player.main.rebirthP)}×</b><br>
        
          <b style="font-size:25px; text-shadow: 0px 0px 20px #000000">${format(tmp.main.RebirthCostCalc)} Multiplier = ${format(tmp.main.RebirthAmountCalc)} Rebirth</b><br>
         Click on arrows to increase/decrease bulk buy!<br>
         Note that buying Rebirth resets Multiplier and Cash`
      },
      canClick() {
        return player.main.multiplier.gte(tmp.main.RebirthCostCalc)
      },
      onClick() {
        tmp.main.RebirthReset()
        player.main.rebirth = player.main.rebirth.add(tmp.main.RebirthAmountCalc)
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/RebirthC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "auto",
          "height": "130px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/MultiplierCT.png')",
          "background-size": "cover",
          "box-shadow": "0px 0px 15px rgba(171, 50, 58, 1)",
          "width": "auto",
          "height": " 130px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
        }
      },
      unlocked() {
        return tmp.main.OrderIndex.gte(0) || player.main.multiplier.gte(500)
      }
    },
    "Buy Rebirth+1": {
      title() {
        return `+1x`
      },
      canClick() {
        return player.main.rebirthP.gte(0)
      },
      onClick() {
        player.main.rebirthP = player.main.rebirthP.add(1)
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/RebirthC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "50px",
          "height": "40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/MultiplierCT.png')",
          "background-size": "cover",
          "box-shadow": "0px 0px 15px rgba(171, 50, 58, 1)",
          "width": "50px",
          "height": " 40px !important",
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
    "Buy Rebirth+10": {
      title() {
        return `+10x`
      },
      canClick() {
        return player.main.rebirthP.gte(0)
      },
      onClick() {
        player.main.rebirthP = player.main.rebirthP.add(10)
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/RebirthC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "50px",
          "height": "40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/MultiplierCT.png')",
          "background-size": "cover",
          "box-shadow": "0px 0px 15px rgba(171, 50, 58, 1)",
          "width": "50px",
          "height": " 40px !important",
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
    "Buy Rebirth+100": {
      title() {
        return `+100x`
      },
      canClick() {
        return player.main.rebirthP.gte(0)
      },
      onClick() {
        player.main.rebirthP = player.main.rebirthP.add(100)
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/RebirthC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "50px",
          "height": "40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/MultiplierCT.png')",
          "background-size": "cover",
          "box-shadow": "0px 0px 15px rgba(171, 50, 58, 1)",
          "width": "50px",
          "height": " 40px !important",
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
    "Buy Rebirth+1000": {
      title() {
        return `+1Kx`
      },
      canClick() {
        return player.main.rebirthP.gte(0)
      },
      onClick() {
        player.main.rebirthP = player.main.rebirthP.add(1000)
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/RebirthC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "50px",
          "height": "40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/MultiplierCT.png')",
          "background-size": "cover",
          "box-shadow": "0px 0px 15px rgba(171, 50, 58, 1)",
          "width": "50px",
          "height": " 40px !important",
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
    "Buy Rebirth-1": {
      title() {
        return `-1x`
      },
      canClick() {
        return player.main.rebirthP.gte(1)
      },
      onClick() {
        player.main.rebirthP = player.main.rebirthP.sub(1)
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/RebirthC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "50px",
          "height": "40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/MultiplierCT.png')",
          "background-size": "cover",
          "width": "50px",
          "height": " 40px !important",
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
    "Buy Rebirth-10": {
      title() {
        return `-10x`
      },
      canClick() {
        return player.main.rebirthP.gte(10)
      },
      onClick() {
        player.main.rebirthP = player.main.rebirthP.sub(10)
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/RebirthC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "50px",
          "height": "40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/MultiplierCT.png')",
          "background-size": "cover",
          "width": "50px",
          "height": " 40px !important",
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
    "Buy Rebirth-100": {
      title() {
        return `-100x`
      },
      canClick() {
        return player.main.rebirthP.gte(100)
      },
      onClick() {
        player.main.rebirthP = player.main.rebirthP.sub(100)
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/RebirthC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "50px",
          "height": "40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/MultiplierCT.png')",
          "background-size": "cover",
          "width": "50px",
          "height": " 40px !important",
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
    "Buy Rebirth-1000": {
      title() {
        return `-1Kx`
      },
      canClick() {
        return player.main.rebirthP.gte(1000)
      },
      onClick() {
        player.main.rebirthP = player.main.rebirthP.sub(1000)
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/RebirthC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "50px",
          "height": "40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/MultiplierCT.png')",
          "background-size": "cover",
          "width": "50px",
          "height": " 40px !important",
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

    "Buy Super Rebirth": {
      title() {
        return `<b style="font-size:35px; text-shadow: 0px 0px 10px #000000">Buy Super Rebirth - ${format(player.main.srebirthP)}×</b><br>
        
          <b style="font-size:25px; text-shadow: 0px 0px 20px #000000">${format(tmp.main.SRebirthCostCalc)} Rebirth = ${format(tmp.main.SRebirthAmountCalc)} Super Rebirth</b><br>
         Click on arrows to increase/decrease bulk buy!<br>
         Note that buying Super Rebirth resets Rebirth , Multiplier and Cash`
      },
      canClick() {
        return player.main.rebirth.gte(tmp.main.SRebirthCostCalc)
      },
      onClick() {
        tmp.main.SRebirthReset()
        player.main.srebirth = player.main.srebirth.add(tmp.main.SRebirthAmountCalc)
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/SRebirthC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "auto",
          "height": "130px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/MultiplierCT.png')",
          "background-size": "cover",
          "box-shadow": "0px 0px 15px rgba(171, 50, 58, 1)",
          "width": "auto",
          "height": "130px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
        }
      },
      unlocked() {
        return tmp.main.OrderIndex.gte(1) || player.main.rebirth.gte(50000)
      }
    },
    "Buy SRebirth+1": {
      title() {
        return `+1x`
      },
      canClick() {
        return player.main.srebirthP.gte(0)
      },
      onClick() {
        player.main.srebirthP = player.main.srebirthP.add(1)
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/SRebirthC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "50px",
          "height": "40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/MultiplierCT.png')",
          "background-size": "cover",
          "box-shadow": "0px 0px 15px rgba(171, 50, 58, 1)",
          "width": "50px",
          "height": " 40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
        }
      },
      unlocked() {
        return tmp.main.OrderIndex.gte(1)
      }
    },
    "Buy SRebirth+10": {
      title() {
        return `+10x`
      },
      canClick() {
        return player.main.srebirthP.gte(0)
      },
      onClick() {
        player.main.srebirthP = player.main.srebirthP.add(10)
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/SRebirthC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "50px",
          "height": "40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/MultiplierCT.png')",
          "background-size": "cover",
          "box-shadow": "0px 0px 15px rgba(171, 50, 58, 1)",
          "width": "50px",
          "height": " 40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
        }
      },
      unlocked() {
        return tmp.main.OrderIndex.gte(1)
      }
    },
    "Buy SRebirth+100": {
      title() {
        return `+100x`
      },
      canClick() {
        return player.main.srebirthP.gte(0)
      },
      onClick() {
        player.main.srebirthP = player.main.srebirthP.add(100)
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/SRebirthC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "50px",
          "height": "40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/MultiplierCT.png')",
          "background-size": "cover",
          "box-shadow": "0px 0px 15px rgba(171, 50, 58, 1)",
          "width": "50px",
          "height": " 40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
        }
      },
      unlocked() {
        return tmp.main.OrderIndex.gte(1)
      }
    },
    "Buy SRebirth+1000": {
      title() {
        return `+1Kx`
      },
      canClick() {
        return player.main.srebirthP.gte(0)
      },
      onClick() {
        player.main.srebirthP = player.main.srebirthP.add(1000)
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/SRebirthC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "50px",
          "height": "40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/MultiplierCT.png')",
          "background-size": "cover",
          "box-shadow": "0px 0px 15px rgba(171, 50, 58, 1)",
          "width": "50px",
          "height": " 40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
        }
      },
      unlocked() {
        return tmp.main.OrderIndex.gte(1)
      }
    },
    "Buy SRebirth-1": {
      title() {
        return `-1x`
      },
      canClick() {
        return player.main.srebirthP.gte(1)
      },
      onClick() {
        player.main.srebirthP = player.main.srebirthP.sub(1)
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/SRebirthC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "50px",
          "height": "40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/MultiplierCT.png')",
          "background-size": "cover",
          "box-shadow": "0px 0px 15px rgba(171, 50, 58, 1)",
          "width": "50px",
          "height": " 40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
        }
      },
      unlocked() {
        return tmp.main.OrderIndex.gte(1)
      }
    },
    "Buy SRebirth-10": {
      title() {
        return `-10x`
      },
      canClick() {
        return player.main.srebirthP.gte(10)
      },
      onClick() {
        player.main.srebirthP = player.main.srebirthP.sub(10)
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/SRebirthC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "50px",
          "height": "40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/MultiplierCT.png')",
          "background-size": "cover",
          "box-shadow": "0px 0px 15px rgba(171, 50, 58, 1)",
          "width": "50px",
          "height": " 40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
        }
      },
      unlocked() {
        return tmp.main.OrderIndex.gte(1)
      }
    },
    "Buy SRebirth-100": {
      title() {
        return `-100x`
      },
      canClick() {
        return player.main.srebirthP.gte(100)
      },
      onClick() {
        player.main.srebirthP = player.main.srebirthP.sub(100)
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/SRebirthC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "50px",
          "height": "40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/MultiplierCT.png')",
          "background-size": "cover",
          "box-shadow": "0px 0px 15px rgba(171, 50, 58, 1)",
          "width": "50px",
          "height": " 40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
        }
      },
      unlocked() {
        return tmp.main.OrderIndex.gte(1)
      }
    },
    "Buy SRebirth-1000": {
      title() {
        return `-1Kx`
      },
      canClick() {
        return player.main.srebirthP.gte(1000)
      },
      onClick() {
        player.main.srebirthP = player.main.srebirthP.sub(1000)
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/SRebirthC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "50px",
          "height": "40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/MultiplierCT.png')",
          "background-size": "cover",
          "box-shadow": "0px 0px 15px rgba(171, 50, 58, 1)",
          "width": "50px",
          "height": " 40px !important",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
        }
      },
      unlocked() {
        return tmp.main.OrderIndex.gte(1)
      }
    },


    "Buy Ultra Rebirth": {
      title() {
        return `<b style="font-size:35px; text-shadow: 0px 0px 10px #000000">Buy Ultra Rebirth - ${format(player.main.urebirthP)}×</b><br>
        
          <b style="font-size:25px; text-shadow: 0px 0px 20px #000000">${format(tmp.main.URebirthCostCalc)} Super Rebirth = ${format(tmp.main.URebirthAmountCalc)} Ultra Rebirth</b><br>
         Click on arrows to increase/decrease bulk buy!<br>
         Note that buying Ultra Rebirth resets Super Rebirth , Rebirth , Multiplier and Cash`
      },
      canClick() {
        return player.main.srebirth.gte(tmp.main.URebirthCostCalc)
      },
      onClick() {
        tmp.main.URebirthReset()
        player.main.urebirth = player.main.urebirth.add(tmp.main.URebirthAmountCalc)
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick) return {
          "background-image": "url('images/URebirthC.png')",
          "background-size": "cover",
          "background-color": "#ffffff",
          "box-shadow": "0 0 0 0 rgba(255, 255, 255, 1)",
          "width": "auto",
          "height": "130px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 15px #000000",
          "color": "#ffffff"
        }
        return {
          "background-image": "url('images/MultiplierCT.png')",
          "background-size": "cover",
          "box-shadow": "0px 0px 15px rgba(171, 50, 58, 1)",
          "width": "auto",
          "height": "130px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
        }
      },
      unlocked() {
        return tmp.main.OrderIndex.gte(2) || player.main.srebirth.gte(5e15)
      }
    },





    T1AT1: {
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
        return hasMilestone("main", "TM5")
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canRun) return {
          "background-image": "url('images/STAT_ON.png')",
          "color": "white",
          "border": "0px",
          "border-radius": "5px",
          "width": "300px",
          "height": "auto",
          "margin": "4px"
        }
        return {
          "background-image": "url('images/STAT_OFF.png')",
          "color": "white",
          "border": "0px",
          "border-radius": "5px",
          "width": "300px",
          "height": "auto",
          "margin": "4px"
        }
      },
    },
    T1AT2: {
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
          "height": "auto",
          "margin": "4px"
        }
        return {
          "background-image": "url('images/STAT_OFF.png')",
          "color": "white",
          "border": "0px",
          "border-radius": "5px",
          "width": "300px",
          "height": "auto",
          "margin": "4px"
        }
      },
    },
    T2AT1: {
      set: "auto",
      title() {
        return `<b style="font-size:25px">Tier Up Automator</b><br>
        T${format(player.main.tier)}<br><br>
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
        return true
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
    T2AT2: {
      set: "auto",
      title() {
        return `<b style="font-size:25px">Factory Investment Automator</b><br>
        F${format(player.main.factories)}<br><br>
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
        return true
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canRun) return {
          "background-image": "url('images/STAT_ON.png')",
          "color": "white",
          "border": "0px",
          "border-radius": "5px",
          "width": "300px",
          "height": "auto",
          "margin": "4px"
        }
        return {
          "background-image": "url('images/STAT_OFF.png')",
          "color": "white",
          "border": "0px",
          "border-radius": "5px",
          "width": "300px",
          "height": "auto",
          "margin": "4px"
        }
      },
    },

  },
  buyables: {
    "Stellar Point Production": {
      cost(x) {
        let PowerI = new Decimal(1.7)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Stellar"))
        Calculation = Calculation.div(buyableEffect("main", "Oreo Cheaper"))
        Calculation = Calculation.div(buyableEffect("main", "Bitcoin Cheaper Stellar"))
        return Calculation;
      },
      display() {
        return `${HEADERs}Neural Network v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">x${format(tmp[this.layer].buyables[this.id].effect)} Point Generation</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
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
        let PowerI = new Decimal(1.4475)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM1");
      }
    },
    "Stellar Production": {
      cost(x) {
        let PowerI = new Decimal(1.725)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Stellar"))
        Calculation = Calculation.div(buyableEffect("main", "Oreo Cheaper"))
        Calculation = Calculation.div(buyableEffect("main", "Bitcoin Cheaper Stellar"))
        return Calculation;
      },
      display() {
        return `<b style="font-size:28px; text-shadow: 0px 0px 4px #000000">More Layers v${format(player[this.layer].buyables[this.id], 0)}</b>
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">x${format(tmp[this.layer].buyables[this.id].effect)} Stellar Production</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
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
        let PowerI = new Decimal(1.725)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM2");
      }
    },
    "Cheaper Stellar": {
      cost(x) {
        let PowerI = new Decimal(250)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(1000).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Stellar"))
        Calculation = Calculation.div(buyableEffect("main", "Oreo Cheaper"))
        Calculation = Calculation.div(buyableEffect("main", "Bitcoin Cheaper Stellar"))
        return Calculation;
      },
      display() {
        return `${HEADERs}Cheaper Components v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">/${format(tmp[this.layer].buyables[this.id].effect)} Stellar Buyable</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
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
        let PowerI = new Decimal(5)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM3");
      }
    },
    "Cheaper Stellar Tier": {
      cost(x) {
        let PowerI = new Decimal(2000)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(1e63).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Stellar"))
        Calculation = Calculation.div(buyableEffect("main", "Oreo Cheaper"))
        Calculation = Calculation.div(buyableEffect("main", "Bitcoin Cheaper Stellar"))
        return Calculation;
      },
      display() {
        return `${HEADERs} Influence v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">/${format(tmp[this.layer].buyables[this.id].effect)} Tier Cost</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
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
        let PowerI = new Decimal(4)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM7");
      }
    },
    "Stellar Accelerant Bonus": {
      cost(x) {
        let PowerI = new Decimal(1e10)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal("1e333").mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Cheaper Stellar"))
        Calculation = Calculation.div(buyableEffect("main", "Oreo Cheaper"))
        Calculation = Calculation.div(buyableEffect("main", "Bitcoin Cheaper Stellar"))
        return Calculation;
      },
      display() {
        return `${HEADERs} Better Computing v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">+${format(tmp[this.layer].buyables[this.id].effect)} Accelerant Falloff</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
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
        let PowerI = new Decimal(0.02)

        PowerI = PowerI.mul(x)

        let Effect = new Decimal(0).add(Decimal.add(PowerI))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM10");
      }
    },

    "Ethereum Point Production": {
      cost(x) {
        let PowerI = new Decimal(3.5)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(10).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Oreo Cheaper"))
        Calculation = Calculation.div(buyableEffect("main", "Bitcoin Cheaper Ethereum"))
        return Calculation;
      },
      display() {
        return `${HEADERs}Mainframe-CFAH 33 v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">x${format(tmp[this.layer].buyables[this.id].effect)} Point Generation</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
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
        let PowerI = new Decimal(2.8)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM1");
      }
    },
    "Ethereum Stellar Mag Increaser": {
      cost(x) {
        let PowerI = new Decimal(8)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(1000).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Oreo Cheaper"))
        Calculation = Calculation.div(buyableEffect("main", "Bitcoin Cheaper Ethereum"))
        return Calculation;
      },
      display() {
        return `${HEADERs}Defragmentation v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">+${format(tmp[this.layer].buyables[this.id].effect)} Stellar Magnitude Increase</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
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
        let PowerI = new Decimal(7.5)

        PowerI = PowerI.mul(x)

        let Effect = new Decimal(0).add(Decimal.add(PowerI))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM5");
      }
    },
    "Ethereum Stellar Mag Booster": {
      cost(x) {
        let PowerI = new Decimal(12)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(100000).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Oreo Cheaper"))
        Calculation = Calculation.div(buyableEffect("main", "Bitcoin Cheaper Ethereum"))
        return Calculation;
      },
      display() {
        return `${HEADERs}Mainframe Compiling v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">+${format(tmp[this.layer].buyables[this.id].effect)} Stellar Magnitude Boost</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
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
        let PowerI = new Decimal(0.25)

        PowerI = PowerI.mul(x)

        let Effect = new Decimal(0).add(Decimal.add(PowerI))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM6");
      }
    },
    "Ethereum Booster": {
      cost(x) {
        let PowerI = new Decimal(24)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(1e12).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Oreo Cheaper"))
        Calculation = Calculation.div(buyableEffect("main", "Bitcoin Cheaper Ethereum"))
        return Calculation;
      },
      display() {
        return `${HEADERs}Booster Mark I v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">x${format(tmp[this.layer].buyables[this.id].effect)} Stellar & Ethereum Boost</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
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
        let PowerI = new Decimal(2.5)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM7");
      }
    },
    "Ethereum Cheaper Factory": {
      cost(x) {
        let PowerI = new Decimal(1e15)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(1e100).mul(Decimal.pow(PowerI, x.pow(1)))
        Calculation = Calculation.div(buyableEffect("main", "Oreo Cheaper"))
        Calculation = Calculation.div(buyableEffect("main", "Bitcoin Cheaper Ethereum"))
        return Calculation;
      },
      display() {
        return `${HEADERs}Investors v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">-${format(tmp[this.layer].buyables[this.id].effect)} Factory Investment Requirement</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
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
        let PowerI = new Decimal(0.5)

        PowerI = PowerI.mul(x)

        let Effect = new Decimal(0).add(Decimal.add(PowerI))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM10");
      }
    },

    "Oreo Point Production": {
      cost(x) {
        let PowerI = new Decimal(1.5)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(10).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}C-Neural Network v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">x${format(tmp[this.layer].buyables[this.id].effect)} Point Generation</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Oreos</h1>`
      },
      canAfford() {
        return player[this.layer].oreos.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/OreoC.png')",
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
          "background-image": "url('images/OreoCT.png')",
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
        player[this.layer].oreos = player[this.layer].oreos.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let PowerI = new Decimal(5.66)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true
      }
    },
    "Oreo Stellar Production": {
      cost(x) {
        let PowerI = new Decimal(1.5)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(10).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}More Computers v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">x${format(tmp[this.layer].buyables[this.id].effect)} Stellar Production</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Oreos</h1>`
      },
      canAfford() {
        return player[this.layer].oreos.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/OreoC.png')",
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
          "background-image": "url('images/OreoCT.png')",
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
        player[this.layer].oreos = player[this.layer].oreos.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let PowerI = new Decimal(10)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true
      }
    },
    "Oreo Cheaper": {
      cost(x) {
        let PowerI = new Decimal(3)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(1000).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Mass Part Manufacturing v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">/${format(tmp[this.layer].buyables[this.id].effect)} Ethereum & Stellar Buyables</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Oreos</h1>`
      },
      canAfford() {
        return player[this.layer].oreos.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/OreoC.png')",
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
          "background-image": "url('images/OreoCT.png')",
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
        player[this.layer].oreos = player[this.layer].oreos.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let PowerI = new Decimal(1000)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true
      }
    },
    "Cheaper Oreo Tier": {
      cost(x) {
        let PowerI = new Decimal(5)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(10000).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Advertising v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">/${format(tmp[this.layer].buyables[this.id].effect)} Tier Cost</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Oreos</h1>`
      },
      canAfford() {
        return player[this.layer].oreos.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/OreoC.png')",
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
          "background-image": "url('images/OreoCT.png')",
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
        player[this.layer].oreos = player[this.layer].oreos.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let PowerI = new Decimal(1000)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true
      }
    },
    "Oreo Looming Offsetter": {
      cost(x) {
        let PowerI = new Decimal(50)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(1e5).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Special Upgrade-I v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">+${format(tmp[this.layer].buyables[this.id].effect)} Looming Completions</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Oreos</h1>`
      },
      canAfford() {
        return player[this.layer].oreos.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/OreoC.png')",
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
          "background-image": "url('images/OreoCT.png')",
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
        player[this.layer].oreos = player[this.layer].oreos.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let PowerI = new Decimal(1)

        PowerI = PowerI.mul(x)

        let Effect = new Decimal(0).add(Decimal.add(PowerI))
        return Effect;
      },
      unlocked() {
        return true
      }
    },
    "Oreo Bonus Booster": {
      cost(x) {
        let PowerI = new Decimal(2)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(1e6).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Special Upgrade-II v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">^${format(tmp[this.layer].buyables[this.id].effect)} Oreo Bonuses</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Oreos</h1>`
      },
      canAfford() {
        return player[this.layer].oreos.gte(this.cost())
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "background-image": "url('images/OreoC.png')",
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
          "background-image": "url('images/OreoCT.png')",
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
        player[this.layer].oreos = player[this.layer].oreos.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let PowerI = new Decimal(1.1)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.sqrt(PowerII)
        PowerI = PowerI.sqrt(PowerIII)
        PowerI = PowerI.sqrt(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true
      }
    },


    "Bitcoin Point Production": {
      cost(x) {
        let PowerI = new Decimal(2)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(10).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Consise Thinking v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">x${format(tmp[this.layer].buyables[this.id].effect)} Point Generation</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
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
        let PowerI = new Decimal(1e4)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true
      }
    },
    "Bitcoin Accelerant Limit": {
      cost(x) {
        let PowerI = new Decimal(2.5)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(50).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}SSD Drive Capacity v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">^${format(tmp[this.layer].buyables[this.id].effect)} Accelerant Limit</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
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
        let PowerI = new Decimal(1.025)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true
      }
    },
    "Bitcoin Accelerant Speed": {
      cost(x) {
        let PowerI = new Decimal(3)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(100).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Clocking Speed v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
            <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">x${format(tmp[this.layer].buyables[this.id].effect)} Accelerant Speed</b><br>
        <h1>${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
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
        let PowerI = new Decimal(1.044)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true
      }
    },
    "Bitcoin Accelerant Bonus": {
      cost(x) {
        let PowerI = new Decimal(3.5)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(250).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Precise Computing v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
            <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">+${format(tmp[this.layer].buyables[this.id].effect)} Accelerant Falloff</b><br>
        <h1>${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
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
        let PowerI = new Decimal(0.05)

        PowerI = PowerI.mul(x)

        let Effect = new Decimal(0).add(Decimal.add(PowerI))
        return Effect;
      },
      unlocked() {
        return true
      }
    },

    "Bitcoin Stellar Production": {
      cost(x) {
        let PowerI = new Decimal(2)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(10).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Nano-Processing v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">x${format(tmp[this.layer].buyables[this.id].effect)} Stellar Production</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
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
        let PowerI = new Decimal(1e5)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true
      }
    },
    "Bitcoin Stellar Mag Booster": {
      cost(x) {
        let PowerI = new Decimal(3)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(175).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Smarter Artificial Intelligence v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">+${format(tmp[this.layer].buyables[this.id].effect)} Stellar  Magnitude Boost</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
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
        let PowerI = new Decimal(2.025)

        PowerI = PowerI.mul(x)

        let Effect = new Decimal(0).add(Decimal.add(PowerI))
        return Effect;
      },
      unlocked() {
        return true
      }
    },
    "Bitcoin Cheaper Stellar": {
      cost(x) {
        let PowerI = new Decimal(4)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(675).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Part Duplication v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">/${format(tmp[this.layer].buyables[this.id].effect)} Stellar Buyables</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
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
        let PowerI = new Decimal(1e6)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true
      }
    },

    "Bitcoin Ethereum Production": {
      cost(x) {
        let PowerI = new Decimal(4)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(1e15).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Mainframe CELK-ES v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">x${format(tmp[this.layer].buyables[this.id].effect)} Ethereum Manufacturing</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
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
        let PowerI = new Decimal(1e5)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM12")
      }
    },
    "Bitcoin Ethereum Stabilizer Booster": {
      cost(x) {
        let PowerI = new Decimal(16)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(1e18).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Stable Cable v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">+${format(tmp[this.layer].buyables[this.id].effect)} Ethereum Stabilizer Boost</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
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
        let PowerI = new Decimal(0.15)

        PowerI = PowerI.mul(x)

        let Effect = new Decimal(0).add(Decimal.add(PowerI))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM12")
      }
    },
    "Bitcoin Cheaper Ethereum": {
      cost(x) {
        let PowerI = new Decimal(64)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(1e21).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Higher Stocks v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">/${format(tmp[this.layer].buyables[this.id].effect)} Ethereum Buyables</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
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
        let PowerI = new Decimal(1e6)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM12")
      }
    },

    "Bitcoin Cheaper Tier": {
      cost(x) {
        let PowerI = new Decimal(256)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(1e27).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Code Manipulation v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">/${format(tmp[this.layer].buyables[this.id].effect)} Tier Cost</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
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
        let PowerI = new Decimal(1e11)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM13")
      }
    },
    "Bitcoin Cheaper Factory": {
      cost(x) {
        let PowerI = new Decimal(1024)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(1e33).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Build Funding v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">-${format(tmp[this.layer].buyables[this.id].effect)} Facotry Investment Cost</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
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
        let PowerI = new Decimal(1)

        PowerI = PowerI.mul(x)

        let Effect = new Decimal(0).add(Decimal.add(PowerI))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM13")
      }
    },
    "Bitcoin XP Generation": {
      cost(x) {
        let PowerI = new Decimal(5555)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(1e33).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Hardforking Channels v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">+${format(tmp[this.layer].buyables[this.id].effect)} Hardfork XP Base Generation</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
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
        let PowerI = new Decimal(0.05)

        PowerI = PowerI.mul(x)

        let Effect = new Decimal(0).add(Decimal.add(PowerI))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM13")
      }
    },
    "Bitcoin Accelerant Limit Limit": {
      cost(x) {
        let PowerI = new Decimal(20480)
        let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
        let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 150).add(1))
        let PowerIV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 225).add(1))
        let PowerV = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 337).add(1))
        let PowerVI = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 505).add(1))
        let PowerVII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 757).add(1))

        PowerI = PowerI.pow(PowerII)
        PowerI = PowerI.pow(PowerIII)
        PowerI = PowerI.pow(PowerIV)
        PowerI = PowerI.pow(PowerV)
        PowerI = PowerI.pow(PowerVI)
        PowerI = PowerI.pow(PowerVII)
        let Calculation = new Decimal(1e36).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `${HEADERs}Overflow Limiter v${format(player[this.layer].buyables[this.id], 0)}${HEADERe}
        <b style="font-size:18px; text-shadow: 0px 0px 4px #000000">^${format(tmp[this.layer].buyables[this.id].effect)} Accelerant Limit Hardcap</b><br>
    <h1>${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
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
        let PowerI = new Decimal(0.1)

        PowerI = PowerI.mul(x)

        let Effect = new Decimal(1).add(Decimal.add(PowerI))
        return Effect;
      },
      unlocked() {
        return hasMilestone("main", "TM13")
      }
    },

  },

  milestones: {
    "TM1": {
      requirementDescription() {
        let STATE = []
        if (hasMilestone(this.layer, this.id)) STATE.push('<img src="images/Checkmark_White.png" width="32" height="32">')
        return `<b style="font-size:32px; text-shadow: 0px 0px 10px #000000">TIER 1 ${STATE}</b>`
      },
      done() { return player.main.tier.gte(1) },
      effectDescription: `<b style="font-size:22px">
      + Unlock Stellar`,
      style() {
        return {
          "background-image": "url('images/MasteryI.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
        }
      }
    },
    "TM2": {
      requirementDescription() {
        let STATE = []
        if (hasMilestone(this.layer, this.id)) STATE.push('<img src="images/Checkmark_White.png" width="32" height="32">')
        return `<b style="font-size:32px; text-shadow: 0px 0px 10px #000000">TIER 2 ${STATE}</b>`
      },
      done() { return player.main.tier.gte(2) },
      effectDescription: `<b style="font-size:22px">
      + Unlock 2nd Stellar buyable`,
      style() {
        return {
          "background-image": "url('images/MasteryI.png')",
          "background-size": "50% !important",
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
        let STATE = []
        if (hasMilestone(this.layer, this.id)) STATE.push('<img src="images/Checkmark_White.png" width="32" height="32">')
        return `<b style="font-size:32px; text-shadow: 0px 0px 10px #000000">TIER 3 ${STATE}</b>`
      },
      done() { return player.main.tier.gte(3) },
      effectDescription: `<b style="font-size:22px">
      + Unlock 3rd Stellar buyable`,
      style() {
        return {
          "background-image": "url('images/MasteryI.png')",
          "background-size": "50% !important",
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
        let STATE = []
        if (hasMilestone(this.layer, this.id)) STATE.push('<img src="images/Checkmark_White.png" width="32" height="32">')
        return `<b style="font-size:32px; text-shadow: 0px 0px 10px #000000">TIER 5 ${STATE}</b>`
      },
      done() { return player.main.tier.gte(5) },
      effectDescription: `<b style="font-size:22px">
      + Unlock Ethereum`,
      style() {
        return {
          "background-image": "url('images/MasteryII.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#ffffff"
        }
      },
      unlocked() {
        return player.main.tier.gte(3)
      }
    },
    "TM5": {
      requirementDescription() {
        let STATE = []
        if (hasMilestone(this.layer, this.id)) STATE.push('<img src="images/Checkmark_White.png" width="32" height="32">')
        return `<b style="font-size:32px; text-shadow: 0px 0px 10px #000000">TIER 7 ${STATE}</b>`
      },
      done() { return player.main.tier.gte(7) },
      effectDescription: `<b style="font-size:22px">
      + Unlock 2nd Ethereum buyable<br>
      + Unlock Stellar Magnitude<br>
      + Unlock Stellar Automator`,
      style() {
        return {
          "background-image": "url('images/MasteryII.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#ffffff"
        }
      },
      unlocked() {
        return player.main.tier.gte(3)
      }
    },
    "TM6": {
      requirementDescription() {
        let STATE = []
        if (hasMilestone(this.layer, this.id)) STATE.push('<img src="images/Checkmark_White.png" width="32" height="32">')
        return `<b style="font-size:32px; text-shadow: 0px 0px 10px #000000">TIER 9 ${STATE}</b>`
      },
      done() { return player.main.tier.gte(9) },
      effectDescription: `<b style="font-size:22px">
      + Unlock 3rd Ethereum buyable<br>
      + 2x Stellar Magnitude limit<br>
      + Unlock Accelerant`,
      style() {
        return {
          "background-image": "url('images/MasteryII.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#ffffff"
        }
      },
      unlocked() {
        return player.main.tier.gte(3)
      }
    },
    "TM7": {
      requirementDescription() {
        let STATE = []
        if (hasMilestone(this.layer, this.id)) STATE.push('<img src="images/Checkmark_White.png" width="32" height="32">')
        return `<b style="font-size:32px; text-shadow: 0px 0px 10px #000000">TIER 13 ${STATE}</b>`
      },
      done() { return player.main.tier.gte(13) },
      effectDescription: `<b style="font-size:22px">
      + Unlock 4th Stellar buyable<br>
      + Unlock 4th Ethereum buyable<br>
      + Power Accelerant Limit by 2 and Acceleration by 2x`,
      style() {
        return {
          "background-image": "url('images/MasteryIII.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#ffffff"
        }
      },
      unlocked() {
        return player.main.tier.gte(9)
      }
    },
    "TM8": {
      requirementDescription() {
        let STATE = []
        if (hasMilestone(this.layer, this.id)) STATE.push('<img src="images/Checkmark_White.png" width="32" height="32">')
        return `<b style="font-size:32px; text-shadow: 0px 0px 10px #000000">TIER 17 ${STATE}</b>`
      },
      done() { return player.main.tier.gte(17) },
      effectDescription: `<b style="font-size:22px">
      + Unlock Factory Investment<br>
      + 1.5x base Stellar Magnitude Boost<br>
      + Power Accelerant Limit by 2 and Acceleration by 2x<br>
      + Unlock Ethereum Automator`,
      style() {
        return {
          "background-image": "url('images/MasteryIII.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#ffffff"
        }
      },
      unlocked() {
        return player.main.tier.gte(9)
      }
    },
    "TM9": {
      requirementDescription() {
        let STATE = []
        if (hasMilestone(this.layer, this.id)) STATE.push('<img src="images/Checkmark_White.png" width="32" height="32">')
        return `<b style="font-size:32px; text-shadow: 0px 0px 10px #000000">TIER 21 ${STATE}</b>`
      },
      done() { return player.main.tier.gte(21) },
      effectDescription: `<b style="font-size:22px">
                      + Unlock Ethereum Stabilizer<br>
                      + 1.5x base Stellar Magnitude Boost<br>
                      + Very minor change in Factory Investment cost`,
      style() {
        return {
          "background-image": "url('images/MasteryIII.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#ffffff"
        }
      },
      unlocked() {
        return player.main.tier.gte(9)
      }
    },
    "TM10": {
      requirementDescription() {
        let STATE = []
        if (hasMilestone(this.layer, this.id)) STATE.push('<img src="images/Checkmark_White.png" width="32" height="32">')
        return `<b style="font-size:32px; text-shadow: 0px 0px 10px #ffffff">TIER 29 ${STATE}</b>`
      },
      done() { return player.main.tier.gte(29) },
      effectDescription: `<b style="font-size:22px">
      + Unlock 5th Stellar buyable<br>
      + Unlock 5th Ethereum buyable<br>
      + Very minor change in Factory Investment cost<br>
      + Power Accelerant Limit by 2 and Acceleration by 2x`,
      style() {
        return {
          "background-image": "url('images/MasteryIV.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#000000"
        }
      },
      unlocked() {
        return player.main.tier.gte(21)
      }
    },
    "TM11": {
      requirementDescription() {
        let STATE = []
        if (hasMilestone(this.layer, this.id)) STATE.push('<img src="images/Checkmark_White.png" width="32" height="32">')
        return `<b style="font-size:32px; text-shadow: 0px 0px 10px #ffffff">TIER 37 ${STATE}</b>`
      },
      done() { return player.main.tier.gte(37) },
      effectDescription: `<b style="font-size:22px">
      + Unlock Bitcoin`,
      style() {
        return {
          "background-image": "url('images/MasteryIV.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#000000"
        }
      },
      unlocked() {
        return player.main.tier.gte(21)
      }
    },
    "TM12": {
      requirementDescription() {
        let STATE = []
        if (hasMilestone(this.layer, this.id)) STATE.push('<img src="images/Checkmark_White.png" width="32" height="32">')
        return `<b style="font-size:32px; text-shadow: 0px 0px 10px #ffffff">TIER 45 ${STATE}</b>`
      },
      done() { return player.main.tier.gte(45) },
      effectDescription: `<b style="font-size:22px">
      + Unlock 3rd Bitcoin Tab<br>
      + 1.2x Bitcoin Forked per Level`,
      style() {
        return {
          "background-image": "url('images/MasteryIV.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#000000"
        }
      },
      unlocked() {
        return player.main.tier.gte(21)
      }
    },
    "TM13": {
      requirementDescription() {
        let STATE = []
        if (hasMilestone(this.layer, this.id)) STATE.push('<img src="images/Checkmark_White.png" width="32" height="32">')
        return `<b style="font-size:32px; text-shadow: 0px 0px 10px #000000">TIER 61 ${STATE}</b>`
      },
      done() { return player.main.tier.gte(61) },
      effectDescription: `<b style="font-size:22px">
      + Unlock 4th Bitcoin Tab<br>
      + 1.3x Bitcoin Forked per Level`,
      style() {
        return {
          "background-image": "url('images/MasteryV.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#ffffff"
        }
      },
      unlocked() {
        return player.main.tier.gte(45)
      }
    },
    "TM14": {
      requirementDescription() {
        let STATE = []
        if (hasMilestone(this.layer, this.id)) STATE.push('<img src="images/Checkmark_White.png" width="32" height="32">')
        return `<b style="font-size:32px; text-shadow: 0px 0px 10px #000000">TIER 77 ${STATE}</b>`
      },
      done() { return player.main.tier.gte(77) },
      effectDescription: `<b style="font-size:22px">
      + 1.4x Bitcoin Forked per Level<br>
      + Minor change in Factory Investment cost<br>
      + Unlock 6th Stellar Buyable<br>
      + Unlock 6th Ethereum Buyable`,
      style() {
        return {
          "background-image": "url('images/MasteryV.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#ffffff"
        }
      },
      unlocked() {
        return player.main.tier.gte(45)
      }
    },
    "TM15": {
      requirementDescription() {
        let STATE = []
        if (hasMilestone(this.layer, this.id)) STATE.push('<img src="images/Checkmark_White.png" width="32" height="32">')
        return `<b style="font-size:32px; text-shadow: 0px 0px 10px #000000">TIER 93 ${STATE}</b>`
      },
      done() { return player.main.tier.gte(93) },
      effectDescription: `<b style="font-size:22px">
      + 1.5x Bitcoin Forked per Level<br>
      + ^0.975 Hardfork cost<br>
      + Hardforking doesn't reset anything anymore<br>
      + Unlock a new Bitcoin buyable<br>
      + Unlock a funny dong zone`,
      effectReward() {
        if (hasMilestone(this.layer, this.id)) {
          BitcoinReset = new Decimal(1)
        }
      },
      style() {
        return {
          "background-image": "url('images/MasteryV.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#ffffff"
        }
      },
      unlocked() {
        return player.main.tier.gte(45)
      }
    },
    "TM16": {
      requirementDescription() {
        let STATE = []
        if (hasMilestone(this.layer, this.id)) STATE.push('<img src="images/Checkmark_White.png" width="32" height="32">')
        return `<b style="font-size:32px; text-shadow: 0px 0px 10px #000000">TIER 125 ${STATE}</b>`
      },
      done() { return player.main.tier.gte(125) },
      effectDescription: `<b style="font-size:22px">
      + PLACEHOLDER<br>
      + PLACEHOLDER<br>
      + PLACEHOLDER<br>
      + PLACEHOLDER`,
      style() {
        return {
          "background-image": "url('images/MasteryVI.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#ffffff"
        }
      },
      unlocked() {
        return player.main.tier.gte(93)
      }
    },
    "TM17": {
      requirementDescription() {
        let STATE = []
        if (hasMilestone(this.layer, this.id)) STATE.push('<img src="images/Checkmark_White.png" width="32" height="32">')
        return `<b style="font-size:32px; text-shadow: 0px 0px 10px #000000">TIER 157 ${STATE}</b>`
      },
      done() { return player.main.tier.gte(157) },
      effectDescription: `<b style="font-size:22px">
      + PLACEHOLDER<br>
      + PLACEHOLDER<br>
      + PLACEHOLDER<br>
      + PLACEHOLDER`,
      style() {
        return {
          "background-image": "url('images/MasteryVI.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#ffffff"
        }
      },
      unlocked() {
        return player.main.tier.gte(93)
      }
    },
    "TM18": {
      requirementDescription() {
        let STATE = []
        if (hasMilestone(this.layer, this.id)) STATE.push('<img src="images/Checkmark_White.png" width="32" height="32">')
        return `<b style="font-size:32px; text-shadow: 0px 0px 10px #000000">TIER 189 ${STATE}</b>`
      },
      done() { return player.main.tier.gte(189) },
      effectDescription: `<b style="font-size:22px">
      + PLACEHOLDER<br>
      + PLACEHOLDER<br>
      + PLACEHOLDER<br>
      + PLACEHOLDER`,
      style() {
        return {
          "background-image": "url('images/MasteryVI.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#ffffff"
        }
      },
      unlocked() {
        return player.main.tier.gte(93)
      }
    },
    "TM19": {
      requirementDescription() {
        return `<b style="font-size:32px; text-shadow: 0px 0px 10px #000000">TIER 251</b>`
      },
      done() { return player.main.tier.gte(251) },
      effectDescription: `<b style="font-size:22px">
      + PLACEHOLDER<br>
      + PLACEHOLDER<br>
      + PLACEHOLDER<br>
      + PLACEHOLDER`,
      style() {
        return {
          "background-image": "url('images/MasteryVII.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#000000"
        }
      },
      unlocked() {
        return player.main.tier.gte(187)
      }
    },
    "TM20": {
      requirementDescription() {
        return `<b style="font-size:32px; text-shadow: 0px 0px 10px #ffffff">TIER 315</b>`
      },
      done() { return player.main.tier.gte(315) },
      effectDescription: `<b style="font-size:22px">
      + PLACEHOLDER<br>
      + PLACEHOLDER<br>
      + PLACEHOLDER<br>
      + PLACEHOLDER`,
      style() {
        return {
          "background-image": "url('images/MasteryVII.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#000000"
        }
      },
      unlocked() {
        return player.main.tier.gte(187)
      }
    },
    "TM21": {
      requirementDescription() {
        return `<b style="font-size:32px; text-shadow: 0px 0px 10px #ffffff">TIER 379</b>`
      },
      done() { return player.main.tier.gte(379) },
      effectDescription: `<b style="font-size:22px">
      + PLACEHOLDER<br>
      + PLACEHOLDER<br>
      + PLACEHOLDER<br>
      + PLACEHOLDER`,
      style() {
        return {
          "background-image": "url('images/MasteryVII.png')",
          "background-size": "50% !important",
          "width": "600px",
          "height": "auto",
          "padding": "5px",
          "border": "0px solid",
          "border-radius": "10px",
          "color": "#000000"
        }
      },
      unlocked() {
        return player.main.tier.gte(187)
      }
    },

  },
  tabFormat: {
    "Main Progression": {
      content: [
      "h-line",
      "blank",
      ['raw-html', () => {
          return `<MA style='font-size: 24px'>You have <HI style='font-size: 30px; text-shadow: 0px 0px 20px'>${format(player.points)}</HI> Points</MA>`
                }],
      ["raw-html", () => {
          return `<MA style="font-size: 19px; color: #595959">You generate <HI style="font-size: 28px; color: #737373; text-shadow: 0px 0px 20px">${format(getPointGen())}</HI> Points / sec</MA>`
            }],
            "blank",
            ["raw-html", () => {
          if (player.main.tier.gte(9)) {
            return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.main.unit)} u<sup>2</sup></HI>, which gives <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">x${format(tmp.main.AccelerantBonus)}</HI> to Points<br>
              Generation Rate: × ${format(tmp.main.AccelerantSpeed)} u<sup>2</sup>/ sec<br>
              Boost Formula: ( u<sup>2</sup> ^ ${format(tmp.main.AccelerantBonusDisplay)} ) + 1</MA><br>
               <HI style="font-size: 24px; color: #c70e3c; text-shadow: 0px 0px 10px">Limit ${format(tmp.main.AccelerantLimit)} u<sup>2</sup></HI>`
          }
          return ``
                        }],
          ["raw-html", () => {
          if (tmp.main.AccelerantLimit.gte(tmp.main.AccelerantLimitLimit)) {
            return `<HI style="font-size: 24px; color: #c70e3c; text-shadow: 0px 0px 10px">HARDCAP:  ${format(tmp.main.AccelerantLimitLimit)} u<sup>2</sup> Limit</HI>`
          }
          return ``
          }],
      "blank",
      ["microtabs", "Main", { 'border-width': '0px' }],
      ],
    },
    "Progression": {
      unlocked() { return player.points.gte(10) || player.main.tier.gte(1) },
      content: [
    "blank",
    ["microtabs", "Progression", { 'border-width': '0px' }],
    "blank",
    ],
    },

    "Factory": {
      unlocked() { return hasMilestone("main", "TM8") },
      content: [
      ['raw-html', () => {
          return `<MA style='font-size: 24px'>You own <HI style='font-size: 30px; text-shadow: 0px 0px 20px'>${format(player.main.factories)}</HI> Factories</MA>`
                }],
      ["raw-html", () => {
          return `<MA style="font-size: 19px; color: #595959">You have produced <HI style="font-size: 28px; color: #737373; text-shadow: 0px 0px 20px">${format(player.main.oreos)}</HI> Oreos</MA>`
            }],
            ["raw-html", () => {
          return `<MA style="font-size: 20px; color: #595959">Your Oreos boost Points by <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.OreoPointBoost)}x</HI></MA><br>
              <MA style="font-size: 20px; color: #595959">Your Oreos boost Stellar by <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.OreoStellarBoost)}x </HI></MA><br>
              <MA style="font-size: 20px; color: #595959">Your Oreos boost Accelerant Limit by <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">^${format(tmp.main.OreoAccelerantLimitBoost)} </HI></MA><br>
              <MA style="font-size: 20px; color: #595959">Your Oreos boost Accelerant Acceleration by <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">+${format(tmp.main.OreoAccelerantBoostBonus)} </HI></MA>`
                        }],
      "blank",
      ["row", [["challenge", "Looming"]]],
      "blank",
      ["row", [["buyable", "Oreo Point Production"]]],
      ["row", [["buyable", "Oreo Stellar Production"]]],
      ["row", [["buyable", "Oreo Cheaper"]]],
      ["row", [["buyable", "Cheaper Oreo Tier"]]],
      ["row", [["buyable", "Oreo Looming Offsetter"]]],
      ["row", [["buyable", "Oreo Bonus Booster"]]],
      ],
    },

    "Funny Zone": {
      unlocked() { return hasMilestone("main", "TM15") },
      content: [
            "h-line",
            "blank",
          ["microtabs", "FunnyZone", { 'border-width': '0px' }],
  ]
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
            return `<MA style='font-size: 25px'>You have <HI style='font-size: 28px; text-shadow: 0px 0px 15px'>${format(player.main.points)}</HI> Stellar</MA>`
        }],
        ["raw-html", () => {
            return `<MA style="font-size: 20px; color: #595959">You produce <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.resetGain)}</HI> Stellar / sec</MA>`
            }],
            "blank",
            ["raw-html", () => {
            if (player.main.tier.gte(7)) {
              return `<MA style="font-size: 20px; color: #595959">Your Stellar Magnitude is <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.StellarMagnitude)} OoMs</HI>, which gives <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">x${format(tmp.main.StellarMagnitudeBonus)}</HI> to Stellar<br>
              Formula: OoM ^ ${format(tmp.main.StellarMagBonusDisplay)}</MA><br>
               <HI style="font-size: 24px; color: #c70e3c; text-shadow: 0px 0px 10px">Limit ${format(player.main.limit)} OoMs</HI>`
            }
            return ``
                        }],
            "blank",
            ["row", [["image", "url('images/ConnectorVasak.png')"], ["clickable", "T1AT1"]]],
            "blank",
            ["row", [["buyable", "Stellar Point Production"]]],
            ["row", [["buyable", "Stellar Production"]]],
            ["row", [["buyable", "Cheaper Stellar"]]],
            ["row", [["buyable", "Cheaper Stellar Tier"]]],
            ["row", [["buyable", "Stellar Accelerant Bonus"]]],
          ]
      },
      "Ethereum": {
        unlocked() { return hasMilestone("main", "TM4") },
        content: [
       "blank",
       "h-line",
       "blank",
         ['raw-html', () => {
            return `<MA style='font-size: 25px'>You have <HI style='font-size: 28px; text-shadow: 0px 0px 15px'>${format(player.main.eth)}</HI> Ethereum</MA>`
        }],
        ["raw-html", () => {
            return `<MA style="font-size: 20px; color: #595959">You produce <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.ethGainCalc)}</HI> Ethereum / sec</MA>`
        }],
        ["raw-html", () => {
            if (player.main.tier.gte(19)) {
              return `<MA style="font-size: 20px; color: #595959">Your have bought <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.EthereumStabilizer)} ETH</HI>, buyables which in return you are compensated with <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">x${format(tmp.main.EthereumStabilizerBoost)}</HI> to Ethereum<br>
              Formula: OoM ^ ${format(tmp.main.StellarMagBonusDisplay)}</MA><br>
               <HI style="font-size: 24px; color: #c70e3c; text-shadow: 0px 0px 10px">Limit ${format(player.main.limit)} OoMs</HI>`
            }
            return ``
                        }],
        ["raw-html", () => {
            if (player.main.tier.lte(4.9) && player.main.oreos.gte(0.01)) {
              return `<HI style="font-size: 24px; color: #c70e3c; text-shadow: 0px 0px 10px">MAINFRAME_0x4929-ET ERROR: At line 153, player is under threshold. Can't generate Ethereum...</HI>`
            }
            return ``
            }],
            "blank",
            ["row", [["clickable", "T1AT2"]]],
            "blank",
            ["row", [["buyable", "Ethereum Point Production"]]],
            ["row", [["buyable", "Ethereum Stellar Mag Increaser"]]],
            ["row", [["buyable", "Ethereum Stellar Mag Booster"]]],
            ["row", [["buyable", "Ethereum Booster"]]],
            ["row", [["buyable", "Ethereum Cheaper Factory"]]]
          ]
      },

      "Bitcoin": {
        unlocked() { return hasMilestone("main", "TM11") },
        content: [
       "blank",
       "h-line",
       "blank",
       ["raw-html", () => {

            let Mark = "MK. " + tmp.main.hardforkLevelDisplay

            return `<MA style='font-size: 25px'> <HI style='font-size: 28px; text-shadow: 0px 0px 15px'>Bitcoin ${Mark} </HI> </MA><br><br>`
                      }],
       ["raw-html", () => {
            return `<MA style='font-size: 25px'>You have done <HI style='font-size: 28px; text-shadow: 0px 0px 15px'>${formatNoDecimals(player.main.hardfork)}</HI> Hardforks</MA>`
               }],
         ['raw-html', () => {
            return `<MA style='font-size: 25px'>You have <HI style='font-size: 28px; text-shadow: 0px 0px 15px'>${format(player.main.btc)}</HI> Bitcoin</MA>`
        }],
        ["raw-html", () => {
            return `<MA style="font-size: 20px; color: #595959">You fork <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.bitcoinGeneration)}</HI> Bitcoin / sec</MA>`
                        }],
        "blank",
        ["raw-html", () => {
            return `<MA style="font-size: 20px; color: #595959">You Hardforks generate <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.hardforkXPCalc)} XP</HI> sec</MA>`
                }],
        ["raw-html", () => {
            return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.main.hardforkxp)}</HI> XP</MA>`
                                }],
        ["raw-html", () => {
            return `<MA style="font-size: 20px; color: #595959">You need <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(tmp.main.hardforkXPlevelCalc)} XP</HI> to reach next Level</MA>`
                }],
        ["raw-html", () => {
            return `<MA style="font-size: 20px; color: #595959">You are at Level <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.main.hardforklvl)}</HI></MA>`
                                }],

            "blank",
            ["row", [["clickable", "Hardfork"]]],
            ["row", [["clickable", "FBTC"]]],
            "blank",
            ["row", [["clickable", "T2AT1"]]],
            "blank",
            "h-line",
            "blank",
            ["microtabs", "BitcoinBuyables", { 'border-width': '0px' }],
          ]
      }
    },

    Progression: {
      "Tier": {
        content: [
             "blank",
             "h-line",
             "blank",
          ['raw-html', () => {
            return `<MA style='font-size: 24px'>You are at Tier <HI style='font-size: 30px; text-shadow: 0px 0px 20px'>${formatNoDecimals(player.main.tier)}</HI></MA>`
                }],
         ["raw-html", () => {
            return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.points)}</HI> Points</MA>`
    }],
    "blank",
    ["row", [["clickable", "Tier Up"]]],
    "blank",
    "blank",
    ["raw-html", () => {
            return `<MA style="font-size: 24px; color: #ffffff">Tier Milestones</MA>`
        }],
        ["raw-html", () => {
            return `<MA style="font-size: 24px; color: #ffffff">TM Sets unlocked: <HI style='font-size: 30px; text-shadow: 0px 0px 20px'> 0 of 10</HI></MA>`
                }],
            ["raw-html", () => {
            return `<MA style="font-size: 20px; color: #595959">Tier Milestones are sorted into Masteries.<br> Each Mastery has 3 Milestones and each Mastery it gets more harder to gain new Milestones</MA>`
                }],
        "blank",
        ["row", [["milestone", "TM1"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM2"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM3"]]],
        ["blank", "12px"],
        ["row", [["milestone", "TM4"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM5"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM6"]]],
        ["blank", "12px"],
        ["row", [["milestone", "TM7"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM8"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM9"]]],
        ["blank", "12px"],
        ["row", [["milestone", "TM10"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM11"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM12"]]],
        ["blank", "12px"],
        ["row", [["milestone", "TM13"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM14"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM15"]]],
        ["blank", "12px"],
        ["row", [["milestone", "TM16"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM17"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM18"]]],
        ["blank", "12px"],
        ["row", [["milestone", "TM19"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM20"]]],
        ["blank", "3px"],
        ["row", [["milestone", "TM21"]]],

    ],
      },

      "Factory": {
        unlocked() { return hasMilestone("main", "TM8") },
        content: [
                   "blank",
                   "h-line",
                   "blank",
                ['raw-html', () => {
            return `<MA style='font-size: 24px'>You own <HI style='font-size: 30px; text-shadow: 0px 0px 20px'>${formatNoDecimals(player.main.factories)}</HI> Factories</MA>`
                      }],
               ["raw-html", () => {
            return `<MA style="font-size: 20px; color: #595959">You are at Tier <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.main.tier)}</HI> </MA>`
          }],
               ["raw-html", () => {
            return `<MA style="font-size: 20px; color: #595959">You have <HI style="font-size: 24px; color: #737373; text-shadow: 0px 0px 20px">${format(player.points)}</HI> Points</MA>`
          }],
          "blank",
           ["row", [["clickable", "Factory Reset"]]],
          ],
      }
    },

    BitcoinBuyables: {
      "Point Buyables": {
        content: [
                         "blank",
                         "h-line",
                         "blank",
                         ["row", [["buyable", "Bitcoin Point Production"]]],
                         ["row", [["buyable", "Bitcoin Accelerant Limit"]]],
                         ["row", [["buyable", "Bitcoin Accelerant Speed"]]],
                         ["row", [["buyable", "Bitcoin Accelerant Bonus"]]],
                ],
      },
      "Stellar Buyables": {
        content: [
                   "blank",
                   "h-line",
                   "blank",
                   ["row", [["buyable", "Bitcoin Stellar Production"]]],
                   ["row", [["buyable", "Bitcoin Stellar Mag Booster"]]],
                   ["row", [["buyable", "Bitcoin Cheaper Stellar"]]],
          ],
      },
      "Ethereum Buyables": {
        content: [
                   "blank",
                   "h-line",
                   "blank",
                   ["row", [["buyable", "Bitcoin Ethereum Production"]]],
                   ["row", [["buyable", "Bitcoin Ethereum Stabilizer Booster"]]],
                   ["row", [["buyable", "Bitcoin Cheaper Ethereum"]]],
          ],
      },
      "Progression Buyables": {
        content: [
                         "blank",
                         "h-line",
                         "blank",
                         ["row", [["buyable", "Bitcoin Cheaper Tier"]]],
                         ["row", [["buyable", "Bitcoin Cheaper Factory"]]],
                         ["row", [["buyable", "Bitcoin XP Generation"]]],
                         ["row", [["buyable", "Bitcoin Accelerant Limit Limit"]]],
                ],
      },
    },

    FunnyZone: {
      "Game": {
        content: [
          "blank",
          "h-line",
          "blank",
      ['raw-html', () => {
            return `<MA style='font-size: 24px'>Level: <HI style='font-size: 30px; text-shadow: 0px 0px 20px; color:#ffffff'>${format(tmp.main.LevelCalculation)}</HI></MA>`
                              }],
       ['raw-html', () => {
            return `<MA style='font-size: 24px'>You have <HI style='font-size: 30px; text-shadow: 0px 0px 20px; color:#1fff5a'>${format(player.main.cash)}</HI> Cash</MA>`
                    }],
          ['raw-html', () => {
            return `<MA style='font-size: 24px'>You have <HI style='font-size: 30px; text-shadow: 0px 0px 20px; color:#ff261f'>${format(player.main.multiplier)}</HI> Multiplier</MA>`
                              }],
          ['raw-html', () => {
            if (tmp.main.OrderIndex.gte(1)) {
              return `<MA style='font-size: 24px'>You have <HI style='font-size: 30px; text-shadow: 0px 0px 20px; color:#1f53ff'>${format(player.main.rebirth)}</HI> Rebirth</MA>`
            }
            return ``
                             }],
          ['raw-html', () => {
            if (tmp.main.OrderIndex.gte(2)) {
              return `<MA style='font-size: 24px'>You have <HI style='font-size: 30px; text-shadow: 0px 0px 20px; color:#f403fc'>${format(player.main.srebirth)}</HI> Super Rebirth</MA>`
            }
            return ``
                                       }],
          ['raw-html', () => {
            if (tmp.main.OrderIndex.gte(3)) {
              return `<MA style='font-size: 24px'>You have <HI style='font-size: 30px; text-shadow: 0px 0px 20px; color:#9003fc'>${format(player.main.urebirth)}</HI> Ultra Rebirth</MA>`
            }
            return ``
                                                                              }],
                              "blank",
                              "blank",
  ["row", [["clickable", "Buy Multiplier"]]],
  
  ["row", [["clickable", "Buy Multiplier MAG+"]]],
  ["row", [["clickable", "Buy Multiplier MAG-"]]],
  
  "blank",
  ["row", [["clickable", "Buy Rebirth"]]],
  ["row", [["clickable", "Buy Rebirth-1000"], ["clickable", "Buy Rebirth-100"], ["clickable", "Buy Rebirth-10"],
  ["clickable", "Buy Rebirth-1"]]],
  ["row", [["clickable", "Buy Rebirth+1"], ["clickable", "Buy Rebirth+10"], ["clickable", "Buy Rebirth+100"], ["clickable", "Buy Rebirth+1000"], ["clickable", "Buy Rebirth+10000"]]],
  "blank",
   ["row", [["clickable", "Buy Super Rebirth"]]],
    ["row", [["clickable", "Buy SRebirth-1000"], ["clickable", "Buy SRebirth-100"], ["clickable", "Buy SRebirth-10"], ["clickable", "Buy SRebirth-1"]]],
  ["row", [["clickable", "Buy SRebirth+1"], ["clickable", "Buy SRebirth+10"], ["clickable", "Buy SRebirth+100"], ["clickable", "Buy SRebirth+1000"]]],
    "blank",
  ["row", [["clickable", "Buy Ultra Rebirth"]]],
                ],
      },


      "The Index": {
        content: [
    "blank",
    "h-line",
    "blank",
    ["microtabs", "Indexing", { 'border-width': '0px' }],
       ]
      },

      "Settings": {
        content: [
        "blank",
        "h-line",
        "blank",
      ["row", [["clickable", "HardReset"]]],
           ]
      },
    },

    Indexing: {
      "This Extension Index": {
        content: [
    "blank",
    "h-line",
    "blank",
    ['raw-html', () => {
            return `<MA style='font-size: 24px'>Multiplier = <HI style='font-size: 30px; text-shadow: 0px 0px 20px; color:#ff261f'>1.25 × x</HI> Cash</MA>`
                      }],
    ['raw-html', () => {
            return `<MA style='font-size: 24px'>Rebirth = <HI style='font-size: 30px; text-shadow: 0px 0px 20px; color:#1f53ff'>2 × x</HI> Multiplier , <HI style='font-size: 30px; text-shadow: 0px 0px 20px; color:#1f53ff'>2 × x</HI> Cash</MA>`
                      }],
    ['raw-html', () => {
            return `<MA style='font-size: 24px'>Super Rebirth = <HI style='font-size: 30px; text-shadow: 0px 0px 20px; color:#f403fc'>3 × x</HI> Rebirth</MA>`
                          }],
       ]
      },

      "Outside Extension Index": {
        content: [
         "blank",
         "h-line",
         "blank",
        ['raw-html', () => {
            return `<MA style='font-size: 24px'>Multiplier = <HI style='font-size: 30px; text-shadow: 0px 0px 20px; color:#ff261f'>x ^ 10</HI> Points</MA>`
                          }],
      ['raw-html', () => {
            if (tmp.main.OrderIndex.gte(1)) {
              return `<MA style='font-size: 24px'>Rebirth = <HI style='font-size: 30px; text-shadow: 0px 0px 20px; color:#1f53ff'>x ^ 15</HI> Stellar , Ethereum</MA>`
            }
            return ``
                          }],
           ]
      }
    },
  },
  row: 0,
  layerShown() { return true }
})
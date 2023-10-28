addLayer("ST", {
  name: "Stellar",
  symbol: "ST",
  position: 0,
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0),
      sparticles: new Decimal(0),
      sframe: new Decimal(1.01),
      sframeboosters: new Decimal(0),
      sframenergy: new Decimal(0),
      energyALLlim: new Decimal(1e15),
      energyALL1: new Decimal(0),
      energyALL2: new Decimal(0),
      energyALL3: new Decimal(0),
      energyALL4: new Decimal(0),
      energyALL5: new Decimal(0),
      energyALL6: new Decimal(0)
    }
  },
  color: "#4BDC13",
  requires: new Decimal(1),
  resource: "Stellar",
  baseAmount() { return new Decimal(1) },
  type: "normal",
  exponent: 0.5,
  gainMult() {
    mult = new Decimal(1)
    mult = mult.add(buyableEffect("ST", "I"))
    mult = mult.mul(buyableEffect("ST", "II"))
    mult = mult.mul((player.ST.sparticles.gte(tmp.ST.R0Req)) ? tmp.ST.R0Bonus : 1 )
    mult = mult.mul(hasUpgrade("ST", "RE1") ? tmp.ST.RE1Bonus : 1 )
    mult = mult.mul(buyableEffect("ST", "IV"))
    mult = mult.mul(buyableEffect("ST", "V"))
    mult = mult.mul(tmp.ST.GRID1Bonus)
    mult = mult.mul(tmp.ST.GRID6Bonus)
    mult = mult.mul(player.ST.points.gte(1.18e38) ? 0 : 1)
    return mult
  },
  gainExp() {
    return new Decimal(1)
  },
  passiveGeneration() {
    return new Decimal(1)
  },
  color: "#ffffff",
  row: 0,
  layerShown() { return true },
  update(delta) {
    player.ST.energyALLlim = new Decimal(1e18)
    player.ST.sparticles = player.ST.sparticles.add((tmp.ST.calcSparticles).times(delta))
    player.ST.sframenergy = player.ST.sframenergy.add((tmp.ST.SFRAMEEnergyCalc).times(delta))
    
    if (hasUpgrade("ST", "U4")) {
      player.ST.sframe = player.ST.sframe.mul((tmp.ST.calcSFRAME).pow(delta))
    }
    
    if (hasUpgrade("ST", "AT1")) {
      buyBuyable("ST", "I")
      buyBuyable("ST", "II")
    }
    
    if (hasUpgrade("ST", "AT2")) {
      buyBuyable("ST", "SI")
      buyBuyable("ST", "III")
    }
  },
  calcSparticles() {
    let base = new Decimal(0)
    base = base.add(hasUpgrade("ST", "U2") ? 1 : 0)
    base = base.add(buyableEffect("ST", "III"))
    
    base = base.mul(player.ST.sparticles.gte(tmp.ST.R1Req) ? tmp.ST.R1Bonus : 1)
    base = base.mul(hasUpgrade("ST", "RE2") ? tmp.ST.RE2Bonus : 1)
    base = base.mul(buyableEffect("ST", "IV"))
    base = base.mul(buyableEffect("ST", "V"))
    base = base.mul(tmp.ST.GRID2Bonus).max(0)
    base = base.mul(tmp.ST.GRID6Bonus).max(0)
    base = base.mul(player.ST.points.gte(1.18e38) ? 0 : 1)
    return base
  },
  calcSFRAME() {
    let x = player.ST.sframe
    let base = new Decimal(1.01)
    let lim = new Decimal(5)
    let sc1 = new Decimal(1)
    let sc1calc = new Decimal(1)
    lim = buyableEffect("ST", "EII")
    base = base.pow(Decimal.pow(2, player.ST.sframeboosters))
    base = base.mul(tmp.ST.GRID4Bonus)
    base = base.mul(tmp.ST.GRID6Bonus)
    if (x.gte(lim)) {
      x = x.sub(lim.sub(1))
      sc1calc = new Decimal.log(x.add(1), 2).pow(2)
      sc1 = sc1.div(sc1calc)
      base = base.pow(sc1)
    }
    return base
  },
  SFRAMEBoosterReq() {
    let lim = new Decimal(5)
    lim = lim.mul(Decimal.pow(5, player.ST.sframeboosters))
    return lim
  },
  SFRAMEEnergyCalc() {
    let base = new Decimal(0)
    base = base.add(Decimal.pow(3, player.ST.sframeboosters))
    base = base.mul(player.ST.sparticles.gte(tmp.ST.R3Req) ? tmp.ST.R3Bonus : 1)
    base = base.mul(buyableEffect("ST", "EI"))
    base = base.mul(tmp.ST.GRID5Bonus)
    base = base.mul(tmp.ST.GRID6Bonus)
    return base
  },
  performBoosterReset() {
    let boosters = player.ST.sframeboosters
    let acc = player.ST.sframe
    
    player.ST.sframeboosters = player.ST.sframeboosters.add(1)
    player.ST.sframe = new Decimal(1.01)
  },
  ALL1() {
    player.ST.energyALL1 = player.ST.energyALL1.add(player.ST.sframenergy)
    if (player.ST.energyALL1.gte(player.ST.energyALLlim)) {
      player.ST.energyALL1 = player.ST.energyALLlim
    }
    player.ST.sframenergy = new Decimal(0)
  },
  GRID1Bonus() {
    let base = new Decimal(1)
    let am1 = player.ST.energyALL1
    let calc = new Decimal(base).mul(Decimal.pow(2, Decimal.log(am1.add(1), 10)))
    return calc
  },
  ALL2() {
    player.ST.energyALL2 = player.ST.energyALL2.add(player.ST.sframenergy)
    if (player.ST.energyALL2.gte(player.ST.energyALLlim)) {
      player.ST.energyALL2 = player.ST.energyALLlim
    }
    player.ST.sframenergy = new Decimal(0)
  },
  GRID2Bonus() {
    let base = new Decimal(1)
    let am1 = player.ST.energyALL2
    let calc = new Decimal(base).mul(Decimal.pow(1.5, Decimal.log(am1.add(1), 10)))
    return calc
  },
  ALL3() {
    player.ST.energyALL3 = player.ST.energyALL3.add(player.ST.sframenergy)
    if (player.ST.energyALL3.gte(player.ST.energyALLlim)) {
      player.ST.energyALL3 = player.ST.energyALLlim
    }
    player.ST.sframenergy = new Decimal(0)
  },
  GRID3Bonus() {
    let base = new Decimal(1)
    let am1 = player.ST.energyALL3
    let calc = new Decimal(base).mul(Decimal.pow(1.25, Decimal.log(am1.add(1), 10)))
    return calc
  },
  ALL4() {
    player.ST.energyALL4 = player.ST.energyALL4.add(player.ST.sframenergy)
    if (player.ST.energyALL4.gte(player.ST.energyALLlim)) {
      player.ST.energyALL4 = player.ST.energyALLlim
    }
    player.ST.sframenergy = new Decimal(0)
  },
  GRID4Bonus() {
    let base = new Decimal(1)
    let am1 = player.ST.energyALL4
    let calc = new Decimal(base).mul(Decimal.pow(1.125, Decimal.log(am1.add(1), 10)))
    return calc
  },
  ALL5() {
    player.ST.energyALL5 = player.ST.energyALL5.add(player.ST.sframenergy)
    if (player.ST.energyALL5.gte(player.ST.energyALLlim)) {
      player.ST.energyALL5 = player.ST.energyALLlim
    }
    player.ST.sframenergy = new Decimal(0)
  },
  GRID5Bonus() {
    let base = new Decimal(1)
    let am1 = player.ST.energyALL5
    let calc = new Decimal(base).mul(Decimal.pow(1.125, Decimal.log(am1.add(1), 10)))
    return calc
  },
  ALL6() {
      player.ST.energyALL6 = player.ST.energyALL6.add(player.ST.sframenergy)
      if (player.ST.energyALL6.gte(player.ST.energyALLlim)) {
        player.ST.energyALL6 = player.ST.energyALLlim
      }
      player.ST.sframenergy = new Decimal(0)
    },
    GRID6Bonus() {
      let base = new Decimal(1)
      let am1 = player.ST.energyALL6
      let calc = new Decimal(base).mul(Decimal.pow(1.075, Decimal.log(am1.add(1), 10)))
      return calc
    },
  R0Req() {
    let base = new Decimal(1)
    return base
  },
  R0Bonus() {
    let base = new Decimal(1)
    let part = player.ST.sparticles
    
    let calc = new Decimal.pow(1.33, Decimal.log(part.add(1), 4))
    base = base.mul(calc)
    base = base.mul(buyableEffect("ST", "SIII"))
    base = base.mul(tmp.ST.GRID3Bonus)
    return base
  },
  R1Req() {
    let base = new Decimal(2000)
    return base
  },
  R1Bonus() {
    let base = new Decimal(1)
    let am1 = player.ST.sparticles
    let am2 = player.ST.points
  
    let calc = new Decimal.pow(1.33, Decimal.log(am1.add(1), 10)).mul(Decimal.add(Decimal.log(am2.add(1), 10).div(10)), 1)
    base = base.mul(buyableEffect("ST", "SV"))
    base = base.mul(tmp.ST.GRID3Bonus)
    base = base.mul(calc)
    return base
  },
  R2Req() {
      let base = new Decimal(100e6)
      return base
    },
    R2Bonus() {
      let base = new Decimal(1)
      let am1 = player.ST.sparticles

      let calc = new Decimal.div(Decimal.log(am1.add(1), 10), 10).mul(0.5)
      base = base.mul(tmp.ST.GRID3Bonus)
      base = base.mul(calc)
      return base
    },
  R3Req() {
    let base = new Decimal(1e15)
    return base
  },
  R3Bonus() {
    let base = new Decimal(1)
    let am1 = player.ST.sparticles

    let calc = new Decimal.pow(1.07, Decimal.log(am1.add(1), 10))
    base = base.mul(tmp.ST.GRID3Bonus)
    base = base.mul(calc)
    return base
  },
  
  
  RE1Bonus() {
    return new Decimal.pow(1.25, Decimal.log(player.ST.points.add(1), 10)).max(1)
  },
  RE2Bonus() {
    return new Decimal.pow(1.01, Decimal.log(player.ST.points.add(1), 2)).max(1)
  },
  clickables: {
    "MaxI": {
      display() {
        return `MAX`
      },
      onClick() {
        tmp[this.layer].buyables["I"].buyMax()
      },
      canClick() {
        return tmp[this.layer].buyables["I"].canAfford
      },
      unlocked() {
        return hasUpgrade("ST", "U1")
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick)
          return {
            "width": "auto",
            "height": "150px",
            "border-radius": "0px 10px 10px 0px",
            "border": "0px",
            "margin": "2px",
            "color": "#ffffff",
            "background": "linear-gradient(0deg, rgba(39,39,39,1) 0%, rgba(120,120,129,1) 35%, rgba(221,238,242,1) 100%)",
            "font-size": "15px"
          }
        return {
          "width": "auto",
          "height": "150px",
          "border-radius": "0px 10px 10px 0px",
          "border": "0px",
          "margin": "2px",
          "color": "#000000",
          "font-size": "15px",
          "background": "linear-gradient(180deg, rgba(78,39,39,1) 0%, rgba(125,73,73,1) 35%, rgba(247,109,109,1) 100%)"
        }
      }
    },
    "MaxII": {
      display() {
        return `MAX`
      },
      onClick() {
        tmp[this.layer].buyables["II"].buyMax()
      },
      canClick() {
        return tmp[this.layer].buyables["II"].canAfford
      },
      unlocked() {
        return hasUpgrade("ST", "U1")
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick)
          return {
                          "width": "auto",
                          "height": "150px",
                          "border-radius": "0px 10px 10px 0px",
                          "border": "0px",
                          "margin": "2px",
                          "color": "#ffffff",
                          "background": "linear-gradient(0deg, rgba(39,39,39,1) 0%, rgba(120,120,129,1) 35%, rgba(221,238,242,1) 100%)",
                          "font-size": "15px"
                        }
                        return {
                          "width": "auto",
                          "height": "150px",
                          "border-radius": "0px 10px 10px 0px",
                          "border": "0px",
                          "margin": "2px",
                          "color": "#000000",
                          "font-size": "15px",
                          "background": "linear-gradient(180deg, rgba(78,39,39,1) 0%, rgba(125,73,73,1) 35%, rgba(247,109,109,1) 100%)"
                        }
              }
    },
    "MaxIII": {
      display() {
        return `MAX`
      },
      onClick() {
        tmp[this.layer].buyables["III"].buyMax()
      },
      canClick() {
        return tmp[this.layer].buyables["III"].canAfford
      },
      unlocked() {
        return hasUpgrade("ST", "U2")
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick)
          return {
            "width": "auto",
            "height": "150px",
            "border-radius": "0px 10px 10px 0px",
            "border": "0px",
            "margin": "2px",
            "color": "#ffffff",
            "background": "linear-gradient(0deg, rgba(39,39,39,1) 0%, rgba(120,120,129,1) 35%, rgba(221,238,242,1) 100%)",
            "font-size": "15px"
          }
        return {
          "width": "auto",
          "height": "150px",
          "border-radius": "0px 10px 10px 0px",
          "border": "0px",
          "margin": "2px",
          "color": "#000000",
          "font-size": "15px",
          "background": "linear-gradient(180deg, rgba(78,39,39,1) 0%, rgba(125,73,73,1) 35%, rgba(247,109,109,1) 100%)"
        }
      }
    },
    "BoosterReset": {
      display() {
        return `Perform a Booster Reset<br>
        Your ACCELERANT will be set to 1 and its RG will be /2 but you gain a STELLAR BOOSTER with awesome things included<br>
        Req: ${format(tmp.ST.SFRAMEBoosterReq)} STELLAR ACCELERANT
        `
      },
      onClick() {
        tmp.ST.performBoosterReset()
      },
      canClick() {
        return player.ST.sframe.gte(tmp.ST.SFRAMEBoosterReq)
      },
      unlocked() {
        return true
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick)
          return {
            "width": "500px",
            "height": "175px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "2px",
            "color": "#ffffff",
            "background": "linear-gradient(0deg, rgba(39,39,39,1) 0%, rgba(120,120,129,1) 35%, rgba(221,238,242,1) 100%)",
            "font-size": "15px"
          }
        return {
          "width": "500px",
          "height": "175px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "2px",
          "color": "#000000",
          "font-size": "15px",
          "background": "linear-gradient(180deg, rgba(78,39,39,1) 0%, rgba(125,73,73,1) 35%, rgba(247,109,109,1) 100%)"
        }
      }
    },
    "Display1": {
      display() {
        return `GRID A /// ${format(tmp.ST.GRID1Bonus)}x STELLAR ( ${format(player.ST.energyALL1)} ENERGY )`
      },
      canClick() {
        return false
      },
      unlocked() {
        return player.ST.sframeboosters.gte(1)
      },
      style() {
        return {
          "width": "500px",
          "height": "50px",
          "border-radius": "0px",
          "border": "0px solid #fff",
          "margin": "2px",
          "color": "#ffffff",
          "font-size": "14px",
          "text-align": "left",
          "background": "rgba(50,50,50,0.2)"
        }
      }
    },
    "Invest1": {
      display() {
        return `Allocate<br> ${format(player.ST.sframenergy)} Energy`
      },
      onClick() {
        tmp.ST.ALL1()
      },
      canClick() {
        return player.ST.sframenergy.gte(1) && player.ST.energyALL1.lte(player.ST.energyALLlim)
      },
      unlocked() {
        return player.ST.sframeboosters.gte(1)
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick)
          return {
            "width": "150px",
            "height": "50px",
            "border-radius": "0px",
            "border": "0px",
            "margin": "2px",
            "color": "#ffffff",
            "background": "rgba(50,50,50,0.2)",
            "font-size": "12px",
            "text-align": "right"
          }
        return {
          "width": "150px",
          "height": "50px",
          "border-radius": "0px",
          "border": "0px",
          "margin": "2px",
          "color": "#000000",
          "font-size": "12px",
          "text-align": "right",
          "background": "rgba(50,50,50,0.2)"
        }
      }
    },
    "Display2": {
      display() {
        return `GRID B /// ${format(tmp.ST.GRID2Bonus)}x S. PARTICLES ( ${format(player.ST.energyALL2)} ENERGY )`
      },
      canClick() {
        return false
      },
      unlocked() {
        return player.ST.sframeboosters.gte(1)
      },
      style() {
        return {
          "width": "500px",
          "height": "50px",
          "border-radius": "0px",
          "border": "0px solid #fff",
          "margin": "2px",
          "color": "#ffffff",
          "font-size": "14px",
          "text-align": "left",
          "background": "rgba(75,75,75,0.2)"
        }
      }
    },
    "Invest2": {
      display() {
        return `Allocate<br> ${format(player.ST.sframenergy)} Energy`
      },
      onClick() {
        tmp.ST.ALL2()
      },
      canClick() {
        return player.ST.sframenergy.gte(1) && player.ST.energyALL2.lte(player.ST.energyALLlim)
      },
      unlocked() {
        return player.ST.sframeboosters.gte(1)
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick)
          return {
            "width": "150px",
            "height": "50px",
            "border-radius": "0px",
            "border": "0px",
            "margin": "2px",
            "color": "#ffffff",
            "background": "rgba(75,75,75,0.2)",
            "font-size": "12px",
            "text-align": "right"
          }
        return {
          "width": "150px",
          "height": "50px",
          "border-radius": "0px",
          "border": "0px",
          "margin": "2px",
          "color": "#000000",
          "font-size": "12px",
          "text-align": "right",
          "background": "rgba(75,75,75,0.2)"
        }
      }
    },
    "Display3": {
      display() {
        return `GRID C /// ${format(tmp.ST.GRID3Bonus)}x S.P REWARDS ( ${format(player.ST.energyALL3)} ENERGY )`
      },
      canClick() {
        return false
      },
      unlocked() {
        return player.ST.sframeboosters.gte(1)
      },
      style() {
        return {
          "width": "500px",
          "height": "50px",
          "border-radius": "0px",
          "border": "0px solid #fff",
          "margin": "2px",
          "color": "#ffffff",
          "font-size": "14px",
          "text-align": "left",
          "background": "rgba(100,100,100,0.2)"
        }
      }
    },
    "Invest3": {
      display() {
        return `Allocate<br> ${format(player.ST.sframenergy)} Energy`
      },
      onClick() {
        tmp.ST.ALL3()
      },
      canClick() {
        return player.ST.sframenergy.gte(1) && player.ST.energyALL3.lte(player.ST.energyALLlim)
      },
      unlocked() {
        return player.ST.sframeboosters.gte(1)
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick)
          return {
            "width": "150px",
            "height": "50px",
            "border-radius": "0px",
            "border": "0px",
            "margin": "2px",
            "color": "#ffffff",
            "background": "rgba(100,100,100,0.2)",
            "font-size": "12px",
            "text-align": "right"
          }
        return {
          "width": "150px",
          "height": "50px",
          "border-radius": "0px",
          "border": "0px",
          "margin": "2px",
          "color": "#000000",
          "font-size": "12px",
          "text-align": "right",
          "background": "rgba(100,100,100,0.2)"
        }
      }
    },
      "Display4": {
      display() {
        return `GRID D /// ${format(tmp.ST.GRID4Bonus)}x ACCELERANT ( ${format(player.ST.energyALL4)} ENERGY )`
      },
      canClick() {
        return false
      },
      unlocked() {
        return hasUpgrade("ST", "U4.2")
      },
      style() {
        return {
          "width": "500px",
          "height": "50px",
          "border-radius": "0px",
          "border": "0px solid #fff",
          "margin": "2px",
          "color": "#ffffff",
          "font-size": "14px",
          "text-align": "left",
          "background": "rgba(125,125,125,0.2)"
        }
      }
    },
    "Invest4": {
      display() {
        return `Allocate<br> ${format(player.ST.sframenergy)} Energy`
      },
      onClick() {
        tmp.ST.ALL4()
      },
      canClick() {
        return player.ST.sframenergy.gte(1) && player.ST.energyALL4.lte(player.ST.energyALLlim)
      },
      unlocked() {
        return hasUpgrade("ST", "U4.2")
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick)
          return {
            "width": "150px",
            "height": "50px",
            "border-radius": "0px",
            "border": "0px",
            "margin": "2px",
            "color": "#ffffff",
            "background": "rgba(125,125,125,0.2)",
            "font-size": "12px",
            "text-align": "right"
          }
        return {
          "width": "150px",
          "height": "50px",
          "border-radius": "0px",
          "border": "0px",
          "margin": "2px",
          "color": "#000000",
          "font-size": "12px",
          "text-align": "right",
          "background": "rgba(125,125,125,0.2)"
        }
      }
    },
    "Display5": {
      display() {
        return `GRID E /// ${format(tmp.ST.GRID5Bonus)}x ENERGY ( ${format(player.ST.energyALL5)} ENERGY )`
      },
      canClick() {
        return false
      },
      unlocked() {
        return hasUpgrade("ST", "U4.2")
      },
      style() {
        return {
          "width": "500px",
          "height": "50px",
          "border-radius": "0px",
          "border": "0px solid #fff",
          "margin": "2px",
          "color": "#ffffff",
          "font-size": "14px",
          "text-align": "left",
          "background": "rgba(150,150,150,0.2)"
        }
      }
    },
    "Invest5": {
      display() {
        return `Allocate<br> ${format(player.ST.sframenergy)} Energy`
      },
      onClick() {
        tmp.ST.ALL5()
      },
      canClick() {
        return player.ST.sframenergy.gte(1) && player.ST.energyALL5.lte(player.ST.energyALLlim)
      },
      unlocked() {
        return hasUpgrade("ST", "U4.2")
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick)
          return {
            "width": "150px",
            "height": "50px",
            "border-radius": "0px",
            "border": "0px",
            "margin": "2px",
            "color": "#ffffff",
            "background": "rgba(150,150,150,0.2)",
            "font-size": "12px",
            "text-align": "right"
          }
        return {
          "width": "150px",
          "height": "50px",
          "border-radius": "0px",
          "border": "0px",
          "margin": "2px",
          "color": "#000000",
          "font-size": "12px",
          "text-align": "right",
          "background": "rgba(150,150,150,0.2)"
        }
      }
    },
    "Display6": {
      display() {
        return `GRID F /// ${format(tmp.ST.GRID6Bonus)}x EVERYTHING ( ${format(player.ST.energyALL6)} ENERGY )`
      },
      canClick() {
        return false
      },
      unlocked() {
        return hasUpgrade("ST", "U4.2")
      },
      style() {
        return {
          "width": "500px",
          "height": "50px",
          "border-radius": "0px",
          "border": "0px solid #fff",
          "margin": "2px",
          "color": "#ffffff",
          "font-size": "14px",
          "text-align": "left",
          "background": "rgba(175,175,175,0.2)"
        }
      }
    },
    "Invest6": {
      display() {
        return `Allocate<br> ${format(player.ST.sframenergy)} Energy`
      },
      onClick() {
        tmp.ST.ALL6()
      },
      canClick() {
        return player.ST.sframenergy.gte(1) && player.ST.energyALL6.lte(player.ST.energyALLlim)
      },
      unlocked() {
        return hasUpgrade("ST", "U4.2")
      },
      style() {
        if (tmp[this.layer].clickables[this.id].canClick)
          return {
            "width": "150px",
            "height": "50px",
            "border-radius": "0px",
            "border": "0px",
            "margin": "2px",
            "color": "#ffffff",
            "background": "rgba(175,175,175,0.2)",
            "font-size": "12px",
            "text-align": "right"
          }
        return {
          "width": "150px",
          "height": "50px",
          "border-radius": "0px",
          "border": "0px",
          "margin": "2px",
          "color": "#000000",
          "font-size": "12px",
          "text-align": "right",
          "background": "rgba(175,175,175,0.2)"
        }
      }
    },
  },
  buyables: {
    "I": {
      cost(x) {
        let pow = new Decimal(1.5)
        let calc = new Decimal.pow(pow, x).mul(5)
        return calc;
      },
      effect(x) {
        let pow = new Decimal(1)
        var diffx1 = player[this.layer].buyables[this.id]
        var diffx2 = new Decimal(0)
        pow = pow.mul(buyableEffect("ST", "SI"))
        let calc = new Decimal.mul(pow, x)
        return calc
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var x = player[this.layer].buyables[this.id]
        return `
            ${format(x, 0)} / ∞
            ${format(x, 0)} × ${FDS(S.auxDisplay)} RAM Sticks
            +${format(S.effect)} STELLAR / sec
            C: ${format(S.cost)} STELLAR
            
             `
      },
      auxDisplay() {
        let base = new Decimal(100000)
        let pow = new Decimal(1.5)
        let x = player[this.layer].buyables["SI"]
        let calc = new Decimal.pow(pow, x).mul(base)
        return calc
      },
      buy() {
        player[this.layer].points = player[this.layer].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      unlocked() {
        return hasUpgrade("ST", "U1")
      },
      buyMax() {
        let Base = new Decimal(5)
        let Growth = new Decimal(1.5)
        let Currency = player.ST.points
        let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
        let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
        player.ST.points = player.ST.points.sub(Cost)
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "width": "275px",
            "height": "150px",
            "border-radius": "10px 0px 0px 10px",
            "border": "0px",
            "margin": "0px",
            "color": "#ffffff",
            "background": "linear-gradient(0deg, rgba(39,39,39,1) 0%, rgba(120,120,129,1) 35%, rgba(221,238,242,1) 100%)",
            "font-size": "15px"
          }
        return {
          "width": "275px",
          "height": "150px",
          "border-radius": "10px 0px 0px 10px",
          "border": "0px",
          "margin": "0px",
          "color": "#000000",
          "font-size": "15px",
          "background": "linear-gradient(180deg, rgba(78,39,39,1) 0%, rgba(125,73,73,1) 35%, rgba(247,109,109,1) 100%)"
        }
      }
    },
    "II": {
      cost(x) {
        let pow = new Decimal(4)
        let calc = new Decimal.pow(pow, x).mul(20)
        return calc;
      },
      effect(x) {
        let pow = new Decimal(1)
        pow = pow.mul(buyableEffect("ST", "SII"))
        let calc = new Decimal.mul(pow, x.add(1))
        return calc
      },
      auxDisplay() {
        let base = new Decimal(50000)
        let pow = new Decimal(2.22)
        let x = player[this.layer].buyables["SII"]
        let calc = new Decimal.pow(pow, x).mul(base)
        return calc
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var x = player[this.layer].buyables[this.id]
        return `
            ${format(x, 0)} / ∞
            ${format(x, 0)} × ${FCS(S.auxDisplay)} CPU
            +${format(S.effect)}x STELLAR / sec
            C: ${format(S.cost)} STELLAR
            
             `
      },
      buy() {
        player[this.layer].points = player[this.layer].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      unlocked() {
        return hasUpgrade("ST", "U1")
      },
      buyMax() {
        let Base = new Decimal(20)
        let Growth = new Decimal(4)
        let Currency = player.ST.points
        let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
        let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
        player.ST.points = player.ST.points.sub(Cost)
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
      },
      style() {
        if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "width": "275px",
            "height": "150px",
            "border-radius": "10px 0px 0px 10px",
            "border": "0px",
            "margin": "0px",
            "color": "#ffffff",
            "background": "linear-gradient(0deg, rgba(39,39,39,1) 0%, rgba(120,120,129,1) 35%, rgba(221,238,242,1) 100%)",
            "font-size": "15px"
          }
        return {
          "width": "275px",
          "height": "150px",
          "border-radius": "10px 0px 0px 10px",
          "border": "0px",
          "margin": "0px",
          "color": "#000000",
          "font-size": "15px",
          "background": "linear-gradient(180deg, rgba(78,39,39,1) 0%, rgba(125,73,73,1) 35%, rgba(247,109,109,1) 100%)"
        }
      }
    },
    "SI": {
      cost(x) {
        let pow = new Decimal(5)
        let calc = new Decimal.pow(pow, x).mul(500)
        return calc;
      },
      effect(x) {
        let pow = new Decimal(1)
        pow = pow.add(player.ST.sparticles.gte(tmp.ST.R2Req) ? tmp.ST.R2Bonus : 0)
        let calc = new Decimal.mul(pow, x.add(1))
        return calc
      },
      nextEffect() {
       var x = player[this.layer].buyables[this.id]
       let pow = new Decimal(1)
       pow = pow.add(player.ST.sparticles.gte(tmp.ST.R2Req) ? tmp.ST.R2Bonus : 0)
       let calc = new Decimal.mul(pow, x.add(2))
       return calc 
      },
      purchaseLimit() {
        let lim = new Decimal(1e6)
        if (hasUpgrade("ST", "BL1")) lim = lim.add(5)
        if (hasUpgrade("ST", "BL2")) lim = lim.add(5)
        if (hasUpgrade("ST", "BL3")) lim = lim.add(5)
        return lim
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var x = player[this.layer].buyables[this.id]
        return `
            ${format(x, 0)} / ${format(S.purchaseLimit, 0)}
            RAM Improvement+
            ${format(S.effect)}x >> ${format(S.nextEffect)}x
            RAM Stick base
            C: ${format(S.cost)} STELLAR
            
             `
      },
      buy() {
        player[this.layer].points = player[this.layer].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      unlocked() {
        return hasUpgrade("ST", "U2")
      },
      style() {
        if (player.ST.buyables[this.id].gte(this.purchaseLimit()))
          return {
            "width": "275px",
            "height": "150px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "0px",
            "color": "#ffffff",
            "background": "linear-gradient(0deg, rgba(48,78,39,1) 0%, rgba(80,125,73,1) 35%, rgba(109,247,134,1) 100%)",
            "font-size": "15px"
          }
        else if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "width": "275px",
            "height": "150px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "0px",
            "color": "#ffffff",
            "background": "linear-gradient(0deg, rgba(39,39,39,1) 0%, rgba(120,120,129,1) 35%, rgba(221,238,242,1) 100%)",
            "font-size": "15px"
          }
        return {
          "width": "275px",
          "height": "150px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "0px",
          "color": "#000000",
          "font-size": "15px",
          "background": "linear-gradient(180deg, rgba(78,39,39,1) 0%, rgba(125,73,73,1) 35%, rgba(247,109,109,1) 100%)"
        }
      }
    },
    "III": {
          cost(x) {
            let pow = new Decimal(1.33)
            let calc = new Decimal.pow(pow, x).mul(2500)
            return calc;
          },
          effect(x) {
            let pow = new Decimal(1)
            pow = pow.mul(buyableEffect("ST", "SIV"))
            let calc = new Decimal.mul(pow, x)
            return calc
          },
          auxDisplay() {
            let base = new Decimal(100)
            let x = player[this.layer].buyables[this.id]
            let calc = new Decimal.mul(x, base)
            return calc
          },
          display() {
            var S = tmp[this.layer].buyables[this.id]
            var x = player[this.layer].buyables[this.id]
            return `
                ${format(x, 0)} / ∞
              Xeon M${S.auxDisplay} GPU 
                +${format(S.effect)} S. PARTICLES / sec
                C: ${format(S.cost)} STELLAR
                
                 `
          },
          buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          canAfford() {
            return player[this.layer].points.gte(this.cost())
          },
          unlocked() {
            return hasUpgrade("ST", "U2")
          },
          buyMax() {
            let Base = new Decimal(2500)
            let Growth = new Decimal(1.33)
            let Currency = player.ST.points
            let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
            let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
            player.ST.points = player.ST.points.sub(Cost)
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford)
              return {
                "width": "275px",
                "height": "150px",
                "border-radius": "10px 0px 0px 10px",
                "border": "0px",
                "margin": "0px",
                "color": "#ffffff",
                "background": "linear-gradient(0deg, rgba(39,39,39,1) 0%, rgba(120,120,129,1) 35%, rgba(221,238,242,1) 100%)",
                "font-size": "15px"
              }
            return {
              "width": "275px",
              "height": "150px",
              "border-radius": "10px 0px 0px 10px",
              "border": "0px",
              "margin": "0px",
              "color": "#000000",
              "font-size": "15px",
              "background": "linear-gradient(180deg, rgba(78,39,39,1) 0%, rgba(125,73,73,1) 35%, rgba(247,109,109,1) 100%)"
            }
          }
        },
    "SII": {
      cost(x) {
        let pow = new Decimal(10)
        let calc = new Decimal.pow(pow, x).mul(10000)
        return calc;
      },
      effect(x) {
        let pow = new Decimal(1)
        pow = pow.add(player.ST.sparticles.gte(tmp.ST.R2Req) ? tmp.ST.R2Bonus : 0)
        let calc = new Decimal.mul(pow, x.add(1))
        return calc
      },
      nextEffect() {
        var x = player[this.layer].buyables[this.id]
        let pow = new Decimal(1)
        pow = pow.add(player.ST.sparticles.gte(tmp.ST.R2Req) ? tmp.ST.R2Bonus : 0)
        let calc = new Decimal.mul(pow, x.add(2))
        return calc
      },
      purchaseLimit() {
        let lim = new Decimal(1e6)
        if (hasUpgrade("ST", "BL1")) lim = lim.add(5)
        if (hasUpgrade("ST", "BL2")) lim = lim.add(5)
        if (hasUpgrade("ST", "BL3")) lim = lim.add(5)
        return lim
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var x = player[this.layer].buyables[this.id]
        return `
            ${format(x, 0)} / ${format(S.purchaseLimit, 0)}
            CPU Improvement+
            ${format(S.effect)}x >> ${format(S.nextEffect)}x
            CPU Core base
            C: ${format(S.cost)} S. PARTICLES
            
             `
      },
      buy() {
        player[this.layer].sparticles = player[this.layer].sparticles.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      canAfford() {
        return player[this.layer].sparticles.gte(this.cost())
      },
      unlocked() {
        return player.ST.sparticles.gte(0.01)
      },
      style() {
        if (player.ST.buyables[this.id].gte(this.purchaseLimit()))
          return {
            "width": "275px",
            "height": "150px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "0px",
            "color": "#ffffff",
            "background": "linear-gradient(0deg, rgba(48,78,39,1) 0%, rgba(80,125,73,1) 35%, rgba(109,247,134,1) 100%)",
            "font-size": "15px"
          }
        else if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "width": "275px",
            "height": "150px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "0px",
            "color": "#ffffff",
            "background": "linear-gradient(0deg, rgba(39,39,39,1) 0%, rgba(120,120,129,1) 35%, rgba(221,238,242,1) 100%)",
            "font-size": "15px"
          }
        return {
          "width": "275px",
          "height": "150px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "0px",
          "color": "#000000",
          "font-size": "15px",
          "background": "linear-gradient(180deg, rgba(78,39,39,1) 0%, rgba(125,73,73,1) 35%, rgba(247,109,109,1) 100%)"
        }
      }
    },
    "SIII": {
      cost(x) {
        let pow = new Decimal(10)
        let calc = new Decimal.pow(pow, x).mul(25000)
        return calc;
      },
      effect(x) {
        let base = new Decimal(0.1)
        let calc = new Decimal(1).add(Decimal.mul(x, base))
        return calc
      },
      nextEffect() {
        var x = player[this.layer].buyables[this.id]
        let base = new Decimal(0.1)
        let calc = new Decimal(1).add(Decimal.mul(x.add(1), base))
        return calc
      },
      purchaseLimit() {
        let lim = new Decimal(1e6)
        return lim
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var x = player[this.layer].buyables[this.id]
        return `
            ${format(x, 0)} / ${format(S.purchaseLimit, 0)}
            Additional GPU
            RANK 0 REWARDS are
            x${format(S.effect, 1)} >> x${format(S.nextEffect, 1)} better
            C: ${format(S.cost)} S. PARTICLES
            
             `
      },
      buy() {
        player[this.layer].sparticles = player[this.layer].sparticles.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      canAfford() {
        return player[this.layer].sparticles.gte(this.cost())
      },
      unlocked() {
        return hasUpgrade("ST", "U2")
      },
      style() {
        if (player.ST.buyables[this.id].gte(this.purchaseLimit()))
          return {
            "width": "275px",
            "height": "150px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "0px",
            "color": "#ffffff",
            "background": "linear-gradient(0deg, rgba(48,78,39,1) 0%, rgba(80,125,73,1) 35%, rgba(109,247,134,1) 100%)",
            "font-size": "15px"
          }
        else if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "width": "275px",
            "height": "150px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "0px",
            "color": "#ffffff",
            "background": "linear-gradient(0deg, rgba(39,39,39,1) 0%, rgba(120,120,129,1) 35%, rgba(221,238,242,1) 100%)",
            "font-size": "15px"
          }
        return {
          "width": "275px",
          "height": "150px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "0px",
          "color": "#000000",
          "font-size": "15px",
          "background": "linear-gradient(180deg, rgba(78,39,39,1) 0%, rgba(125,73,73,1) 35%, rgba(247,109,109,1) 100%)"
        }
      }
    },
    "IV": {
          cost(x) {
            let pow = new Decimal(5)
            let calc = new Decimal.pow(pow, x).mul(50000)
            return calc;
          },
          effect(x) {
            let pow = new Decimal(1.5)
            let calc = new Decimal.pow(pow, x)
            return calc
          },
          auxDisplay() {
            let base = new Decimal(2500000)
            let pow = new Decimal(1.001)
            let x = player[this.layer].buyables["IV"]
            let calc = new Decimal.pow(pow, x).mul(base)
            return calc
          },
          purchaseLimit() {
        let lim = new Decimal(1e9)
        return lim
      },
          display() {
            var S = tmp[this.layer].buyables[this.id]
            var x = player[this.layer].buyables[this.id]
            return `
                ${format(x, 0)} / ${format(S.purchaseLimit, 3)}
              ${FDS(S.auxDisplay)} SSD
              x${format(S.effect)} resources
              C: ${format(S.cost)} STELLAR
                
                 `
          },
          buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          canAfford() {
            return player[this.layer].points.gte(this.cost())
          },
          unlocked() {
            return hasUpgrade("ST", "U3")
          },
          buyMax() {
            let Base = new Decimal(50000)
            let Growth = new Decimal(1.1)
            let Currency = player.ST.points
            let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
            let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
          },
          style() {
            if (player.ST.buyables[this.id].gte(this.purchaseLimit()))
              return {
                "width": "275px",
                "height": "150px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "0px",
                "color": "#ffffff",
                "background": "linear-gradient(0deg, rgba(48,78,39,1) 0%, rgba(80,125,73,1) 35%, rgba(109,247,134,1) 100%)",
                "font-size": "15px"
              }
            else if (tmp[this.layer].buyables[this.id].canAfford)
              return {
                "width": "275px",
                "height": "150px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "0px",
                "color": "#ffffff",
                "background": "linear-gradient(0deg, rgba(39,39,39,1) 0%, rgba(120,120,129,1) 35%, rgba(221,238,242,1) 100%)",
                "font-size": "15px"
              }
            return {
              "width": "275px",
              "height": "150px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "0px",
              "color": "#000000",
              "font-size": "15px",
              "background": "linear-gradient(180deg, rgba(78,39,39,1) 0%, rgba(125,73,73,1) 35%, rgba(247,109,109,1) 100%)"
            }
          }
        },
    "V": {
      cost(x) {
        let pow = new Decimal(1.1)
        let calc = new Decimal.pow(pow, x).mul(10e6)
        return calc;
      },
      effect(x) {
        let base = new Decimal(1)
        let pow = new Decimal(1.005)
        let calc = new Decimal.pow(pow, x)
        base = base.add(calc)
        return calc
      },
      auxDisplay() {
        let base = new Decimal(1)
        let pow = new Decimal(1.005)
        let x = player[this.layer].buyables["V"]
        let calc = new Decimal.pow(pow, x).mul(base)
        return calc
      },
      purchaseLimit() {
        let lim = new Decimal(250)
        lim = lim.add(hasUpgrade("ST", "BL1") ? 50 : 0)
        lim = lim.add(hasUpgrade("ST", "BL2") ? 50 : 0)
        lim = lim.add(hasUpgrade("ST", "BL3") ? 100 : 0)
        lim = lim.add(hasUpgrade("ST", "BL4") ? 150 : 0)
        return lim
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var x = player[this.layer].buyables[this.id]
        return `
                ${format(x, 0)} / ${format(S.purchaseLimit, 3)}
              ${formatTime(S.auxDisplay)} clock speed
              ${format((S.effect).mul(100))}% TICKSPEED
              C: ${format(S.cost)} STELLAR
                
                 `
      },
      buy() {
        player[this.layer].points = player[this.layer].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      unlocked() {
        return hasUpgrade("ST", "U3")
      },
      buyMax() {
        let Base = new Decimal(50000)
        let Growth = new Decimal(1.1)
        let Currency = player.ST.points
        let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
        let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
      },
      style() {
        if (player.ST.buyables[this.id].gte(this.purchaseLimit()))
          return {
            "width": "275px",
            "height": "150px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "0px",
            "color": "#ffffff",
            "background": "linear-gradient(0deg, rgba(48,78,39,1) 0%, rgba(80,125,73,1) 35%, rgba(109,247,134,1) 100%)",
            "font-size": "15px"
          }
        else if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "width": "275px",
            "height": "150px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "0px",
            "color": "#ffffff",
            "background": "linear-gradient(0deg, rgba(39,39,39,1) 0%, rgba(120,120,129,1) 35%, rgba(221,238,242,1) 100%)",
            "font-size": "15px"
          }
        return {
          "width": "275px",
          "height": "150px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "0px",
          "color": "#000000",
          "font-size": "15px",
          "background": "linear-gradient(180deg, rgba(78,39,39,1) 0%, rgba(125,73,73,1) 35%, rgba(247,109,109,1) 100%)"
        }
      }
    },
    "SIV": {
      cost(x) {
        let pow = new Decimal(5)
        let calc = new Decimal.pow(pow, x).mul(1e12)
        return calc;
      },
      effect(x) {
        let base = new Decimal(0.5)
        let calc = new Decimal(1).add(Decimal.mul(x, base))
        return calc
      },
      nextEffect() {
        var x = player[this.layer].buyables[this.id]
        let base = new Decimal(0.5)
        let calc = new Decimal(1).add(Decimal.mul(x.add(1), base))
        return calc
      },
      purchaseLimit() {
        let lim = new Decimal(1e6)
        return lim
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var x = player[this.layer].buyables[this.id]
        return `
            ${format(x, 0)} / ${format(S.purchaseLimit, 0)}
            GPU Improvement+
            x${format(S.effect, 1)} >> x${format(S.nextEffect, 1)} GPU Thread base
            C: ${format(S.cost)} S. PARTICLES
            
             `
      },
      buy() {
        player[this.layer].sparticles = player[this.layer].sparticles.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
     canAfford() {
        return player[this.layer].sparticles.gte(this.cost())
      },
      unlocked() {
        return hasUpgrade("ST", "U4.1")
      },
      style() {
        if (player.ST.buyables[this.id].gte(this.purchaseLimit()))
          return {
            "width": "275px",
            "height": "150px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "0px",
            "color": "#ffffff",
            "background": "linear-gradient(0deg, rgba(48,78,39,1) 0%, rgba(80,125,73,1) 35%, rgba(109,247,134,1) 100%)",
            "font-size": "15px"
          }
        else if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "width": "275px",
            "height": "150px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "0px",
            "color": "#ffffff",
            "background": "linear-gradient(0deg, rgba(39,39,39,1) 0%, rgba(120,120,129,1) 35%, rgba(221,238,242,1) 100%)",
            "font-size": "15px"
          }
        return {
          "width": "275px",
          "height": "150px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "0px",
          "color": "#000000",
          "font-size": "15px",
          "background": "linear-gradient(180deg, rgba(78,39,39,1) 0%, rgba(125,73,73,1) 35%, rgba(247,109,109,1) 100%)"
        }
      }
    },
    "SV": {
      cost(x) {
        let pow = new Decimal(10)
        let calc = new Decimal.pow(pow, x).mul(1e12)
        return calc;
      },
      effect(x) {
        let base = new Decimal(0.1)
        let calc = new Decimal(1).add(Decimal.mul(x, base))
        return calc
      },
      nextEffect() {
        var x = player[this.layer].buyables[this.id]
        let base = new Decimal(0.1)
        let calc = new Decimal(1).add(Decimal.mul(x.add(1), base))
        return calc
      },
      purchaseLimit() {
        let lim = new Decimal(1e6)
        return lim
      },
      display() {
        var S = tmp[this.layer].buyables[this.id]
        var x = player[this.layer].buyables[this.id]
        return `
            ${format(x, 0)} / ${format(S.purchaseLimit, 0)}
            Improved GPU TMU
            RANK 1 REWARDS are
            x${format(S.effect, 1)} >> x${format(S.nextEffect, 1)} better
            C: ${format(S.cost)} S. PARTICLES
            
             `
      },
      buy() {
        player[this.layer].sparticles = player[this.layer].sparticles.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      canAfford() {
        return player[this.layer].sparticles.gte(this.cost())
      },
      unlocked() {
        return hasUpgrade("ST", "U4.1")
      },
      style() {
        if (player.ST.buyables[this.id].gte(this.purchaseLimit()))
          return {
            "width": "275px",
            "height": "150px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "0px",
            "color": "#ffffff",
            "background": "linear-gradient(0deg, rgba(48,78,39,1) 0%, rgba(80,125,73,1) 35%, rgba(109,247,134,1) 100%)",
            "font-size": "15px"
          }
        else if (tmp[this.layer].buyables[this.id].canAfford)
          return {
            "width": "275px",
            "height": "150px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "0px",
            "color": "#ffffff",
            "background": "linear-gradient(0deg, rgba(39,39,39,1) 0%, rgba(120,120,129,1) 35%, rgba(221,238,242,1) 100%)",
            "font-size": "15px"
          }
        return {
          "width": "275px",
          "height": "150px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "0px",
          "color": "#000000",
          "font-size": "15px",
          "background": "linear-gradient(180deg, rgba(78,39,39,1) 0%, rgba(125,73,73,1) 35%, rgba(247,109,109,1) 100%)"
        }
      }
    },
  
      "EI": {
        cost(x) {
          let pow = new Decimal(4)
          let calc = new Decimal.pow(pow, x).mul(100)
          return calc;
        },
        effect(x) {
          let base = new Decimal(2)
          let calc = new Decimal(1).mul(Decimal.pow(base, x))
          return calc
        },
        nextEffect() {
          var x = player[this.layer].buyables[this.id]
          let base = new Decimal(2)
          let calc = new Decimal(1).mul(Decimal.pow(base, x.add(1)))
          return calc
        },
        purchaseLimit() {
          let lim = new Decimal(1e6)
          return lim
        },
        display() {
          var S = tmp[this.layer].buyables[this.id]
          var x = player[this.layer].buyables[this.id]
          return `
              ${format(x, 0)} / ${format(S.purchaseLimit, 0)}
              Efficient Production
              Gain as much as
              x${format(S.effect, 1)} >> x${format(S.nextEffect, 1)} Energy
              C: ${format(S.cost)} ENERGY
              
               `
        },
        buy() {
          player[this.layer].sframenergy = player[this.layer].sframenergy.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        canAfford() {
          return player[this.layer].sframenergy.gte(this.cost())
        },
        unlocked() {
          return player.ST.sframeboosters.gte(1)
        },
        style() {
          if (player.ST.buyables[this.id].gte(this.purchaseLimit()))
            return {
              "width": "275px",
              "height": "150px",
              "border-radius": "0px",
              "border": "0px",
              "margin": "0px",
              "color": "#ffffff",
              "background": "rgba(50, 250, 50, 0.5)"
            }
          else if (tmp[this.layer].buyables[this.id].canAfford)
            return {
              "width": "275px",
              "height": "150px",
              "border-radius": "0px",
              "border": "0px",
              "margin": "0px",
              "color": "#ffffff",
              "background": "rgba(100, 100, 100, 0.5)",
              "font-size": "15px"
            }
          return {
            "width": "275px",
            "height": "150px",
            "border-radius": "0px",
            "border": "0px",
            "margin": "0px",
            "color": "#000000",
            "font-size": "15px",
            "background": "rgba(50, 50, 50, 0.5)"
          }
        }
      },
      "EII": {
        cost(x) {
          let pow = new Decimal(10)
          let calc = new Decimal.pow(pow, x).mul(500)
          return calc;
        },
        effect(x) {
          let base = new Decimal(2)
          let calc = new Decimal(5).mul(Decimal.pow(base, x))
          return calc
        },
        nextEffect() {
          var x = player[this.layer].buyables[this.id]
          let base = new Decimal(2)
          let calc = new Decimal(5).mul(Decimal.pow(base, x.add(1)))
          return calc
        },
        purchaseLimit() {
          let lim = new Decimal(1e6)
          return lim
        },
        display() {
          var S = tmp[this.layer].buyables[this.id]
          var x = player[this.layer].buyables[this.id]
          return `
              ${format(x, 0)} / ${format(S.purchaseLimit, 0)}
              Video Memory+
              Increase the ACCELERANT-L
              ${format(S.effect, 1)}u >> ${format(S.nextEffect, 1)}u
              C: ${format(S.cost)} ENERGY
              
               `
        },
        buy() {
          player[this.layer].sframenergy = player[this.layer].sframenergy.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        canAfford() {
          return player[this.layer].sframenergy.gte(this.cost())
        },
        unlocked() {
          return player.ST.sframeboosters.gte(1)
        },
        style() {
          if (player.ST.buyables[this.id].gte(this.purchaseLimit()))
            return {
              "width": "275px",
              "height": "150px",
              "border-radius": "0px",
              "border": "0px",
              "margin": "0px",
              "color": "#ffffff",
              "background": "rgba(50, 250, 50, 0.5)"
            }
          else if (tmp[this.layer].buyables[this.id].canAfford)
            return {
              "width": "275px",
              "height": "150px",
              "border-radius": "0px",
              "border": "0px",
              "margin": "0px",
              "color": "#ffffff",
              "background": "rgba(100, 100, 100, 0.5)",
              "font-size": "15px"
            }
          return {
            "width": "275px",
            "height": "150px",
            "border-radius": "0px",
            "border": "0px",
            "margin": "0px",
            "color": "#000000",
            "font-size": "15px",
            "background": "rgba(50, 50, 50, 0.5)"
          }
        }
      },
  },
  upgrades:  {
    "CORE": SKnode({
          layer: "ST",
          currency: "points",
          unlocked() { return true },
          display() { return `CORE` },
          cost() { return new Decimal(0) },
          tooltip() { return `This is where it all begins<br>Needs ${format(new Decimal(0))} Stellar` },
          branches: "CORE"
        }),
    
    "U1": SKnode({
        layer: "ST",
        currency: "points",
        unlocked() { return hasUpgrade("ST", "CORE") },
        canClick() { return hasUpgrade("ST", "CORE") },
        display() { return `EX` },
        cost () { return hasUpgrade("ST", "CORE") ? new Decimal(5) : new Decimal(Infinity) },
        tooltip() { return hasUpgrade("ST", "CORE") ? `Unlock some upgrades<br>Needs ${format(new Decimal(5))} Stellar` : `????????`},
        branches: "CORE"
      }),
    "U2": SKnode({
          layer: "ST",
          currency: "points",
          unlocked() { return hasUpgrade("ST", "U1") },
          canClick() { return hasUpgrade("ST", "CORE") },
          display() { return `EX+` },
          cost() { return hasUpgrade("ST", "U1") ? new Decimal(1500) : new Decimal(Infinity) },
          tooltip() { return hasUpgrade("ST", "U1") ? `Unlock a new currency + a new row of upgrades<br>Needs ${format(new Decimal(1500))} Stellar` : `????????` },
          branches: "U1"
        }),
    "U3": SKnode({
      layer: "ST",
      currency: "points",
      unlocked() { return hasUpgrade("ST", "U2") },
      canClick() { return hasUpgrade("ST", "CORE") },
      display() { return `EX++` },
      cost() { return hasUpgrade("ST", "U2") ? new Decimal(1e6) : new Decimal(Infinity) },
      tooltip() { return hasUpgrade("ST", "U2") ? `Unlock a new row of upgrades<br>Needs ${format(new Decimal(1e6))} Stellar` : `????????` },
      branches: "U2"
    }),
    "U4": SKnode({
      layer: "ST",
      currency: "points",
      unlocked() { return hasUpgrade("ST", "U3") },
      canClick() { return hasUpgrade("ST", "CORE") },
      display() { return `EX+<sup>3</sup>` },
      cost() { return hasUpgrade("ST", "U3") ? new Decimal(3e9) : new Decimal(Infinity) },
      tooltip() { return hasUpgrade("ST", "U3") ? `Unlock a new currency<br>Needs ${format(new Decimal(3e9))} Stellar` : `????????` },
      branches: "U3"
    }),
    "U4.1": SKnode({
      layer: "ST",
      currency: "points",
      unlocked() { return hasUpgrade("ST", "U4") },
      canClick() { return hasUpgrade("ST", "CORE") },
      display() { return `EX+<sup>S</sup>` },
      cost() { return hasUpgrade("ST", "U4") ? new Decimal(1e22) : new Decimal(Infinity) },
      tooltip() { return hasUpgrade("ST", "U4") ? `Unlock new buyables<br>Needs ${format(new Decimal(1.1e22))} Stellar` : `????????` },
      branches: "U4"
    }),
    "U4.2": SKnode({
      layer: "ST",
      currency: "points",
      unlocked() { return hasUpgrade("ST", "U4.1") },
      canClick() { return hasUpgrade("ST", "CORE") },
      display() { return `EX+<sup>S+</sup>` },
      cost() { return hasUpgrade("ST", "U4.1") ? new Decimal(1e26) : new Decimal(Infinity) },
      tooltip() { return hasUpgrade("ST", "U4.1") ? `Unlock GRID D , GRID E and GRID F<br>Needs ${format(new Decimal(1e26))} Stellar` : `????????` },
      branches: "U4"
    }),
    "U5": SKnode({
      layer: "ST",
      currency: "points",
      unlocked() { return hasUpgrade("ST", "U4") },
      canClick() { return hasUpgrade("ST", "CORE") },
      display() { return `EX+<sup>4</sup>` },
      cost() { return hasUpgrade("ST", "U4") ? new Decimal(1.18e38) : new Decimal(Infinity) },
      tooltip() { return hasUpgrade("ST", "U4") ? `Unlock a new layer ( soon )<br>Buying it also marks VEC 0.5 endgame<br>Needs ${format(new Decimal(1.1e38))} Stellar` : `????????` },
      branches: "U4"
    }),

    
    
    "RE1": SKnode({
      layer: "ST",
      currency: "points",
      unlocked() { return hasUpgrade("ST", "U2") },
      canClick() { return hasUpgrade("ST", "CORE") },
      display() { return `RE` },
      cost() { return hasUpgrade("ST", "U2") ? new Decimal(1e7) : new Decimal(Infinity) },
      tooltip() { return hasUpgrade("ST", "U2") ? `1.25x Stellar every OoM(10) of it<br>Currently ${format(tmp.ST.RE1Bonus)}x<br>Needs ${format(new Decimal(1e7))} Stellar` : `????????` },
      branches: "U2"
    }),
    "RE2": SKnode({
      layer: "ST",
      currency: "points",
      unlocked() { return hasUpgrade("ST", "RE1") },
      canClick() { return hasUpgrade("ST", "CORE") },
      display() { return `RE+` },
      cost() { return hasUpgrade("ST", "RE1") ? new Decimal(1e14) : new Decimal(Infinity) },
      tooltip() { return hasUpgrade("ST", "RE1") ? `Gain 1.01x more Stellar Particles per log2(Stellar)<br>Currently ${format(tmp.ST.RE2Bonus)}x<br>Needs ${format(new Decimal(1e14))} Stellar` : `????????` },
      branches: "RE1"
    }),

    "BL1": SKnode({
      layer: "ST",
      currency: "points",
      unlocked() { return hasUpgrade("ST", "U4") },
      canClick() { return hasUpgrade("ST", "CORE") },
      display() { return `Lim` },
      cost() { return hasUpgrade("ST", "U4") ? new Decimal(1e15) : new Decimal(Infinity) },
      tooltip() { return hasUpgrade("ST", "U4") ? `Increase the limit of Tickspeed by 50<br>Needs ${format(new Decimal(1e15))} Stellar` : `????????` },
      branches: "U4"
    }),
    "BL2": SKnode({
      layer: "ST",
      currency: "points",
      unlocked() { return hasUpgrade("ST", "BL1") },
      canClick() { return hasUpgrade("ST", "CORE") },
      display() { return `Lim+` },
      cost() { return hasUpgrade("ST", "BL1") ? new Decimal(1e19) : new Decimal(Infinity) },
      tooltip() { return hasUpgrade("ST", "BL1") ? `Increase the limit of Tickspeed by 50<br>Needs ${format(new Decimal(1e19))} Stellar` : `????????` },
      branches: "BL1"
    }),
    "BL3": SKnode({
      layer: "ST",
      currency: "points",
      unlocked() { return hasUpgrade("ST", "AT2") },
      canClick() { return hasUpgrade("ST", "CORE") },
      display() { return `3Lim` },
      cost() { return hasUpgrade("ST", "AT2") ? new Decimal(1e30) : new Decimal(Infinity) },
      tooltip() { return hasUpgrade("ST", "AT2") ? `Increase the limit of Tickspeed by 100<br>Needs ${format(new Decimal(1e30))} Stellar` : `????????` },
      branches: "AT2"
    }),
    "BL4": SKnode({
      layer: "ST",
      currency: "points",
      unlocked() { return hasUpgrade("ST", "BL3") },
      canClick() { return hasUpgrade("ST", "CORE") },
      display() { return `4Lim` },
      cost() { return hasUpgrade("ST", "BL3") ? new Decimal(1e33) : new Decimal(Infinity) },
      tooltip() { return hasUpgrade("ST", "BL3") ? `Increase the limit of Tickspeed by 150<br>Needs ${format(new Decimal(1e33))} Stellar` : `????????` },
      branches: "BL3"
    }),

    "AT1": SKnode({
      layer: "ST",
      currency: "points",
      unlocked() { return hasUpgrade("ST", "BL1") },
      canClick() { return hasUpgrade("ST", "CORE") },
      display() { return `ATa` },
      cost() { return hasUpgrade("ST", "BL1") ? new Decimal(1e16) : new Decimal(Infinity) },
      tooltip() { return hasUpgrade("ST", "BL1") ? `Automatically buys 1st row<br>Needs ${format(new Decimal(1e16))} Stellar` : `????????` },
      branches: "BL1"
    }),
    "AT2": SKnode({
      layer: "ST",
      currency: "points",
      unlocked() { return hasUpgrade("ST", "BL1") },
      canClick() { return hasUpgrade("ST", "CORE") },
      display() { return `ATb` },
      cost() { return hasUpgrade("ST", "BL1") ? new Decimal(1e22) : new Decimal(Infinity) },
      tooltip() { return hasUpgrade("ST", "BL1") ? `Automatically buys 2nd row<br>Needs ${format(new Decimal(1e22))} Stellar` : `????????` },
      branches: "U1"
    }),
    
    // dummy nodes, cant be bought
    "F[-1, -1]": SKfiller({
      unlocked() { return hasUpgrade("ST", "BL1") }
    }),
    "F[-1, -2]": SKfiller({
      unlocked() { return hasUpgrade("ST", "U1") }
    }),
    "F[-1, -3]": SKfiller({
      unlocked() { return hasUpgrade("ST", "AT2") }
    }),
    "F[-1, -4]": SKfiller({
      unlocked() { return hasUpgrade("ST", "BL3") }
    }),
    "F[-1, 1]": SKfiller({
      unlocked() { return hasUpgrade("ST", "U1") }
    }),
    "F[-2, -1]": SKfiller({
      unlocked() { return hasUpgrade("ST", "U2") }
    }),
    "F[-3, 1]": SKfiller({
      unlocked() { return hasUpgrade("ST", "U4.1") }
    }),
    "F[-3, -1]": SKfiller({
      unlocked() { return hasUpgrade("ST", "BL1") }
    }),
    "F[-5, 1]": SKfiller({
      unlocked() { return hasUpgrade("ST", "U4") }
    }),
    "F[-5, 2]": SKfiller({
      unlocked() { return hasUpgrade("ST", "BL1") }
    }),
    "F[-5, 3]": SKfiller({
      unlocked() { return hasUpgrade("ST", "U4") }
    }),
    "F[-2, -2]": SKfiller({
      unlocked() { return hasUpgrade("ST", "RE1") }
    }),
    "F[-2, -3]": SKfiller({
      unlocked() { return hasUpgrade("ST", "RE2") }
    }),
    "F[-2, -4]": SKfiller({
      unlocked() { return hasUpgrade("ST", "RE3") }
    })
  },
  tabFormat: {
    "Main": {
      content: [
        ['raw-html', () => {
          if (player.ST.points.gte(1.78e308)) return `You have inf STELLAR`
          else return `You have ${format(player.ST.points, 0)} STELLAR ( +${format(tmp.ST.resetGain)} / sec ) `
        }],
        ['raw-html', () => {
         if (player.ST.sparticles.gte(0.01)) return `You have ${format(player.ST.sparticles, 0)} STELLAR PARTICLES ( +${format(tmp.ST.calcSparticles)} / sec )`
          else ``
        }],
        ['raw-html', () => {if (hasUpgrade("ST", "U4")) return `You have ${format(player.ST.sframe, 4)} STELLAR ACCELERANT ( ${format(tmp.ST.calcSFRAME)}x / sec ) `
          else ``
        }],
        "blank",
        ['raw-html', () => {if (player.ST.buyables["V"].gte(1)) return `Time moves at speed of ${formatTime(tmp.ST.buyables["V"].auxDisplay, 3)} instead usual 1s<br>
        Which translates as ${format(tmp.ST.buyables["V"].effect, 3)}x to resources`
          else ``
        }],
        "blank",

  ["column", [
    ["row", [["buyable", "I"], ["clickable", "MaxI"], ["blank", "2px"], ["buyable", "II"], ["clickable", "MaxII"]]],
    ["blank", "5px"],
    ["row", [["buyable", "III"], ["clickable", "MaxIII"], ["blank", "2px"], ["buyable", "SI"], ["blank", "2px"], ["buyable", "SII"], ["blank", "2px"], ["buyable", "SIII"]]],
    ["blank", "5px"],
    ["row", [["buyable", "IV"], ["blank", "2px"], ["buyable", "V"], ["blank", "2px"], ["buyable", "SIV"], ["blank", "2px"], ["buyable", "SV"]]],
    
  ]]

          ]
    },
    "S.P Rewards": {
      unlocked() {return hasUpgrade("ST", "U2")},
      content: [        ['raw-html', () => {return `You have ${format(player.ST.sparticles, 0)} STELLAR PARTICLES `}],
      "blank",
      "blank",
      "blank",
      ['raw-html', () => {return `RANK 0 REWARDS ( At ${format(tmp.ST.rank0req)} STELLAR PARTICLES ) `}],
      ['raw-html', () => { 
        return `${format(tmp.ST.R0Bonus)}x STELLAR` }],
      "blank",
      "blank",
      "blank",     
      ['raw-html', () => { return `RANK 1 REWARDS ( At ${format(tmp.ST.R1Req)} STELLAR PARTICLES ) ` }],
      ['raw-html', () => { if (player.ST.sparticles.gte(tmp.ST.R1Req)) { return `${format(tmp.ST.R1Bonus)}x STELLAR PARTICLES` } else { return`??????????` }}],
      "blank",
      "blank",
      "blank",
      ['raw-html', () => { return `RANK 2 REWARDS ( At ${format(tmp.ST.R2Req)} STELLAR PARTICLES ) ` }],
      ['raw-html', () => { if (player.ST.sparticles.gte(tmp.ST.R2Req)) { return `+${format(tmp.ST.R2Bonus)} bonus base to RAM and CPU Improvement` } else { return `??????????` } }],
      "blank",
      "blank",
      "blank",
      ['raw-html', () => { return `RANK 3 REWARDS ( At ${format(tmp.ST.R3Req)} STELLAR PARTICLES ) ` }],
      ['raw-html', () => { if (player.ST.sparticles.gte(tmp.ST.R3Req)) { return `${format(tmp.ST.R3Bonus)}x STELLAR ACCELERANT ENERGY` } else { return `??????????` } }],
      ],
    },
      "Upgrades": {
        unlocked() { player.ST.points.gte(1) || hasUpgrade("ST", "CORE") },
      content: [
        ['raw-html', () => {return `You have ${format(player.ST.points, 0)} STELLAR ( +${format(tmp.ST.resetGain)} / sec ) `}],
        ['raw-html', () => {if (player.ST.sparticles.gte(0.01)) return `You have ${format(player.ST.sparticles, 0)} STELLAR PARTICLES ( +${format(tmp.ST.calcSparticles)} / sec ) `
          else ``
        }],
        ['raw-html', () => {if (hasUpgrade("ST", "U4")) return `You have ${format(player.ST.sframe, 0)} STELLAR ACCELERANT ( ${format(tmp.ST.calcSFRAME)}x / sec ) `
          else ``
        }],
        "blank",
        "blank",
        ["row", [["upgrade", "CORE"]]],
        "blank",
        ["row", [["upgrade", "F[-1, -4]"],["upgrade", "F[-1, -3]"],["upgrade", "F[-1, -2]"],["upgrade", "F[-1, -1]"],["upgrade", "U1"],["upgrade", "F[-1, 1]"],["upgrade", "AT2"], ["upgrade", "BL3"], ["upgrade", "BL4"]]],
        "blank",
        ["row", [["upgrade", "F[-2, -2]"],["upgrade", "F[-2, -1]"], ["upgrade", "U2"], ["upgrade", "RE1"], ["upgrade", "RE2"]]],
        "blank",
        ["row", [["upgrade", "F[-3, 1]"], ["upgrade", "AT1"],[ "upgrade", "U3"], ["upgrade", "U4.2"],  ["upgrade", "F[-3, -1]"]]],
        "blank",
        ["row", [["upgrade", "U4"]]],
        "blank",
        ["row", [["upgrade", "F[-5, 3]"],["upgrade", "BL2"], ["upgrade", "BL1"], ["upgrade", "U5"], ["upgrade", "U4.1"], ["upgrade", "F[-5, 1]"], ["upgrade", "F[-5, 2]"]]],
        "blank",
]
    },
    "Boosters": {
      unlocked() { return player.ST.sframe.gte(5) || player.ST.sframeboosters.gte(1) },
      content: [
        ['raw-html', () => {if (hasUpgrade("ST", "U4")) return `You have ${format(player.ST.sframe, 4)} STELLAR ACCELERANT ( ${format(tmp.ST.calcSFRAME)}x / sec ) `
          else ``
        }],
        ['raw-html', () => { return `You have ${format(player.ST.sframeboosters, 0)} STELLAR ACCELERANT BOOSTERS`
        }],
        ['raw-html', () => { return `You have ${format(player.ST.sframenergy, 0)} STELLAR ACCELERANT ENERGY ( +${format(tmp.ST.SFRAMEEnergyCalc)} / sec )`
        }],
        "blank",
        ["clickable", "BoosterReset"],
        "blank",
        "blank",
        "blank",
        ["row", [["clickable", "Display1"], ["clickable", "Invest1"]]],
        ["row", [["clickable", "Display2"], ["clickable", "Invest2"]]],
        ["row", [["clickable", "Display3"], ["clickable", "Invest3"]]],
        ["row", [["clickable", "Display4"], ["clickable", "Invest4"]]],
        ["row", [["clickable", "Display5"], ["clickable", "Invest5"]]],
        ["row", [["clickable", "Display6"], ["clickable", "Invest6"]]],
        "blank",
        ["row", [["buyable", "EI"], ["blank", "2px"], ["buyable", "EII"]]]
        ]
    }
  }
})
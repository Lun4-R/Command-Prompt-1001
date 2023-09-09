/*addLayer("XLM", {
    name: "Stellar", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ST", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    // Main Currency 
		points: new Decimal(0),
		
		// Ethereum Set
		ethereum: new Decimal(0),
		
		// Bitcoin Set
		bitcoin: new Decimal(0),
		bitcoinState: new Decimal(0),
		bitcoinTo Get: new Decimal(0),
		
		// Tether Set
		tether: new Decimal(0),
		tetherState: new Decimal(0),
		tetherToGet: new Decimal(0),
		
		// Cardano Set
		cardano: new Decimal(0),
		cardanoState: new Decimal(0),
		cardanoToGet: new Decimal(0),
		
		// Tier Set
		tier: new Decimal(0),
		tierRequirement: new Decimal(1e16),
		
		// Tickspeed Set
		tickspeed: new Decimal(1),
		timePoints: new Decimal(0),
		
		// Time Played in this layer
		timeplayed: new Decimal(0),
		interval: new Decimal(1),
		
		// Miscellaneous 
		hertz: new Decimal(1),
		version: new Decimal(1)
		
		
    }},
    color: "#ffffff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Stellar", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.mul(buyableEffect("XLM", 13))
        mult = mult.mul(buyableEffect("XLM", 14))
        mult = mult.mul(buyableEffect("XLM", 15))
        mult = mult.mul(buyableEffect("XLM", 18))
        mult = mult.mul(tmp.XLM.bitcoinToStellar)
        mult = mult.mul(tmp.XLM.tetherToStellar)
        mult = mult.mul(tmp.XLM.cardanoToEverything)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    GenerateEthereum() {
      base = new Decimal(0)
      base = base.add(buyableEffect("XLM", 12))
      base = base.mul(buyableEffect("XLM", 14))
      base = base.mul(buyableEffect("XLM", 15))
      base = base.mul(tmp.XLM.cardanoToEverything)
      return base
    },
    
    passiveGeneration() {
      let gen = new Decimal(1) 
      return gen;
    },
    
    bitcoinToStellar() {
      let base = player.XLM.bitcoin;
      let effect2 = new Decimal.pow(base, 0.7)
      let effect3 = new Decimal.add(effect2, 1)
      return effect3;
    },
    
    bitcoinReset() {
      player.points = new Decimal(0)
      player.XLM.points = new Decimal(0)
      player.XLM.ethereum = new Decimal(0)
      
      player.XLM.buyables[11] = new Decimal(0)
      player.XLM.buyables[12] = new Decimal(0)
      player.XLM.buyables[13] = new Decimal(0)
      
      player.XLM.bitcoin = player.XLM.bitcoin.add(player.XLM.bitcoinToGet)
      player.XLM.bitcoinToGet = new Decimal(0)
      player.XLM.bitcoinState = player.XLM.bitcoinState.add(1)
    },
    
    bitcoinGain() {
      let base = player.points
      let gain1 = new Decimal.div(base, 1e6)
      let gain2 = new Decimal.pow(gain1, 0.1)
      gain2 = gain2.mul(buyableEffect("XLM", 15))
      gain2 = gain2.mul(buyableEffect("XLM", 16))
      gain2 = gain2.mul(tmp.XLM.cardanoToEverything)
      return gain2
    },
    
    tetherToStellar() {
      let base = player.XLM.tether;
      let effect2 = new Decimal.pow(base, 1.5)
      let effect3 = new Decimal.add(effect2, 1)
      return effect3;
    },
    
    tetherReset() {
      player.points = new Decimal(0)
      player.XLM.points = new Decimal(0)
      player.XLM.ethereum = new Decimal(0)
      player.XLM.bitcoin = new Decimal(0)
      player.XLM.bitcoinState = new Decimal(0)
      
      player.XLM.buyables[11] = new Decimal(0)
      player.XLM.buyables[12] = new Decimal(0)
      player.XLM.buyables[13] = new Decimal(0)
      
      player.XLM.tether = player.XLM.tether.add(player.XLM.tetherToGet)
      player.XLM.tetherToGet = new Decimal(0)
      player.XLM.tetherState = player.XLM.tetherState.add(1)
    },
    
    tetherGain() {
      let Base = player.points
      let GainI = new Decimal.div(Base, 1e9)
      let GainII = new Decimal.pow(GainI, 0.075)
      GainII = GainII.mul(tmp.XLM.cardanoToEverything)
      return GainII
    },
    
    cardanoToEverything() {
      let base = player.XLM.cardano;
      let effect2 = new Decimal.pow(base, 0.7)
      let effect3 = new Decimal.add(effect2, 2)
      return effect3;
    },
    
    cardanoReset() {
      player.points = new Decimal(0)
      player.XLM.points = new Decimal(0)
      player.XLM.ethereum = new Decimal(0)
      player.XLM.bitcoin = new Decimal(0)
      player.XLM.bitcoinState = new Decimal(0)
      player.XLM.tether = new Decimal(0)
      player.XLM.tetherState = new Decimal(0)
      
      player.XLM.buyables[11] = new Decimal(0)
      player.XLM.buyables[12] = new Decimal(0)
      player.XLM.buyables[13] = new Decimal(0)
      player.XLM.buyables[14] = new Decimal(0)
      player.XLM.buyables[15] = new Decimal(0)
      player.XLM.buyables[16] = new Decimal(0)
      player.XLM.buyables[17] = new Decimal(0)
      player.XLM.buyables[18] = new Decimal(0)
      
      player.XLM.cardano = player.XLM.cardano.add(player.XLM.cardanoToGet)
      player.XLM.cardanoToGet = new Decimal(0)
      player.XLM.cardanoState = player.XLM.cardanoState.add(1)
    },
    
    cardanoGain() {
      let Base = player.points
      let GainI = new Decimal.div(Base, 1e15)
      let GainII = new Decimal.pow(GainI, 0.05)
      return GainII
    },
    
    calculateTickspeed() {
      let Base = new Decimal(1)
      Base = Base.mul(buyableEffect("XLM", 14))
      return Base
    },
    
    frequencyCalculator() {
      let Base = player.XLM.buyables[12]
      let Power = new Decimal(1.25)
      
      let Frequency = player.XLM.frequency
     
      let EffectII = new Decimal.pow(Base, Power)
      return EffectII
    },
    
    calculateTimePointgain() {
      let Base = new Decimal(0.0177)
      return Base
    },
    
    update(diff) {
      player.XLM.ethereum = player.XLM.ethereum.add(tmp.XLM.GenerateEthereum.times(diff))
      
      player.XLM.bitcoinToGet = tmp.XLM.bitcoinGain
      player.XLM.tetherToGet = tmp.XLM.tetherGain
      player.XLM.cardanoToGet = tmp.XLM.cardanoGain
      
      player.XLM.tickspeed = tmp.XLM.calculateTickspeed
      
      player.XLM.timePoints = player.XLM.timePoints.add(tmp.XLM.calculateTimePointgain.times(diff))
      
      player.XLM.timeplayed = player.XLM.timeplayed.add(player.XLM.interval.times(diff))
    },
    clickables: {
        11: {
          title() {
             let state = player.XLM.bitcoinState
             return `<b style="font-size:35px">Hardfork #${state}</b><br>
            Reset your previous progress for <b style="font-size: 19px">${format(player.XLM.bitcoinToGet)}</b> Bitcoin`},
            canClick() { return player.XLM.bitcoinToGet.gte(1) },
            onClick() {
                  return tmp.XLM.bitcoinReset()
            },
            style() {
              if (tmp[this.layer].clickables[this.id].canClick) return {
                "background": "linear-gradient(-180deg, rgba(175,109,3,1) 0%, rgba(225,176,0,1) 100%)",
                "background-image": "url('../image-folder/HardforkCan.png')",
                "width": "460px",
                "height": "130px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 5px #000000",
                "color": "#ffe06f"
              }
              return {
                "background": "radial-gradient(circle, rgba(155,55,55,1) 0%, rgba(50,15,15,1) 100%)",
                "background-image": "url('../image-folder/HardforkCant.png')",
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
              return player.points.gte(700000) || player.XLM.bitcoinState.gte(1)
            }
        },
        
        12: {
            title() { 
            let state = player.XLM.tetherState
            return `<b style="font-size:35px">NODE #${state}</b><br>
            
            Reset your previous progress for <b style="font-size: 19px">${format(player.XLM.tetherToGet)}</b> Tether`},
            canClick() { return player.XLM.tetherToGet.gte(1) },
            onClick() {
                  return tmp.XLM.tetherReset()
                  
            },
            style() {
              if (tmp[this.layer].clickables[this.id].canClick) return {
                "background": "linear-gradient(-180deg, rgba(1,180,88,1) 0%, rgba(0,251,242,1) 100%)",
                "width": "460px",
                "height": "130px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 5px #000000",
                "color": "#5afff3"
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
              return player.points.gte(1e9) || player.XLM.tetherState.gte(1)
            }
        },
        
        13: {
            title() { 
            let state = player.XLM.tetherState
            return `<b style="font-size:35px">Exchange #${state}</b><br>
            
            Reset your previous progress for <b style="font-size: 19px">${format(player.XLM.cardanoToGet)}</b> Cardano`},
            canClick() { return player.XLM.cardanoToGet.gte(1) },
            onClick() {
                  return tmp.XLM.cardanoReset()
                  
            },
            style() {
              if (tmp[this.layer].clickables[this.id].canClick) return {
                "background": "linear-gradient(180deg, rgba(0,135,255,1) 0%, rgba(251,251,251,1) 100%)",
                "width": "460px",
                "height": "130px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 5px #000000",
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
                "color": "#ffffff"
              }
            },
            unlocked() {
              return player.points.gte(1e12) || player.XLM.cardanoState.gte(1)
            }
        },
    },
    buyables: {
        11: {
          cost(x) {
            let PowerI = new Decimal(1.75)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
            return Calculation;
          },
          display() {
            return `<b style="font-size:24px">Neural Network Base</b>
                    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Point Generation</h2>
                      <h2>Amount: ${format(player[this.layer].buyables[this.id], 0)}</h2><br>
                    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
          },
          canAfford() {
            return player[this.layer].points.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(197,195,195,1) 0%, rgba(58,58,58,1) 100%)",
              "background-image" : "url('../image-folder/XLMCan.png')",
              "width": "430px",
              "height": "130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 5px #000000",
              "color": "#ffffff"
            }
            return {
              "background": "radial-gradient(circle, rgba(155,55,55,1) 0%, rgba(50,15,15,1) 100%)",
              "width": "430px",
              "background-image" : "url('../image-folder/XLMCant.png')",
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
            let PowerI = new Decimal(1.25)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
            return Calculation;
          },
          display() {
            let frequency = tmp.XLM.frequencyCalculator
            
            return `<b style="font-size:24px">${formatFrequency(frequency)} RAM</b>
                    <h2>+${format(tmp[this.layer].buyables[this.id].effect)} Ethereum Generation</h2>
                      <h2>Amount: ${format(player[this.layer].buyables[this.id], 0)}</h2><br>
                    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Stellar</h1>`
          },
          canAfford() {
            return player[this.layer].points.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(197,195,195,1) 0%, rgba(58,58,58,1) 100%)",
              "background-image": "url('../image-folder/XLMCan.png')",
              "width": "430px",
              "height": "130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 5px #000000",
              "color": "#ffffff"
            }
            return {
              "background": "radial-gradient(circle, rgba(155,55,55,1) 0%, rgba(50,15,15,1) 100%)",
              "width": "430px",
              "background-image": "url('../image-folder/XLMCant.png')",
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
            let Effect = new Decimal(0).add(Decimal.pow(1.25, x.pow(1))).sub(1)
            return Effect;
          },
          unlocked() {
            return player.points.gte(25);
          }
        },
        
        
        13: {
          cost(x) {
            let PowerI = new Decimal(3)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
            return Calculation;
          },
          display() {
            return `<b style="font-size:24px">CPU Improvement</b>
                    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} more Stellar</h2>
                      <h2>Amount: ${format(player[this.layer].buyables[this.id], 0)}</h2><br>
                    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Ethereum</h1>`
          },
          canAfford() {
            return player[this.layer].ethereum.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(0,72,218,1) 0%, rgba(6,0,87,1) 100%)",
             "background-image" : "url('../image-folder/ETHCan.png')",
              "width": "430px",
              "height": "130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 5px #000000",
              "color": "#ffffff"
            }
            return {
              "background": "radial-gradient(circle, rgba(155,55,55,1) 0%, rgba(50,15,15,1) 100%)",
              "background-image" : "url('../image-folder/ETHCant.png')",
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
            player[this.layer].ethereum = player[this.layer].ethereum.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let Effect = new Decimal(0).add(Decimal.pow(1.1, x.pow(1)))
            return Effect;
          },
          unlocked() {
            return player[this.layer].buyables[12].gte(2);
          }
        },
        
        
        14: {
          cost(x) {
            let PowerI = new Decimal(2.25)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
            return Calculation;
          },
          display() {
            return `<b style="font-size:24px">Time Manipulation</b>
                    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} faster Tickspeed</h2>
                      <h2>Amount: ${format(player[this.layer].buyables[this.id], 0)}</h2><br>
                    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
          },
          canAfford() {
            return player[this.layer].bitcoin.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(255,217,4,1) 0%, rgba(165,126,10,1) 100%)",
              "width": "430px",
              "height": "130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 5px #000000",
              "color": "#ffffff"
            }
            return {
              "background": "radial-gradient(circle, rgba(155,55,55,1) 0%, rgba(50,15,15,1) 100%)",
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
            player[this.layer].bitcoin = player[this.layer].bitcoin.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let Effect = new Decimal(0).add(Decimal.pow(1.75, x.pow(1)))
            return Effect;
          },
          unlocked() {
            return player[this.layer].buyables[13].gte(10) || player.XLM.bitcoinState.gte(1)
          }
        },
        
        15: {
          cost(x) {
            let PowerI = new Decimal(1.95)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(10).mul(Decimal.pow(PowerI, x.pow(1)))
            return Calculation;
          },
          display() {
            return `<b style="font-size:24px">Video Driver</b>
                    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Stellar-Bitcoin gain</h2>
                      <h2>Amount: ${format(player[this.layer].buyables[this.id], 0)}</h2><br>
                    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Bitcoin</h1>`
          },
          canAfford() {
            return player[this.layer].bitcoin.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(255,217,4,1) 0%, rgba(165,126,10,1) 100%)",
              "width": "430px",
              "height": "130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 5px #000000",
              "color": "#ffffff"
            }
            return {
              "background": "radial-gradient(circle, rgba(155,55,55,1) 0%, rgba(50,15,15,1) 100%)",
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
            player[this.layer].bitcoin = player[this.layer].bitcoin.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let Effect = new Decimal(1).mul(Decimal.pow(1.05, x.pow(1)))
            return Effect;
          },
          unlocked() {
            return player[this.layer].buyables[14].gte(5);
          }
        },
        
        16: {
          cost(x) {
            let PowerI = new Decimal(3)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(0.5).mul(Decimal.pow(PowerI, x.pow(1)))
            return Calculation;
          },
          display() {
            let state = new Decimal(1)
            state = state.mul(buyableEffect("XLM", 17))
            return `<b style="font-size:24px">v${format(state)} Bitcoin Mining</b>
                    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Bitcoin gain</h2>
                      <h2>Amount: ${format(player[this.layer].buyables[this.id], 0)}</h2><br>
                    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Tether</h1>`
          },
          canAfford() {
            return player[this.layer].tether.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(0,255,124,1) 0%, rgba(1,125,93,1) 100%)",
              "width": "430px",
              "height": "130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 5px #000000",
              "color": "#ffffff"
            }
            return {
              "background": "radial-gradient(circle, rgba(155,55,55,1) 0%, rgba(50,15,15,1) 100%)",
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
            player[this.layer].tether = player[this.layer].tether.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let PowerI = new Decimal(2)
            PowerI = PowerI.mul(buyableEffect("XLM", 17))
            let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
            return Effect;
          },
          unlocked() {
            return player.XLM.tether.gte(0.1)
          }
        },
        
        17: {
          cost(x) {
            let PowerI = new Decimal(10)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(0.75).mul(Decimal.pow(PowerI, x.pow(1)))
            return Calculation;
          },
          display() {
            return `<b style="font-size:24px">GPU Sticks</b>
                    <h2>Improves Bitcoin Mining to v${format(tmp[this.layer].buyables[this.id].effect)}
                    1.1x Better Formula each Version</h2>
                      <h2>Amount: ${format(player[this.layer].buyables[this.id], 0)}</h2><br>
                    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Tether</h1>`
          },
          canAfford() {
            return player[this.layer].tether.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(0,255,124,1) 0%, rgba(1,125,93,1) 100%)",
              "width": "430px",
              "height": "130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 5px #000000",
              "color": "#ffffff"
            }
            return {
              "background": "radial-gradient(circle, rgba(155,55,55,1) 0%, rgba(50,15,15,1) 100%)",
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
            player[this.layer].tether = player[this.layer].tether.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let Effect = new Decimal(1).mul(Decimal.pow(1.1, x.pow(1)))
            return Effect;
          },
          unlocked() {
            return player.XLM.tether.gte(0.1)
          }
        },
        
        18: {
          cost(x) {
            let PowerI = new Decimal(4)
            let PowerII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            let PowerIII = new Decimal(1).mul(Decimal.div(player[this.layer].buyables[this.id], 100).add(1))
            
            PowerI = PowerI.pow(PowerII)
            PowerI = PowerI.pow(PowerIII)
            let Calculation = new Decimal(2).mul(Decimal.pow(PowerI, x.pow(1)))
            return Calculation;
          },
          display() {
            return `<b style="font-size:24px">More Neural Network Slots</b>
                    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Stellar</h2>
                      <h2>Amount: ${format(player[this.layer].buyables[this.id], 0)}</h2><br>
                    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Tether</h1>`
          },
          canAfford() {
            return player[this.layer].tether.gte(this.cost())
          },
          style() {
            if (tmp[this.layer].buyables[this.id].canAfford) return {
              "background": "radial-gradient(circle, rgba(0,255,124,1) 0%, rgba(1,125,93,1) 100%)",
              "width": "430px",
              "height": "130px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 5px #000000",
              "color": "#ffffff"
            }
            return {
              "background": "radial-gradient(circle, rgba(155,55,55,1) 0%, rgba(50,15,15,1) 100%)",
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
            player[this.layer].tether = player[this.layer].tether.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let Effect = new Decimal(1).mul(Decimal.pow(3, x.pow(1)))
            return Effect;
          },
          unlocked() {
            return player.XLM.buyables[17].gte(2)
          }
        },
    },
    
    tabFormat : {
        "Main" : {
            unlocked() {return true},
            content : [
             ["raw-html", () => {
               let state = []
               if (player.points.gte(1e9)) state.push('Lumens')
                   return `You have <b style="font-size: 24px; text-shadow: 0px 0px 10px">${format(player.XLM.points)}</b> Stellar ${state} `
                                }],
                 ["raw-html", () => {
                   if (player.XLM.ethereum.gte(0.001)) { return `You have <b style="color: #567af0;font-size: 24px; text-shadow: 0px 0px 10px">${format(player.XLM.ethereum)}</b> Ethereum `
                   }
                   else return ``
                 }],
                    ["raw-html", () => {
                   if (player.XLM.bitcoin.gte(0.001)) { return `You have <b style="color: #dbb127;font-size: 24px; text-shadow: 0px 0px 10px">${format(player.XLM.bitcoin)}</b> Bitcoins, that boost Stellar Gain by  <b style="color: #dbb127;font-size: 24px; text-shadow: 0px 0px 10px">${format(tmp.XLM.bitcoinToStellar)}x</b>`
                   }
                   else return ``
                                }],
                    ["raw-html", () => {
                   if (player.XLM.tether.gte(0.001)) { return `You have <b style="color: #00fbbb;font-size: 24px; text-shadow: 0px 0px 10px">${format(player.XLM.tether)}</b> Tether, that boost Stellar Gain by  <b style="color: #00fbbb;font-size: 24px; text-shadow: 0px 0px 10px">${format(tmp.XLM.tetherToStellar)}x</b>`
                   }
                   else return ``
                                }],
                   ["raw-html", () => {
                   if (player.XLM.cardano.gte(0.001)) { return `You have <b style="color: #0dffe7;font-size: 24px; text-shadow: 0px 0px 10px">${format(player.XLM.cardano)}</b> Cardano, that boosts everything by <b style="color: #0dffe7;font-size: 24px; text-shadow: 0px 0px 10px">${format(tmp.XLM.cardanoToEverything)}x</b>`
                   }
                   else return ``
                                }],
                                ["raw-html", () => {
                   if (player.XLM.tickspeed.gte(0.001)) { return `For every second that passes in real life, it equals as <b style="color: #ff0061;font-size: 24px; text-shadow: 0px 0px 10px">${format(player.XLM.tickspeed)} <sup>( ${hyperEformat(player.XLM.tickspeed)}x )</sup></b> times / sec in game`
                   }
                   else return ``
                                }],
                                "blank",
                 ["raw-html", () => {
                   return `<b style='font-size:13px; color:#6e6d6d'>You have <b style="color: #9e9d9d;font-size: 16px; text-shadow: 0px 0px 10px">${format(player.points)}</b> points</b><br>
                   <b style='font-size:13px; color:#6e6d6d'>You generate <b style="color: #9e9d9d;font-size: 16px; text-shadow: 0px 0px 10px">${format(tmp.XLM.resetGain)}</b> Stellar / sec</b><br>
                   <b style='font-size:13px; color:#6e6d6d'>Improve XLM gain at <b style="color: #9e9d9d;font-size: 16px; text-shadow: 0px 0px 10px">${format(tmp.XLM.nextAt)}</b> points</b><br>
                   <br>
                     <b style='font-size:13px; color:#6e6d6d'>You generate <b style="color: #565578;font-size: 16px; text-shadow: 0px 0px 10px">${format(tmp.XLM.GenerateEthereum)}</b> Ethereum / sec</b><br>
                     <br>
                    <b style='font-size:13px; color:#6e6d6d'>FOR DEBUG: Reset for <b style="color: #786b55;font-size: 16px; text-shadow: 0px 0px 10px">${format(tmp.XLM.bitcoinGain)}</b> Bitcoin</b><br>
                    <b style='font-size:13px; color:#6e6d6d'>FOR DEBUG: Reset for <b style="color: #557869;font-size: 16px; text-shadow: 0px 0px 10px">${format(tmp.XLM.tetherGain)}</b> Tether</b><br>
                    <br>
                    <b style='font-size:13px; color:#6e6d6d'>You have spent <b style="color: #32a87b;font-size: 16px; text-shadow: 0px 0px 10px">${formatTimeLong(player.XLM.timeplayed)}</b> in this layer</b><br>
                    <br>`}],
                    ["raw-html", function () { return options.musicToggle ? `<audio controls autoplay loop hidden><source src=music/experience.mp3 type<=audio/mp3>loop=true hidden=true autostart=true</audio>`: ``}],
                                
                "blank",
                "blank",
                ["row", [["clickable", 13]]],
                ["row", [["clickable", 12]]],
                ["row", [["clickable", 11]]],
                 "blank",
                 "blank",
                ["microtabs", "BUYABLES", { 'border-width': '0px' }],
                
            ]
        },
                "Lore" : {
            unlocked() {return true},
            content : [
             ["raw-html", () => {
                   return `There once was a developer called Niko... He liked to play incremental games and most of his free time he also developed few of them. 
                   <br>
                   <br>
                   However, today something peculiar and unusual happened. Niko found himself in situation where he wanted to make a tree game out of cryptocurrencies. Since there was plenty of them he wasn't worried of running out of ideas for future content. Without wasting any of his precious free time, he started to work on it. Few days pass until he finishes first version with playable content. He was happy and pleased of his hard work. People also liked his game because of it's uniqueness.
                   <br>
                   <br>
                   But something bothered Niko. As he stared at his screen where various numbers were changing every second, he thought to himself. "Why do I have a feeling that something like this has happened already?" Niko questioned himself again. Something really bothered him, that even he couldn't figure it out. This thought of mind was broken when Niko discovered a unusual metallic object was on his table. It, felt really familiar. Niko definitely has seen it somewhere, but where? That metallic object was really cold. Something malicious was brewing from that.`
                                }],
                ]},
                
                "Time" : {
            unlocked() {return player.XLM.bitcoinState.gte(1) || player.XLM.tetherState.gte(1)},
            content : [
              ["raw-html", () => {
                   return `You have <b style="color: #ff4e21; font-size: 24px; text-shadow: 0px 0px 10px">${format(player.XLM.timePoints)}</b> Time Points`
                                }],
                                
                ]},
    },
        microtabs: {
        BUYABLES: {
            "Stellar": {
                unlocked() { return true },
                buttonStyle() { return { 'color': '#ffffff' } },
                content:
                    [
                        ["microtabs", "Stellar", { 'border-width': '0px' }],
                        ["row", [["buyable", 11]]],
                        ["row", [["buyable", 12]]],
                    ]
                   
            }, 
            "Ethereum": {
                unlocked() { return true },
                buttonStyle() { return { 'color': '#567af0' } },
                content:
                    [
                        ["microtabs", "Ethereum", { 'border-width': '0px' }],
                        ["row", [["buyable", 13]]],
                    ]
                   
            }, 
            "Bitcoin": {
                unlocked() { return true },
                buttonStyle() { return { 'color': '#dbb127' } },
                content:
                    [
                        ["microtabs", "Bitcoin", { 'border-width': '0px' }],
                        ["row", [["buyable", 14]]],
                        ["row", [["buyable", 15]]],
 
                    ]
                   
            }, 
             "Tether": {
                unlocked() { return true },
                buttonStyle() { return { 'color': '#00fbbb' } },
                content:
                    [
                        ["microtabs", "Bitcoin", { 'border-width': '0px' }],
                        ["row", [["buyable", 16]]],
                        ["row", [["buyable", 17]]],
                        ["row", [["buyable", 18]]]
 
                    ]
                   
            }, 
        }
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "X", description: "X: Reset for Stellar", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})*/
